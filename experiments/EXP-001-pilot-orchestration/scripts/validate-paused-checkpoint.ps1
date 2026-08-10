$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$repoRoot = (Resolve-Path (Join-Path $root '..\..')).Path
$fixtureRoot = Join-Path $repoRoot 'experiments\EXP-001-reconstruction-boundaries'
$errors = [Collections.Generic.List[string]]::new()
function Fail([string]$message) { $errors.Add($message) }

$commit = '90bc761c75fe8f75194eee2bb33b508af4481df7'
if ((git -C $repoRoot rev-list -n 1 exp-001-fixture-v0.2.0-frozen).Trim() -ne $commit) { Fail 'Tag frozen divergente.' }
if (@(git -C $repoRoot diff --name-only -- experiments/EXP-001-reconstruction-boundaries).Count -ne 0) { Fail 'Fixture frozen modificado.' }
& (Join-Path $fixtureRoot 'scripts\validate-fixture.ps1') | ForEach-Object { Write-Output $_ }
if ($LASTEXITCODE -ne 0) { Fail 'Fixture invalido.' }

$plan = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'execution-plan.json') | ConvertFrom-Json
if (@($plan.runs).Count -ne 30) { Fail 'Plano nao possui 30 runs.' }
if (@($plan.runs | Where-Object status -ne 'planned_not_started').Count -ne 0) { Fail 'Plano possui run iniciado.' }

$run1 = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'ledger\RUN-001\operational-record.json') | ConvertFrom-Json
if ($run1.operational_status -ne 'blocked_preflight_stop6_not_started' -or $run1.started -ne $false -or $run1.sent_to_receiver -ne $false) { Fail 'RUN-001 historico divergente.' }
if (Test-Path -LiteralPath (Join-Path $root 'prepared\RUN-001R1')) { Fail 'RUN-001R1 nao deveria existir.' }

foreach ($name in @('runs','outputs','results','future-evaluator-packages')) {
    if (Test-Path -LiteralPath (Join-Path $fixtureRoot $name)) { Fail "Artefato experimental no fixture: $name" }
    if (Test-Path -LiteralPath (Join-Path $root $name)) { Fail "Artefato experimental na orquestracao: $name" }
}

foreach ($manifestRelative in @('e2-sandbox\evidence-manifest.json','orchestration-manifest.json')) {
    $manifestPath = Join-Path $root $manifestRelative
    $manifestRoot = Split-Path -Parent $manifestPath
    $manifest = Get-Content -Raw -Encoding UTF8 $manifestPath | ConvertFrom-Json
    foreach ($entry in $manifest.files) {
        $path = Join-Path $manifestRoot $entry.path
        if (-not (Test-Path -LiteralPath $path)) { Fail "Referencia ausente: $manifestRelative/$($entry.path)"; continue }
        $hash = (Get-FileHash $path -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($hash -ne $entry.sha256) { Fail "Hash divergente: $manifestRelative/$($entry.path)" }
    }
}

if ($errors.Count -gt 0) {
    $errors | ForEach-Object { Write-Error $_ }
    exit 1
}
Write-Output 'PAUSED_CHECKPOINT_OK planned=30 started=0 completed=0 outputs=0 fixture_diff=0 e2=E2-F0'
