const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  type: { type: String, enum: ['exam', 'task', 'project'] },
  score: Number,
  comments: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', GradeSchema);
