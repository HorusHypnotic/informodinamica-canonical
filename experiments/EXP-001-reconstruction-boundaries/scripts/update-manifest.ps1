$ErrorActionPreference = 'Stop'

$fixtureRoot = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $fixtureRoot 'manifest\fixture-manifest.json'
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

$files = Get-ChildItem -LiteralPath $fixtureRoot -Recurse -File |
    Where-Object { $_.FullName -ne $manifestPath } |
    Sort-Object { $_.FullName.Substring($fixtureRoot.Length + 1).Replace('\','/') }

$entries = foreach ($file in $files) {
    $relative = $file.FullName.Substring($fixtureRoot.Length + 1).Replace('\','/')
    [ordered]@{
        path = $relative
        purpose = 'artefato versionado do fixture'
        sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    }
}

$frozenState = 'FIXTURE CONGELADO ' + [char]0x2014 + ' PR' + [char]0x00C9 + '-PILOTO'
$manifest = [ordered]@{
    experiment_id = 'EXP-001'
    fixture_name = 'Reconstruction Boundaries'
    fixture_version = '0.2.0-frozen'
    date = '2026-08-10'
    state = $frozenState
    confirmatory_status = 'nao_confirmatorio'
    execution_status = 'nenhum_receptor_executado'
    hash_algorithm = 'SHA-256'
    manifest_self_hash = $null
    manifest_self_hash_note = 'O manifesto não inclui o próprio hash; seu hash poderá ser registrado somente após aprovação humana.'
    instances = @('I01','I02','I03')
    conditions = @('C2','C3','C3S','C4A','C4F')
    c4a_primary_interpretation = 'estado_obsoleto'
    c4a_exploratory_components = @('atraso','substituicao','supressao_de_evidencia')
    deliberately_deferred = @('novas_instancias','novas_deformacoes','diversificacao_topologica','execucao_do_piloto','preregistro_confirmatorio')
    blinding_level = 'duplo-cego_parcial'
    receiver_exposure_rule = 'um_receptor_uma_execucao_total'
    known_limitations = @(
        'C3 explicita relações e conserva diferença inevitável de conectivos e densidade simbólica em relação ao sham.',
        'C4A mede primariamente estado obsoleto; atraso, substituição e supressão de evidência não são discriminados.',
        'C4F pode combinar fragmentação relacional, proximidade, custo de busca e esforço de integração.',
        'O prompt induz reconstrução estruturada e pode interagir com C3.',
        'O isomorfismo entre instâncias limita validade externa.',
        'O operador ou custodiante não é cego.',
        'Não houve execução, revisão cega humana ou teste de concordância das rubricas.',
        'O fixture testa uma operacionalização sintética e não confirma a TPC.'
    )
    files = @($entries)
}

$json = $manifest | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($manifestPath, ($json -replace "`r`n", "`n") + "`n", $utf8NoBom)
Write-Output "MANIFEST_UPDATED files=$($entries.Count) version=0.2.0-frozen"
