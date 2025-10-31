How to upload sitemap_index.xml and robots.txt and resubmit in Google Search Console

1) Upload files to your website
- Using FTP/SFTP: connect to your web host (example: host, username, password) and upload `sitemap_index.xml` and `robots.txt` to the web root (public_html or the folder that serves https://www.pixelatenest.com/).
- Using your hosting control panel (cPanel, Plesk): use File Manager -> navigate to the web root and upload both files.
- Using a CI/CD or deployment flow: add the files to your build/deploy artifacts so they are copied to the site root on deploy.

2) Verify files are accessible
- Visit https://www.pixelatenest.com/sitemap_index.xml in a browser — you should see the XML sitemap index.
- Visit https://www.pixelatenest.com/robots.txt — you should see the plain text robots content.

3) Resubmit in Google Search Console
- Open Google Search Console and choose the property for https://www.pixelatenest.com.
- In the left menu, go to "Sitemaps".
- Under "Add a new sitemap", enter `sitemap_index.xml` (or the full URL `https://www.pixelatenest.com/sitemap_index.xml`) and click Submit.
- If you also want, you can submit `sitemap.xml` directly by entering `sitemap.xml` and clicking Submit.
- In the left menu, go to "Robots.txt Tester" (or the URL inspection tool) to verify that robots.txt is readable and contains the Sitemap line.

4) Monitor indexing
- Check the Sitemaps report in Search Console after a few hours to see if Google has read the sitemap and discovered URLs.
- Use the URL Inspection tool to request indexing of high-priority pages if needed.

Notes
- Keep the `lastmod` dates up-to-date; you can regenerate `sitemap_index.xml` when sitemaps change.
- If you have many sitemaps, ensure the sitemap index lists them all. Each sitemap listed should be reachable.
