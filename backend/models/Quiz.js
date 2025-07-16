const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // index trong options
  explanation: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema); 