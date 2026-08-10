$ErrorActionPreference = 'Stop'

$fixtureRoot = Split-Path -Parent $PSScriptRoot
$mapPath = Join-Path $fixtureRoot 'packages\audit-map.json'
$outputRoot = Join-Path $fixtureRoot 'packages\receiver-visible'
$manifestPath = Join-Path $fixtureRoot 'packages\receiver-package-manifest.json'
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

$map = Get-Content -LiteralPath $mapPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ($map.fixture_version -ne '0.2.0-frozen') { throw 'Versão inesperada no mapa de pacotes.' }

if (-not (Test-Path -LiteralPath $outputRoot)) {
    $null = New-Item -ItemType Directory -Path $outputRoot
}

$expectedNames = [System.Collections.Generic.HashSet[string]]::new()
$entries = [System.Collections.Generic.List[object]]::new()

foreach ($item in $map.mappings) {
    if ($item.package_id -notmatch '^PKG-[A-Z0-9]{6}$') { throw "ID opaco inválido: $($item.package_id)" }
    $sourcePath = Join-Path $fixtureRoot $item.source
    if (-not (Test-Path -LiteralPath $sourcePath)) { throw "Fonte ausente: $($item.source)" }

    $content = Get-Content -LiteralPath $sourcePath -Raw -Encoding UTF8
    $content = ($content -split '\r?\n\*\*[^*\r\n]+:\*\*', 2)[0]
    $content = ($content -replace "`r`n", "`n").TrimEnd() + "`n"
    if ($content -match '(?i)\*\*[^*\r\n]+:\*\*') { throw "Falha ao remover metadados: $($item.source)" }

    $fileName = "$($item.package_id).md"
    $null = $expectedNames.Add($fileName)
    $outputPath = Join-Path $outputRoot $fileName
    [System.IO.File]::WriteAllText($outputPath, $content, $utf8NoBom)
    if ((Get-Content -LiteralPath $outputPath -Raw -Encoding UTF8) -ne $content) { throw "Conteúdo escrito diverge da fonte filtrada: $fileName" }
    $hash = (Get-FileHash -LiteralPath $outputPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $entries.Add([ordered]@{ package_id = $item.package_id; path = "packages/receiver-visible/$fileName"; sha256 = $hash })
}

Get-ChildItem -LiteralPath $outputRoot -File | Where-Object { -not $expectedNames.Contains($_.Name) } | ForEach-Object {
    throw "Pacote órfão não removido automaticamente: $($_.Name)"
}

$manifest = [ordered]@{
    fixture_version = $map.fixture_version
    map_version = $map.map_version
    hash_algorithm = 'SHA-256'
    generated_deterministically_by = 'scripts/build-blind-packages.ps1'
    packages = $entries
}
$json = $manifest | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($manifestPath, ($json -replace "`r`n", "`n") + "`n", $utf8NoBom)

Write-Output "BLIND_PACKAGES_OK count=$($entries.Count) fixture_version=$($map.fixture_version)"
