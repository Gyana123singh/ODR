import urllib.request
import re

html = urllib.request.urlopen('https://utkalodr.com/').read().decode('utf-8')
body_match = re.search(r'<body[^>]*>(.*)</body>', html, re.IGNORECASE | re.DOTALL)
body = body_match.group(1) if body_match else html

body = body.replace('class=', 'className=')
body = body.replace('for=', 'htmlFor=')
body = body.replace('<!--', '{/*')
body = body.replace('-->', '*/}')
body = re.sub(r'<script.*?</script>', '', body, flags=re.DOTALL)
body = re.sub(r'<img([^>]*)(?<!/)>', r'<img\1 />', body)
body = re.sub(r'<input([^>]*)(?<!/)>', r'<input\1 />', body)
body = re.sub(r'<br([^>]*)(?<!/)>', r'<br\1 />', body)
body = re.sub(r'<hr([^>]*)(?<!/)>', r'<hr\1 />', body)
body = re.sub(r'<source([^>]*)(?<!/)>', r'<source\1 />', body)

body = body.replace('style="background-color: white;"', 'style={{ backgroundColor: \'white\' }}')
body = body.replace('style="width: 100%;"', 'style={{ width: \'100%\' }}')
body = body.replace('style="color: gray;"', 'style={{ color: \'gray\' }}')
body = body.replace('style="font-size: 1rem; color: white;"', 'style={{ fontSize: \'1rem\', color: \'white\' }}')
body = body.replace('style="margin-top: 31%;"', 'style={{ marginTop: \'31%\' }}')
body = body.replace('style="font-size: 20px;"', 'style={{ fontSize: \'20px\' }}')
body = body.replace('style="text-align: left;"', 'style={{ textAlign: \'left\' }}')
body = body.replace('style="display: flex; justify-content: center; margin-top: 20px;"', 'style={{ display: \'flex\', justifyContent: \'center\', marginTop: \'20px\' }}')
body = body.replace('style="display:none;"', 'style={{ display: \'none\' }}')
body = body.replace('style="color: black;"', 'style={{ color: \'black\' }}')

# Write to App.jsx directly
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write('''import React, { useEffect } from "react";
import "./Style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.from(".hero-content", { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    gsap.from(".why-card", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, scrollTrigger: ".why-choose" });
  }, []);

  return (
    <div className="app-container">
''' + body + '''
    </div>
  );
}

export default App;
''')
