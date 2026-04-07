# update-paths.ps1 — Batch update file references after restructure
# Run from the website/ directory

$websiteDir = "c:\Users\labhb\Desktop\projects\final-pixelate\website"

# ==========================================
# PART 1: Root-level HTML files (./something)
# ==========================================
$rootHtmlFiles = Get-ChildItem -Path $websiteDir -Filter "*.html" -File

# CSS replacements for root-level HTML files
$cssReplacements = @{
    # Global CSS - various forms
    'href="./styles.css"'             = 'href="./css/global.css"'
    'href="styles.css"'               = 'href="./css/global.css"'
    # Page CSS
    'href="./about.css"'              = 'href="./css/pages/about.css"'
    'href="about.css"'                = 'href="./css/pages/about.css"'
    'href="./blog.css"'               = 'href="./css/pages/blog.css"'
    'href="blog.css"'                 = 'href="./css/pages/blog.css"'
    'href="./careers.css"'            = 'href="./css/pages/careers.css"'
    'href="careers.css"'              = 'href="./css/pages/careers.css"'
    'href="./contact.css"'            = 'href="./css/pages/contact.css"'
    'href="contact.css"'              = 'href="./css/pages/contact.css"'
    'href="./industry-styles.css"'    = 'href="./css/pages/industries.css"'
    'href="industry-styles.css"'      = 'href="./css/pages/industries.css"'
    'href="./locations.css"'          = 'href="./css/pages/locations.css"'
    'href="locations.css"'            = 'href="./css/pages/locations.css"'
    'href="./portfolio-detail.css"'   = 'href="./css/pages/portfolio.css"'
    'href="portfolio-detail.css"'     = 'href="./css/pages/portfolio.css"'
    'href="./pricing.css"'            = 'href="./css/pages/pricing.css"'
    'href="pricing.css"'              = 'href="./css/pages/pricing.css"'
    'href="./product.css"'            = 'href="./css/pages/product.css"'
    'href="product.css"'              = 'href="./css/pages/product.css"'
    'href="./state.css"'              = 'href="./css/pages/state.css"'
    'href="state.css"'                = 'href="./css/pages/state.css"'
    # Service CSS
    'href="./app-dev.css"'            = 'href="./css/pages/services/app-dev.css"'
    'href="app-dev.css"'              = 'href="./css/pages/services/app-dev.css"'
    'href="./digital-marketing.css"'  = 'href="./css/pages/services/digital-marketing.css"'
    'href="digital-marketing.css"'    = 'href="./css/pages/services/digital-marketing.css"'
    'href="./hosting-maintenance.css"' = 'href="./css/pages/services/hosting-maintenance.css"'
    'href="hosting-maintenance.css"'  = 'href="./css/pages/services/hosting-maintenance.css"'
    'href="./software-dev.css"'       = 'href="./css/pages/services/software-dev.css"'
    'href="software-dev.css"'         = 'href="./css/pages/services/software-dev.css"'
    'href="./uiux-branding.css"'      = 'href="./css/pages/services/uiux-branding.css"'
    'href="uiux-branding.css"'        = 'href="./css/pages/services/uiux-branding.css"'
    'href="./video-ed.css"'           = 'href="./css/pages/services/video-ed.css"'
    'href="video-ed.css"'             = 'href="./css/pages/services/video-ed.css"'
    'href="./video-ed-styles.css"'    = 'href="./css/pages/services/video-ed-styles.css"'
    'href="video-ed-styles.css"'      = 'href="./css/pages/services/video-ed-styles.css"'
    'href="./web-dev.css"'            = 'href="./css/pages/services/web-dev.css"'
    'href="web-dev.css"'              = 'href="./css/pages/services/web-dev.css"'
    # Component CSS
    'href="./photography-carousel.css"' = 'href="./css/components/carousel.css"'
    'href="photography-carousel.css"' = 'href="./css/components/carousel.css"'
    'href="pixy-chatbot.css"'         = 'href="./css/components/chatbot.css"'
    'href="./pixy-chatbot.css"'       = 'href="./css/components/chatbot.css"'
}

