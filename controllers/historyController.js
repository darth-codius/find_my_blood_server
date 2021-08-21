const mongoose = require('mongoose');

const Sent = require('../models/sentModel');
const Recieved = require('../models/recievedModel');
const Hospital = require('../models/hospitalModel');

exports.getAllrecords = async (req, res, next) => {
    try {
        const recieved = await Recieved.find({hospital: req.hospital._id})
        const sent = await Sent.find({hospital: req.hospital._id})
        records = {recieved , sent}
        res.status(201).json({
            status: 'success',
            data: records
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.createRequest = async (req, res, next){
    try {
        const requestedUnits = req.body.units;
        let requestingHospital = await Hospital.findById({ _id: req.params.id});
        requestingHospital = requestingHospital.name;
        const status = "pending";
        // const hospital = 

    } catch (error) {
        
    }
}