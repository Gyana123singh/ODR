import React from 'react';
import { Link } from 'react-router-dom';

function OdrRules() {
  return (
    <div className="odrrules-page">
      {/* Auto-converted HTML */}
      
  {/*  ================= HEADER =================  */}
  <header className="sticky-top">
    <nav className="navbar navbar-expand-lg navbar-dark">

      <div className="container">

        {/*  LOGO  */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src="assets/WhatsApp Image 2025-12-24 at 10.17.53 AM.jpeg" width="80" alt=""/>
          <span>UTKAL ODR</span>
        </a>

        {/*  TOGGLER  */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*  MENU  */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            <li className="nav-item">
              <a className="nav-link" href="./index.html">Home</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>


            <li className="nav-item">
              <a className="nav-link" href="#knowledge">Knowledge</a>
            </li>

            <li className="nav-item">
              <a className="btn rounded-pill px-4" href="#cta" style={{}}>
                Connect
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  </header>



  {/*  Header  */}
  {/*  <section className="banner-header">
    <div className=""></div>

    <div className="header-content">
      <h1>⚖️ UTKAL ODR Rules</h1>
      <p>Online Dispute Resolution Framework - Complete Rules & Guidelines</p>
    </div>
  </section>  */}


  {/*  Navigation Sidebar  */}
  <nav className="nav-sidebar" id="navSidebar">
    <div className="nav-section">
      <div className="nav-section-title">I. Introductory Rules</div>
      <div className="nav-item active" onclick="scrollToSection('article-1')">Article 1: Scope</div>
      <div className="nav-item" onclick="scrollToSection('article-2')">Article 2: Definitions</div>
      <div className="nav-item" onclick="scrollToSection('article-3')">Article 3: Principles</div>
      <div className="nav-item" onclick="scrollToSection('article-4')">Article 4: Communications</div>
    </div>

    <div className="nav-section">
      <div className="nav-section-title">II. Commencement of ODR</div>
      <div className="nav-item" onclick="scrollToSection('article-5')">Article 5: Request/Notice</div>
      <div className="nav-item" onclick="scrollToSection('article-6')">Article 6: Response</div>
    </div>

    <div className="nav-section">
      <div className="nav-section-title">III. Stages of ODR Proceeding</div>
      <div className="nav-item" onclick="scrollToSection('article-7')">Article 7: Negotiation Stage</div>
      <div className="nav-item" onclick="scrollToSection('article-8')">Article 8: Mediation Stage</div>
      <div className="nav-item" onclick="scrollToSection('article-9')">Article 9: Arbitration Stage</div>
      <div className="nav-item" onclick="scrollToSection('article-10')">Article 10: Correction of Award</div>
      <div className="nav-item" onclick="scrollToSection('article-11')">Article 11: Settlement</div>
    </div>

    <div className="nav-section">
      <div className="nav-section-title">IV. Appointment & Powers</div>
      <div className="nav-item" onclick="scrollToSection('article-12')">Article 12: Appointment of Neutral</div>
      <div className="nav-item" onclick="scrollToSection('article-13')">Article 13: Resignation/Replacement</div>
      <div className="nav-item" onclick="scrollToSection('article-14')">Article 14: Powers of Neutral</div>
    </div>

    <div className="nav-section">
      <div className="nav-section-title">V. General Provisions</div>
      <div className="nav-item" onclick="scrollToSection('article-15')">Article 15: Deadlines</div>
      <div className="nav-item" onclick="scrollToSection('article-16')">Article 16: Dispute Resolution Clause</div>
      <div className="nav-item" onclick="scrollToSection('article-17')">Article 17: Language of Proceedings</div>
      <div className="nav-item" onclick="scrollToSection('article-18')">Article 18: Representation</div>
      <div className="nav-item" onclick="scrollToSection('article-19')">Article 19: Exclusion of Liability</div>
      <div className="nav-item" onclick="scrollToSection('article-20')">Article 20: Allocation of Costs</div>
      <div className="nav-item" onclick="scrollToSection('article-21')">Article 21: Definition of Costs</div>
    </div>
  </nav>

  {/*  Main Content  */}
  <div className="main-content">
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input type="text" className="search-bar" id="searchBar" placeholder="Search articles and content..."/>
    </div>

    {/*  ARTICLE 1  */}
    <div className="article" id="article-1">
      <div className="article-header">
        <span className="article-number">ARTICLE 1</span>
        <h2 className="article-title">Scope</h2>
      </div>
      <div className="article-content">
        <p>ODR Rules shall apply to a wide range of disputes which includes but not limited to interpersonal disputes
          including consumer to consumer disputes (C2C), marital separation, interstate conflicts, property disputes,
          e-commerce transaction disputes, business to consumer (B2C) disputes, business-to-business disputes (B2B), and
          also dispute arising out of cross-border where the parties agreed that disputes relating to that transaction
          shall be resolved under these Rules, so long as the dispute falls within the scope of the Rules.</p>
        <p>These Rules shall govern the ODR proceedings subject to such modifications as the parties may agree. Where
          any of these rules are in conflict with any provision(s) of the law applicable to the proceedings that
          provision of the applicable law shall prevail.</p>
        <p>Unless the parties otherwise agree, the law applicable to all the proceedings under these Rules shall be the
          laws of India. For the avoidance of doubt this includes the law applicable to the parties agreement to resolve
          any dispute between them under the ODR Rules and the law applicable to the procedure of the dispute resolution
          proceedings under these Rules.</p>
      </div>
    </div>

    {/*  ARTICLE 2  */}
    <div className="article" id="article-2">
      <div className="article-header">
        <span className="article-number">ARTICLE 2</span>
        <h2 className="article-title">Definitions</h2>
      </div>
      <div className="article-content">
        <p>For purposes of these Rules:</p>
        <ul className="bullet-points">
          <li><strong>ODR</strong> or Online Dispute Resolution is a mechanism for resolving disputes through the use of
            electronic communications and other information and communication technology.</li>
          <li><strong>UTKAL ODRplatform</strong> means a system for generating, sending, and receiving, storing,
            exchanging or otherwise processing communications under these Rules.</li>
          <li><strong>Claimant</strong> means any party initiating ODR proceedings under the Rules.</li>
          <li><strong>Respondent</strong> means any party to whom the notice is directed.</li>
          <li><strong>Communication</strong> means any communication (including a statement, declaration, demand,
            notice, Response, submission, notification or request) made by means of information generated, sent,
            received or stored by electronic, magnetic, optical or similar means through UTKAL ODRplatform.</li>
          <li><strong>Electronic address</strong> means an information system, or portion thereof, designated by the
            parties to the online dispute resolution process to exchange communications related to that process.</li>
        </ul>
      </div>
    </div>

    {/*  ARTICLE 3  */}
    <div className="article" id="article-3">
      <div className="article-header">
        <span className="article-number">ARTICLE 3</span>
        <h2 className="article-title">Principles</h2>
      </div>
      <div className="article-content">
        <p>The principles that underpin ODR process include <strong>fairness, transparency, due process and
            accountability.</strong></p>
        <div className="subsection-title">Application Scope</div>
        <p>ODR platform may assist in addressing a situation arising in interpersonal disputes including consumer to
          consumer disputes (C2C), marital separation, interstate conflicts, property disputes, e-commerce transaction
          disputes, business to consumer (B2C) disputes, business-to-business disputes (B2B), and also dispute arising
          out of cross-border disputes etc.</p>

        <div className="subsection-title">Operational Standards</div>
        <p>ODR platform ought to be simple, fast and efficient, in order to be able to be used in a "real world
          setting", including that it should not impose costs, delays and burdens that are disproportionate to the
          economic value at stake.</p>

        <div className="subsection-title">Transparency & Accountability</div>
        <p>ODR platform maintains the relationship between the UTKAL ODR administrator and a particular disputing party,
          so that users of the service are informed of potential conflicts of interest. UTKAL ODR administrator
          maintains the data or statistics on outcomes in UTKAL ODR processes, in order to enable parties to assess its
          overall record, consistent with applicable principles of confidentiality.</p>
      </div>
    </div>

    {/*  ARTICLE 4  */}
    <div className="article" id="article-4">
      <div className="article-header">
        <span className="article-number">ARTICLE 4</span>
        <h2 className="article-title">Communications</h2>
      </div>
      <div className="article-content">
        <p>All communications in the course of ODR proceedings shall be communicated to the parties through UTKAL ODR
          platform.</p>
        <ul className="bullet-points">
          <li>A communication shall be deemed to have been received when, following communication to the Parties in
            accordance with article 4.1, UTKAL ODR notifies the parties of its availability, in accordance with
            paragraph 4.4.</li>
          <li>UTKAL ODR shall acknowledge receipt of any communications by a party or the neutral at their electronic
            addresses.</li>
          <li>UTKAL ODR shall promptly notify a party or the neutral of the availability of any communication directed
            to that party or the neutral at the UTKAL ODR platform.</li>
          <li>UTKAL ODR shall promptly notify all parties and the neutral of the conclusion of the negotiation stage of
            proceedings and the commencement of the mediation stage of proceedings; the expiry of the mediation stage of
            proceedings; and, if relevant, the commencement of the arbitration stage of proceedings.</li>
        </ul>
      </div>
    </div>

    {/*  ARTICLE 5  */}
    <div className="article" id="article-5">
      <div className="article-header">
        <span className="article-number">ARTICLE 5</span>
        <h2 className="article-title">Commencement</h2>
      </div>
      <div className="article-content">
        <p>The claimant shall communicate to the ADMINISTRATOR, a Request/Notice for ODR proceedings in accordance with
          Article 5.4. The Request/Notice should, as far as possible, be accompanied by all documents and other evidence
          relied upon by the claimant or contains references to them.</p>
        <p>The UTKAL ODR ADMINISTRATOR shall promptly notify the respondent that the Request/Notice for ODR proceedings
          is received at the UTKAL ODR Platform.</p>
        <div className="highlight">
          <strong>📋 Commencement:</strong> The ODR proceedings shall be deemed to commence when, following
          communication to the UTKAL ADMINISTRATOR of the Request/Notice pursuant to article 5.1, the UTKAL ODR
          ADMINISTRATOR notifies the parties of the availability of the commencement Request/Notice at the UTKAL
          ODRplatform.
        </div>
        <div className="subsection-title">Required Information</div>
        <ul className="bullet-points">
          <li>The name and designated electronic address of the claimant and of the claimant's representative (if any)
            authorized to act for the claimant in the ODR proceedings</li>
          <li>The name and electronic address of the respondent and of the respondent's representative (if any) known to
            the claimant</li>
          <li>The grounds on which the claim is made</li>
          <li>Any solutions proposed to resolve the dispute</li>
          <li>The claimant's preferred language of proceedings</li>
          <li>The signature or other means of identification and authentication of the Claimant and/or the Claimant's
            representative</li>
          <li>Identification of the agreement invoked</li>
        </ul>
      </div>
    </div>

    {/*  ARTICLE 6  */}
    <div className="article" id="article-6">
      <div className="article-header">
        <span className="article-number">ARTICLE 6</span>
        <h2 className="article-title">Response</h2>
      </div>
      <div className="article-content">
        <p>The respondent shall communicate to the UTKAL ODR ADMINISTRATOR, a response to the Request/Notice in
          accordance with article 6.2 within <strong>seven (7) calendar days</strong> of being notified of the
          availability of the Request/Notice on the UTKAL ODRplatform. The response should, as far as possible, be
          accompanied by all documents and other evidence relied upon by the respondent or contains references to them.
        </p>
        <div className="subsection-title">Response Shall Include</div>
        <ul className="bullet-points">
          <li>The name and designated electronic address of the respondent and the respondent's representative (if any)
            authorized to act for them respondent in the ODR proceedings</li>
          <li>A response to the grounds on which the claim is made</li>
          <li>Any solutions proposed to resolve the dispute</li>
          <li>The signature or other means of identification and authentication of the respondent and/or the
            Respondent's representative</li>
          <li>Statement of any counterclaim containing the grounds on which the counterclaim is made</li>
        </ul>
      </div>
    </div>

    {/*  ARTICLE 7  */}
    <div className="article" id="article-7">
      <div className="article-header">
        <span className="article-number">ARTICLE 7</span>
        <h2 className="article-title">Negotiation Stage</h2>
      </div>
      <div className="article-content">
        <p>The first stage of proceedings a technology enabled negotiation commences, in which the claimant and
          respondent negotiate directly with one another through the UTKAL ODR platform.</p>
        <div className="note">
          <strong>ℹ️ Note:</strong> If the response does not include a counterclaim, the negotiation stage shall
          commence upon communication of the response to the UTKAL ODR, and notification thereof to the claimant. If the
          response does include a counterclaim, the negotiation stage shall commence upon communication of the response
          by the claimant to that counterclaim.
        </div>
        <p><strong>Timeline:</strong> If the parties have not settled their dispute by negotiation within <strong>ten
            (10) calendar days</strong> of submission of the commencement of the negotiation stage of proceedings, the
          mediation stage of UTKAL ODR proceedings shall immediately commence.</p>
        <p>The parties may agree to a one-time extension of the deadline for reaching settlement. However, no such
          extension shall be for more than <strong>ten (10) calendar days.</strong></p>
      </div>
    </div>

    {/*  ARTICLE 8  */}
    <div className="article" id="article-8">
      <div className="article-header">
        <span className="article-number">ARTICLE 8</span>
        <h2 className="article-title">Mediation Stage</h2>
      </div>
      <div className="article-content">
        <p>If the negotiation process fails (i.e. does not result in a settlement of the claim), the process may move to
          a second, "Mediation" stage. Upon commencement of the mediation stage of UTKAL ODR proceedings, the UTKAL ODR
          ADMINISTRATOR shall promptly appoint a mediator in accordance with Article 12 and shall notify the disputing
          parties:</p>
        <ul className="bullet-points">
          <li>Of that appointment in accordance with Article 11</li>
          <li>Of the deadline for the expiry of the mediation stage</li>
        </ul>
        <p>Following appointment, the mediator shall communicate with the parties through UTKAL ODR platform to attempt
          to reach a settlement agreement.</p>
        <div className="highlight">
          <strong>⏰ Timeline:</strong> If the parties have not settled their dispute by mediation within <strong>ten
            (10) calendar days</strong> of being notified of the appointment of the mediator pursuant to Article 11, the
          UTKAL ODR proceedings shall move to the final (arbitration) stage of proceedings pursuant to Article 9.
        </div>
      </div>
    </div>

    {/*  ARTICLE 9  */}
    <div className="article" id="article-9">
      <div className="article-header">
        <span className="article-number">ARTICLE 9</span>
        <h2 className="article-title">Arbitration Stage</h2>
      </div>
      <div className="article-content">
        <p>At the expiry of the mediation stage, the Mediator shall proceed to communicate a date to the disputing
          parties for any final communications to be made. Such date shall be not later than <strong>ten (10) calendar
            days</strong> from the expiry of the Mediation stage.</p>
        <p>Upon commencement of the Arbitration stage of UTKAL ODRproceedings, the UTKAL ODR ADMINISTRATOR shall
          promptly appoint an Arbitrator in accordance with Article 12, if parties agreed for the arbitration
          proceedings.</p>
        <div className="subsection-title">Arbitration Proceedings</div>
        <ul className="bullet-points">
          <li>Each party shall have the burden of proving the facts relied on to support its claim or defense.</li>
          <li>The Arbitrator shall evaluate the dispute based on the information submitted by the parties and shall
            render an award.</li>
          <li>The UTKAL ODR ADMINISTRATOR shall communicate the award to the parties and the award shall be recorded on
            the UTKAL ODRplatform for future preference.</li>
        </ul>
        <div className="subsection-title">Award Requirements</div>
        <ul className="bullet-points">
          <li>The award shall be made in writing and signed by the Arbitrator and shall indicate the date on which it
            was made and the place or mode of arbitration.</li>
          <li>The award shall state brief grounds upon which it is based.</li>
          <li>The award shall be rendered promptly, preferably within <strong>ten (10) calendar days</strong> from a
            specified point in proceedings.</li>
        </ul>
        <div className="note">
          <strong>ℹ️ Important:</strong> The award shall be final and binding on the parties. The parties shall carry
          out the award without delay.
        </div>
      </div>
    </div>

    {/*  ARTICLE 10  */}
    <div className="article" id="article-10">
      <div className="article-header">
        <span className="article-number">ARTICLE 10</span>
        <h2 className="article-title"> Awards</h2>
      </div>
      <div className="article-content">
        <p>Within <strong>five (5) calendar days</strong> after the receipt of the award, a party, with notice to the
          other party, may request the Arbitrator to correct in the award any error in computation, any clerical or
          typographical error, or any error or omission of a similar nature.</p>
        <p>If the Arbitrator considers that the request is justified, he or she shall make the correction including a
          brief statement of reasons within <strong>two (2) calendar days</strong> of receipt of the request. Such
          corrections shall be submitted to the UTKAL ODR platform and shall form part of the award.</p>
        <p>The Arbitrator may make such corrections on its own initiative.</p>
      </div>
    </div>

    {/*  ARTICLE 11  */}
    <div className="article" id="article-11">
      <div className="article-header">
        <span className="article-number">ARTICLE 11</span>
        <h2 className="article-title">Settlement</h2>
      </div>
      <div className="article-content">
        <p>If settlement is reached at any stage of the UTKAL ODR proceedings, the terms of such settlement shall be
          submitted to the UTKAL ODR platform, at which point, the UTKAL ODR proceedings will automatically terminate.
        </p>
      </div>
    </div>

    {/*  ARTICLE 12  */}
    <div className="article" id="article-12">
      <div className="article-header">
        <span className="article-number">ARTICLE 12</span>
        <h2 className="article-title">Appointment of Neutral (Mediator/Arbitrator)</h2>
      </div>
      <div className="article-content">
        <p>UTKAL ADMINISTRATOR shall appoint the neutral (Mediator/Arbitrator) promptly following commencement of the
          mediation and Arbitration stage of proceedings. Upon appointment of the neutral (Mediator/Arbitrator), the
          UTKAL ODR shall promptly notify the parties of the name of the neutral (Mediator/Arbitrator) and any other
          relevant or identifying information in relation to that neutral (Mediator/Arbitrator).</p>
        <div className="subsection-title">Appointment Confirmation</div>
        <p>The neutral (Mediator/Arbitrator), by accepting appointment, confirms that he or she can devote the time
          necessary to conduct the UTKAL ODR proceedings diligently, efficiently and in accordance with the time limits
          in the Rules.</p>
        <div className="subsection-title">Declaration of Impartiality</div>
        <p>The neutral (Mediator/Arbitrator) shall, at the time of accepting his or her appointment, declare his or her
          impartiality and independence. The neutral (Mediator/Arbitrator), from the time of his or her appointment and
          throughout the UTKAL ODR proceedings, shall without delay, disclose to the UTKAL ODR, any circumstances likely
          to give rise to justifiable doubts as to his or her impartiality or independence.</p>
      </div>
    </div>

    {/*  ARTICLE 13  */}
    <div className="article" id="article-13">
      <div className="article-header">
        <span className="article-number">ARTICLE 13</span>
        <h2 className="article-title">Resignation or Replacement of Neutral</h2>
      </div>
      <div className="article-content">
        <p>If the neutral (Mediator/Arbitrator) resigns or otherwise has to be replaced during the course of UTKAL ODR
          proceedings, the UTKAL ODR shall appoint a neutral (Mediator/Arbitrator) to replace him or her pursuant to
          Article 12. The UTKAL ODR proceedings shall resume at the stage where the neutral (Mediator/Arbitrator) that
          was replaced ceased to perform his or her functions.</p>
      </div>
    </div>

    {/*  ARTICLE 14  */}
    <div className="article" id="article-14">
      <div className="article-header">
        <span className="article-number">ARTICLE 14</span>
        <h2 className="article-title">Powers of the Neutral</h2>
      </div>
      <div className="article-content">
        <p>Subject to the Rules, the neutral may conduct the UTKAL ODRproceedings in such manner as he or she considers
          appropriate.</p>
        <div className="subsection-title">Conduct of Proceedings</div>
        <p>The neutral (Mediator/Arbitrator), in exercising his or her functions under the Rules, shall conduct the
          UTKAL ODRproceedings so as to avoid unnecessary delay and expense and to provide a fair and efficient process
          for resolving the dispute. In doing so, the neutral (Mediator/Arbitrator) shall remain at all times wholly
          independent and impartial and shall treat both parties equally.</p>
        <div className="subsection-title">Decision-Making Authority</div>
        <ul className="bullet-points">
          <li>The neutral (Mediator/Arbitrator) shall conduct the UTKAL ODRproceedings on the basis of all
            communications made during the proceedings.</li>
          <li>At any time during the proceedings, the neutral may request or allow the parties to provide additional
            information, produce documents, exhibits or other evidence.</li>
          <li>The neutral (Mediator/Arbitrator) shall have the power to rule on his or her own jurisdiction, including
            any objections with respect to the existence or validity of any agreement to refer the dispute.</li>
          <li>The neutral (Mediator/Arbitrator), after making such inquiries as necessary, may, in his or her
            discretion, extend any deadlines under these RULES.</li>
        </ul>
      </div>
    </div>

    {/*  ARTICLE 15  */}
    <div className="article" id="article-15">
      <div className="article-header">
        <span className="article-number">ARTICLE 15</span>
        <h2 className="article-title">Deadlines</h2>
      </div>
      <div className="article-content">
        <p>The UTKAL ODR ADMINISTRATOR, or, if relevant, NEUTRAL (Mediator/Arbitrator), shall notify parties of all
          relevant deadlines during the course of proceedings.</p>
      </div>
    </div>

    {/*  ARTICLE 16  */}
    <div className="article" id="article-16">
      <div className="article-header">
        <span className="article-number">ARTICLE 16</span>
        <h2 className="article-title">Dispute Resolution Clause</h2>
      </div>
      <div className="article-content">
        <p>The UTKAL ODRplatform shall be specified in the dispute resolution clause or subject to the agreement by the
          parties.</p>
      </div>
    </div>

    {/*  ARTICLE 17  */}
    <div className="article" id="article-17">
      <div className="article-header">
        <span className="article-number">ARTICLE 17</span>
        <h2 className="article-title">Language of Proceedings</h2>
      </div>
      <div className="article-content">
        <p>The UTKAL ODRproceedings shall take place in the language of the agreement to submit disputes to ODR under
          the Rule or in the absence of such agreement; the UTKAL ODR shall determine the language or languages to be
          used in the proceedings.</p>
        <p>In the event that a party indicates in a Request or response that it wishes to proceed in another language,
          the UTKAL ODR shall identify available languages that the parties can select for the proceedings, and the
          UTKAL ODRproceedings shall be conducted in the language or languages that the parties select.</p>
      </div>
    </div>

    {/*  ARTICLE 18  */}
    <div className="article" id="article-18">
      <div className="article-header">
        <span className="article-number">ARTICLE 18</span>
        <h2 className="article-title">Representation</h2>
      </div>
      <div className="article-content">
        <p>A party may be represented or assisted by a person or persons chosen by that party. The names and designated
          electronic addresses of such persons and the authority to act must be communicated to the other party by the
          UTKAL ODR.</p>
      </div>
    </div>

    {/*  ARTICLE 19  */}
    <div className="article" id="article-19">
      <div className="article-header">
        <span className="article-number">ARTICLE 19</span>
        <h2 className="article-title">Exclusion of Liability</h2>
      </div>
      <div className="article-content">
        <p>Save for intentional wrongdoing, the parties waive, to the fullest extent permitted under the applicable law,
          any claim against the UTKAL ODR and neutral (Mediator/Arbitrator) based on any act or omission in connection
          with the UTKAL ODR proceedings under the Rules.</p>
      </div>
    </div>

    {/*  ARTICLE 20  */}
    <div className="article" id="article-20">
      <div className="article-header">
        <span className="article-number">ARTICLE 20</span>
        <h2 className="article-title">Allocation of Costs at the Arbitration Stage</h2>
      </div>
      <div className="article-content">
        <p>The costs of the arbitration shall in principle be borne by the unsuccessful party or parties. However, the
          UTKAL ODR /Arbitrator may apportion each of such costs between the parties in the award if it determines that
          apportionment is reasonable, taking into account the circumstances of the case.</p>
      </div>
    </div>

    {/*  ARTICLE 21  */}
    <div className="article" id="article-21">
      <div className="article-header">
        <span className="article-number">ARTICLE 21</span>
        <h2 className="article-title">Definition of Costs</h2>
      </div>
      <div className="article-content">
        <p>The term 'costs' includes:</p>
        <ul className="bullet-points">
          <li>The fees of UTKAL ODR platform and the neutrals (Mediator/Arbitrator) fixed by the UTKAL ODR</li>
          <li>The reasonable costs of expert advice and of other assistance required by the neutral (Arbitrator) during
            the Arbitration Stage</li>
          <li>Legal and other costs incurred by the parties during the Arbitration Stage</li>
          <li>Any other fees and expenses of the UTKAL ODR platform</li>
        </ul>
      </div>
    </div>

  </div>

  


  {/*  Bootstrap JS  */}
  

    {/*  Hidden Google Translate Element  */}
    <div id="google_translate_element" style={{}}></div>
    
    

    </div>
  );
}

export default OdrRules;
