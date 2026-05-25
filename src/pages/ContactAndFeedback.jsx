import React from 'react';
import ContactUs from '../components/Contactus/ContactUs';
import Feedback from '../components/Feedback/Feedback';

const ContactAndFeedback = () => {
  return (
    <div style={{ display: 'flex', gap: 32, padding: 24, flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 420px', minWidth: 320 }}>
        <ContactUs />
      </div>
      <div style={{ flex: '1 1 420px', minWidth: 320 }}>
        <Feedback />
      </div>
    </div>
  );
};

export default ContactAndFeedback;
