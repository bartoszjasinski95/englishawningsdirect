const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
var bodyParser = require('body-parser');



const auth = {
    auth: {
        api_key:'key-4114a9d367a311fd7ba49871c49b7f99',
        domain: 'sandboxd4d0a39f2aa949f8bbb6ad56bc25eed7.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

//Chunk 4

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to:'englishawningsdirect@gmail.com',
        subject,
        text
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
    
        }
    });
}


module.exports = sendMail;

