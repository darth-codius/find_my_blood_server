const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospitalModel.js');

// controller for signup of a Hospital
exports.signup = async (req, res, next) => {

    try {

        // input validation product
        if (req.body.password !== req.body.confirmPassword) {
            res.send(`password and confirm password doesn't match`);
        }
        // check exists
        let checkEmail = await Hospital.findOne({ email: req.body.email})
        if (checkEmail){
            console.log(checkEmail)
            res.status(401).json({
                status: 'failed',
                message: 'email already exists'
            })
        }
        // hash password
        console.log(req.body.password)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let theHospital = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        }

        // creates the user in database
        const hospital = await Hospital.create(theHospital)

        // nodemailer function goes here.


        res.status(201).json({
            status: 'success',
            data: hospital,
            message: 'An email has been sent to your given email address'
        })
        
    } catch(err) {
        console.log(err);
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
            checkEmail.token = jwt.sign( checkEmail.email, process.env.SECRET_KEY)
            res.status(201).json({
                status: 'success',
                data: checkEmail
            })
        }
        else {
            console.log(req.body.password + " " + checkEmail.password);
            res.status(400).json({
                status: 'fail',
                message: 'Wrong password'
            })
         } 
        }
         catch(err) {
             console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}