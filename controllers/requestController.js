const mongoose = require('mongoose');

const Sent = require('../models/sentModel');
const Recieved = require('../models/recievedModel');
const Hospital = require('../models/hospitalModel');
const Blood = require('../models/bloodModel');

exports.getAllrecords = async (req, res, next) => {
    try {
        const recieved = await Recieved.find({hospital: req.hospital._id})
        const sent = await Sent.find({hospital: req.hospital._id})
        
        res.status(201).json({
            status: 'success',
            sentRequest: sent,
            recievedRequest: recieved

        });
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

exports.createRequest = async (req, res, next)=>{
    try {
        const requestedUnits = req.body.units;
        let requestingHospital = await Hospital.findById({ _id: req.params.id});
        requestingHospital = requestingHospital.name;
        const status = "pending";
        const blood = req.body.bloodGroup;
        const stamp = Date.now();  // To be used for identifying the pair in both sent and recieved database document.

        // This creates the database record for sent requests.
        const request = await Sent.create({
            timeStamp: stamp, requestedUnits, requestingHospital, status, blood, hospital: req.hospital._id
        });

        // This creates the database record for recieved requests.
        await Recieved.create({
            timeStamp: stamp,requestedUnits, requestingHospital, status, blood, hospital: req.body.bloodHospitalId
        });
            
            res.status(201).json({
                status: 'Request sent',
                data: blood
            });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
    next();
}


exports.requestAction = async (req, res, next)=>{
    
    try {
        const action = req.body.action;
        const request = await Recieved.findById({ _id: req.body.id });
        const bloodOwned = await Blood.findOne({ bloodGroup: req.body.bloodGroup, hospital: req.hospital._id});

        if ((request.requestedUnits > bloodOwned.units) && (action === "accepted")) {
            res.status(409).json({ 
                message: "You do not have sufficient Units of the requested Blood Group"
            });
        } 
        if ((request.requestedUnits < bloodOwned.units) && (action === "accepted")){
            await Recieved.findByIdAndUpdate({ _id: req.body.id }, {status: action}, { new: true } );
            await Sent.findOneAndUpdate(
                { 
                    timeStamp : request.timeStamp,
                    name:  request.requestingHospital , 
                    requestedUnits:  request.requestedUnits,
                    blood: request.blood,
                }, 
                {status: action}, 
                { new: true } );
                bloodOwned.units -= request.requestedUnits  
                res.status(200).json({
                    message: 'Request has been ACCEPTED'
                });

        }
        if((request.requestedUnits < bloodOwned.units) && (action === "rejected")){
            await Recieved.findByIdAndUpdate({ _id: req.body.id }, {status: action}, { new: true } );
            await Sent.findOneAndUpdate(
                { 
                    timeStamp : request.timeStamp,
                    name:  request.requestingHospital , 
                    requestedUnits:  request.requestedUnits,
                    blood: request.blood,
                }, 
                {status: action}, 
                { new: true } );
                res.status(200).json({
                    message: 'Request has been REJECTED'
                });
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
    next();
}