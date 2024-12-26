import React from 'react';
import './GstRegistration.css';
import ServiceNavbar from './ServiceNavbar';
import { Link } from 'react-router-dom';

const GSTRegistration = () => {
  return (
    <div className="gst-container">
     <ServiceNavbar />
     {/* Overview Section */}

      <section className="gst-section overview">
        <h1>GST Registration Services</h1>
        <p>
          GST (Goods and Services Tax) registration is mandatory for businesses with annual revenue
          exceeding the threshold limit. Our expert team helps you with hassle-free GST registration 
          ensuring compliance with the law.
        </p>
      </section>

      {/* Documents Required Section */}
      <section className="gst-section documents">
        <h2>Documents Required for GST Registration</h2>
        <ul>
          <li>PAN Card of the Business or Applicant</li>
          <li>Identity Proof (Aadhaar Card, Driving License, or Passport)</li>
          <li>Address Proof of Business (Electricity Bill, Rent Agreement, etc.)</li>
          <li>Bank Account Details (Cancelled Cheque, Passbook)</li>
          <li>Photograph of the Applicant</li>
        </ul>
      </section>

      {/* Contact Button Section */}
      <section className="gst-section-button">
        <Link to='/contactus' className='gst-section-button'>   Submit Documents for GST Registration   </Link>
      </section>
    </div>
  );
};

export default GSTRegistration;
