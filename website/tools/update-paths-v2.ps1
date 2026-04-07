# update-paths-v2.ps1 — Full restructure path updates
$w = "c:\Users\labhb\Desktop\projects\final-pixelate\website"

# ============================================
# Common replacement maps
# ============================================

# Asset subfolder moves (assets/about/ -> assets/images/about/, etc.)
$assetSubfolderReplacements = @{
    'assets/about/'                       = 'assets/images/about/'
    'assets/brands/'                      = 'assets/images/brands/'
    'assets/cities/'                      = 'assets/images/cities/'
    'assets/digital/'                     = 'assets/images/digital/'
    'assets/homescreen/'                  = 'assets/images/homescreen/'
    'assets/industries/'                  = 'assets/images/industries/'
    'assets/services/'                    = 'assets/images/services/'
    'assets/product-software/'            = 'assets/images/products/'
    'assets/software-features/'           = 'assets/images/portfolio/'
    'assets/factory-management-images/'   = 'assets/images/factory-management-images/'
    'assets/school-crm-images/'           = 'assets/images/school-crm-images/'
    'assets/resumes/'                     = 'assets/docs/resumes/'
}

# JS renames
$jsReplacements = @{
    'js/index.js'       = 'js/main.js'
    'js/pixy-chatbot.js' = 'js/chatbot.js'
}

# Navigation absolute URL updates for pages moved to subfolders
# Service pages: old filename -> new path
$navReplacements = @{
    'pixelatenest.com/about.html'                  = 'pixelatenest.com/pages/about.html'
    'pixelatenest.com/contact.html'                = 'pixelatenest.com/pages/contact.html'
    'pixelatenest.com/careers.html'                = 'pixelatenest.com/pages/careers.html'
    'pixelatenest.com/pricing.html'                = 'pixelatenest.com/pages/pricing.html'
    'pixelatenest.com/technologies.html'           = 'pixelatenest.com/pages/technologies.html'
    'pixelatenest.com/product.html'                = 'pixelatenest.com/pages/product.html'
    'pixelatenest.com/webdev.html'                 = 'pixelatenest.com/services/web-development.html'
    'pixelatenest.com/app-dev.html'                = 'pixelatenest.com/services/app-development.html'
    'pixelatenest.com/software-dev.html'           = 'pixelatenest.com/services/software-development.html'
    'pixelatenest.com/video-ed.html'               = 'pixelatenest.com/services/video-editing.html'
    'pixelatenest.com/hosting-maintenance.html'    = 'pixelatenest.com/services/hosting-maintenance.html'
    'pixelatenest.com/detailed-services.html'      = 'pixelatenest.com/services/index.html'
    'pixelatenest.com/detailed-services-digital.html' = 'pixelatenest.com/services/digital-marketing.html'
    'pixelatenest.com/detailed-services-uiux.html' = 'pixelatenest.com/services/uiux-branding.html'
    'pixelatenest.com/blogs.html'                  = 'pixelatenest.com/blog/index.html'
    'pixelatenest.com/blog-post.html'              = 'pixelatenest.com/blog/post.html'
    'pixelatenest.com/industry-ecommerce.html'     = 'pixelatenest.com/industries/ecommerce.html'
    'pixelatenest.com/industry-education.html'     = 'pixelatenest.com/industries/education.html'
    'pixelatenest.com/industry-logistics.html'     = 'pixelatenest.com/industries/logistics.html'
    'pixelatenest.com/industry-manufacturing.html' = 'pixelatenest.com/industries/manufacturing.html'
    'pixelatenest.com/industry-realestate.html'    = 'pixelatenest.com/industries/real-estate.html'
    'pixelatenest.com/industry-travel.html'        = 'pixelatenest.com/industries/travel.html'
    'pixelatenest.com/industry-utilities.html'     = 'pixelatenest.com/industries/utilities.html'
    'pixelatenest.com/cookie-policy.html'          = 'pixelatenest.com/legal/cookie-policy.html'
    'pixelatenest.com/privacy-policy.html'         = 'pixelatenest.com/legal/privacy-policy.html'
    'pixelatenest.com/refund-policy.html'          = 'pixelatenest.com/legal/refund-policy.html'
    'pixelatenest.com/terms-of-service.html'       = 'pixelatenest.com/legal/terms-of-service.html'
    'pixelatenest.com/locations.html'              = 'pixelatenest.com/pages/locations.html'
    'pixelatenest.com/photography.html'            = 'pixelatenest.com/pages/photography.html'
    'pixelatenest.com/portfolio-details.html'      = 'pixelatenest.com/pages/portfolio-details.html'
    'pixelatenest.com/team-leadership.html'        = 'pixelatenest.com/pages/team-leadership.html'
    'pixelatenest.com/state.html'                  = 'pixelatenest.com/pages/state.html'
}

