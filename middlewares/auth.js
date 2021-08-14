// This is a middleware for the Json Web Token authorization
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospitalModel');
const mongoose = require('mongoose');



const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        const email = jwt.verify(token, process.env.SECRET_KEY);
        const hospital = await Hospital.findOne({email: email})
        req.hospital = hospital;
        next()
    } catch (error) {
        console.error(error);
        console.error(token);
        res.json({
            Status: 'Failed!',
            message:"Please Login!"
        })
    }
}

module.exports = auth;