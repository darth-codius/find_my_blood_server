// This is the model for the recieved requests

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the recieved record using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const recievedSchema = new mongoose.Schema({
    timeStamp: {
        type: Number,
        required: ['true']
    },
    blood: {
        type: String,
        required: ['true']
    },
    requestedUnits: {
        type: Number,
        required: ['true']
    },
    requestingHospital: {
        type: String,
        required: ['true']
    },
    status: {
        type: String,
        enum: {
            values: ['accepted', 'rejected', 'pending'],
            message: "status can either be 'accepted' or 'rejected' or 'pending'!",
        }

    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hospital'
       }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
}
);


// creates the recieved record using the mongoose model() method which takes in the name of the model and the Schema(in our case userSchema)
const Recieved = mongoose.model('Recieved', recievedSchema);

// Exporting the recieved record model.
module.exports = Recieved;