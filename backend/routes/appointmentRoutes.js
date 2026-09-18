const express = require('express')
const Appointment = require('../models/Appointment')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    const { doctorName, reason, date, location, notes } = req.body

    if (!doctorName || !date) {
      return res.status(400).json({ message: 'Doctor name and date are required' })
    }

    const appointment = await Appointment.create({
      user: req.userId,
      doctorName,
      reason,
      date,
      location,
      notes,
    })

    res.status(201).json({ message: 'Appointment added', appointment })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId }).sort({ date: 1 })
    res.status(200).json({ appointments })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, user: req.userId })

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    const { doctorName, reason, date, location, notes } = req.body

    appointment.doctorName = doctorName ?? appointment.doctorName
    appointment.reason = reason ?? appointment.reason
    appointment.date = date ?? appointment.date
    appointment.location = location ?? appointment.location
    appointment.notes = notes ?? appointment.notes

    await appointment.save()

    res.status(200).json({ message: 'Appointment updated', appointment })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({ _id: req.params.id, user: req.userId })

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    res.status(200).json({ message: 'Appointment deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router