const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  notes: {
    type: String,
  },
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)