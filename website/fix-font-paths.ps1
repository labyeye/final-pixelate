# Fix relative paths for HTML files in subdirectories

# Get all HTML files in subdirectories (not in root)
$subdirFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse | Where-Object { $_.DirectoryName -ne (Get-Location).Path }

$count = 0
foreach ($file in $subdirFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Count how many parent directories we need to go up
    $depth = ($file.DirectoryName -replace [regex]::Escape((Get-Location).Path), '').Split([System.IO.Path]::DirectorySeparatorChar) | Where-Object { $_ -ne '' } | Measure-Object | Select-Object -ExpandProperty Count
    
    # Create the relative path
    $relativePath = '../' * $depth + 'assets/fonts/all.min.css'
    
    # Replace only if file contains our local font-awesome path
    if ($content -like '*./assets/fonts/all.min.css*') {
        $newContent = $content -replace '\./assets/fonts/all\.min\.css', $relativePath
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        $count++
        Write-Host "Fixed: $($file.FullName) -> $relativePath"
    }
}

Write-Host "Total subdirectory files fixed: $count"
