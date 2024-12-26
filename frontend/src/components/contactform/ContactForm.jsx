import React, { useState } from 'react';
import { useSendEmailMutation } from '../../state/api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error | info
  const [sendEmail, {isLoading}] = useSendEmailMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEmail(formData).unwrap();
      setSnackbarMessage(response.message || 'Email sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSnackbarMessage(error?.data?.message || 'Failed to send message. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form className='contactform' onSubmit={handleSubmit}>
      <div className='contactform__name'>
        <div>
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
      <button type="submit" disabled={isLoading} style={{ cursor: "pointer" }}>
        {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontSize: '1.5rem', // Adjust font size
            '& .MuiAlert-action .MuiButtonBase-root': {
              fontSize: '1rem', // Adjust close button size
              padding: '0',   // Adjust padding to make it smaller
            },
          }}
        >
          {snackbarMessage}
          </Alert>
        </Snackbar>

    </form>
  );
};

export default ContactForm;
