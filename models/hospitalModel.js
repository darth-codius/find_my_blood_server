// This is the model for the Hospitals which are the users.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the hospital user using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ['true', 'Input your hospital name'],
    },
    email: {
        type: String,
        required: ['true', "Input your hospital's email"],
    },
    password: {
        type: String,
        required: ['true', "Input your hospital's password"]
    },
    phoneNumber: {
        type: Number,
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    motto: {
        type: String
    },
    logoUrl: {
        type: String
    }

});

// creates the Hospital user using the mongoose model() method which takes in the name of the model and the Schema(in our case userSchema)
const Hospital = mongoose.model('Hospital', hospitalSchema)

// Exporting the Hospital user model.
module.exports = Hospital;