// user.model.js (in the model folder)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PlaylistSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Songs: {
            type: String,
        },

        Privacy :{
            type:Boolean,
        }
    },
    { timestamps: true }
);

const PlaylistModel = model('playlist', PlaylistSchema);

module.exports = PlaylistModel;
