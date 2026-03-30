$dir = "c:/Users/labhb/Desktop/projects/final-pixelate/website/school-crm-bihar"
$files = Get-ChildItem $dir -Filter "school-crm-*.html" | Where-Object { $_.Name -ne "school-crm-common.css" }
$replacement = @"
          <div class=""crm-preview-slider"" aria-label=""School ERP UI Preview Carousel"">
            <div class=""crm-preview-track"">
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/1.png""
                  alt=""Admin Dashboard UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/2.png""
                  alt=""Marks Entry Panel UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/3.png""
                  alt=""Fee Collection Screen UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/4.png""
                  alt=""Analytics Dashboard UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/1.png""
                  alt=""Admin Dashboard UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/2.png""
                  alt=""Marks Entry Panel UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/3.png""
                  alt=""Fee Collection Screen UI Preview""
                  loading=""lazy""
                />
              </figure>
              <figure class=""crm-preview-image-slide"">
                <img
                  src=""../assets/school-crm-images/4.png""
                  alt=""Analytics Dashboard UI Preview""
                  loading=""lazy""
                />
              </figure>
            </div>
          </div>
"@

$pattern = '(?s)\s*<div class="crm-preview-slider"[\s\S]*?</div>\s*</div>\s*</section>'

foreach($file in $files){
  $content = Get-Content $file.FullName -Raw
  $new = [regex]::Replace($content, $pattern, "`r`n$replacement`r`n        </div>`r`n      </section>", 1)
  Set-Content $file.FullName -Value $new -Encoding UTF8
}

Write-Output ("Updated files: " + $files.Count)
