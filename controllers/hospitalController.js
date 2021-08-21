const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospitalModel.js');
const Recieved = require('../models/recievedModel.js');
const Sent = require('../models/sentModel.js');
const {signUpMailer} = require('../middlewares/nodemailer.js');

// controller for signup of a Hospital
exports.signup = async (req, res, next) => {

    try {
        // check exists
        let checkEmail = await Hospital.findOne({ email: req.body.email})
        // input validation product
        if (req.body.password !== req.body.confirmPassword) {
            return res.send(`password and confirm password doesn't match`);
        }
        
        else if(checkEmail){
            return res.status(401).json({
                status: 'failed',
                message: 'email already exists'
            })
        }else{
        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let theHospital = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        }

        // creates the user in database
        const hospital = await Hospital.create(theHospital)

        // nodemailer function goes here.
        console.log(req.body.name, req.body.email);
        signUpMailer( req.body.name, req.body.email);

        res.status(201).json({
            status: 'success',
            data: hospital,
            message: 'An email has been sent to your given email address'
        })}
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.update = async (req, res, next) => {
    console.log(req.file)
    const {phoneNumber, address, state, motto} = req.body
    const logo = req.file.path
    
    try {
        
        const hospital = await Hospital.findByIdAndUpdate({ _id: req.params.id}, {
            phoneNumber,
            address,
            state,
            motto,
            logo
        }, {
            new: true
        }
        )
        
        res.status(200).json({
            status: 'success',
            data: hospital
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.signin = async (req, res, next) => {

    try {
        let checkEmail = await Hospital.findOne({ email: req.body.email})
        if (!checkEmail){
            console.log(checkEmail)
            res.status(401).json({
                status: 'failed',
                message: 'No user with that email was found'
            })

        }
        if (await bcrypt.compare(req.body.password , checkEmail.password)){
            console.log(req.body.password + " " + checkEmail.password);

            // creating the token from the email and secret
            token = jwt.sign( checkEmail.email, process.env.SECRET_KEY)
            res.status(201).json({
                status: 'success',
                token,
                data: checkEmail
            });
        }
        else {
            console.log(req.body.password + " " + checkEmail.password);
            res.status(400).json({
                status: 'fail',
                message: 'Wrong password'
            });
         } 
        }
         catch(err) {
             console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

exports.delete = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndDelete({ _id: req.params.id}, {
            useFindAndModify: false
        });
        
        res.status(200).json({
            status: 'successfully deleted',
            data: hospital
        });
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

exports.forgotPassword = async (req, res, next) => {
    try {
        let checkEmail = await Hospital.findOne({ email: req.body.email})
        if (!checkEmail){
            console.log(checkEmail)
            res.status(401).json({
                status: 'failed',
                message: 'No user with that email was found'
            })
        }else {
          let code = Math.floor(Math.random() * 1000000)   
        }
        
    } catch (err) {
        res.status(400).json({

        })
    }
}

exports.getHospital = async (req, res, next)=>{
    const hospital = await Hospital.findById({ _id: req.params.id})
    if (!hospital) {
        res.status(401).json({
            status: 'failed',
            message: 'No Hospital found'
        })
    } else {
        res.status(200).json({
            status: 'successful',
            data: hospital
        });
    }
}