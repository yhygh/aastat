const express    = require('express'),
	  router     = express.Router(),
	  bodyParser = require('body-parser');


require('dotenv').config();
var	  nodemailer = require('nodemailer');

router.get('/', function(req, res) {
	res.render('email/emailus', {msg: null});
})

// TODO: need to add security stuff once a new hosting service is purchased
router.post('/send', function(req, res) {
    req.body.message = req.sanitize(req.body.message);

	const output = `
	    <p>You have sent out a new contact request to aastatsmart.com</p>
	    <h3>Contact Details</h3>
	    <ul>
	        <li>Name: ${req.body.name}</li>
	        <li>Email: ${req.body.email}</li>
	    </ul>
	    <h3>Message</h3>
	    <p>${req.body.message}</p>
	`;

	// create reusable transporter object using the default SMTP transport
	 let transporter = nodemailer.createTransport({
	 	// host: 'smtp.gmail.com',
		  service: 'gmail',
			// port: 465,
	    // secure: true, // true for 465, false for other ports
	    auth: {
				// type: 'OAUTH2',
	        user: process.env.EMAIL, 
	        pass: process.env.PASSWORD,
					// acessToken: 'tqpwckjcpwsxbgnh'
	    },
	    tls:{
	      rejectUnauthorized:false
	    }
	});

	// setup email data with unicode symbols
	let mailOptions = {
	    // from: '"AAStatsmart" <jwu@alumni.unc.edu>', // sender address, i.e. your website email
	    // from: '"AAStatsmart" <yhyrvbd@gmail.com>', // sender address, i.e. your website email
	    from: '"AAStatsmart" <shenshaa@gmail.com>', // sender address, i.e. your website email			
	    to: req.body.email, // list of receivers, i.e. user's email
			// bcc: 'jwu@alumni.unc.edu', // bcc to you, website owner
			bcc: 'shenshaa@gmail.com', // bcc to you, website owner			
	    subject: 'AA Statsmart Contact Request', // Subject line
	    html: output // html body
	};

	transporter.sendMail(mailOptions)
	    .then( (info) => {
	    	console.dir(info);
	    	// console.log('Message sent: %s', info.messageId);   
	    	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			res.render('email/emailus', {msg:'Thanks, your email has been successfully sent.'});

		} )
	    .catch( (error) => {
	        console.log(error);
	        res.render('email/contact-failure');
	    } )

})

module.exports = router;
