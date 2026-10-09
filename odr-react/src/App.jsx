import React, { useEffect } from "react";
import "./Style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Add simple GSAP animation to hero
    gsap.from(".hero-content", { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    gsap.from(".why-card", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, scrollTrigger: ".why-choose" });
  }, []);

  return (
    <div className="app-container">

    {/* ================= HEADER ================= */}
    <header className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark">

            <div className="container">

                {/* LOGO */}
                <a className="navbar-brand d-flex align-items-center gap-2" href="#">
                    <img src="assets/WhatsApp Image 2025-12-24 at 10.17.53 AM.jpeg" width="80" alt="" />
                    <span>UTKAL ODR</span>
                </a>

                {/* TOGGLER */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* MENU */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <li className="nav-item">
                            <a className="nav-link" href="#home">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#services">Services</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="./odr-blogs.html">Blog</a>

                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#knowledge">Knowledge</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-globe"></i> Language
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                                <li><a className="dropdown-item" href="#" onclick="changeLanguage(event, 'en', 'English')">English</a></li>
                                <li><a className="dropdown-item" href="#" onclick="changeLanguage(event, 'or', 'ଓଡ଼ିଆ (Odia)')">ଓଡ଼ିଆ (Odia)</a></li>
                                <li><a className="dropdown-item" href="#" onclick="changeLanguage(event, 'hi', 'हिंदी (Hindi)')">हिंदी (Hindi)</a></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a id="initiate-odr-link" className="btn rounded-pill px-4" href="https://odr.gokulanandachaudhurifoundation.com/login" style={{ backgroundColor: 'white' }}>
                                Connect
                            </a>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    </header>





    <section className="about-section" id="home">
        <div className="container">
            <div className="row align-items-center">

                {/* Background Video */}
                <video className="bg-video" autoPlay muted loop playsInline>
                    <source src="assets/Video Project 3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay (optional for readability) */}
                <div className="video-overlay"></div>

                {/* CONTENT (BOTTOM on mobile, LEFT on desktop) */}
                <div className="col-lg-12 col-12 order-2 order-lg-1">
                    <section className="hero" style={{ width: '100%' }}>
                        <div className="hero-content" style={{ width: '100%' }}>
                            <h1 style={{ color: 'gray' }}>Online Dispute Resoluion Center</h1>

                            <p className="hero-subtitle">
                                Utkrusht Kalashrest Vibad Samadhan
                            </p>

                            {/* <p>
                                Online Dispute Resolution Platform, Making ADR processes more
                                accessible and transparent to the public
                            </p> */}

                            <p style={{ fontSize: '1rem', color: 'white' }}>

                            </p>

                            <div className="hero-buttons " style={{ marginTop: '31%' }}>
                                <a id="initiate-odr-link" href="https://odr.gokulanandachaudhurifoundation.com">
                                    <button className="btn-primary">
                                        Initiate Dispute Resolution
                                    </button>
                                </a>

                                {/* <button className="btn-secondary">
                                    Learn More
                                </button> */}
                            </div>
                        </div>

                    </section>
                </div>

            </div>

        </div>
    </section>




    {/* Services SECTION */}
    {/* Services SECTION */}
    <section className="why-choose" id="services">
        <div className="why-choose-container">
            <h2 className="section-title">Our Services</h2>

            <div className="why-grid">

                <div className="why-card">
                    <img src="assets/negotiation.png" className="icon-box" alt="" />
                    <h3>Online Negotiation</h3>
                </div>

                <div className="why-card">
                    <img src="assets/mediation.png" className="icon-box" alt="" />
                    <h3>Online Mediation</h3>
                </div>

                <div className="why-card">
                    <img src="assets/arbitration.png" className="icon-box" alt="" />
                    <h3>Online Arbitration</h3>
                </div>

            </div>
        </div>
    </section>



    <section className="odr-platform">
        <div className="container">
            <h2 className="section-title">Our Dispute Resolution Process</h2>

            {/* Bootstrap Auto Slider */}
            <div id="odrSlider" className="carousel slide odr-image" data-bs-ride="carousel" data-bs-interval="4000"
                data-bs-pause="false" data-bs-touch="true">

                {/* Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#odrSlider" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#odrSlider" data-bs-slide-to="1"></button>
                </div>

                {/* Slides */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="assets/process-img1.png" className="d-block w-100" alt="ODR Process Step 1" />
                    </div>

                    <div className="carousel-item">
                        <img src="assets/process-img2.png" className="d-block w-100" alt="ODR Process Step 2" />
                    </div>
                </div>

                {/* Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#odrSlider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#odrSlider" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            {/* Content */}
            <div className="odr-content">
                <p className="intro">
                    Our Online Dispute Resolution (ODR) platform is designed to provide a
                    secure, cost-effective, and transparent mechanism for resolving disputes
                    efficiently through technology-enabled processes.
                </p>
            </div>
        </div>
    </section>


    {/* GOALS SECTION */}
    <motion.section 
        className="goals" 
        id="goals"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
    >
        <div className="goals-container">
            <h2 className="section-title">Our Goals & Vision</h2>
            <div className="goals-grid">

                <img src="assets/1.png" style={{ width: '100%' }} alt="" />
                {/* <div className="goal-item">
                    <h4>📋 Making ADR Accessible</h4>
                    <p>Making ADR processes more accessible and transparent to the public through innovative technology.
                    </p>
                </div>
                <div className="goal-item">
                    <h4>💼 Supporting MSMEs</h4>
                    <p>Lower the litigation burden and costs associated with MSMEs and startups for ease of doing
                        business.</p>
                </div>
                <div className="goal-item">
                    <h4>🚀 Modernization</h4>
                    <p>Modernization & cost effectiveness of Online Dispute Resolution for ease of doing business.</p>
                </div>
                <div className="goal-item">
                    <h4>⚖️ Judiciary Collaboration</h4>
                    <p>Collaboration with judiciary to ensure adaptability and legitimacy of dispute resolution.</p>
                </div>
                <div className="goal-item">
                    <h4>🔒 Ethical Standards</h4>
                    <p>Emphasizing ethical guidelines, digital data security, and self-regulation at all levels.</p>
                </div>
                <div className="goal-item">
                    <h4>🎯 Default Solution</h4>
                    <p>Make UTKAL ODR the default first step in dispute resolution across all sectors.</p>
                </div>
                <div className="goal-item">
                    <h4>🌐 Global Services</h4>
                    <p>Provide services like Med-Arb, emergency arbitration, online mediation & arbitration.</p>
                </div>
                <div className="goal-item">
                    <h4>📈 International Ready</h4>
                    <p>Strive to improve services to meet expectations of Foreign Investors and cross-border disputes.
                    </p>
                </div> */}
            </div>
        </div>
    </motion.section>

    {/* PRINCIPLES SECTION */}
    <section className="principles" id="knowledge">
        <div className="principles-container">
            <h2 className="section-title">Knowledge Center</h2>
            <section className="card-grid">



                <section className="why-choose" id="services">
                    <div className="why-choose-container">


                        <div className="why-grid">


                            <a href="./odr-rules.html" className="card-link">
                                <div className="why-card">
                                    <img src="assets/our-rules.png" className="icon-box" alt="" />
                                    <div className="content">

                                        <h3>Our Rules</h3>
                                        <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '20px' }}></i>
                                    </div>
                                </div>
                            </a>
                            <a href="./odr-act.html" className="card-link">
                                <div className="why-card">
                                    <img src="assets/odr-act.png" className="icon-box" alt="" />
                                    <div className="content">

                                        <h3>Acts</h3>
                                        <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '20px' }}></i>
                                    </div>
                                </div>
                            </a>
                            <a href="https://odr.msme.gov.in/#/legal-framework/rules" className="card-link">
                                <div className="why-card">
                                    <img src="assets/msme-rules.png" className="icon-box" alt="" />
                                    <div className="content">

                                        <h3>MSME Rules</h3>
                                        <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '20px' }}></i>
                                    </div>
                                </div>
                            </a>




                        </div>
                    </div>
                </section>




            </section>

        </div>
    </section>
    {/* FEATURES SECTION */}
    <section className="features">
        <div className="features-container">
            <h2 className="section-title">Why to choose us?</h2>
            <div className="features-grid">
                {/* <div className="feature-card">
                    <div className="feature-icon">🏥</div>
                    <h3>Accessible</h3>
                    <p>Making ADR processes more accessible and transparent to the public. Easy-to-use platform
                        available 24/7.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">💰</div>
                    <h3>Cost Effective</h3>
                    <p>Lower litigation burden and costs associated with MSMEs and startups. Affordable dispute
                        resolution.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Fast Resolution</h3>
                    <p>Qualitative resolution on time. Our experienced neutrals resolve disputes seamlessly with minimal
                        delays.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔐</div>
                    <h3>Secure & Confidential</h3>
                    <p>Digital data security and ethical guidelines. All communications protected with end-to-end
                        encryption.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h3>Technology Enabled</h3>
                    <p>Modern ODR platform leveraging cutting-edge technology for seamless dispute resolution.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⚖️</div>
                    <h3>Fair & Transparent</h3>
                    <p>Fairness, transparency, and accountability at every step. Independent and impartial neutrals.</p>
                </div> */}

                <div style="">
                    <img src="assets/3.png" style={{ width: '100%' }} alt="" />
                    <img src="assets/4.png" style={{ width: '100%' }} alt="" />
                </div>  
            </div>
        </div>
    </section>




    {/* CTA SECTION */}
    <section className="cta" id="cta">
        <div className="cta-container">
            <h2>Let us proceed to resolve the disputes</h2>

            <div className="cta-buttons">
                <a href="#" className="btn-light">Contact Us</a>
                <a href="https://odr.gokulanandachaudhurifoundation.com" className="btn-light">Join us neutrals</a>
                <a href="https://odr.gokulanandachaudhurifoundation.com" className="btn-light">Start Now</a>


            </div>
        </div>
    </section>


    {/* contact part  */}

    <div className="contact-body">

        <div className="contact-wrapper">
            <div className="section-title text-white">
                <h1 style={{ color: 'black' }}>Communicate</h1>
            </div>
            <section className="contact-card">
                <div className="pill">
                    <span className="dot"></span>
                    <span>Say hello</span>
                </div>
                <h2>Let’s know about your dispute</h2>


                <form action="#" method="post">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="subject">Types of Dispute</label>
                            <select id="subject" name="subject" required>
                                <option value="" disabled selected>Select dispute type</option>
                                <option value="commercial">Commercial Dispute</option>
                                <option value="contract">Contract Dispute</option>
                                <option value="property">Property Dispute</option>
                                <option value="family">Family / Matrimonial Dispute</option>
                                <option value="consumer">Consumer Dispute</option>
                                <option value="employment">Employment / Labour Dispute</option>
                                <option value="banking">Banking & Finance Dispute</option>
                                <option value="insurance">Insurance Dispute</option>
                                <option value="intellectual_property">Intellectual Property Dispute</option>
                                <option value="other">Other</option>
                            </select>
                        </div>


                        <div className="form-group">

                            <div className="form-group">
                                <label htmlFor="amountCategory">Amounts of dispute</label>
                                <select id="amountCategory" name="amountCategory">
                                    <option value="upto_5_lakhs">Upto Rs. 5 lakhs</option>
                                    <option value="5_to_20_lakhs">Rs. 5 lakhs to 20 lakhs</option>
                                    <option value="20_lakhs_to_1_crore">Rs. 20 lakhs to 1 Crore</option>
                                    <option value="1_to_10_crore">Rs. 1 Crore to 10 Crore</option>
                                    <option value="10_to_20_crore">Rs. 10 Crore to 20 Crore</option>
                                    <option value="above_20_crore">Above Rs. 20 Crore</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter Your Number" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="phone">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email" />
                        </div>


                    </div>


                </form>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <a href="./contact-form.html"><button className="btn-submit">
                            More details about your dispute
                        </button></a>


                </div>
            </section>
        </div>
    </div>
    {/* FOOTER */}
    <footer>
        <div className="footer-content">
            <div className="footer-section">
                <h4>About UTKAL ODR</h4>
                <p style={{ textAlign: 'left' }}>Online Dispute Resolution platform providing accessible,
                    cost-effective, and transparent dispute resolution services.</p>
            </div>
            <div className="footer-section">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Negotiation</a></li>
                    <li><a href="#">Mediation</a></li>
                    <li><a href="#">Arbitration</a></li>

                </ul>
            </div>
            <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#">How It Works</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Rules</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                    <li><a href="mailto:connect@utkalodr.com">connect@utkalodr.com</a></li>
                    <li><a href="tel:+91 91871 02299">+91 91871 02299</a></li>

                </ul>
            </div>
            <div className="footer-section">
                <h4>Our aligned partners</h4>
                <ul>
                    <li><a href="https://www.legalion.co.in">legalion</a></li>
                    <li><a href="https://infotattvabusinesssolutions.com/">InfoTattva</a></li>

                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2026 UTKAL ODR - Utkrusht Vibad Samadhan. All rights reserved. | Powered by Gokulananda Chaudhuri
                Foundation</p>
        </div>
    </footer>
    {/* Floating WhatsApp CTA */}
    <a href="https://wa.me/918280057771" className="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
    </a>

    



    {/* for mobileMenu  */}
    
    {/* Hidden Google Translate Element */}
    <div id="google_translate_element" style={{ display: 'none' }}></div>
    
    
    



    {/* Bootstrap JS */}
    


    </div>
  );
}

export default App;
