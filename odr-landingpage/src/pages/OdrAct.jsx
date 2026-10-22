import React from "react";
import { Link } from "react-router-dom";
import "./OdrAct.css";

const ACTS_DATA = [
  {
    id: "msmed-2006",
    title: "MSMED Act, 2006",
    fullName: "Micro, Small and Medium Enterprises Development Act, 2006",
    categoryLabel: "Commercial Law",
    icon: "⚖️",
    year: "2006",
    pdfUrl: "/assets/pdfs/MSMED2006act.pdf",
    description:
      "Statutory provisions protecting MSMEs against delayed payments, establishing mandatory conciliation & arbitration through MSME Facilitation Councils, with compound interest at three times the RBI bank rate.",
  },
  {
    id: "ac-1996",
    title: "Arbitration and Conciliation Act, 1996",
    fullName: "The Arbitration and Conciliation Act, 1996 (As Amended)",
    categoryLabel: "Arbitration & ADR",
    icon: "📜",
    year: "1996",
    pdfUrl: "/assets/pdfs/A_&_C_act.pdf",
    description:
      "The comprehensive legal framework governing domestic and international commercial arbitration, conciliation proceedings, and the enforcement of arbitral awards under the UNCITRAL model law in India.",
  },
  {
    id: "mediation-2023",
    title: "Mediation Act, 2023",
    fullName: "The Mediation Act, 2023",
    categoryLabel: "Arbitration & ADR",
    icon: "🔔",
    year: "2023",
    pdfUrl: "/assets/pdfs/Mediation Act.pdf",
    description:
      "Landmark enactment institutionalizing pre-litigation, community, and online mediation in India, setting a 180-day timeline for resolution and making mediated settlement agreements legally enforceable.",
  },
  {
    id: "contract-1872",
    title: "Contract Act, 1872",
    fullName: "The Indian Contract Act, 1872",
    categoryLabel: "Commercial Law",
    icon: "📖",
    year: "1872",
    pdfUrl: "/assets/pdfs/Contract_Act_1872.pdf",
    description:
      "The foundational substantive law determining the validity of agreements, consideration, breach of contract, damages, discharge, agency, and dispute resolution covenants.",
  },
  {
    id: "limitation-1963",
    title: "Limitation Act, 1963",
    fullName: "The Limitation Act, 1963",
    categoryLabel: "Statutory Law",
    icon: "🗂️",
    year: "1963",
    pdfUrl: "/assets/pdfs/Limitation_Act.pdf",
    description:
      "Prescribes mandatory statutory periods of limitation for filing claims, initiating arbitration, filing appeals, and executing awards, ensuring disputes are adjudicated within permissible timeframes.",
  },
  {
    id: "general-clauses-1897",
    title: "General Clauses Act, 1897",
    fullName: "The General Clauses Act, 1897",
    categoryLabel: "Statutory Law",
    icon: "📚",
    year: "1897",
    pdfUrl: "/assets/pdfs/General_clauses_act,_1897.pdf",
    description:
      "Fundamental statute for the construction and interpretation of central enactments, defining statutory terms, calculation of time deadlines, and general principles of legislative application.",
  },
];

function OdrAct() {
  return (
    <div className="odract-page">
      {/* ===== HERO HEADER ===== */}
      <section className="odract-hero">
        <div className="odract-hero-container">
          <div className="odract-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Statutory Acts & Legal Framework</span>
          </div>

          <div className="odract-badge">
            <span>📜</span>
            <span>Knowledge Center</span>
          </div>

          <h1 className="odract-title">Statutory Acts & Legal Framework</h1>
          <p className="odract-subtitle">
            Authoritative bare acts, regulatory statutes, and legislative frameworks governing
            conciliation, mediation, arbitration, and online dispute resolution in India.
          </p>
        </div>
      </section>

      {/* ===== ACTS GRID ===== */}
      <main className="odract-container">
        <div className="odract-grid">
          {ACTS_DATA.map((act) => (
            <article key={act.id} className="odract-card">
              <div>
                <div className="odract-card-header">
                  <div className="odract-card-icon">{act.icon}</div>
                  <div className="odract-card-meta">
                    <span className="odract-tag-category">{act.categoryLabel}</span>
                    <span className="odract-tag-format">PDF Bare Act</span>
                  </div>
                </div>

                <h2 className="odract-card-title">{act.title}</h2>
                <p className="odract-card-desc">{act.description}</p>
              </div>

              <div className="odract-card-actions">
                <a
                  href={act.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="odract-btn-view"
                  title={`View ${act.title} PDF in a new tab`}
                >
                  <span>📄</span>
                  <span>View Bare Act</span>
                </a>
                <a
                  href={act.pdfUrl}
                  download
                  className="odract-btn-download"
                  title={`Download ${act.title} PDF`}
                >
                  <span>⬇️</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* ===== BOTTOM CTA CARD ===== */}
        <section className="odract-cta">
          <div className="odract-cta-content">
            <h3>Need to Resolve a Dispute Under These Acts?</h3>
            <p>
              Initiate fast, legally binding, and cost-effective online dispute resolution with UTKAL ODR.
            </p>
          </div>
          <a
            href="https://odr.gokulanandachaudhurifoundation.com"
            className="odract-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Initiate Dispute Resolution →
          </a>
        </section>
      </main>
    </div>
  );
}

export default OdrAct;
