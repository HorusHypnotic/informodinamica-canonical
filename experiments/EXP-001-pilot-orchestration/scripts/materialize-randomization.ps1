$ErrorActionPreference = 'Stop'

$orchestrationRoot = Split-Path -Parent $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $orchestrationRoot '..\..')).Path
$fixtureRoot = Join-Path $repoRoot 'experiments\EXP-001-reconstruction-boundaries'
$seedText = (Get-Content -LiteralPath (Join-Path $orchestrationRoot 'randomization\seed.txt') -Raw -Encoding UTF8).Trim()
if ($seedText -notmatch '^[a-f0-9]{64}$') { throw 'Seed inválida.' }
$seed = New-Object byte[] ($seedText.Length / 2)
for ($i = 0; $i -lt $seed.Length; $i++) { $seed[$i] = [Convert]::ToByte($seedText.Substring($i * 2, 2), 16) }
$utf8NoBom = [Text.UTF8Encoding]::new($false)

function Get-HmacHex([string]$label) {
    $hmac = [Security.Cryptography.HMACSHA256]::new($seed)
    try { return ([BitConverter]::ToString($hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($label))).Replace('-','')).ToLowerInvariant() }
    finally { $hmac.Dispose() }
}

$auditMap = Get-Content -LiteralPath (Join-Path $fixtureRoot 'packages\audit-map.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$packageManifest = Get-Content -LiteralPath (Join-Path $fixtureRoot 'packages\receiver-package-manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$promptPath = Join-Path $fixtureRoot 'protocol\receiver-prompt.md'
$promptHash = (Get-FileHash -LiteralPath $promptPath -Algorithm SHA256).Hash.ToLowerInvariant()
$fixtureManifestPath = Join-Path $fixtureRoot 'manifest\fixture-manifest.json'
$fixtureManifestHash = (Get-FileHash -LiteralPath $fixtureManifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
$environmentPath = Join-Path $orchestrationRoot 'protocol\environment-manifest.json'
$environmentHash = (Get-FileHash -LiteralPath $environmentPath -Algorithm SHA256).Hash.ToLowerInvariant()
$seedHash = (Get-FileHash -LiteralPath (Join-Path $orchestrationRoot 'randomization\seed.txt') -Algorithm SHA256).Hash.ToLowerInvariant()

$mapped = foreach ($item in $auditMap.mappings) {
    $sourceParts = $item.source -split '/'
    $instanceId = ($sourceParts[1] -split '-')[0]
    $conditionFile = [IO.Path]::GetFileNameWithoutExtension($sourceParts[-1])
    $conditionId = switch ($conditionFile) { 'C3-sham' {'C3S'} 'C4-A' {'C4A'} 'C4-F' {'C4F'} default {$conditionFile} }
    $pkg = $packageManifest.packages | Where-Object package_id -eq $item.package_id
    [pscustomobject]@{
        instance_id = $instanceId
        condition_id = $conditionId
        package_id = $item.package_id
        package_path = $pkg.path
        package_hash = $pkg.sha256
        opaque_condition_id = 'OC-' + (Get-HmacHex("condition|$($item.package_id)")).Substring(0,10).ToUpperInvariant()
    }
}

$conditionMap = [ordered]@{
    map_version = '1.0.0-sealed'
    fixture_commit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
    fixture_version = '0.2.0-frozen'
    receiver_visible = $false
    evaluator_primary_visible = $false
    algorithm = 'HMAC-SHA256 keyed lexicographic ordering v1'
    seed_ref = 'randomization/seed.txt'
    seed_hash = $seedHash
    mappings = @($mapped)
}
$mapJson = $conditionMap | ConvertTo-Json -Depth 8
$conditionMapPath = Join-Path $orchestrationRoot 'randomization\condition-map.json'
[IO.File]::WriteAllText($conditionMapPath, ($mapJson -replace "`r`n","`n") + "`n", $utf8NoBom)
$conditionMapHash = (Get-FileHash -LiteralPath $conditionMapPath -Algorithm SHA256).Hash.ToLowerInvariant()

$rows = foreach ($item in $mapped) {
    foreach ($rep in 1..2) {
        [pscustomobject]@{
            sort_key = Get-HmacHex("order|$($item.instance_id)|$($item.package_id)|R$rep")
            instance_id = $item.instance_id
            repetition_id = "R$rep"
            opaque_condition_id = $item.opaque_condition_id
            receiver_session_id = 'SES-' + (Get-HmacHex("session|$($item.package_id)|R$rep")).Substring(0,12).ToUpperInvariant()
            receiver_package_id = $item.package_id
            receiver_package_ref = $item.package_path
            receiver_package_hash = $item.package_hash
        }
    }
}

$ordered = @($rows | Sort-Object sort_key)
$planRows = for ($i=0; $i -lt $ordered.Count; $i++) {
    $row = $ordered[$i]
    [ordered]@{
        run_id = 'RUN-' + ($i + 1).ToString('000')
        opaque_condition_id = $row.opaque_condition_id
        instance_id = $row.instance_id
        repetition_id = $row.repetition_id
        receiver_session_id = $row.receiver_session_id
        planned_order = $i + 1
        receiver_package_id = $row.receiver_package_id
        receiver_package_ref = $row.receiver_package_ref
        receiver_package_hash = $row.receiver_package_hash
        prompt_ref = 'experiments/EXP-001-reconstruction-boundaries/protocol/receiver-prompt.md'
        prompt_hash = $promptHash
        environment_ref = 'protocol/environment-manifest.json'
        environment_hash = $environmentHash
        condition_map_hash = $conditionMapHash
        status = 'planned_not_started'
    }
}

$plan = [ordered]@{
    plan_version = '1.0.0-sealed'
    created_before_first_execution = $true
    fixture_commit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
    fixture_version = '0.2.0-frozen'
    conceptual_plan_runs = 36
    actual_conditions_per_instance = 5
    actual_planned_runs = 30
    repetitions_per_cell = 2
    algorithm = 'HMAC-SHA256 keyed lexicographic ordering v1'
    seed_ref = 'randomization/seed.txt'
    seed_hash = $seedHash
    condition_map_ref = 'randomization/condition-map.json'
    condition_map_hash = $conditionMapHash
    runs = @($planRows)
}
$planJson = $plan | ConvertTo-Json -Depth 8
$planPath = Join-Path $orchestrationRoot 'execution-plan.json'
[IO.File]::WriteAllText($planPath, ($planJson -replace "`r`n","`n") + "`n", $utf8NoBom)
$planRows | Export-Csv -LiteralPath (Join-Path $orchestrationRoot 'execution-plan.csv') -NoTypeInformation -Encoding UTF8

$first = $planRows[0]
$preparedRoot = Join-Path $orchestrationRoot 'prepared\first-run'
if (-not (Test-Path -LiteralPath $preparedRoot)) { $null = New-Item -ItemType Directory -Path $preparedRoot }
Copy-Item -LiteralPath $promptPath -Destination (Join-Path $preparedRoot 'prompt.md') -Force
Copy-Item -LiteralPath (Join-Path $fixtureRoot $first.receiver_package_ref) -Destination (Join-Path $preparedRoot 'record.md') -Force
$inputBundle = [ordered]@{
    delivery_order = @('prompt.md','record.md')
    prompt_ref = 'prepared/first-run/prompt.md'
    prompt_hash = (Get-FileHash -LiteralPath (Join-Path $preparedRoot 'prompt.md') -Algorithm SHA256).Hash.ToLowerInvariant()
    record_ref = 'prepared/first-run/record.md'
    record_hash = (Get-FileHash -LiteralPath (Join-Path $preparedRoot 'record.md') -Algorithm SHA256).Hash.ToLowerInvariant()
    additional_content = $null
}
$inputBundleJson = $inputBundle | ConvertTo-Json -Depth 4
$inputBundlePath = Join-Path $preparedRoot 'input-bundle.json'
[IO.File]::WriteAllText($inputBundlePath, ($inputBundleJson -replace "`r`n","`n") + "`n", $utf8NoBom)
$firstMapping = $mapped | Where-Object opaque_condition_id -eq $first.opaque_condition_id
$preRun = [ordered]@{
    run = $first
    internal_condition_id = $firstMapping.condition_id
    fixture_commit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
    fixture_version = '0.2.0-frozen'
    fixture_manifest_ref = 'experiments/EXP-001-reconstruction-boundaries/manifest/fixture-manifest.json'
    fixture_manifest_hash = $fixtureManifestHash
    randomization_seed_ref = 'randomization/seed.txt'
    randomization_seed_hash = $seedHash
    randomization_map_ref = 'randomization/condition-map.json'
    randomization_map_version = '1.0.0-sealed'
    randomization_map_hash = $conditionMapHash
    executor_profile_ref = 'protocol/environment-manifest.json'
    executor_profile_hash = $environmentHash
    exact_input_ref = 'prepared/first-run/input-bundle.json'
    exact_input_hash = (Get-FileHash -LiteralPath $inputBundlePath -Algorithm SHA256).Hash.ToLowerInvariant()
    prompt_copy_hash = (Get-FileHash -LiteralPath (Join-Path $preparedRoot 'prompt.md') -Algorithm SHA256).Hash.ToLowerInvariant()
    record_copy_hash = (Get-FileHash -LiteralPath (Join-Path $preparedRoot 'record.md') -Algorithm SHA256).Hash.ToLowerInvariant()
    checklist_ref = 'protocol/preflight-checklist.md'
    logging_state = 'prepared_before_start; timestamps and output fields must be appended at execution time'
    authorization_state = 'awaiting_human_final_authorization'
    sent_to_receiver = $false
}
$preRunJson = $preRun | ConvertTo-Json -Depth 8
[IO.File]::WriteAllText((Join-Path $preparedRoot 'pre-run.json'), ($preRunJson -replace "`r`n","`n") + "`n", $utf8NoBom)

Write-Output "RANDOMIZATION_MATERIALIZED runs=$($planRows.Count) conditions=5 repetitions=2 first_run=$($first.run_id)"
