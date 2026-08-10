$ErrorActionPreference = 'Stop'
$sandboxRoot = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $sandboxRoot 'evidence-manifest.json'
$utf8NoBom = [Text.UTF8Encoding]::new($false)
$files = Get-ChildItem -LiteralPath $sandboxRoot -Recurse -File |
    Where-Object FullName -ne $manifestPath |
    Sort-Object FullName
$entries = foreach ($file in $files) {
    [ordered]@{
        path = $file.FullName.Substring($sandboxRoot.Length + 1).Replace('\','/')
        sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    }
}
$manifest = [ordered]@{
    evidence_version = 'pilot-protocol-v0.2.0-candidate'
    state = 'E2-F0_NOT_FROZEN'
    fixture_commit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
    executions = 0
    test_suite = 'IT-003..IT-009 fictitious infrastructure only'
    hash_algorithm = 'SHA-256'
    files = @($entries)
}
$json = $manifest | ConvertTo-Json -Depth 8
[IO.File]::WriteAllText($manifestPath, ($json -replace "`r`n","`n") + "`n", $utf8NoBom)
Write-Output "E2_EVIDENCE_MANIFEST_UPDATED files=$($entries.Count) state=E2-F0_NOT_FROZEN"
