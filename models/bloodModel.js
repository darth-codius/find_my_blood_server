// This is the model for the blood units in the bloodbank

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the blood using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const bloodSchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        required: ['true', 'Input the type of blood'],
        select: ['False']
    },
    units: {
        type: Number,
        required: ['true', 'Input the amount of units'],
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Hospital'
       }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});


bloodSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'hospital',
        select: '_id name state address'
    })

    next()
})

// creates the blood using the mongoose model() method which takes in the name of the model and the Schema(in our case userSchema)
const Blood = mongoose.model('Blood', bloodSchema)

// Exporting the blood model.
module.exports = Blood;