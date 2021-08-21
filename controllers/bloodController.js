// These are the controller functions to be called when accessing certain routes
const mongoose = require('mongoose');
const Blood = require('../models/bloodModel.js');

exports.getAllBlood = async (req, res, next) => {
    try {
        const blood = await Blood.find({hospital: req.hospital._id})
        
        res.status(201).json({
            status: 'success',
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


exports.createBloodGroup = async (req, res, next) => {
console.log(req.hospital)
    try {

        // input validation product
        let checkBlood = await Blood.findOne({ bloodGroup: req.body.bloodGroup})
        // check exists
        if (checkBlood){
            res.status(401).json({
                status: 'That blood group already exists',
                data: checkBlood
            })
        }
        else {
            const blood = await Blood.create({...req.body, hospital: req.hospital._id})
            
            res.status(201).json({
                status: 'successfully created',
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

exports.updateBlood = async (req, res, next) => {

    try {
        const blood = await Blood.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
        
        res.status(200).json({
            status: 'success',
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