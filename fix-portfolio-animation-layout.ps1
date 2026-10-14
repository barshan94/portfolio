$ErrorActionPreference = "Stop"

$project = "C:\Users\Barshan\Documents\portfolio"
$indexPath = Join-Path $project "src\pages\index.astro"
$componentPath = Join-Path $project "src\components\MoneyCalculatorTransition.astro"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"

if (-not (Test-Path $indexPath)) { throw "Could not find $indexPath" }
if (-not (Test-Path $componentPath)) { throw "Could not find $componentPath" }

Copy-Item $indexPath "$indexPath.before-animation-layout-fix-$stamp.bak"
Copy-Item $componentPath "$componentPath.before-animation-layout-fix-$stamp.bak"

# Remove the old dashboard mockup, matching the complete nested div block safely.
$indexText = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$marker = '<div class="flagship-visual">'
$start = $indexText.IndexOf($marker)
if ($start -ge 0) {
    $tokens = [regex]::Matches($indexText.Substring($start), '(?is)</?div\b[^>]*>')
    $depth = 0
    $end = -1
    foreach ($token in $tokens) {
        if ($token.Value -match '(?is)^</div') {
            $depth--
        } else {
            $depth++
        }
        if ($depth -eq 0) {
            $end = $start + $token.Index + $token.Length
            break
        }
    }
    if ($end -lt 0) { throw "Could not safely identify the end of the old dashboard mockup. No source changes were written." }
    $indexText = $indexText.Substring(0, $start) + $indexText.Substring($end)
} else {
    Write-Host "Old dashboard mockup already removed; keeping that change." -ForegroundColor Yellow
}

# With the mockup gone, let the text content use the full card width.
$cardAnchor = $indexText.IndexOf(".flagship-card {")
if ($cardAnchor -ge 0) {
    $gridAnchor = $indexText.IndexOf("grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);", $cardAnchor)
    if ($gridAnchor -ge 0) {
        $oldGrid = "grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);"
        $newGrid = "grid-template-columns: minmax(0, 1fr);"
        $indexText = $indexText.Substring(0, $gridAnchor) + $newGrid + $indexText.Substring($gridAnchor + $oldGrid.Length)
    }
}
[System.IO.File]::WriteAllText($indexPath, $indexText, [System.Text.UTF8Encoding]::new($false))

# Repair mojibake from the first generated component and tighten the responsive layout.
$component = [System.IO.File]::ReadAllText($componentPath, [System.Text.Encoding]::UTF8)
$replacements = [ordered]@{
    'DEMO DATA Â· BDT' = 'DEMO DATA / BDT'
    '+à§³42,000' = '+42,000'
    '+à§³6,500' = '+6,500'
    'âˆ’à§³12,800' = '-12,800'
    'à§³8,000' = '8,000'
    '+à§³2,000' = '+2,000'
    'SYNCED âœ“' = 'SYNCED'
    '<strong>à§³</strong>' = '<strong>MC</strong>'
    'à§³<span class="mc-counter">' = 'BDT <span class="mc-counter">'
    'â— ENTRIES RECONCILED' = 'ENTRIES RECONCILED'
    'LEDGER â†’ BALANCE' = 'LEDGER TO BALANCE'
    'ILLUSTRATIVE ANIMATION' = 'ILLUSTRATIVE ANIMATION'
    'â†» Replay' = 'Replay'
    'â…¡ Pause' = 'Pause'
    'â–¶ Resume' = 'Resume'
    'â€” not live account data.' = '; not live account data.'
    'â— <span class="mc-phase-text">' = '<span class="mc-phase-text">'
    'pause.textContent="â†» Replay"' = 'pause.textContent="Replay"'
    'pause.textContent="â…¡ Pause"' = 'pause.textContent="Pause"'
    'pause.textContent="â–¶ Resume"' = 'pause.textContent="Resume"'
}
foreach ($pair in $replacements.GetEnumerator()) {
    $component = $component.Replace($pair.Key, $pair.Value)
}

# Append scoped overrides before the component's closing style tag.
$overrideMarker = "/* Responsive overlap and sizing fix */"
if (-not $component.Contains($overrideMarker)) {
    $override = @'
/* Responsive overlap and sizing fix */
.mc-transition{max-width:100%;min-width:0}
.mc-stage{min-height:420px}
.mc-ledger{left:3%;width:29%;max-width:340px}
.mc-engine{left:49%;width:min(29%,260px)}
.mc-title{top:14%;right:3%;width:30%;text-align:right}
.mc-title>strong{font-size:clamp(1.8rem,4.3vw,4.2rem);overflow-wrap:anywhere}
.mc-balance{right:3%;bottom:13%;width:27%;max-width:310px}
.mc-topline,.mc-controls{min-width:0}
@media(max-width:760px){
  .mc-stage{min-height:470px;aspect-ratio:auto}
  .mc-ledger{top:13%;left:3%;width:47%;padding:9px}
  .mc-title{top:13%;right:3%;width:43%}
  .mc-title>strong{font-size:clamp(1.5rem,6vw,2.7rem)}
  .mc-title>p{max-width:180px;font-size:.62rem}
  .mc-engine{top:59%;left:25%;width:38%}
  .mc-balance{right:3%;bottom:11%;width:42%;padding:10px}
  .mc-row{font-size:.47rem}
}
@media(max-width:440px){
  .mc-stage{min-height:480px}
  .mc-topline,.mc-controls{padding-inline:9px;font-size:.49rem}
  .mc-ledger{top:14%;left:3%;width:47%;padding:7px}
  .mc-ledger>p{font-size:.46rem}
  .mc-row{grid-template-columns:4px minmax(0,1fr) auto;gap:4px;padding:8px 0;font-size:.41rem}
  .mc-ledger>small{font-size:.37rem}
  .mc-title{top:14%;right:3%;width:43%}
  .mc-title>small{font-size:.4rem}
  .mc-title>strong{font-size:clamp(1.3rem,6.3vw,1.8rem);letter-spacing:-.07em}
  .mc-title>p{font-size:.52rem;line-height:1.4}
  .mc-engine{top:62%;left:24%;width:37%}
  .mc-balance{right:3%;bottom:10%;width:43%;padding:8px}
  .mc-balance>strong{font-size:1rem}
  .mc-controls button{min-height:30px;padding-inline:7px;font-size:.53rem}
  .mc-note{padding-inline:9px;font-size:.52rem}
  .mc-corner{font-size:.36rem}
}
'@
    $styleEnd = $component.LastIndexOf("</style>")
    if ($styleEnd -lt 0) { throw "Could not find the component style closing tag. No component changes were written." }
    $component = $component.Substring(0, $styleEnd) + $override + "`r`n" + $component.Substring($styleEnd)
}
[System.IO.File]::WriteAllText($componentPath, $component, [System.Text.UTF8Encoding]::new($false))

Write-Host ""
Write-Host "Applied fixes:" -ForegroundColor Green
Write-Host "  - Removed the redundant dashboard mockup."
Write-Host "  - Expanded the featured project card to one column."
Write-Host "  - Repaired broken currency/symbol text where it was corrupted."
Write-Host "  - Added responsive spacing overrides to reduce animation overlap."
Write-Host ""
Write-Host "Backups created with timestamp: $stamp"
Write-Host "Next run: cd C:\Users\Barshan\Documents\portfolio; npm run build"
