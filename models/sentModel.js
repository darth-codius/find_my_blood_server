// This is the model sent requests

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the sent record using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const sentSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now,
        required: ['true']
    },
    blood: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Blood'
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
});

// populate the sentSchema
sentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'blood',
        select: 'bloodGroup units hospital'
    });

    this.populate({
        path: 'hospital',
        select: 'name state address'
    });

    next();
});


// creates the sent record using the mongoose model() method which takes in the name of the model and the Schema(in our case sentSchema)
const Sent = mongoose.model('Sent', sentSchema);

// Exporting the sent record model.
module.exports = Sent;