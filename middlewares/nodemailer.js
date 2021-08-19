// This is
const nodemailer = require('nodemailer');

exports.signUpMailer = (name, email) => {
    const message = `<div>
        <h1>Sign-up Notification From findMyBlood App</h1>
        <p>Welcome ${name}, Your account has been created, 
        you can now : </p>
            <ul>
                <li>Login using your registered email ${email}, and your registered password</li>
                <li>Update your blood units</li>
                <li>Search for blood units</li>
            </ul>
        <p>Thank You</p>
    </div>`

    // create reusable transporter object using the default smtp transport
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "enejijonathan@gmail.com",
            password: "1996@gmail.com",
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: "enejijonathan@gmail.com",// sender address
        to: `${email}`,// list of recievedRequest
        subject: "Find My Blood Sign-up notification",//
        text: `Welcome ${name}, Your account has been created`,// subject
        html: message, // html body
    };
    // send mail with defined transport object
    transport.sendMail(mailOptions, (error, info) =>{
        if(error) {
            return console.log(error);
        }
        else{res.sendMail("Email has been sent")}
    });
    tls:{
        rejectUnauthorized:false
    };
}

exports.noticeMailer = (email) => {
    const message = `<div>
    <h1>Notification  From findMyBlood App</h1>
    <p>New blood unit transaction notification in your account</p>
    <p>Thank You</p>
    </div>`
    
    // create reusable transporter object using the default smtp transport
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "enejijonathan@gmail.com",
            password: "1996@gmail.com",
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: "enejijonathan@gmail.com",// sender address
        to: `${email}`,// list of recievedRequest
        subject: "Find My Blood transaction notification",//
        text: `New blood unit transaction notification`,// subject
        html: message, // html body
    };
    // send mail with defined transport object
    transport.sendMail(mailOptions, (error, info) =>{
        if(error) {
            return console.log(error);
        }
        res.sendMail("Email has been sent")
    });
    tls:{
        rejectUnauthorized:false
    };
}