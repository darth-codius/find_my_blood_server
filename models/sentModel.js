// This is the model sent requests

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the sent record using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const sentSchema = new mongoose.Schema({
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


sentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'hospital',
        select: '_id name state address'
    })

    next();
});


// creates the sent record using the mongoose model() method which takes in the name of the model and the Schema(in our case sentSchema)
const Sent = mongoose.model('Sent', sentSchema);

// Exporting the sent record model.
module.exports = Sent;