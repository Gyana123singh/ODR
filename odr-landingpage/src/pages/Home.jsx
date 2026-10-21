import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    // gsap.from(".hero-content", { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    // gsap.from(".why-card", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, scrollTrigger: ".why-choose" });
  }, []);

  return (
    <>
      





    <section className="about-section" id="home">
        {/* Background Video */}
        <video className="bg-video" autoPlay muted loop playsInline>
            <source src="assets/Video Project 3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Overlay for readability */}
        <div className="video-overlay"></div>

        {/* CONTENT */}
        <div className="hero" style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 10 }}>
            <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', padding: '15vh 0 5vh 0' }}>
                
                <h1 className="hero-heading">
                    Online Dispute<br />Resolution Center
                </h1>
                
                <p className="hero-subtext">
                    Utkrusht Kalashrest Vibad Samadhan
                </p>

                <div className="hero-buttons hero-buttons-custom">
                    <a id="initiate-odr-link" href="https://odr.gokulanandachaudhurifoundation.com">
                        <button className="hero-custom-btn">
                            Initiate Dispute Resolution
                        </button>
                    </a>
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

    {/* PEOPLE & PANEL SECTION */}
    <section className="people-section" id="people">
        <div className="people-container">
            <div className="people-header">
                <h2 className="section-title">Our People</h2>
                <p>
                    Guided by distinguished jurists, accredited neutrals, and the leadership of Gokulananda Chaudhuri Foundation to deliver accessible, institutional dispute resolution.
                </p>
            </div>

            {/* Leadership & Advisory Card */}
            <div className="people-leadership">
                <div className="people-lead-text">
                    <h3>Gokulananda Chaudhuri Foundation & Advisory Jurists</h3>
                    <p>
                        Rooted in an esteemed legacy of justice and social welfare, the Gokulananda Chaudhuri Foundation champions innovation in dispute resolution. Our advisory council includes veteran advocates, former judicial officers, and academic experts who ensure strict procedural fairness, legal integrity, and modern digital standards across all proceedings.
                    </p>
                    <div className="people-badges">
                        <div className="people-badge-item">
                            <i className="bi bi-shield-check"></i>
                            <span>Senior Judicial & High Court Bar Association Guidance</span>
                        </div>
                        <div className="people-badge-item">
                            <i className="bi bi-award"></i>
                            <span>Strict Institutional Neutrality & Ethical Governance</span>
                        </div>
                        <div className="people-badge-item">
                            <i className="bi bi-diagram-3"></i>
                            <span>Empaneled Experts Across Commercial, MSME & Civil Domains</span>
                        </div>
                    </div>
                </div>

                <div className="people-lead-img-wrapper">
                    <img 
                        src="/assets/WhatsApp Image 2025-12-23 at 12.08.56 PM.jpeg" 
                        alt="High Court Bar Association Orissa & Advisory Council" 
                        className="people-lead-img" 
                    />
                    <div className="people-lead-img-caption">
                        High Court Bar Association Orissa & Advisory Council Symposium
                    </div>
                </div>
            </div>

            {/* Neutrals Panel Grid */}
            <div className="people-grid">
                <div className="people-card">
                    <div className="people-card-icon">
                        <i className="bi bi-bank"></i>
                    </div>
                    <h4>Arbitrators Panel</h4>
                    <p>
                        Senior advocates, retired judicial officers, and specialized legal practitioners handling domestic, commercial, construction, and contract disputes with institutional rigor.
                    </p>
                    <span className="people-tag">Empaneled Arbitrators</span>
                </div>

                <div className="people-card">
                    <div className="people-card-icon">
                        <i className="bi bi-people-fill"></i>
                    </div>
                    <h4>Mediators Panel</h4>
                    <p>
                        Certified, empathetic mediators skilled in facilitative, commercial, MSME, family, and online mediation techniques to achieve mutually agreeable settlements without litigation.
                    </p>
                    <span className="people-tag">Certified Mediators</span>
                </div>

                <div className="people-card">
                    <div className="people-card-icon">
                        <i className="bi bi-person-badge"></i>
                    </div>
                    <h4>Conciliators & Case Managers</h4>
                    <p>
                        Dedicated resolution professionals and case administrators ensuring seamless party communications, scheduling, document exchange, and full compliance with ADR rules.
                    </p>
                    <span className="people-tag">Secretariat & Management</span>
                </div>
            </div>

            {/* Empanelment CTA */}
            <div className="people-cta-box">
                <div>
                    <h4>Are you a qualified Mediator or Arbitrator?</h4>
                    <p>Join UTKAL ODR’s institutional panel of neutrals and resolve disputes with state-of-the-art digital tools.</p>
                </div>
                <a 
                    href="https://odr.gokulanandachaudhurifoundation.com" 
                    className="people-cta-btn"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <span>Apply for Empanelment</span>
                    <i className="bi bi-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    {/* GOALS SECTION */}
    <section className="goals" id="goals">
        <div className="goals-container">
            <h2 className="section-title">Our Goals & Vision</h2>
            <div className="goals-grid">
                <div className="goal-item">
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
                </div>
            </div>
        </div>
    </section>

    {/* PRINCIPLES SECTION */}
    <section className="principles" id="knowledge">
        <div className="principles-container">
            <h2 className="section-title">Knowledge Center</h2>
            <section className="card-grid">



                <section className="why-choose" id="services">
                    <div className="why-choose-container">


                        <div className="why-grid">


                            <Link to="/rules" className="card-link">
                                <div className="why-card">
                                    <img src="assets/our-rules.png" className="icon-box" alt="" />
                                    <div className="content">

                                        <h3 style={{ color: '#ffffff' }}>Our Rules</h3>
                                        <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/odr-act" className="card-link">
                                <div className="why-card">
                                    <img src="assets/odr-act.png" className="icon-box" alt="" />
                                    <div className="content">

                                        <h3 style={{ color: '#ffffff' }}>Acts</h3>
                                        <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                                    </div>
                                </div>
                            </Link>
                            <a href="https://odr.msme.gov.in/#/legal-framework/rules" className="card-link" target="_blank" rel="noopener noreferrer">
                                <div className="why-card">
                                    <img src="assets/msme-rules.png" className="icon-box" alt="" />
                                    <div className="content">

                                        <h3 style={{ color: '#ffffff' }}>MSME Rules</h3>
                                        <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: '30px', color: '#ffffff' }}></i>
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
                <div className="feature-card">
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
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter Your Name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Types of Dispute</label>
                            <select id="subject" name="subject" defaultValue="" required>
                                <option value="" disabled>Select dispute type</option>
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
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter Your Number" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email" required />
                        </div>
                    </div>


                </form>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Link to="/contact">
                        <button className="btn-submit" type="button">
                            More details about your dispute
                        </button>
                    </Link>


                </div>
            </section>
        </div>
    </div>
    {/* FOOTER */}
    
    {/* Floating WhatsApp CTA */}
    <a href="https://wa.me/919187102299" className="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
    </a>

    



    {/* for mobileMenu  */}

    


    {/* Bootstrap JS */}
    </>
  );
}

export default Home;
