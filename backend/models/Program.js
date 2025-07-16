const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin
  published: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema); 