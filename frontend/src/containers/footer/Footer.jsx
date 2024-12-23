import React from 'react'

import './Footer.css'

import Contact from '../../components/contact/Contact'
import ContactForm from '../../components/contactform/ContactForm'

import {ReactComponent as Facebook} from '../../assets/facebook.svg'
import {ReactComponent as Instagram} from '../../assets/instagram.svg'


function Footer() {
  return (
    <footer className='footer' id='footer'>
      <div className='footer__topSection'>

        <div className='footer__leftSection'>
          <p> Catch Us Here</p>

          <h1>We’d love to hear from you </h1>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec posuere mi sed dui lacinia, vitae aliquet ex pulvinar.
            Mauris facilisis.</p>

          <Contact />

          <div className='footer__map'>
            <div className="iframe-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30137.288008990927!2d72.82510433518108!3d19.231813819282113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b128b333e163%3A0x985640540577af7e!2sBorivali%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721273737535!5m2!1sen!2sin" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title='location map'
                >
              </iframe>
            </div>
        </div>

        

        </div>

        <div className='footer__middleLine'></div>

        <div className='footer__rightSection'>
          <div className='footer__rightContainer'>
            <p>Make Custom Request</p>

            <h1>Tell me about your query </h1>

            <ContactForm />
          </div>
        </div>

      </div>


      <div className='footer__botttomSection'>
        <div className='footer__contact'>
            <div className='footer__contact-text'>
              <h1>MD ENTERPRISE</h1>

              <p>Your trusted partner for comprehensive accounting and taxation services in Mumbai.</p>

            </div>

            <div className='footer__contact-details'>
              <h1>Contact</h1>

              <p>A16, Patel Shopping Center, Chandavarkar Rd,<br />Shanti Nagar, Borivali West, Mumbai,< br/>Maharashtra 400091</p>

              <div className='footer__contact-container'>
                <div className='footer__contact-phoneEmail'>
                  <h3>Phone: +91 9874563211</h3>
                  <h3>Email: mithilesh@md.co.in</h3>
                </div>

              </div>

            </div>

            <div className='footer__contact-socialLinks'>
              <h1>Social Media</h1>
              <a href='https://www.facebook.com/' target='_blank' className='footer__socialicon-container'>
              <Facebook className='footer__contact-facebook'/>
                Facebook

              </a>

              <a href='https://www.instagram.com/?hl=en' target='_blank' className='footer__socialicon-container'>
                
                <Instagram className='footer__contact-instagram'/>Instagram
              
              </a>

            </div>

        </div>
        <div className='footer__copyright'>
          <p>©2024 MD Enterprise. All rights reserved.</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer