import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="contact-page">
      {/* Auto-converted HTML */}
      

  <div className="container my-5">
    <div className="card shadow-sm">
      <div className="card-body p-4">

        {/*  Back Button  */}
        <div className="mb-3">
          <a href="index.html" className="btn btn-outline-secondary">
            ← Back
          </a>
        </div>

        <form id="contactForm">
        <h4 className="mb-4">Dispute Details</h4>

        {/*  Dispute Type  */}
        <div className="mb-3">
          <label className="form-label">Dispute type</label>
          <select className="form-select" id="disputeType">
            <option selected>Select Dispute</option>
            <option>Commercial</option>
            <option>Family</option>
            <option>Property</option>
          </select>
        </div>

        {/*  Dispute Name  */}
        <div className="mb-3">
          <label className="form-label">Dispute Name</label>
          <input type="text" className="form-control" id="disputeName" placeholder="Enter Dispute Name"/>
        </div>

        {/*  Dispute Amount  */}
        <div className="mb-4">
          <label className="form-label">Dispute Amount</label>
          <select className="form-select" id="disputeAmount">
            <option selected>Select Amount</option>
            <option>Below ₹1,00,000</option>
            <option>₹1,00,000 - ₹5,00,000</option>
            <option>Above ₹5,00,000</option>
          </select>
        </div>

        {/*  Customer Details  */}
        <h6 className="mb-3">Customer Details</h6>

        <div className="mb-3">
          <label className="form-label">Customers Name</label>
          <input type="text" className="form-control" id="customerName" placeholder="Enter Opposite Party Name"/>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="customerEmail" placeholder="Enter Opposite Party Email"/>
        </div>

        <div className="mb-3">
          <label className="form-label">MobileNumber</label>
          <input type="text" className="form-control" id="customerMobile" placeholder="Enter Opposite Party Mobile Number"/>
        </div>

        <div className="mb-4">
          <label className="form-label">AadharNumber</label>
          <input type="text" className="form-control" id="customerAadhar" placeholder="Enter Opposite Party Mobile Number"/>
        </div>

        {/*  Opposite Party Details  */}
        <h6 className="mb-3">Opposite Party Details</h6>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" id="oppositeName" placeholder="Enter Opposite Party Name"/>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="oppositeEmail" placeholder="Enter Opposite Party Email"/>
        </div>

        <div className="mb-4">
          <label className="form-label">Mobile Number</label>
          <input type="text" className="form-control" id="oppositeMobile" placeholder="Enter Opposite Party Mobile Number"/>
        </div>

        {/*  Consent  */}
        <div className="mb-4">
          <label className="form-label">Consent as per Data Protection Acts</label>
          <select className="form-select" id="consent">
            <option selected>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/*  File Upload  */}
        <div className="mb-4">
          <label className="form-label">Attach File</label>
          <input type="file" className="form-control" id="attachment"/>
        </div>

        {/*  Submit Button  */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </div>
        </form>

      </div>
    </div>
  </div>

  {/*  Bootstrap JS  */}
  

  {/*  Connect Form to Backend  */}
  

    {/*  Hidden Google Translate Element  */}
    <div id="google_translate_element" style={{}}></div>
    
    

    </div>
  );
}

export default Contact;
