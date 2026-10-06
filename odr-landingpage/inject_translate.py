import os
import glob

css_injection = """
    <style>
        /* Hide Google Translate elements */
        iframe.goog-te-banner-frame,
        .goog-te-banner-frame,
        .goog-te-gadget-icon,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc,
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
            display: none !important;
            visibility: hidden !important;
            height: 0px !important;
        }
        body {
            top: 0px !important;
            position: static !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    </style>
</head>
"""

js_injection = """
    <!-- Hidden Google Translate Element -->
    <div id="google_translate_element" style="display:none;"></div>
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,or', 
                autoDisplay: false
            }, 'google_translate_element');
        }
    </script>
    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</body>
"""

for filepath in glob.glob("*.html"):
    if filepath.lower() == "index.html" or filepath.lower() == "demoo.html" or filepath.lower() == "test.html":
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Skip if already injected
    if "google_translate_element" in content:
        continue
        
    # Inject CSS before </head>
    content = content.replace("</head>", css_injection, 1)
    
    # Inject JS before </body>
    content = content.replace("</body>", js_injection, 1)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected into HTML files.")
