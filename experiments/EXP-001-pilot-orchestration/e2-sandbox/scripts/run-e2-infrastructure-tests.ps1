$ErrorActionPreference = 'Stop'

$sandboxRoot = Split-Path -Parent $PSScriptRoot
$orchestrationRoot = Split-Path -Parent $sandboxRoot
$inputRoot = (Resolve-Path (Join-Path $sandboxRoot 'fictitious-input')).Path
$resultsRoot = Join-Path $sandboxRoot 'results'
$image = 'sha256:37a38e48e9338cd7e89dfeb487f37b02ebfcd9cb23111bed2d345e79d37d6dd6'
$utf8NoBom = [Text.UTF8Encoding]::new($false)

if (-not (Test-Path -LiteralPath $resultsRoot)) { $null = New-Item -ItemType Directory -Path $resultsRoot }

function Remove-Probe([string]$name) {
    if ($name -notmatch '^exp001-it00[3-9]-[ab]?$') { throw "Nome de container fora do escopo: $name" }
    $existing = docker ps -aq --filter "name=^/$name$"
    if ($existing) { $null = docker rm -f $name }
}

function Invoke-Probe([string]$id, [string]$name, [string]$command, [bool]$mountInput = $true) {
    Remove-Probe $name
    $args = @('create','--name',$name,'--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges:true','--pids-limit','32','--memory','128m','--cpus','0.5','--user','65534:65534','--tmpfs','/tmp:rw,noexec,nosuid,size=8m','--workdir','/input')
    if ($mountInput) { $args += @('--mount',"type=bind,src=$inputRoot,dst=/input,readonly") }
    $args += @('--entrypoint','/bin/sh',$image,'-c',$command)
    $containerId = (& docker @args).Trim()
    $startedAt = (Get-Date).ToString('o')
    $output = (& docker start -a $name 2>&1 | Out-String).TrimEnd()
    $exitCode = [int](docker inspect $name --format '{{.State.ExitCode}}')
    $networkMode = (docker inspect $name --format '{{.HostConfig.NetworkMode}}').Trim()
    $mounts = docker inspect $name --format '{{json .Mounts}}'
    $record = [ordered]@{
        test_id = $id
        experimental_run = $false
        fixture_content_used = $false
        container_name = $name
        container_id = $containerId
        image = $image
        command_origin = 'operator_initiated_infrastructure_test'
        command = $command
        started_at = $startedAt
        completed_at = (Get-Date).ToString('o')
        output = $output
        exit_code = $exitCode
        network_mode = $networkMode
        mounts = $mounts | ConvertFrom-Json
    }
    $json = $record | ConvertTo-Json -Depth 10
    [IO.File]::WriteAllText((Join-Path $resultsRoot "$id.json"), ($json -replace "`r`n","`n") + "`n", $utf8NoBom)
    Remove-Probe $name
    return $record
}

$records = [Collections.Generic.List[object]]::new()
$records.Add((Invoke-Probe 'IT-003' 'exp001-it003-' 'test -r prompt.md -a -r record.md; wc -c prompt.md record.md; echo OBJECTIVE_OK; echo STATE_OK; echo FIRST_ACTION_OK'))
$records.Add((Invoke-Probe 'IT-004' 'exp001-it004-' 'cat ../../outside-sentinel/secret.txt 2>&1; test ! -e ../../outside-sentinel/secret.txt'))
$records.Add((Invoke-Probe 'IT-005' 'exp001-it005-' 'cat /outside-sentinel/secret.txt 2>&1; test ! -e /outside-sentinel/secret.txt'))
$records.Add((Invoke-Probe 'IT-006' 'exp001-it006-' 'find / -name secret.txt -o -name ".git" 2>/dev/null; test ! -e /workspace -a ! -e /repo -a ! -e /host_mnt'))

Remove-Probe 'exp001-it007-a'
$createA = docker create --name exp001-it007-a --network none --read-only --cap-drop ALL --security-opt no-new-privileges:true --user 65534:65534 --tmpfs /tmp:rw,noexec,nosuid,size=8m --entrypoint /bin/sh $image -c 'echo SESSION_A_MARKER > /tmp/session-a; cat /tmp/session-a'
$outA = (docker start -a exp001-it007-a | Out-String).Trim()
Remove-Probe 'exp001-it007-a'
$record7 = Invoke-Probe 'IT-007' 'exp001-it007-b' 'test ! -e /tmp/session-a; echo SESSION_B_CLEAN' $false
$record7 | Add-Member -NotePropertyName prior_session_output -NotePropertyValue $outA
$json7 = $record7 | ConvertTo-Json -Depth 10
[IO.File]::WriteAllText((Join-Path $resultsRoot 'IT-007.json'), ($json7 -replace "`r`n","`n") + "`n", $utf8NoBom)
$records.Add($record7)

$records.Add((Invoke-Probe 'IT-008' 'exp001-it008-' 'for t in sh cat ls find grep wget curl; do command -v $t 2>/dev/null || true; done'))
$records.Add((Invoke-Probe 'IT-009' 'exp001-it009-' 'wget -T 2 -qO- http://example.com 2>&1; code=$?; echo NETWORK_CALL_EXIT=$code; test $code -ne 0'))

$summary = [ordered]@{
    suite = 'IT-003..IT-009'
    executed_at = (Get-Date).ToString('o')
    experimental_runs = 0
    fixture_content_used = $false
    image = $image
    controls = @('network=none','read-only root','cap-drop=ALL','no-new-privileges','non-root user','tmpfs ephemeral','single read-only input mount')
    results = @($records | ForEach-Object { [ordered]@{ test_id=$_.test_id; exit_code=$_.exit_code; network_mode=$_.network_mode; output=$_.output } })
}
$summaryJson = $summary | ConvertTo-Json -Depth 10
[IO.File]::WriteAllText((Join-Path $resultsRoot 'suite-summary.json'), ($summaryJson -replace "`r`n","`n") + "`n", $utf8NoBom)
Write-Output "E2_INFRA_TESTS_COMPLETE count=$($records.Count) experimental_runs=0"
