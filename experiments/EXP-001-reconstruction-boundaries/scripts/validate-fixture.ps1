$ErrorActionPreference = 'Stop'

$fixtureRoot = Split-Path -Parent $PSScriptRoot
$instancesRoot = Join-Path $fixtureRoot 'instances'
$requiredTruthFields = @('id','statement','value','temporal_version','role','class','criticality','observability','dependencies','related_actions','justification','tolerances','predicted_errors')
$requiredConditions = @('C2.md','C3.md','C3-sham.md','C4-A.md','C4-F.md')
$allowedActionClasses = @('obrigatoria','aceitavel','aceitavel_posterior','proibida','indiferente')
$allIds = [System.Collections.Generic.HashSet[string]]::new()
$errors = [System.Collections.Generic.List[string]]::new()

function Add-Error([string]$message) { $errors.Add($message) }
function Read-Json([string]$path) { Get-Content -LiteralPath $path -Raw -Encoding UTF8 | ConvertFrom-Json }

Get-ChildItem -LiteralPath $fixtureRoot -Recurse -Filter '*.json' | ForEach-Object {
    try { $null = Read-Json $_.FullName }
    catch { Add-Error "JSON inválido: $($_.FullName): $($_.Exception.Message)" }
}

$instanceDirs = @(Get-ChildItem -LiteralPath $instancesRoot -Directory)
if ($instanceDirs.Count -ne 3) { Add-Error "Esperadas 3 instâncias; encontradas $($instanceDirs.Count)." }

foreach ($dir in $instanceDirs) {
    foreach ($name in @('task.md','truth.json','actions.json','manipulation-checks.json','proposition-matrix.md')) {
        if (-not (Test-Path -LiteralPath (Join-Path $dir.FullName $name))) { Add-Error "Ausente em $($dir.Name): $name" }
    }
    foreach ($name in $requiredConditions) {
        if (-not (Test-Path -LiteralPath (Join-Path $dir.FullName "conditions\$name"))) { Add-Error "Condição ausente em $($dir.Name): $name" }
    }

    $truth = Read-Json (Join-Path $dir.FullName 'truth.json')
    $actions = Read-Json (Join-Path $dir.FullName 'actions.json')
    $checks = Read-Json (Join-Path $dir.FullName 'manipulation-checks.json')
    $actionIds = @($actions.actions.id)

    foreach ($p in $truth.propositions) {
        foreach ($field in $requiredTruthFields) {
            if ($null -eq $p.PSObject.Properties[$field]) { Add-Error "Campo truth ausente: $($truth.instance_id)/$($p.id)/$field" }
        }
        if (-not $allIds.Add([string]$p.id)) { Add-Error "ID duplicado: $($p.id)" }
        foreach ($actionId in $p.related_actions) {
            if ($actionId -notin $actionIds) { Add-Error "Ação referenciada inexistente: $($p.id) -> $actionId" }
        }
    }

    if (@($truth.propositions | Where-Object { $_.role -like 'necess*' }).Count -eq 0) { Add-Error "Sem proposição necessária: $($dir.Name)" }
    if (@($truth.propositions | Where-Object role -eq 'irrelevante').Count -eq 0) { Add-Error "Sem proposição irrelevante: $($dir.Name)" }
    if (@($truth.propositions | Where-Object role -eq 'proibida').Count -eq 0) { Add-Error "Sem proposição proibida: $($dir.Name)" }

    if (-not $actions.first_material_action_definition) { Add-Error "Definição de primeira ação material ausente: $($dir.Name)" }
    if (@($actions.semantic_classes).Count -eq 0) { Add-Error "Classes semânticas ausentes: $($dir.Name)" }
    foreach ($semanticClass in $actions.semantic_classes) {
        foreach ($field in @('id','class','equivalent_formulations','preconditions','justification','first_action_status','adjudication_rule')) {
            if ($null -eq $semanticClass.PSObject.Properties[$field]) { Add-Error "Campo de classe semântica ausente: $($dir.Name)/$($semanticClass.id)/$field" }
        }
        if (@($semanticClass.equivalent_formulations).Count -lt 2) { Add-Error "Equivalências insuficientes: $($semanticClass.id)" }
        if ($semanticClass.first_action_status -notin $allowedActionClasses) { Add-Error "Status semântico inválido: $($semanticClass.id)" }
    }
    if (@($actions.semantic_classes | Where-Object first_action_status -eq 'obrigatoria').Count -ne 1) { Add-Error "Classe obrigatória deve ser única: $($dir.Name)" }
    if (@($actions.actions | Where-Object classification -eq 'obrigatoria').Count -ne 1) { Add-Error "Primeira ação obrigatória deve ser única: $($dir.Name)" }
    if (@($actions.actions | Where-Object classification -eq 'proibida').Count -eq 0) { Add-Error "Sem ação proibida: $($dir.Name)" }
    foreach ($a in $actions.actions) {
        if ($a.classification -notin $allowedActionClasses) { Add-Error "Classe de ação inválida: $($a.id)/$($a.classification)" }
        if ($a.semantic_class_id -and $a.semantic_class_id -notin @($actions.semantic_classes.id)) { Add-Error "Classe semântica inexistente: $($a.id)" }
    }

    if (@($checks.checks).Count -ne 2) { Add-Error "Esperados dois manipulation checks: $($dir.Name)" }
    $c4a = @($checks.checks | Where-Object condition -eq 'C4A')
    $c4f = @($checks.checks | Where-Object condition -eq 'C4F')
    if ($c4a.Count -ne 1 -or $c4f.Count -ne 1) { Add-Error "Manipulações incorretas: $($dir.Name)" }
    elseif ($c4a[0].primary_interpretation -ne 'estado_obsoleto') { Add-Error "C4A não reinterpretada como estado obsoleto: $($dir.Name)" }
}

