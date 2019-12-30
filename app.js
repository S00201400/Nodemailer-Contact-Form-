//calling all the dependencies that we install

const express = require ('express');
const bodyParser = require("body-parser");
const exphbs = require ('express-handlebars');
const path= require ('path');
const nodemailer = require ('nodemailer');

const app = express();

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Static folder - defineing as public 
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//route
app.get('/', (req, res)=> {
    res.render('contact', {layout: false});
});

//this is taking all the information that I need from the contact form 
app.post('/send', (req , res) => {
    res.render('contact', {layout: false});
    //console.log(req.body);
    const output = `
    <p> You have a new contact request </p>
    <h3> Contact Details </h3>
    <ul>
     <li> Name: ${req.body.name}</li>
     <li> Company: ${req.body.company}</li>
     <li> Email: ${req.body.email}</li>
     <li> Phone: ${req.body.phone}</li>
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
      user: "iulia.severin12@gmail.com", // generated ethereal user
      pass: "khkaqfubvlggvxho" // generated ethereal password
    },
    tls:{
        rejectUnauthorized : false
    }
    
  });
//setup email data with unicode symbols

  // send mail with defined transport object
  let mailOptions = {
    from: '"Nodemailer Contact" <iulia.severin12@gmail.com>', // sender address
    to: "Maria.Severin@mail.itsligo.ie", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

//send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error){
        return console.log(error);
    }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('contact', {layout: false}, {msg:'Email has been sent'});
});

});
app.listen(3000, () => console.log('Server started ...'));
