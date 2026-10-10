import os
import re

files_to_convert = {
    'odr-blogs.html': 'src/pages/Blogs.jsx',
    'odr-act.html': 'src/pages/OdrAct.jsx',
    'odr-rules.html': 'src/pages/OdrRules.jsx',
    'contact-form.html': 'src/pages/Contact.jsx'
}

def convert_html_to_jsx(html):
    # Extract just the main content (ignoring header, nav, footer, head)
    # usually between <header> and <footer> or <nav> and <footer>
    body = html
    
    # Very rudimentary extraction
    if '<!-- CONTENT START -->' in html:
        pass # add markers if needed, but we'll try to find <div class="container">
    
    # Let's remove everything before the first major section after nav
    # For now, just replace class= with className=
    jsx = html.replace('class="', 'className="')
    jsx = jsx.replace('for="', 'htmlFor="')
    jsx = jsx.replace('tabindex="', 'tabIndex="')
    
    # Self-closing tags
    jsx = re.sub(r'<img(.*?)(?<!/)>', r'<img\1/>', jsx)
    jsx = re.sub(r'<input(.*?)(?<!/)>', r'<input\1/>', jsx)
    jsx = re.sub(r'<br(.*?)(?<!/)>', r'<br\1/>', jsx)
    jsx = re.sub(r'<hr(.*?)(?<!/)>', r'<hr\1/>', jsx)
    
    # Inline styles
    # Not perfect, but we can try to wipe them or convert them
    jsx = re.sub(r'style="([^"]*)"', r'style={{}}', jsx)
    
    # Comments
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx, flags=re.DOTALL)
    
    return jsx

for html_file, jsx_file in files_to_convert.items():
    if not os.path.exists(html_file):
        continue
        
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Try to extract body content
    match = re.search(r'</header>(.*?)<footer', html, re.DOTALL | re.IGNORECASE)
    if not match:
        match = re.search(r'</nav>(.*?)<footer', html, re.DOTALL | re.IGNORECASE)
        
    if match:
        content = match.group(1)
    else:
        # Fallback to body
        b_match = re.search(r'<body.*?>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
        content = b_match.group(1) if b_match else html
    
    # Remove script tags
    content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    jsx_content = convert_html_to_jsx(content)
    
    name = jsx_file.split('/')[-1].replace('.jsx', '')
    
    final_jsx = f"""import React from 'react';
import {{ Link }} from 'react-router-dom';

function {name}() {{
  return (
    <div className="{name.lower()}-page">
      {{/* Auto-converted HTML */}}
      {jsx_content}
    </div>
  );
}}

export default {name};
"""
    
    with open(jsx_file, 'w', encoding='utf-8') as f:
        f.write(final_jsx)

print("Conversion complete.")
