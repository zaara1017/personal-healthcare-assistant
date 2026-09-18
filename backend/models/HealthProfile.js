const mongoose = require('mongoose')

const healthProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  bloodGroup: {
    type: String,
  },
  allergies: {
    type: [String],
    default: [],
  },
  chronicConditions: {
    type: [String],
    default: [],
  },
  currentMedications: {
    type: [String],
    default: [],
  },
}, { timestamps: true })

module.exports = mongoose.model('HealthProfile', healthProfileSchema)