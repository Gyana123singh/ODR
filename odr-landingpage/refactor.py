import os
import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the body of App component
body_match = re.search(r'return \(\s*<div className="app-container">\s*(.*?)\s*</div>\s*\);\s*}\s*export default App;', content, re.DOTALL)
if body_match:
    app_body = body_match.group(1)
    
    # We want to remove the <header> and <footer> blocks from it
    header_regex = re.compile(r'\{/\* ================= HEADER ================= \*/\}.*?</header>', re.DOTALL)
    footer_regex = re.compile(r'<footer.*?</footer>', re.DOTALL)
    
    home_content = header_regex.sub('', app_body)
    home_content = footer_regex.sub('', home_content)
    
    # Remove the language switcher stuff that's not needed in Home
    home_content = re.sub(r'\{/\* Hidden Google Translate Element \*/\}\s*<div id="google_translate_element".*?</div>', '', home_content, flags=re.DOTALL)
    
    home_jsx = f'''import React, {{ useEffect }} from "react";
import gsap from "gsap";
import {{ ScrollTrigger }} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {{
  useEffect(() => {{
    gsap.from(".hero-content", {{ opacity: 0, y: 50, duration: 1, delay: 0.2 }});
    gsap.from(".why-card", {{ opacity: 0, y: 30, duration: 0.8, stagger: 0.2, scrollTrigger: ".why-choose" }});
  }}, []);

  return (
    <>
      {home_content}
    </>
  );
}}

export default Home;
'''
    with open('src/pages/Home.jsx', 'w', encoding='utf-8') as fw:
        fw.write(home_jsx)

app_router_jsx = '''import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      
      {/* Floating WhatsApp CTA */}
      <a href="https://wa.me/918280057771" className="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
          <i className="fab fa-whatsapp"></i>
      </a>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </div>
  );
}

export default App;
'''
with open('src/App.jsx', 'w', encoding='utf-8') as fa:
    fa.write(app_router_jsx)

print('Refactored App.jsx and Home.jsx')
