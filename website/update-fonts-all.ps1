# Replace CDN Font Awesome links with local fonts in all HTML files

$pattern = 'href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.5\.1/css/all\.min\.css"'
$replacement = 'href="./assets/fonts/all.min.css"'

# Get all HTML files recursively
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse

$count = 0
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match $pattern) {
        $newContent = $content -replace $pattern, $replacement
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        $count++
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Total files updated: $count"
