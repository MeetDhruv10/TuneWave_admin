// user.model.js (in the model folder)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ArtistsSchema = new Schema(
     {
        Name: {
            type: String,
            required: true,
        },
        Biography: {
            type: String,
        },

        DOB :{
            type: Date,
            required: true,
        },
        photo : {
            type: String,
            required : true,
        }

     },
     { timestamps: true }
);

const ArtistsModel = model('Artists', ArtistsSchema);

module.exports = ArtistsModel;
