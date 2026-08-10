$ErrorActionPreference = 'Stop'

$orchestrationRoot = Split-Path -Parent $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $orchestrationRoot '..\..')).Path
$fixtureRoot = Join-Path $repoRoot 'experiments\EXP-001-reconstruction-boundaries'
$errors = [Collections.Generic.List[string]]::new()
function Fail([string]$message) { $errors.Add($message) }

$expectedCommit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
$tag = 'exp-001-fixture-v0.2.0-frozen'
$tagCommit = (git -C $repoRoot rev-list -n 1 $tag).Trim()
if ($tagCommit -ne $expectedCommit) { Fail "Tag aponta para commit inesperado: $tagCommit" }
if ((git -C $repoRoot rev-parse HEAD).Trim() -ne $expectedCommit) { Fail 'HEAD nao corresponde ao fixture congelado.' }
if (@(git -C $repoRoot diff --name-only -- 'experiments/EXP-001-reconstruction-boundaries').Count -ne 0) { Fail 'Fixture possui alteracao local.' }
if (@(git -C $repoRoot diff --cached --name-only -- 'experiments/EXP-001-reconstruction-boundaries').Count -ne 0) { Fail 'Fixture possui staging local.' }

& (Join-Path $fixtureRoot 'scripts\validate-fixture.ps1') | ForEach-Object { Write-Output $_ }
if ($LASTEXITCODE -ne 0) { Fail 'Validador congelado falhou.' }

$planPath = Join-Path $orchestrationRoot 'execution-plan.json'
$mapPath = Join-Path $orchestrationRoot 'randomization\condition-map.json'
$envPath = Join-Path $orchestrationRoot 'protocol\environment-manifest.json'
foreach ($path in @($planPath,$mapPath,$envPath)) { if (-not (Test-Path -LiteralPath $path)) { Fail "Artefato ausente: $path" } }

if ($errors.Count -eq 0) {
    $plan = Get-Content -LiteralPath $planPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $map = Get-Content -LiteralPath $mapPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $environment = Get-Content -LiteralPath $envPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if (@($plan.runs).Count -ne 30) { Fail 'Plano nao possui 30 runs.' }
    if (@($plan.runs.run_id | Sort-Object -Unique).Count -ne 30) { Fail 'run_id duplicado.' }
    if (@($plan.runs.receiver_session_id | Sort-Object -Unique).Count -ne 30) { Fail 'Sessao reutilizada.' }
    if (@($plan.runs | Where-Object status -ne 'planned_not_started').Count -ne 0) { Fail 'Existe run iniciado.' }
    if (@($map.mappings).Count -ne 15) { Fail 'Mapa nao possui 15 celulas.' }
    if (@($map.mappings.condition_id | Sort-Object -Unique) -join ',' -ne 'C2,C3,C3S,C4A,C4F') { Fail 'Condicoes reais divergentes.' }
    foreach ($mapping in $map.mappings) {
        $cells = @($plan.runs | Where-Object { $_.opaque_condition_id -eq $mapping.opaque_condition_id -and $_.instance_id -eq $mapping.instance_id })
        if ($cells.Count -ne 2) { Fail "Celula sem duas repeticoes: $($mapping.package_id)" }
        $pkg = Join-Path $fixtureRoot $mapping.package_path
        $actualHash = (Get-FileHash -LiteralPath $pkg -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($actualHash -ne $mapping.package_hash) { Fail "Hash de pacote divergente: $($mapping.package_id)" }
    }
    $mapHash = (Get-FileHash -LiteralPath $mapPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($mapHash -ne $plan.condition_map_hash) { Fail 'Hash do mapa divergente.' }
    $seedHash = (Get-FileHash -LiteralPath (Join-Path $orchestrationRoot 'randomization\seed.txt') -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($seedHash -ne $plan.seed_hash -or $seedHash -ne $map.seed_hash) { Fail 'Hash da seed divergente.' }
    $environmentHash = (Get-FileHash -LiteralPath $envPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if (@($plan.runs | Where-Object environment_hash -ne $environmentHash).Count -ne 0) { Fail 'Hash de ambiente divergente no plano.' }
    if ($environment.product -ne 'Codex' -or $environment.model_family -ne 'GPT-5') { Fail 'Executor nao fixado conforme plano.' }
    if (@($environment.authorized_tools).Count -ne 0) { Fail 'Ferramentas deveriam estar desabilitadas.' }
}

$preRunPath = Join-Path $orchestrationRoot 'prepared\first-run\pre-run.json'
if (-not (Test-Path -LiteralPath $preRunPath)) { Fail 'Primeiro pre-run ausente.' }
else {
    $pre = Get-Content -LiteralPath $preRunPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $promptCopy = Join-Path $orchestrationRoot 'prepared\first-run\prompt.md'
    $recordCopy = Join-Path $orchestrationRoot 'prepared\first-run\record.md'
    if ((Get-FileHash $promptCopy -Algorithm SHA256).Hash.ToLowerInvariant() -ne $pre.prompt_copy_hash) { Fail 'Copia do prompt divergente.' }
    if ((Get-FileHash $recordCopy -Algorithm SHA256).Hash.ToLowerInvariant() -ne $pre.record_copy_hash) { Fail 'Copia do pacote divergente.' }
    $bundlePath = Join-Path $orchestrationRoot 'prepared\first-run\input-bundle.json'
    if ((Get-FileHash $bundlePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $pre.exact_input_hash) { Fail 'Bundle exato de input divergente.' }
    if ($pre.executor_profile_hash -ne (Get-FileHash $envPath -Algorithm SHA256).Hash.ToLowerInvariant()) { Fail 'Perfil de executor divergente no pre-run.' }
    if ($pre.sent_to_receiver -ne $false) { Fail 'Primeira execucao marcada como enviada.' }
}

foreach ($root in @($fixtureRoot,$orchestrationRoot)) {
    foreach ($name in @('runs','outputs','results','future-evaluator-packages')) {
        if (Test-Path -LiteralPath (Join-Path $root $name)) { Fail "Artefato pos-execucao presente: $root/$name" }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output 'PREFLIGHT_OK_WITH_LIMITATION runs=30 sessions=30 executions=0'
Write-Output 'LIMITATION model_version_not_exposed provider_independence_unverified tool_free_session_unverified'