# Asset replacements for root-level HTML
$assetReplacements = @{
    # Logos
    './assets/Logo_Color_Name_Large.webp'     = './assets/images/logos/Logo_Color_Name_Large.webp'
    './assets/Logo_Color.webp'                = './assets/images/logos/Logo_Color.webp'
    'assets/Logo_Color_Name_Large.webp'       = 'assets/images/logos/Logo_Color_Name_Large.webp'
    'assets/Logo_Color.webp'                  = 'assets/images/logos/Logo_Color.webp'
    './assets/pixylogo.webp'                  = './assets/images/logos/pixylogo.webp'
    'assets/pixylogo.webp'                    = 'assets/images/logos/pixylogo.webp'
    # Favicon
    './assets/PixelateNest_icons.ico'         = './assets/icons/favicon.ico'
    'assets/PixelateNest_icons.ico'           = 'assets/icons/favicon.ico'
    # Banners
    './assets/mail_banner.png'                = './assets/images/banners/mail_banner.png'
    './assets/mail_banner.webp'               = './assets/images/banners/mail_banner.webp'
    # Video
    './assets/404animation.mp4'               = './assets/videos/404animation.mp4'
    'assets/404animation.mp4'                 = 'assets/videos/404animation.mp4'
    # Loose imgs
    './assets/android.png'                    = './assets/images/android.png'
    './assets/android.webp'                   = './assets/images/android.webp'
    './assets/app-store.png'                  = './assets/images/app-store.png'
    './assets/app-store.webp'                 = './assets/images/app-store.webp'
    './assets/back-bottom.webp'               = './assets/images/back-bottom.webp'
    './assets/back-left.webp'                 = './assets/images/back-left.webp'
    './assets/back.webp'                      = './assets/images/back.webp'
    'assets/android.png'                      = 'assets/images/android.png'
    'assets/android.webp'                     = 'assets/images/android.webp'
    'assets/app-store.png'                    = 'assets/images/app-store.png'
    'assets/app-store.webp'                   = 'assets/images/app-store.webp'
    'assets/back-bottom.webp'                 = 'assets/images/back-bottom.webp'
    'assets/back-left.webp'                   = 'assets/images/back-left.webp'
    'assets/back.webp'                        = 'assets/images/back.webp'
}

# Data file replacements
$dataReplacements = @{
    'fetch("cities.json")'                     = 'fetch("data/cities.json")'
    'fetch("services-data.json")'              = 'fetch("data/services-data.json")'
}

# Absolute URL asset replacements (in OG tags, Schema.org, etc.)
$absoluteReplacements = @{
    'https://www.pixelatenest.com/assets/Logo_Color.webp'  = 'https://www.pixelatenest.com/assets/images/logos/Logo_Color.webp'
    'https://pixelatenest.com/assets/Logo_Color.webp'      = 'https://pixelatenest.com/assets/images/logos/Logo_Color.webp'
}

Write-Host "Processing root-level HTML files..."
$count = 0
foreach ($file in $rootHtmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    foreach ($key in $cssReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $cssReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $assetReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $assetReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $dataReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $dataReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $absoluteReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $absoluteReplacements[$key])
            $changed = $true
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $count++
        Write-Host "  Updated: $($file.Name)"
    }
}
Write-Host "Root HTML: $count files updated"

# ==========================================
# PART 2: products/ subfolder HTML files
# ==========================================
Write-Host ""
Write-Host "Processing products/ HTML files..."
$productFiles = Get-ChildItem -Path "$websiteDir\products" -Filter "*.html" -File
$count2 = 0
foreach ($file in $productFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    # products/ files use ../styles.css, ../assets/, etc.
    $productReplacements = @{
        'href="../styles.css"'                    = 'href="../css/global.css"'
        'href="../assets/product-common.css"'     = 'href="../css/pages/product-common.css"'
        '../assets/Logo_Color_Name_Large.webp'    = '../assets/images/logos/Logo_Color_Name_Large.webp'
        '../assets/Logo_Color.webp'               = '../assets/images/logos/Logo_Color.webp'
        '../assets/PixelateNest_icons.ico'        = '../assets/icons/favicon.ico'
        '../assets/pixylogo.webp'                 = '../assets/images/logos/pixylogo.webp'
        '../assets/android.png'                   = '../assets/images/android.png'
        '../assets/android.webp'                  = '../assets/images/android.webp'
        '../assets/app-store.png'                 = '../assets/images/app-store.png'
        '../assets/app-store.webp'                = '../assets/images/app-store.webp'
    }

    foreach ($key in $productReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $productReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $absoluteReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $absoluteReplacements[$key])
            $changed = $true
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $count2++
        Write-Host "  Updated: $($file.Name)"
    }
}
Write-Host "Products: $count2 files updated"

