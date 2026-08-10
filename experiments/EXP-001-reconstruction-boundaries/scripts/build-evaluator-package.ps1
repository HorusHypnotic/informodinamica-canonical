param(
    [Parameter(Mandatory=$true)][string]$OpaqueExecutionId,
    [Parameter(Mandatory=$true)][string]$RawOutputPath,
    [Parameter(Mandatory=$true)][string]$OpaqueScoringKeyRef,
    [Parameter(Mandatory=$true)][string]$DestinationPath
)

$ErrorActionPreference = 'Stop'
$fixtureRoot = Split-Path -Parent $PSScriptRoot
$resolvedDestination = [System.IO.Path]::GetFullPath($DestinationPath)
$allowedRoot = [System.IO.Path]::GetFullPath((Join-Path $fixtureRoot 'future-evaluator-packages'))
if (-not $resolvedDestination.StartsWith($allowedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'O pacote do avaliador deve ser materializado somente em future-evaluator-packages após autorização de execução.'
}
if ($OpaqueExecutionId -notmatch '^[A-Z0-9-]+$') { throw 'Identificador opaco inválido.' }
if (-not (Test-Path -LiteralPath $RawOutputPath)) { throw 'Output bruto ausente.' }

$package = [ordered]@{
    opaque_execution_id = $OpaqueExecutionId
    raw_output = Get-Content -LiteralPath $RawOutputPath -Raw -Encoding UTF8
    reconstruction_rubric_ref = 'protocol/reconstruction-rubric.md'
    first_action_rubric_ref = 'protocol/first-action-rubric.md'
    semantic_equivalence_ref = $OpaqueScoringKeyRef
    package_version = '1.0.0-candidate'
}

$json = $package | ConvertTo-Json -Depth 8
$forbidden = @('condition_id','target_error','C3-sham','C4-A','C4-F','TPC','TCA')
foreach ($term in $forbidden) {
    if ($json -match [regex]::Escape($term)) { throw "Conteúdo proibido no pacote do avaliador: $term" }
}

$directory = Split-Path -Parent $resolvedDestination
if (-not (Test-Path -LiteralPath $directory)) { $null = New-Item -ItemType Directory -Path $directory }
[System.IO.File]::WriteAllText($resolvedDestination, ($json -replace "`r`n", "`n") + "`n", [System.Text.UTF8Encoding]::new($false))
Write-Output "EVALUATOR_PACKAGE_OK id=$OpaqueExecutionId"
