// These are the controller functions to be called when accessing certain routes
const mongoose = require('mongoose');
const Blood = require('../models/bloodModel.js');

// Controller for getting list of all owned blood by a particular hospital.
exports.getAllBlood = async (req, res, next) => {
     console.log("got here");
     console.log(req.hospital._id);
    try {
       
        const blood = await Blood.find({hospital: req.hospital._id});
        
        res.status(201).json({
            status: 'success',
            message: 'Your blood units',
            data: blood
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.searchBlood = async (req, res, next) => {
    try {
        const blood = await Blood.find({bloodGroup: req.body.bloodGroup})
        
        res.status(201).json({
            status: 'success',
            message: 'Found blood units',
            data: blood
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

// controller for creating a new blood group.
exports.createBloodGroup = async (req, res, next) => {
console.log(req.hospital)
    try {

        // input validation product
        let checkBlood = await Blood.findOne({ bloodGroup: req.body.bloodGroup, hospital: req.hospital._id})
        // check exists
        if (checkBlood){
            res.status(401).json({
                status: 'fail',
                message: 'That blood group already exists',
                data: checkBlood
            })
        }
        else {
            const blood = await Blood.create({...req.body, hospital: req.hospital._id})
            
            res.status(201).json({
                status: "success",
                message: 'successfully created',
                data: blood
            })
        }
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

// controller for updating blood, including adding to existing blood
exports.updateBlood = async (req, res, next) => {

    try {
        const blood = await Blood.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
        
        res.status(200).json({
            status: 'success',
            message: 'Updated blood',
            data: blood
        })
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}