$conditionFiles = @(Get-ChildItem -LiteralPath $instancesRoot -Recurse -Filter '*.md' | Where-Object { $_.Directory.Name -eq 'conditions' })
if ($conditionFiles.Count -ne 15) { Add-Error "Esperados 15 arquivos de condição; encontrados $($conditionFiles.Count)." }

$mapPath = Join-Path $fixtureRoot 'packages\audit-map.json'
$packageManifestPath = Join-Path $fixtureRoot 'packages\receiver-package-manifest.json'
if (-not (Test-Path -LiteralPath $mapPath)) { Add-Error 'Mapa interno de pacotes ausente.' }
if (-not (Test-Path -LiteralPath $packageManifestPath)) { Add-Error 'Manifesto dos pacotes receptor-visible ausente.' }
if ((Test-Path -LiteralPath $mapPath) -and (Test-Path -LiteralPath $packageManifestPath)) {
    $map = Read-Json $mapPath
    $packageManifest = Read-Json $packageManifestPath
    if (@($map.mappings).Count -ne 15) { Add-Error "Esperados 15 mapeamentos; encontrados $(@($map.mappings).Count)." }
    if (@($packageManifest.packages).Count -ne 15) { Add-Error "Esperados 15 pacotes; encontrados $(@($packageManifest.packages).Count)." }
    if ($map.fixture_version -ne $packageManifest.fixture_version) { Add-Error 'Versões do mapa e manifesto de pacotes divergem.' }

    $forbiddenPatterns = @(
        '(?i)(?<![A-Za-z0-9])C2(?![A-Za-z0-9])',
        '(?i)(?<![A-Za-z0-9])C3(?![A-Za-z0-9])',
        '(?i)C3[- ]?sham',
        '(?i)C4[- ]?[AF]',
        '(?i)I0[1-3]-P\d{2}',
        '(?i)\b(invent.rio|manipula..o|deforma..o|target_error|condition_id|TPC|TCA)\b'
    )
    foreach ($entry in $packageManifest.packages) {
        $packagePath = Join-Path $fixtureRoot $entry.path
        if (-not (Test-Path -LiteralPath $packagePath)) { Add-Error "Pacote ausente: $($entry.path)"; continue }
        $actualHash = (Get-FileHash -LiteralPath $packagePath -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($actualHash -ne $entry.sha256) { Add-Error "Hash divergente: $($entry.path)" }
        $text = Get-Content -LiteralPath $packagePath -Raw -Encoding UTF8
        foreach ($pattern in $forbiddenPatterns) {
            if ($text -match $pattern) { Add-Error "Conteúdo proibido em pacote receptor-visible: $($entry.path) / $pattern" }
        }
    }
}

$evaluatorTemplatePath = Join-Path $fixtureRoot 'packages\evaluator-template.json'
if (-not (Test-Path -LiteralPath $evaluatorTemplatePath)) { Add-Error 'Template cego do avaliador ausente.' }
else {
    $evaluatorText = Get-Content -LiteralPath $evaluatorTemplatePath -Raw -Encoding UTF8
    foreach ($term in @('condition_id','target_error','deformation','hypothesis','C3-sham','C4-A','C4-F')) {
        if ($evaluatorText -match [regex]::Escape($term)) { Add-Error "Conteúdo proibido no pacote do avaliador: $term" }
    }
}

$manifestPath = Join-Path $fixtureRoot 'manifest\fixture-manifest.json'
if (Test-Path -LiteralPath $manifestPath) {
    $manifest = Read-Json $manifestPath
    foreach ($entry in $manifest.files) {
        $path = Join-Path $fixtureRoot $entry.path
        if (-not (Test-Path -LiteralPath $path)) { Add-Error "Referência ausente no manifesto: $($entry.path)"; continue }
        $actual = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($actual -ne $entry.sha256) { Add-Error "Hash de manifesto divergente: $($entry.path)" }
    }
}

$forbiddenRealTerms = @('Dirceu Engenharia','Galpão Quádruplo do Domingos','Galpão do Fábio','canteirodeobrasdigital@gmail.com','slekdeitzlive@gmail.com')
foreach ($file in Get-ChildItem -LiteralPath $fixtureRoot -Recurse -File) {
    if ($file.FullName -eq $PSCommandPath) { continue }
    $text = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    foreach ($term in $forbiddenRealTerms) {
        if ($text.Contains($term)) { Add-Error "Possível dado real em $($file.FullName): $term" }
    }
}

foreach ($forbiddenDirectory in @('runs','outputs','results','future-evaluator-packages')) {
    if (Test-Path -LiteralPath (Join-Path $fixtureRoot $forbiddenDirectory)) { Add-Error "Diretório de execução não deve existir: $forbiddenDirectory" }
}

$repoRoot = (Resolve-Path (Join-Path $fixtureRoot '..\..')).Path
$trackedOutside = @(git -C $repoRoot diff --name-only -- . ":(exclude)experiments/EXP-001-reconstruction-boundaries/**")
if ($trackedOutside.Count -gt 0) { Add-Error "Arquivo rastreado alterado fora do EXP-001: $($trackedOutside -join ', ')" }

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "VALIDATION_OK instances=$($instanceDirs.Count) conditions=$($conditionFiles.Count) proposition_ids=$($allIds.Count) receiver_packages=15 semantic_graphs=3 executions=0"
