# Remove unused Font Awesome icons from CSS - Handles multi-line format

Write-Host "Reading used icons list..."
$usedIcons = @()
if (Test-Path "used-icons.txt") {
    $usedIcons = @(Get-Content "used-icons.txt" | Where-Object { $_ -ne "" } | ForEach-Object { $_ -replace 'fa-', '' })
} else {
    Write-Host "Error: used-icons.txt not found"
    exit
}

Write-Host "Found $($usedIcons.Count) used icons"

Write-Host "Loading CSS file..."
$cssPath = "assets\fonts\all.min.css"
$cssBefore = (Get-Item $cssPath).Length / 1024

$css = Get-Content $cssPath -Raw

# Find all icon rule blocks: .fa-name:before,... { content: "..."; }
# This regex captures multi-line definitions
$iconPattern = '\.fa-(?:[a-z0-9\-]+)(?:\s*,\s*\.fa-[a-z0-9\-]+)*\s*:before\s*\{\s*content:\s*"[^"]*";\s*\}'

$allMatches = [regex]::Matches($css, $iconPattern, [Text.RegularExpressions.RegexOptions]::Multiline)

Write-Host "Total icon rules found: $($allMatches.Count)"

$toRemove = 0
$toKeep = 0

foreach ($match in $allMatches) {
    $rule = $match.Value
    # Check if ANY of the icon names in this rule are in our used list
    $isUsed = $false
    
    foreach ($icon in $usedIcons) {
        if ($rule -match "fa-$icon(?:[,\s:]|:before)") {
            $isUsed = $true
            break
        }
    }
    
    if ($isUsed) {
        $toKeep++
    } else {
        $toRemove++
    }
}

Write-Host "Icon rules to KEEP: $toKeep"
Write-Host "Icon rules to REMOVE: $toRemove"

if ($toRemove -eq 0) {
    Write-Host "No unused icons found. CSS is already optimized."
} else {
    Write-Host "Removing unused icons..."
    $newCss = $css
    $removed = 0
    
    foreach ($match in $allMatches) {
        $rule = $match.Value
        $isUsed = $false
        
        foreach ($icon in $usedIcons) {
            if ($rule -match "fa-$icon(?:[,\s:]|:before)") {
                $isUsed = $true
                break
            }
        }
        
        if (-not $isUsed) {
            # Remove the rule AND the following newline if present
            $newCss = $newCss -replace ([regex]::Escape($rule) + "[\r\n]*"), ""
            $removed++
        }
    }
    
    Set-Content -Path $cssPath -Value $newCss -Encoding UTF8
    
    $cssAfter = (Get-Item $cssPath).Length / 1024
    $savedKB = [math]::Round($cssBefore - $cssAfter, 2)
    $savedPercent = [math]::Round((($cssBefore - $cssAfter) / $cssBefore) * 100, 1)
    
    Write-Host "`nCSS Optimization Complete:"
    Write-Host "  Before: $([math]::Round($cssBefore, 2)) KB"
    Write-Host "  After:  $([math]::Round($cssAfter, 2)) KB"
    Write-Host "  Saved:  $savedKB KB ($savedPercent% reduction)"
    Write-Host "  Removed: $removed unused icon rules"
}
