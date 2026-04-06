# Extract all Font Awesome icons used in HTML files

$usedIcons = @{}

# Get all HTML files
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse -ErrorAction SilentlyContinue

Write-Host "Scanning HTML files for Font Awesome icons..."

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    
    # Match patterns like: fa-chevron-down, fa-arrow-right, etc.
    # Pattern covers: fa-icon-name (handles multi-word icons with hyphens)
    if ($content -match 'fa-[\w-]+') {
        $matches = [regex]::Matches($content, 'fa-([\w-]+)')
        foreach ($match in $matches) {
            $iconName = $match.Groups[1].Value
            if ($usedIcons.ContainsKey($iconName)) {
                $usedIcons[$iconName]++
            } else {
                $usedIcons[$iconName] = 1
            }
        }
    }
}

Write-Host "Found $($usedIcons.Count) unique icons"
Write-Host "`nUsed Icons:"
$usedIcons.GetEnumerator() | Sort-Object -Property Value -Descending | ForEach-Object {
    Write-Host "  fa-$($_.Key) (used $($_.Value) times)"
}

# Save to file
$usedIcons.Keys | ForEach-Object { "fa-$_" } | Sort-Object | Set-Content "used-icons.txt"
Write-Host "`nUsed icons saved to: used-icons.txt"
