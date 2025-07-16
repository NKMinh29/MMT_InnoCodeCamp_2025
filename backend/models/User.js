const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: { type: String },
  location: { type: String },
  education: { type: String },
  interests: [{ type: String }],
  experience: { type: String },
  availability: { type: String },
  motivation: { type: String },
  avatar: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 