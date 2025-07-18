const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quizResults: [
    {
      lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
      score: Number,
      total: Number
    }
  ],
  isCompleted: { type: Boolean, default: false },
  certificateUrl: { type: String },
  lastAccessed: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', userProgressSchema); 