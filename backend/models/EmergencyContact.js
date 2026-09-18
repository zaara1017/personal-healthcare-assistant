const mongoose = require('mongoose')

const emergencyContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema)