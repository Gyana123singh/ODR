import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OdrRules.css";

const CATEGORIES = [
  { id: "all", label: "All Rules (21)" },
  { id: "part-1", label: "I. Introductory (Arts 1–4)" },
  { id: "part-2", label: "II. Commencement (Arts 5–6)" },
  { id: "part-3", label: "III. Proceeding Stages (Arts 7–11)" },
  { id: "part-4", label: "IV. Neutrals & Powers (Arts 12–14)" },
  { id: "part-5", label: "V. General & Costs (Arts 15–21)" },
];

const ARTICLES = [
  // PART I
  {
    id: 1,
    partId: "part-1",
    partTitle: "Part I: Introductory Rules",
    title: "Scope",
    content: (
      <>
        <p>
          ODR Rules shall apply to a wide range of disputes which includes but not limited to interpersonal disputes
          including consumer to consumer disputes (C2C), marital separation, interstate conflicts, property disputes,
          e-commerce transaction disputes, business to consumer (B2C) disputes, business-to-business disputes (B2B), and
          also disputes arising out of cross-border transactions where the parties agreed that disputes relating to that
          transaction shall be resolved under these Rules, so long as the dispute falls within the scope of the Rules.
        </p>
        <p>
          These Rules shall govern the ODR proceedings subject to such modifications as the parties may agree. Where
          any of these rules are in conflict with any provision(s) of the law applicable to the proceedings, that
          provision of the applicable law shall prevail.
        </p>
        <p>
          Unless the parties otherwise agree, the law applicable to all proceedings under these Rules shall be the
          laws of India. For the avoidance of doubt, this includes the law applicable to the parties' agreement to resolve
          any dispute between them under the ODR Rules and the law applicable to the procedure of the dispute resolution
          proceedings under these Rules.
        </p>
      </>
    ),
    keywords: "scope jurisdiction consumer c2c b2b b2c marital property ecommerce cross-border laws of india",
  },
  {
    id: 2,
    partId: "part-1",
    partTitle: "Part I: Introductory Rules",
    title: "Definitions",
    content: (
      <>
        <p>For the purposes of these Rules:</p>
        <ul className="odrrules-list">
          <li>
            <strong>ODR</strong> or Online Dispute Resolution is a mechanism for resolving disputes through the use of
            electronic communications and other information and communication technology.
          </li>
          <li>
            <strong>UTKAL ODRplatform</strong> means a system for generating, sending, and receiving, storing,
            exchanging or otherwise processing communications under these Rules.
          </li>
          <li>
            <strong>Claimant</strong> means any party initiating ODR proceedings under the Rules.
          </li>
          <li>
            <strong>Respondent</strong> means any party to whom the notice is directed.
          </li>
          <li>
            <strong>Communication</strong> means any communication (including a statement, declaration, demand,
            notice, Response, submission, notification or request) made by means of information generated, sent,
            received or stored by electronic, magnetic, optical or similar means through UTKAL ODRplatform.
          </li>
          <li>
            <strong>Electronic address</strong> means an information system, or portion thereof, designated by the
            parties to the online dispute resolution process to exchange communications related to that process.
          </li>
        </ul>
      </>
    ),
    keywords: "definitions odr platform claimant respondent communication electronic address notice",
  },
  {
    id: 3,
    partId: "part-1",
    partTitle: "Part I: Introductory Rules",
    title: "Principles",
    content: (
      <>
        <div className="odrrules-callout-note">
          The core principles that underpin the UTKAL ODR process include{" "}
          <strong>fairness, transparency, due process, and accountability.</strong>
        </div>

        <div className="odrrules-subsection-title">Application Scope</div>
        <p>
          The ODR platform may assist in addressing situations arising in interpersonal disputes including consumer to
          consumer disputes (C2C), marital separation, interstate conflicts, property disputes, e-commerce transaction
          disputes, business to consumer (B2C) disputes, business-to-business disputes (B2B), and cross-border disputes.
        </p>

        <div className="odrrules-subsection-title">Operational Standards</div>
        <p>
          The ODR platform ought to be simple, fast, and efficient, in order to be able to be used in a "real world
          setting", including that it should not impose costs, delays, and burdens that are disproportionate to the
          economic value at stake.
        </p>

        <div className="odrrules-subsection-title">Transparency & Accountability</div>
        <p>
          The ODR platform maintains the relationship between the UTKAL ODR administrator and a particular disputing party,
          so that users of the service are informed of potential conflicts of interest. The UTKAL ODR administrator
          maintains data and statistics on outcomes in UTKAL ODR processes to enable parties to assess its overall record,
          consistent with applicable principles of confidentiality.
        </p>
      </>
    ),
    keywords: "principles fairness transparency due process accountability operational standards efficiency confidentiality",
  },
  {
    id: 4,
    partId: "part-1",
    partTitle: "Part I: Introductory Rules",
    title: "Communications",
    content: (
      <>
        <p>
          All communications in the course of ODR proceedings shall be communicated to the parties through the UTKAL ODR
          platform.
        </p>
        <ul className="odrrules-list">
          <li>
            A communication shall be deemed to have been received when, following communication to the Parties in
            accordance with Article 4.1, UTKAL ODR notifies the parties of its availability, in accordance with
            paragraph 4.4.
          </li>
          <li>
            UTKAL ODR shall acknowledge receipt of any communications by a party or the neutral at their electronic
            addresses.
          </li>
          <li>
            UTKAL ODR shall promptly notify a party or the neutral of the availability of any communication directed
            to that party or the neutral at the UTKAL ODR platform.
          </li>
          <li>
            UTKAL ODR shall promptly notify all parties and the neutral of the conclusion of the negotiation stage of
            proceedings and the commencement of the mediation stage of proceedings; the expiry of the mediation stage of
            proceedings; and, if relevant, the commencement of the arbitration stage of proceedings.
          </li>
        </ul>
      </>
    ),
    keywords: "communications electronic delivery notifications receipt platform stage transitions negotiation mediation arbitration",
  },

  // PART II
  {
    id: 5,
    partId: "part-2",
    partTitle: "Part II: Commencement of ODR",
    title: "Commencement",
    content: (
      <>
        <p>
          The claimant shall communicate to the ADMINISTRATOR a Request/Notice for ODR proceedings in accordance with
          Article 5.4. The Request/Notice should, as far as possible, be accompanied by all documents and other evidence
          relied upon by the claimant or contain references to them.
        </p>
        <p>
          The UTKAL ODR ADMINISTRATOR shall promptly notify the respondent that the Request/Notice for ODR proceedings
          is received at the UTKAL ODR Platform.
        </p>
        <div className="odrrules-callout-highlight">
          <strong>📋 Commencement Date:</strong> The ODR proceedings shall be deemed to commence when, following
          communication to the UTKAL ADMINISTRATOR of the Request/Notice pursuant to Article 5.1, the UTKAL ODR
          ADMINISTRATOR notifies the parties of the availability of the commencement Request/Notice at the UTKAL
          ODR platform.
        </div>
        <div className="odrrules-subsection-title">Required Information in Notice</div>
        <ul className="odrrules-list">
          <li>The name and designated electronic address of the claimant and of the claimant's authorized representative (if any).</li>
          <li>The name and electronic address of the respondent and of the respondent's representative (if known to the claimant).</li>
          <li>The grounds on which the claim is made.</li>
          <li>Any solutions proposed to resolve the dispute.</li>
          <li>The claimant's preferred language of proceedings.</li>
          <li>The signature or other means of identification and authentication of the Claimant and/or representative.</li>
          <li>Identification of the dispute agreement invoked.</li>
        </ul>
      </>
    ),
    keywords: "commencement request notice filing claim claimant respondent required information evidence agreement",
  },
  {
    id: 6,
    partId: "part-2",
    partTitle: "Part II: Commencement of ODR",
    title: "Response",
    content: (
      <>
        <p>
          The respondent shall communicate to the UTKAL ODR ADMINISTRATOR a response to the Request/Notice in
          accordance with Article 6.2 within <strong>seven (7) calendar days</strong> of being notified of the
          availability of the Request/Notice on the UTKAL ODR platform. The response should, as far as possible, be
          accompanied by all documents and other evidence relied upon by the respondent or contain references to them.
        </p>
        <div className="odrrules-callout-note">
          <strong>⏰ Response Window:</strong> Strict deadline of <strong>7 calendar days</strong> from notice availability.
        </div>
        <div className="odrrules-subsection-title">Response Shall Include</div>
        <ul className="odrrules-list">
          <li>The name and designated electronic address of the respondent and authorized representative (if any).</li>
          <li>A response to the grounds on which the claim is made.</li>
          <li>Any solutions proposed to resolve the dispute.</li>
          <li>The signature or other means of identification and authentication of the respondent and/or representative.</li>
          <li>Statement of any counterclaim containing the grounds on which the counterclaim is made.</li>
        </ul>
      </>
    ),
    keywords: "response deadline 7 days calendar counterclaim reply respondent evidence defence",
  },

  // PART III
  {
    id: 7,
    partId: "part-3",
    partTitle: "Part III: Stages of ODR Proceeding",
    title: "Negotiation Stage",
    content: (
      <>
        <p>
          The first stage of proceedings is a technology-enabled negotiation, in which the claimant and
          respondent negotiate directly with one another through the UTKAL ODR platform.
        </p>
        <div className="odrrules-callout-note">
          <strong>ℹ️ Counterclaim Rules:</strong> If the response does not include a counterclaim, the negotiation stage shall
          commence upon communication of the response to UTKAL ODR, and notification thereof to the claimant. If the
          response includes a counterclaim, negotiation commences upon communication of the claimant's reply to that counterclaim.
        </div>
        <div className="odrrules-callout-highlight">
          <strong>⏰ Timeline:</strong> If the parties have not settled their dispute by negotiation within <strong>ten
          (10) calendar days</strong> of commencement of the negotiation stage, the mediation stage of UTKAL ODR proceedings
          shall immediately commence.
        </div>
        <p>
          The parties may agree to a one-time extension of the deadline for reaching settlement. However, no such
          extension shall be for more than <strong>ten (10) calendar days</strong>.
        </p>
      </>
    ),
    keywords: "negotiation stage technology direct settlement timeline 10 days extension counterclaim",
  },
  {
    id: 8,
    partId: "part-3",
    partTitle: "Part III: Stages of ODR Proceeding",
    title: "Mediation Stage",
    content: (
      <>
        <p>
          If the negotiation process fails (i.e. does not result in a settlement of the claim), the process moves to
          the second stage: <strong>Mediation</strong>. Upon commencement of the mediation stage, the UTKAL ODR
          ADMINISTRATOR shall promptly appoint a mediator in accordance with Article 12 and notify the disputing parties:
        </p>
        <ul className="odrrules-list">
          <li>Of that appointment in accordance with Article 11;</li>
          <li>Of the deadline for the expiry of the mediation stage.</li>
        </ul>
        <p>
          Following appointment, the mediator shall communicate with the parties through the UTKAL ODR platform to attempt
          to reach a mutual settlement agreement.
        </p>
        <div className="odrrules-callout-highlight">
          <strong>⏰ Timeline:</strong> If the parties have not settled their dispute by mediation within <strong>ten
          (10) calendar days</strong> of being notified of the appointment of the mediator, the UTKAL ODR proceedings
          shall move to the final (Arbitration) stage pursuant to Article 9.
        </div>
      </>
    ),
    keywords: "mediation stage mediator neutral appointment settlement 10 days timeline failure to settle",
  },
  {
    id: 9,
    partId: "part-3",
    partTitle: "Part III: Stages of ODR Proceeding",
    title: "Arbitration Stage",
    content: (
      <>
        <p>
          At the expiry of the mediation stage, the Mediator shall communicate a date to the disputing
          parties for any final communications to be made. Such date shall be not later than <strong>ten (10) calendar
          days</strong> from the expiry of the Mediation stage.
        </p>
        <p>
          Upon commencement of the Arbitration stage, the UTKAL ODR ADMINISTRATOR shall promptly appoint an Arbitrator
          in accordance with Article 12, if the parties agreed to arbitration proceedings.
        </p>
        <div className="odrrules-subsection-title">Arbitration Proceedings</div>
        <ul className="odrrules-list">
          <li>Each party shall have the burden of proving the facts relied on to support its claim or defense.</li>
          <li>The Arbitrator shall evaluate the dispute based on the information submitted by the parties and shall render an award.</li>
          <li>The UTKAL ODR ADMINISTRATOR shall communicate the award to the parties and record it on the platform for future reference.</li>
        </ul>
        <div className="odrrules-subsection-title">Award Requirements</div>
        <ul className="odrrules-list">
          <li>The award shall be made in writing and signed by the Arbitrator, indicating the date and mode/place of arbitration.</li>
          <li>The award shall state brief grounds upon which it is based.</li>
          <li>The award shall be rendered promptly, preferably within <strong>ten (10) calendar days</strong> from a specified point in proceedings.</li>
        </ul>
        <div className="odrrules-callout-warning">
          <strong>⚖️ Final & Binding:</strong> The award shall be final and binding on all parties. The parties shall carry
          out the award without delay.
        </div>
      </>
    ),
    keywords: "arbitration stage arbitrator award binding final award in writing burden of proof 10 days",
  },
  {
    id: 10,
    partId: "part-3",
    partTitle: "Part III: Stages of ODR Proceeding",
    title: "Correction of Awards",
    content: (
      <>
        <p>
          Within <strong>five (5) calendar days</strong> after the receipt of the award, a party, with notice to the
          other party, may request the Arbitrator to correct in the award any error in computation, any clerical or
          typographical error, or any error or omission of a similar nature.
        </p>
        <div className="odrrules-callout-note">
          <strong>⏰ Correction Window:</strong> If the Arbitrator considers that the request is justified, he or she shall make
          the correction including a brief statement of reasons within <strong>two (2) calendar days</strong> of receipt of the
          request. Such corrections shall be submitted to the UTKAL ODR platform and shall form part of the award.
        </div>
        <p>The Arbitrator may also make such corrections on their own initiative.</p>
      </>
    ),
    keywords: "correction of award computation error clerical typographical 5 days 2 days request",
  },
  {
    id: 11,
    partId: "part-3",
    partTitle: "Part III: Stages of ODR Proceeding",
    title: "Settlement",
    content: (
      <>
        <div className="odrrules-callout-highlight">
          <strong>🤝 Automatic Termination Upon Settlement:</strong> If settlement is reached at any stage of the UTKAL ODR
          proceedings, the terms of such settlement shall be submitted to the UTKAL ODR platform, at which point the UTKAL ODR
          proceedings will automatically terminate.
        </div>
      </>
    ),
    keywords: "settlement agreement resolution termination mutual consent platform",
  },

  // PART IV
  {
    id: 12,
    partId: "part-4",
    partTitle: "Part IV: Appointment & Powers of Neutral",
    title: "Appointment of Neutral (Mediator/Arbitrator)",
    content: (
      <>
        <p>
          The UTKAL ADMINISTRATOR shall appoint the neutral (Mediator/Arbitrator) promptly following commencement of the
          mediation or arbitration stage of proceedings. Upon appointment, UTKAL ODR shall promptly notify the
          parties of the name of the neutral and any other relevant or identifying credentials.
        </p>
        <div className="odrrules-subsection-title">Appointment Confirmation</div>
        <p>
          The neutral, by accepting appointment, confirms that he or she can devote the time necessary to conduct the
          proceedings diligently, efficiently, and in accordance with the time limits in the Rules.
        </p>
        <div className="odrrules-subsection-title">Declaration of Impartiality</div>
        <p>
          The neutral shall, at the time of accepting appointment, declare his or her impartiality and independence.
          Throughout the proceedings, the neutral shall without delay disclose to UTKAL ODR any circumstances likely
          to give rise to justifiable doubts as to their impartiality or independence.
        </p>
      </>
    ),
    keywords: "appointment neutral mediator arbitrator impartiality independence disclosure credentials qualifications",
  },
  {
    id: 13,
    partId: "part-4",
    partTitle: "Part IV: Appointment & Powers of Neutral",
    title: "Resignation or Replacement of Neutral",
    content: (
      <>
        <p>
          If the neutral (Mediator/Arbitrator) resigns or otherwise has to be replaced during the course of UTKAL ODR
          proceedings, the UTKAL ODR administrator shall appoint a replacement neutral pursuant to Article 12.
        </p>
        <p>
          The UTKAL ODR proceedings shall resume smoothly at the stage where the replaced neutral ceased to perform
          his or her functions.
        </p>
      </>
    ),
    keywords: "resignation replacement of neutral substitute vacancy resume proceedings mediator arbitrator",
  },
  {
    id: 14,
    partId: "part-4",
    partTitle: "Part IV: Appointment & Powers of Neutral",
    title: "Powers of the Neutral",
    content: (
      <>
        <p>
          Subject to the Rules, the neutral may conduct the UTKAL ODR proceedings in such manner as he or she considers
          appropriate.
        </p>
        <div className="odrrules-subsection-title">Conduct of Proceedings</div>
        <p>
          The neutral, in exercising functions under the Rules, shall conduct proceedings so as to avoid unnecessary delay
          and expense and to provide a fair and efficient process for resolving the dispute. In doing so, the neutral shall
          remain at all times wholly independent and impartial, and shall treat both parties equally.
        </p>
        <div className="odrrules-subsection-title">Decision-Making Authority</div>
        <ul className="odrrules-list">
          <li>Conduct proceedings on the basis of all communications made during the process.</li>
          <li>At any time, request or allow parties to provide additional information, documents, exhibits, or evidence.</li>
          <li>Rule on his or her own jurisdiction, including objections regarding the existence or validity of the agreement.</li>
          <li>After making inquiries, exercise discretion to extend deadlines under these Rules.</li>
        </ul>
      </>
    ),
    keywords: "powers of neutral jurisdiction evidence documents deadline extension equal treatment fairness conduct",
  },

  // PART V
  {
    id: 15,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Deadlines",
    content: (
      <>
        <p>
          The UTKAL ODR ADMINISTRATOR, or if relevant the NEUTRAL (Mediator/Arbitrator), shall notify parties of all
          relevant deadlines and timeline milestones during the course of proceedings.
        </p>
      </>
    ),
    keywords: "deadlines time limits notification schedule milestones",
  },
  {
    id: 16,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Dispute Resolution Clause",
    content: (
      <>
        <p>
          The UTKAL ODR platform shall be specified in the dispute resolution clause of the underlying agreement, or
          subject to mutual submission agreement by the parties.
        </p>
      </>
    ),
    keywords: "dispute resolution clause contract agreement submission clause",
  },
  {
    id: 17,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Language of Proceedings",
    content: (
      <>
        <p>
          The UTKAL ODR proceedings shall take place in the language of the agreement to submit disputes to ODR, or in
          the absence of such agreement, the UTKAL ODR administrator shall determine the language(s) to be used.
        </p>
        <p>
          In the event that a party indicates in a Request or response that it wishes to proceed in another language,
          the UTKAL ODR shall identify available languages that the parties can select for the proceedings, and the
          proceedings shall be conducted in the chosen language.
        </p>
      </>
    ),
    keywords: "language english odia hindi multilingual translation proceedings",
  },
  {
    id: 18,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Representation",
    content: (
      <>
        <p>
          A party may be represented or assisted by a person or persons chosen by that party (legal counsel or authorized
          agent). The names and designated electronic addresses of such persons and their authority to act must be
          communicated to the other party and the administrator through UTKAL ODR.
        </p>
      </>
    ),
    keywords: "representation legal counsel lawyer advocate authorized representative power of attorney",
  },
  {
    id: 19,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Exclusion of Liability",
    content: (
      <>
        <p>
          Save for intentional wrongdoing, the parties waive, to the fullest extent permitted under applicable law,
          any claim against the UTKAL ODR platform, its administrators, and neutrals (Mediator/Arbitrator) based on any
          act or omission in connection with the UTKAL ODR proceedings under these Rules.
        </p>
      </>
    ),
    keywords: "exclusion of liability immunity waiver claims good faith intentional wrongdoing",
  },
  {
    id: 20,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Allocation of Costs at the Arbitration Stage",
    content: (
      <>
        <p>
          The costs of the arbitration shall in principle be borne by the unsuccessful party or parties. However, the
          Arbitrator may apportion each of such costs between the parties in the award if it determines that
          apportionment is reasonable, taking into account the circumstances and conduct of the case.
        </p>
      </>
    ),
    keywords: "allocation of costs arbitration fees loser pays apportionment expenses",
  },
  {
    id: 21,
    partId: "part-5",
    partTitle: "Part V: General Provisions & Costs",
    title: "Definition of Costs",
    content: (
      <>
        <p>The term 'costs' includes:</p>
        <ul className="odrrules-list">
          <li>The fees of the UTKAL ODR platform and the neutrals (Mediator/Arbitrator) fixed by UTKAL ODR.</li>
          <li>The reasonable costs of expert advice and of other assistance required by the neutral (Arbitrator) during the Arbitration Stage.</li>
          <li>Legal and other reasonable costs incurred by the parties during the Arbitration Stage.</li>
          <li>Any other official administrative fees and expenses of the UTKAL ODR platform.</li>
        </ul>
      </>
    ),
    keywords: "definition of costs fees neutral fees expert witness legal fees platform charges",
  },
];