# ==========================================
# PART 3: counter-billing-bihar/ HTML files
# ==========================================
Write-Host ""
Write-Host "Processing counter-billing-bihar/ HTML files..."
$cbFiles = Get-ChildItem -Path "$websiteDir\counter-billing-bihar" -Filter "*.html" -File
$count3 = 0
foreach ($file in $cbFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    $subReplacements = @{
        'href="../styles.css"'                     = 'href="../css/global.css"'
        '../assets/Logo_Color_Name_Large.webp'     = '../assets/images/logos/Logo_Color_Name_Large.webp'
        '../assets/Logo_Color.webp'                = '../assets/images/logos/Logo_Color.webp'
        '../assets/PixelateNest_icons.ico'         = '../assets/icons/favicon.ico'
        '../assets/pixylogo.webp'                  = '../assets/images/logos/pixylogo.webp'
        '../assets/android.png'                    = '../assets/images/android.png'
        '../assets/android.webp'                   = '../assets/images/android.webp'
        '../assets/app-store.png'                  = '../assets/images/app-store.png'
        '../assets/app-store.webp'                 = '../assets/images/app-store.webp'
    }

    foreach ($key in $subReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $subReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $absoluteReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $absoluteReplacements[$key])
            $changed = $true
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $count3++
        Write-Host "  Updated: $($file.Name)"
    }
}
Write-Host "Counter-billing-bihar: $count3 files updated"

# ==========================================
# PART 4: factory-management-bihar/ HTML files
# ==========================================
Write-Host ""
Write-Host "Processing factory-management-bihar/ HTML files..."
$fmFiles = Get-ChildItem -Path "$websiteDir\factory-management-bihar" -Filter "*.html" -File
$count4 = 0
foreach ($file in $fmFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    foreach ($key in $subReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $subReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $absoluteReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $absoluteReplacements[$key])
            $changed = $true
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $count4++
        Write-Host "  Updated: $($file.Name)"
    }
}
Write-Host "Factory-management-bihar: $count4 files updated"

# ==========================================
# PART 5: school-crm-bihar/ HTML files
# ==========================================
Write-Host ""
Write-Host "Processing school-crm-bihar/ HTML files..."
$scFiles = Get-ChildItem -Path "$websiteDir\school-crm-bihar" -Filter "*.html" -File
$count5 = 0
foreach ($file in $scFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    foreach ($key in $subReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $subReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $absoluteReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $absoluteReplacements[$key])
            $changed = $true
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $count5++
        Write-Host "  Updated: $($file.Name)"
    }
}
Write-Host "School-crm-bihar: $count5 files updated"

# ==========================================
# PART 6: detailed-services/ subfolder HTML files
# ==========================================
Write-Host ""
Write-Host "Processing detailed-services/ subfolder HTML files..."
$dsFiles = Get-ChildItem -Path "$websiteDir\detailed-services" -Filter "*.html" -Recurse -File
$count6 = 0
foreach ($file in $dsFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    # These files are 2 levels deep: detailed-services/app-development/index.html
    # They reference ../../styles.css, ../../assets/, etc.
    $dsReplacements = @{
        'href="../../styles.css"'                    = 'href="../../css/global.css"'
        '../../assets/Logo_Color_Name_Large.webp'    = '../../assets/images/logos/Logo_Color_Name_Large.webp'
        '../../assets/Logo_Color.webp'               = '../../assets/images/logos/Logo_Color.webp'
        '../../assets/PixelateNest_icons.ico'        = '../../assets/icons/favicon.ico'
        '../../assets/pixylogo.webp'                 = '../../assets/images/logos/pixylogo.webp'
        '../../assets/android.png'                   = '../../assets/images/android.png'
        '../../assets/android.webp'                  = '../../assets/images/android.webp'
        '../../assets/app-store.png'                 = '../../assets/images/app-store.png'
        '../../assets/app-store.webp'                = '../../assets/images/app-store.webp'
        'fetch("services-data.json")'                = 'fetch("../../data/services-data.json")'
    }

    foreach ($key in $dsReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $dsReplacements[$key])
            $changed = $true
        }
    }
    foreach ($key in $absoluteReplacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $absoluteReplacements[$key])
            $changed = $true
        }
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        $count6++
        Write-Host "  Updated: $($file.Name)"
    }
}
Write-Host "Detailed-services: $count6 files updated"

# ==========================================
# SUMMARY
# ==========================================
Write-Host ""
Write-Host "========================================" 
Write-Host "TOTAL FILES UPDATED: $($count + $count2 + $count3 + $count4 + $count5 + $count6)"
Write-Host "========================================"
