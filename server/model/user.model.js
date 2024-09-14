// user.model.js (in the model folder)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    User_Name: {
        type: String,
        required: true,
    },
    Phone_Number: {
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type: Date,
        required: true,
    }
});

const userModel = model('User', UserSchema);

module.exports = userModel;