function Update-HtmlFile {
    param(
        [string]$FilePath,
        [hashtable]$Replacements
    )
    $content = Get-Content $FilePath -Raw -Encoding UTF8
    $changed = $false
    foreach ($key in $Replacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $Replacements[$key])
            $changed = $true
        }
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($FilePath, $content, [System.Text.UTF8Encoding]::new($false))
    }
    return $changed
}

$totalUpdated = 0

# ============================================
# PART 1: index.html and 404.html (stay at root)
# ============================================
Write-Host "Processing root files (index.html, 404.html)..."
$rootReplacements = @{}
# These files stay at root, so ./ paths remain ./ 
# But asset subfolders moved, JS renamed
foreach ($k in $assetSubfolderReplacements.Keys) { $rootReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $rootReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $rootReplacements[$k] = $navReplacements[$k] }

foreach ($f in @("$w\index.html", "$w\404.html")) {
    if (Test-Path $f) {
        if (Update-HtmlFile -FilePath $f -Replacements $rootReplacements) {
            $totalUpdated++
            Write-Host "  Updated: $(Split-Path $f -Leaf)"
        }
    }
}

# ============================================
# PART 2: pages/ (1 level deep — ./ becomes ../)
# ============================================
Write-Host "`nProcessing pages/ files..."
$pagesReplacements = @{
    'href="./css/'      = 'href="../css/'
    'href="css/'        = 'href="../css/'
    'src="./js/'        = 'src="../js/'
    'src="js/'          = 'src="../js/'
    'src="./assets/'    = 'src="../assets/'
    'href="./assets/'   = 'href="../assets/'
    'src="assets/'      = 'src="../assets/'
    'href="assets/'     = 'href="../assets/'
    'fetch("data/'      = 'fetch("../data/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $pagesReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $pagesReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $pagesReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\pages\*.html")) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $pagesReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

# ============================================
# PART 3: services/ (1 level deep — ./ becomes ../)
# ============================================
Write-Host "`nProcessing services/ files..."
$servicesReplacements = @{
    'href="./css/'      = 'href="../css/'
    'href="css/'        = 'href="../css/'
    'src="./js/'        = 'src="../js/'
    'src="js/'          = 'src="../js/'
    'src="./assets/'    = 'src="../assets/'
    'href="./assets/'   = 'href="../assets/'
    'src="assets/'      = 'src="../assets/'
    'href="assets/'     = 'href="../assets/'
    'fetch("data/'      = 'fetch("../data/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $servicesReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $servicesReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $servicesReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\services\*.html")) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $servicesReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

# ============================================
# PART 4: services/detailed/*/ (3 levels deep — ../../ becomes ../../../)
# ============================================
Write-Host "`nProcessing services/detailed/ files..."
$detailedReplacements = @{
    'href="../../css/'        = 'href="../../../css/'
    'src="../../js/'          = 'src="../../../js/'
    'src="../../assets/'      = 'src="../../../assets/'
    'href="../../assets/'     = 'href="../../../assets/'
    'fetch("../../data/'      = 'fetch("../../../data/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $detailedReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $detailedReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $detailedReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\services\detailed" -Filter "*.html" -Recurse)) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $detailedReplacements) {
        $totalUpdated++
        Write-Host "  Updated: detailed/$($f.Directory.Name)/$($f.Name)"
    }
}

# ============================================
# PART 5: industries/ (1 level deep — ./ becomes ../)
# ============================================
Write-Host "`nProcessing industries/ files..."
$indReplacements = @{
    'href="./css/'      = 'href="../css/'
    'href="css/'        = 'href="../css/'
    'src="./js/'        = 'src="../js/'
    'src="js/'          = 'src="../js/'
    'src="./assets/'    = 'src="../assets/'
    'href="./assets/'   = 'href="../assets/'
    'src="assets/'      = 'src="../assets/'
    'href="assets/'     = 'href="../assets/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $indReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $indReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $indReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\industries\*.html")) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $indReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

# ============================================
# PART 6: legal/ (1 level deep)
# ============================================
Write-Host "`nProcessing legal/ files..."
$legalReplacements = @{
    'href="./css/'      = 'href="../css/'
    'href="css/'        = 'href="../css/'
    'src="./js/'        = 'src="../js/'
    'src="js/'          = 'src="../js/'
    'src="./assets/'    = 'src="../assets/'
    'href="./assets/'   = 'href="../assets/'
    'src="assets/'      = 'src="../assets/'
    'href="assets/'     = 'href="../assets/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $legalReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $legalReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $legalReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\legal\*.html")) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $legalReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

# ============================================
# PART 7: blog/ (1 level deep)
# ============================================
Write-Host "`nProcessing blog/ files..."
$blogReplacements = @{
    'href="./css/'      = 'href="../css/'
    'href="css/'        = 'href="../css/'
    'src="./js/'        = 'src="../js/'
    'src="js/'          = 'src="../js/'
    'src="./assets/'    = 'src="../assets/'
    'href="./assets/'   = 'href="../assets/'
    'src="assets/'      = 'src="../assets/'
    'href="assets/'     = 'href="../assets/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $blogReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $blogReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $blogReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\blog\*.html")) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $blogReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

# ============================================
# PART 8: products/ (1 level deep, was already there)
# products/ files used ../ to reach root, that stays the same
# But asset subfolders, JS, and nav changed
# ============================================
Write-Host "`nProcessing products/ files..."
$prodReplacements = @{}
foreach ($k in $assetSubfolderReplacements.Keys) { $prodReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $prodReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $prodReplacements[$k] = $navReplacements[$k] }

foreach ($f in (Get-ChildItem "$w\products\*.html")) {
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $prodReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

# ============================================
# PART 9: locations/ (2 levels deep — was at root level, now 1 extra level)
# These files used ../css/ to reach root css. Now they need ../../css/
# ============================================
Write-Host "`nProcessing locations/ files..."
$locReplacements = @{
    'href="../css/'         = 'href="../../css/'
    'src="../js/'           = 'src="../../js/'
    'src="../assets/'       = 'src="../../assets/'
    'href="../assets/'      = 'href="../../assets/'
}
foreach ($k in $assetSubfolderReplacements.Keys) { $locReplacements[$k] = $assetSubfolderReplacements[$k] }
foreach ($k in $jsReplacements.Keys) { $locReplacements[$k] = $jsReplacements[$k] }
foreach ($k in $navReplacements.Keys) { $locReplacements[$k] = $navReplacements[$k] }

$locDirs = @("$w\locations\counter-billing-bihar", "$w\locations\factory-management-bihar", "$w\locations\school-crm-bihar")
foreach ($dir in $locDirs) {
    if (Test-Path $dir) {
        foreach ($f in (Get-ChildItem "$dir\*.html")) {
            if (Update-HtmlFile -FilePath $f.FullName -Replacements $locReplacements) {
                $totalUpdated++
            }
        }
        Write-Host "  Updated: $(Split-Path $dir -Leaf) ($(((Get-ChildItem "$dir\*.html").Count)) files)"
    }
}
# Also handle the single school-crm-muzaffarpur.html in locations/
if (Test-Path "$w\locations\school-crm-muzaffarpur.html") {
    $muzReplacements = @{
        'href="./css/'      = 'href="../css/'
        'href="css/'        = 'href="../css/'
        'src="./js/'        = 'src="../js/'
        'src="js/'          = 'src="../js/'
        'src="./assets/'    = 'src="../assets/'
        'href="./assets/'   = 'href="../assets/'
        'src="assets/'      = 'src="../assets/'
        'href="assets/'     = 'href="../assets/'
    }
    foreach ($k in $assetSubfolderReplacements.Keys) { $muzReplacements[$k] = $assetSubfolderReplacements[$k] }
    foreach ($k in $jsReplacements.Keys) { $muzReplacements[$k] = $jsReplacements[$k] }
    foreach ($k in $navReplacements.Keys) { $muzReplacements[$k] = $navReplacements[$k] }
    if (Update-HtmlFile -FilePath "$w\locations\school-crm-muzaffarpur.html" -Replacements $muzReplacements) {
        $totalUpdated++
        Write-Host "  Updated: school-crm-muzaffarpur.html"
    }
}

# ============================================
# PART 10: Remaining root files (pixy-test, pixy-chatbot-snippet, etc.)
# ============================================
Write-Host "`nProcessing remaining root HTML files..."
foreach ($f in (Get-ChildItem "$w\*.html")) {
    if ($f.Name -eq "index.html" -or $f.Name -eq "404.html") { continue }
    if (Update-HtmlFile -FilePath $f.FullName -Replacements $rootReplacements) {
        $totalUpdated++
        Write-Host "  Updated: $($f.Name)"
    }
}

Write-Host "`n========================================"
Write-Host "TOTAL FILES UPDATED: $totalUpdated"
Write-Host "========================================"
