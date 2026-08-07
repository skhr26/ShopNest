const nodemailer = require('nodemailer');

const sendEmail = async (payload, subject, text) => {
  try {
    console.log('sendEmail called with:', { payload, subject, text });

    let recipient = '';
    let subjectText = '';
    let messageText = '';

    // Determine recipient, subject, message
    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      recipient    = payload.email   || payload.to      || '';
      subjectText  = payload.subject || subject         || 'No subject';
      messageText  = payload.message || payload.text    || text || '';
    } else {
      recipient    = payload;
      subjectText  = subject || 'No subject';
      messageText  = text    || '';
    }

    console.log('Resolved email fields:', { recipient, subjectText, messageText });

    if (!recipient) {
      throw new Error('No recipient email was provided.');
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials are not configured. Check EMAIL_USER and EMAIL_PASS.');
    }

    console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

    
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

let mailOptions = {
  from: process.env.EMAIL_USER,
  to: recipient,
  subject:subjectText,
  text:messageText
};

await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  } catch (err) {
    console.error('Email send failed:', err);
    return false;
  }
};

module.exports = sendEmail;