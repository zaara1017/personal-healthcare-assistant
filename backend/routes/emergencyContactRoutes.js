const express = require('express')
const EmergencyContact = require('../models/EmergencyContact')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    const { name, relationship, phone, isPublic } = req.body

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' })
    }

    const contact = await EmergencyContact.create({
      user: req.userId,
      name,
      relationship,
      phone,
      isPublic,
    })

    res.status(201).json({ message: 'Emergency contact added', contact })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.userId })
    res.status(200).json({ contacts })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const contact = await EmergencyContact.findOne({ _id: req.params.id, user: req.userId })

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    const { name, relationship, phone, isPublic } = req.body

    contact.name = name ?? contact.name
    contact.relationship = relationship ?? contact.relationship
    contact.phone = phone ?? contact.phone
    contact.isPublic = isPublic ?? contact.isPublic

    await contact.save()

    res.status(200).json({ message: 'Contact updated', contact })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({ _id: req.params.id, user: req.userId })

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    res.status(200).json({ message: 'Contact deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router