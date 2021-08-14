// This is the model for the blood units in the bloodbank

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the blood using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const requestHistorySchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now,
        required: ['true'],
    },
    blood: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Blood'
    },
    status: {
        type: String,
        enum: {
            values: ['accepted', 'rejected', 'pendings'],
            message: "status can either be 'accepted' or 'rejected' or 'pending'!"
        }

    }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});


bloodSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'blood',
        select: 'bloodgroup unit hospital'
    })

    next()
})

// creates the blood using the mongoose model() method which takes in the name of the model and the Schema(in our case userSchema)
const Request = mongoose.model('Request', requestHistorySchema)

// Exporting the blood model.
module.exports = Request;