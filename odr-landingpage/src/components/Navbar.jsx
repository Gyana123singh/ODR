import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (e, langCode) => {
    e.preventDefault();
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/`;
    window.location.reload();
  };

  const supportedLanguagesStr = import.meta.env.VITE_SUPPORTED_LANGUAGES || 'en:English,or:ଓଡ଼ିଆ (Odia),hi:हिंदी (Hindi)';
  const supportedLanguages = supportedLanguagesStr.split(',').map(lang => {
      const [code, name] = lang.split(':');
      return { code, name };
  });

  return (
    <header className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
            <div className="container">
                {/* LOGO */}
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <img src="/assets/WhatsApp Image 2025-12-24 at 10.17.53 AM.jpeg" width="80" alt="Logo" />
                    <span>UTKAL ODR</span>
                </Link>

                {/* TOGGLER */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* MENU */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/#home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/#services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/#knowledge">Knowledge</Link>
                        </li>

                        {/* Language Switcher - React Controlled */}
                        <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <a className="nav-link dropdown-toggle d-flex align-items-center gap-1" href="#" role="button" aria-expanded={isDropdownOpen}>
                                <i className="bi bi-globe"></i> Language
                            </a>
                            <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`} style={{position: 'absolute', margin: 0}}>
                                {supportedLanguages.map(lang => (
                                    <li key={lang.code}>
                                        <a className="dropdown-item" href="#" onClick={(e) => changeLanguage(e, lang.code)}>
                                            {lang.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="btn rounded-pill px-4 text-black fw-bold" to="/#cta" style={{ backgroundColor: 'white' }}>
                                Connect
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  );
}

export default Navbar;
