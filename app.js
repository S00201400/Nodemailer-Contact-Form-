//calling all the dependencies that we install
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder - defineing as public
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route
app.get('/', function(req, res) {
  return res.send('Hello the API is at http://localhost:' + '/api');
});

//this is taking all the information that I need from the contact form
app.post('/send', (req, res) => {
  const output = `
    <p> You have a new contact request </p>
    <h3> Contact Details </h3>
    <ul>
     <li> Name: ${req.body.name}</li>
     <li> Email: ${req.body.email}</li>
     <li> Member or Volunteer: ${req.body.userType}</li>
    </ul>
    <h3> Message </h3>
    <p> ${req.body.message}</p>
    `;

  //nodemailer code

  //for our server
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //  host: "iulia.severin12@smtp.gmail.com",
    //  port: 587,
    service: 'gmail',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'Sligoyg@gmail.com', // generated ethereal user
      pass: 'sligoyouthgroup' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //setup email data with unicode symbols
  // send mail with defined transport object
  let mailOptions = {
    from: '"SYG Contact Form" <Sligoyg@gmail.com>', // sender address
    to: 'Sligoyg@gmail.com', // list of receivers
    subject: 'SYG Contact Request', // Subject line
    html: output // html body
  };

  //send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
});
app.listen(port);
console.log('Server started ...');
console.log(port);
