#!/bin/bash

# Test 301 Redirects for Pixelate Nest
# Run this after uploading .htaccess to test if redirects work
# Usage: bash test-redirects.sh

echo "🔍 Testing 301 Redirects for Pixelate Nest"
echo "==========================================="
echo ""

DOMAIN="https://www.pixelatenest.com"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test redirect
test_redirect() {
    local old_url="$1"
    local expected_new_url="$2"
    
    echo -n "Testing: $old_url ... "
    
    # Get HTTP status and location header
    response=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" -L "$DOMAIN$old_url")
    status_code=$(echo $response | cut -d'|' -f1)
    redirect_url=$(echo $response | cut -d'|' -f2)
    
    if [ "$status_code" = "301" ] || [ "$status_code" = "302" ]; then
        if [[ "$redirect_url" == *"$expected_new_url"* ]]; then
            echo -e "${GREEN}✅ PASS${NC} (301 → $expected_new_url)"
        else
            echo -e "${YELLOW}⚠️  REDIRECT${NC} but to: $redirect_url"
        fi
    else
        echo -e "${RED}❌ FAIL${NC} (Status: $status_code)"
    fi
}

echo "Testing Old Video Editing URLs:"
echo "-------------------------------"
test_redirect "/videoediting.html" "/video-ed.html"
test_redirect "/video-editing.html" "/video-ed.html"
echo ""

echo "Testing Old App Development URLs:"
echo "---------------------------------"
test_redirect "/appdev.html" "/app-dev.html"
test_redirect "/app-development.html" "/app-dev.html"
echo ""

echo "Testing Old Blog URLs:"
echo "---------------------"
test_redirect "/blog.html" "/blogs.html"
test_redirect "/blog.htmls/test-post" "/blogs.html"
echo ""

echo "Testing Old Portfolio/Works URLs:"
echo "--------------------------------"
test_redirect "/works.html" "/pricing.html"
echo ""

echo "Testing Old Services URLs:"
echo "-------------------------"
test_redirect "/services.html" "/webdev.html"
test_redirect "/services/works.html" "/pricing.html"
test_redirect "/services/contact.html" "/contact.html"
test_redirect "/services/blog.html" "/blogs.html"
echo ""

echo "Testing Old Features URL:"
echo "------------------------"
test_redirect "/features.html" "/about.html"
echo ""

echo "Testing Old Team Members URLs:"
echo "-----------------------------"
test_redirect "/team-members/john-doe" "/about.html"
test_redirect "/team-members/liam-brooks" "/about.html"
test_redirect "/team-members/sophia-reed" "/about.html"
echo ""

echo "Testing Old Inner Pages URLs:"
echo "----------------------------"
test_redirect "/inner-pages/career" "/careers.html"
test_redirect "/inner-pages/test" "/"
echo ""

echo "Testing Checkout URL:"
echo "--------------------"
test_redirect "/checkout" "/contact.html"
echo ""

echo "Testing API Endpoints (should return 410 Gone):"
echo "----------------------------------------------"
echo -n "Testing: /api/reviews ... "
response=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/api/reviews")
if [ "$response" = "410" ]; then
    echo -e "${GREEN}✅ PASS${NC} (410 Gone)"
else
    echo -e "${YELLOW}⚠️  Status: $response${NC} (Expected: 410)"
fi
echo ""

echo "==========================================="
echo "Testing Complete!"
echo ""
echo "📊 Next Steps:"
echo "1. If all tests pass (✅) - Submit sitemap to Google Search Console"
echo "2. If tests fail (❌) - Check .htaccess file on server"
echo "3. Wait 24-48 hours for Google to process changes"
echo ""
echo "📖 Read: FIX_GOOGLE_INDEXING_ISSUES.md for full guide"
