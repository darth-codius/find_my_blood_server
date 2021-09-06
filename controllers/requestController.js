// This is the controller for handling requests from hospitals.

const Sent = require('../models/sentModel');
const Recieved = require('../models/recievedModel');
const Hospital = require('../models/hospitalModel');
const Blood = require('../models/bloodModel');


// controller for getting a list of request records made.
exports.getAllrecords = async (req, res, next) => {
    try {
        console.log(req.body.hospital);
        const recieved = await Recieved.find({requestingHospital: req.body.hospital})
        const sent = await Sent.find({hospital: req.hospital._id})
        
        
        res.status(201).json({
            status: 'success',
            message: 'These are your records',
            data: {sentRequest: sent, recievedRequest: recieved}

        });
        
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

// controller for creating a new request.
exports.createRequest = async (req, res, next)=>{
    try {
        const requestedUnits = req.body.units;
        let requestingHospitalObj = await Hospital.findById({ _id: req.params.id});
        let requestingHospital = requestingHospitalObj.name;
        const status = "accepted";
        const blood = req.body.bloodGroup;
        let bloodId = req.body.id;
        let hospitalsBlood = await Blood.findById({ _id : bloodId});
        const stamp = Date.now();  // To be used for identifying the pair in both sent and recieved database document.
        if (requestedUnits > hospitalsBlood.units) {
            res.status(409).json({ 
                status: "fail",
                message: "Your Father!, how will you request for more blood than I have?",
                data: {hospitalsBlood}
            });
        } else {
                // Deducting the blood units from the blood in the hospitals bank.
                let deductBlood = hospitalsBlood.units - requestedUnits;
                let hospitalsNewBlood = await Blood.findByIdAndUpdate({_id : bloodId}, { units: deductBlood}, { new: true });
                // This creates the database record for sent requests.
                const request = await Sent.create({
                    timeStamp: stamp, requestedUnits, requestingHospital, status, blood, hospital: req.hospital._id
                });

                // This creates the database record for recieved requests.
                await Recieved.create({
                    timeStamp: stamp,requestedUnits, requestingHospital, status, blood, hospital: req.body.bloodHospitalId
                });
                    
                    res.status(201).json({
                        status: 'success',
                        message: 'Request sent',
                        data: blood
                    });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error: error
        });
    }
    next();
}

// controllers for accepting or rejecting a request.
exports.requestAction = async (req, res, next)=>{
    
    try {
        const action = req.body.action;
        console.log(action);
        const request = await Sent.findById({ _id: req.body.id });
        console.log(request.timeStamp);
        const bloodOwned = await Blood.findOne({ bloodGroup: req.body.bloodGroup, hospital: req.hospital._id});
        console.log(bloodOwned.units);

        if ((request.requestedUnits > bloodOwned.units) && (action === "accepted")) {
            res.status(409).json({ 
                status: "fail",
                message: "You do not have sufficient Units of the requested Blood Group",
                data: {bloodOwned, requestedUnits: request}
            });
        } 
        if ((request.requestedUnits < bloodOwned.units) && (action === "accepted")){
            await Sent.findByIdAndUpdate({ _id: req.body.id }, {status: action}, { new: true } );
            await Recieved.findOneAndUpdate(
                { 
                    timeStamp : request.timeStamp,
                    requestedUnits:  request.requestedUnits,
                    blood: request.blood,
                }, 
                {status: action}, 
                { new: true } );
                bloodOwned.units -= request.requestedUnits  
                res.status(200).json({
                    status: "success",
                    message: 'Request has been ACCEPTED',
                    data: request
                });

        }
        if((request.requestedUnits < bloodOwned.units) && (action === "rejected")){
            await Sent.findByIdAndUpdate({ _id: req.body.id }, {status: action}, { new: true } );
            await Recieved.findOneAndUpdate(
                { 
                    timeStamp : request.timeStamp,
                    requestedUnits:  request.requestedUnits,
                    blood: request.blood,
                }, 
                {status: action}, 
                { new: true } );
                res.status(200).json({
                    status: "success",
                    message: 'Request has been REJECTED',
                    data: request
                });
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error
        });
    }
    next();
}