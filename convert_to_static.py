#!/usr/bin/env python3
"""
Convert WordPress site to fully static by:
1. Converting Jetpack CDN URLs to local paths
2. Removing tracking scripts
3. Fixing relative paths
"""

import os
import re
import glob
from urllib.parse import unquote

BASE_DIR = '/Users/michaelrodriguez/Documents/GitHub/Trailside3'

def convert_jetpack_url(match):
    """Convert Jetpack CDN URL to local path."""
    url = match.group(0)

    # Handle i0.wp.com/trailsidehandyman.com pattern
    pattern = r'https://i0\.wp\.com/trailsidehandyman\.com(/wp-content/uploads/[^"\'&\s?]+)'
    m = re.search(pattern, url)
    if m:
        local_path = m.group(1)
        # URL decode the path
        local_path = unquote(local_path)
        return local_path

    return url

def process_html_file(filepath):
    """Process a single HTML file."""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    original_content = content

    # Pattern 1: Convert Jetpack CDN URLs to local paths
    # Match full URL with query parameters
    jetpack_pattern = r'https://i0\.wp\.com/trailsidehandyman\.com(/wp-content/uploads/[^\s"\']+?)(?:\?[^"\'>\s]*)?(?=["\'\s>])'
    content = re.sub(jetpack_pattern, r'\1', content)

    # Pattern 2: Also handle &amp; encoded URLs
    jetpack_pattern_amp = r'https://i0\.wp\.com/trailsidehandyman\.com(/wp-content/uploads/[^\s"\'&]+?)(?:\?[^"\'>\s]*)?(?=&amp;|["\'\s>])'
    content = re.sub(jetpack_pattern_amp, r'\1', content)

    # Pattern 3: Handle srcset with multiple URLs
    def fix_srcset(match):
        srcset = match.group(1)
        # Replace Jetpack URLs in srcset
        srcset = re.sub(
            r'https://i0\.wp\.com/trailsidehandyman\.com(/wp-content/uploads/[^\s,]+?)(?:\?[^\s,]*)?(\s+\d+w)',
            r'\1\2',
            srcset
        )
        return f'srcset="{srcset}"'

    content = re.sub(r'srcset="([^"]+)"', fix_srcset, content)

    # Pattern 4: Remove optimonk tracking scripts (both external and inline)
    content = re.sub(r'<script[^>]*optimonk[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script[^>]*src="https://onsite\.optimonk\.com[^"]*"[^>]*></script>', '', content)
    # Remove inline scripts containing optimonk
    content = re.sub(r'<script[^>]*>(?:[^<]|<(?!/script>))*optimonk[^<]*(?:[^<]|<(?!/script>))*</script>', '', content, flags=re.DOTALL | re.IGNORECASE)

    # Pattern 5: Remove WordPress stats
    content = re.sub(r'<script[^>]*stats\.wp\.com[^>]*>.*?</script>', '', content, flags=re.DOTALL)

    # Pattern 6: Remove Cloudflare email protection (won't work without CF)
    content = re.sub(r'<script[^>]*cdn-cgi/scripts[^>]*></script>', '', content)

    # Pattern 7: Fix any remaining trailsidehandyman.com absolute URLs to relative
    content = re.sub(r'https?://(?:www\.)?trailsidehandyman\.com(/[^"\'>\s]*)', r'\1', content)

    # Pattern 8: Remove the Cloudflare email encoding spans and data attributes
    # Replace encoded emails with actual email
    content = re.sub(
        r'<a[^>]*class="[^"]*__cf_email__[^"]*"[^>]*data-cfemail="[^"]*"[^>]*>\[email[^<]*\]</a>',
        '<a href="mailto:info@trailsidehandyman.com">info@trailsidehandyman.com</a>',
        content
    )

    # Pattern 9: Fix Cloudflare email protection links (cdn-cgi/l/email-protection)
    content = re.sub(
        r'href="/cdn-cgi/l/email-protection[^"]*"',
        'href="mailto:info@trailsidehandyman.com"',
        content
    )

    # Pattern 10: Remove stats.wp.com and i0.wp.com preconnect links
    content = re.sub(r'<link[^>]*href="//stats\.wp\.com"[^>]*/?>(?:\s*)', '', content)
    content = re.sub(r'<link[^>]*href="//i0\.wp\.com"[^>]*/?>(?:\s*)', '', content)

    # Pattern 11: Remove RSS feed links (won't work in static site)
    content = re.sub(r'<link[^>]*type="application/rss\+xml"[^>]*/?>(?:\s*)', '', content)

    # Pattern 12: Remove JSON API links
    content = re.sub(r'<link[^>]*rel="[^"]*alternate[^"]*"[^>]*type="application/json"[^>]*/?>(?:\s*)', '', content)

    # Pattern 13: Remove WordPress oEmbed discovery links
    content = re.sub(r'<link[^>]*wp-json/oembed[^>]*/?>(?:\s*)', '', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated: {filepath}")
        return True
    return False

def main():
    # Find all HTML files
    html_files = glob.glob(os.path.join(BASE_DIR, '**/*.html'), recursive=True)

    updated_count = 0
    for filepath in html_files:
        if process_html_file(filepath):
            updated_count += 1

    print(f"\nProcessed {len(html_files)} files, updated {updated_count} files")

if __name__ == '__main__':
    main()
