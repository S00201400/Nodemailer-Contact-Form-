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
    // console.log(req.body);
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
});

app.listen(3000, () => console.log('Server started ...'));
