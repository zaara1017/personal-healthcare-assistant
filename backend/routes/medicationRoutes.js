const express = require('express')
const Medication = require('../models/Medication')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    const { name, dosage, frequency, timeToTake, notes } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Medication name is required' })
    }

    const medication = await Medication.create({
      user: req.userId,
      name,
      dosage,
      frequency,
      timeToTake,
      notes,
    })

    res.status(201).json({ message: 'Medication added', medication })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.userId })
    res.status(200).json({ medications })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const medication = await Medication.findOne({ _id: req.params.id, user: req.userId })

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    const { name, dosage, frequency, timeToTake, notes } = req.body

    medication.name = name ?? medication.name
    medication.dosage = dosage ?? medication.dosage
    medication.frequency = frequency ?? medication.frequency
    medication.timeToTake = timeToTake ?? medication.timeToTake
    medication.notes = notes ?? medication.notes

    await medication.save()

    res.status(200).json({ message: 'Medication updated', medication })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const medication = await Medication.findOneAndDelete({ _id: req.params.id, user: req.userId })

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    res.status(200).json({ message: 'Medication deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router