function OdrRules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      // Category filter
      if (selectedCategory !== "all" && article.partId !== selectedCategory) {
        return false;
      }
      // Search filter
      if (!q) return true;
      const matchNum = `article ${article.id}`.includes(q) || `${article.id}` === q;
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchPart = article.partTitle.toLowerCase().includes(q);
      const matchKw = article.keywords.toLowerCase().includes(q);
      return matchNum || matchTitle || matchPart || matchKw;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="odrrules-page">
      {/* ===== HERO BANNER ===== */}
      <section className="odrrules-hero">
        <div className="odrrules-hero-container">
          <div className="odrrules-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Rules & Guidelines</span>
          </div>

          <div className="odrrules-badge">
            <span>⚖️</span>
            <span>Official Framework</span>
          </div>

          <h1 className="odrrules-title">Rules of Online Dispute Resolution</h1>
          <p className="odrrules-subtitle">
            A comprehensive, transparent, and structured procedural framework governing negotiation,
            mediation, and arbitration proceedings conducted via the UTKAL ODR platform.
          </p>
        </div>
      </section>

      {/* ===== SEARCH & FILTER CONTROLS ===== */}
      <section className="odrrules-controls" id="rules-search">
        <div className="odrrules-controls-card">
          <div className="odrrules-search-wrapper">
            <span className="odrrules-search-icon">🔍</span>
            <input
              type="text"
              className="odrrules-search-input"
              placeholder="Search by article number, title, or keywords (e.g., 'Article 8', 'mediation', 'costs', 'timeline')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search ODR Rules"
            />
            {searchTerm && (
              <button
                type="button"
                className="odrrules-search-clear"
                onClick={() => setSearchTerm("")}
                title="Clear search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="odrrules-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`odrrules-filter-tab ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status info */}
          <div className="odrrules-status-bar">
            <span>
              Showing <strong>{filteredArticles.length}</strong> of <strong>{ARTICLES.length}</strong> Articles
              {selectedCategory !== "all" && ` in ${CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
            {(searchTerm || selectedCategory !== "all") && (
              <button
                type="button"
                className="odrrules-reset-btn"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== ARTICLES LIST ===== */}
      <main className="odrrules-container">
        {filteredArticles.length === 0 ? (
          <div className="odrrules-empty">
            <div className="odrrules-empty-icon">🔍</div>
            <h3>No matching articles found</h3>
            <p>We couldn't find any rule matching "{searchTerm}". Try another keyword or reset filters.</p>
            <button
              type="button"
              className="odrrules-filter-tab active"
              style={{ marginTop: "12px", display: "inline-block" }}
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="odrrules-articles-list">
            {filteredArticles.map((article) => (
              <article key={article.id} className="odrrules-card" id={`article-${article.id}`}>
                <div className="odrrules-card-top">
                  <div className="odrrules-card-meta">
                    <span className="odrrules-article-num">ARTICLE {article.id}</span>
                    <span className="odrrules-card-part">{article.partTitle}</span>
                  </div>
                </div>

                <h2 className="odrrules-card-title">{article.title}</h2>
                <div className="odrrules-card-body">{article.content}</div>
              </article>
            ))}
          </div>
        )}

        {/* ===== BOTTOM CTA CARD ===== */}
        <section className="odrrules-cta">
          <div className="odrrules-cta-content">
            <h3>Need to Resolve a Dispute?</h3>
            <p>
              Initiate fast, legally recognized, and cost-effective online resolution under these rules.
            </p>
          </div>
          <a
            href="https://odr.gokulanandachaudhurifoundation.com"
            className="odrrules-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Initiate Dispute Resolution →
          </a>
        </section>
      </main>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          className="odrrules-top-btn"
          onClick={scrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default OdrRules;
