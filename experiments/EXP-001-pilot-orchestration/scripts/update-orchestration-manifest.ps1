$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $root 'orchestration-manifest.json'
$utf8NoBom = [Text.UTF8Encoding]::new($false)
$files = Get-ChildItem -LiteralPath $root -Recurse -File |
    Where-Object FullName -ne $manifestPath |
    Sort-Object FullName
$entries = foreach ($file in $files) {
    [ordered]@{
        path = $file.FullName.Substring($root.Length + 1).Replace('\','/')
        sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    }
}
$manifest = [ordered]@{
    checkpoint = 'EXP-001_PAUSADO_PRE_PILOTO'
    date = '2026-08-10'
    fixture_commit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
    fixture_tag = 'exp-001-fixture-v0.2.0-frozen'
    fixture_version = '0.2.0-frozen'
    planned_runs = 30
    experimental_runs_started = 0
    experimental_runs_completed = 0
    experimental_outputs_observed = 0
    run_001 = 'blocked_preflight_stop6_not_started'
    e2 = 'E2-F0'
    operational_amendment = 'pilot-protocol-v0.2.0-candidate_not_frozen'
    hash_algorithm = 'SHA-256'
    manifest_self_hash = $null
    files = @($entries)
}
$json = $manifest | ConvertTo-Json -Depth 8
[IO.File]::WriteAllText($manifestPath, ($json -replace "`r`n","`n") + "`n", $utf8NoBom)
Write-Output "ORCHESTRATION_MANIFEST_UPDATED files=$($entries.Count) runs=0 state=PAUSED"
