// user.model.js (in the model folder)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const deletionLogSchema = new mongoose.Schema({
    deletedAt: { type: Date, required: true }
  });
  
const DeletionLog = mongoose.model('DeletionLog', deletionLogSchema);
  

module.exports = DeletionLog;
