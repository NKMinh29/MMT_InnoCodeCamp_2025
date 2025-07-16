const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  title: { type: String, required: true },
  content: { type: String }, // text/html
  videoUrl: { type: String },
  order: { type: Number, default: 0 },
  quiz: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema); 