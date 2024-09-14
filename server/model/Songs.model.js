// user.model.js (in the model folder)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SongsSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Genre: {
            type: String,
        },

        Duration :{
            type:String,
        },
    },
    { timestamps: true }
);

const SongsModel = model('Songs', SongsSchema);

module.exports = SongsModel;
