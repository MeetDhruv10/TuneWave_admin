// user.model.js (in the model folder)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AlbumsSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Genre: {
            type: String,
        },

        Release_Date :{
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);

const AlbumsModel = model('Albums', AlbumsSchema);

module.exports = AlbumsModel;
