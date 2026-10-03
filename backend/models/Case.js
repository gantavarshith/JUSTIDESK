const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved', 'closed'], default: 'pending' },
  filedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedLawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);
