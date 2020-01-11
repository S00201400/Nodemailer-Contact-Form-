//calling all the dependencies that we install

const express = require ('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require ('nodemailer');
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// //Body Parser Middleware
 app.use(bodyParser.urlencoded({ extended: false}));

app.listen(3000, () => console.log('Server started ...'));

app.get("/", (req, res) => {
    res.send(
      "<h1 style='text-align: center'>Wellcome to Contact Form</h1>"
    );
  });


//this is taking all the information that I need from the contact form 
app.post('/send', (req , res) => {
    console.log("request came");
  let output = `
    <p> You have a new contact request </p>
    <h3> Contact Details </h3>
    <ul>
     <li> Name: ${req.body.name}</li>
     <li> Email: ${req.body.email}</li>
    </ul>
    <h3> Message </h3>
    <p> ${req.body.message}</p>
    `;

    sendMail( output, info => {
    console.log(`The mail has beed send `);
    res.send(info);
    });
  
});

//nodemailer code

async function sendMail(output, callback) {
//for our server
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({

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
    from: '"Nodemailer Contact Form"<iulia.severin12@gmail.com> ', // sender address
    to: "Sligoyg@gmail.com", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Contact Form", // plain text body
    html: output // html body
  };

let info = await transporter.sendMail(mailOptions);
callback(info);
}


