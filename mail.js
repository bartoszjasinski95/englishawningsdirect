var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bartoszjasinski01@gmail.com',
    pass: '4740570xDD'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'bartoszjasinski01@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});