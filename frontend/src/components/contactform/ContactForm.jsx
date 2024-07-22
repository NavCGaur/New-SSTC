import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await axios.post('http://localhost:5000/send-email', formData);
      setStatus(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <form className='contactform' onSubmit={handleSubmit}>
      <div className='contactform__name'>
        <div >
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern='[0-9]*'
          placeholder='Phone Number'
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>


      <div>
        <textarea
          id="message"
          name="message"
          placeholder='Your Query'
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className='contactform__button'>
      <button type="submit">Send</button>

      </div>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ContactForm;