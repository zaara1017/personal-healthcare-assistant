const express = require('express')
const User = require('../models/User')
const HealthProfile = require('../models/HealthProfile')
const EmergencyContact = require('../models/EmergencyContact')

const router = express.Router()

router.get('/emergency/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('name')
    if (!user) {
      return res.status(404).json({ message: 'Not found' })
    }

    const profile = await HealthProfile.findOne({ user: req.params.userId })
    const contacts = await EmergencyContact.find({ user: req.params.userId, isPublic: true })

    res.status(200).json({
      name: user.name,
      bloodGroup: profile?.bloodGroup || null,
      allergies: profile?.allergies || [],
      chronicConditions: profile?.chronicConditions || [],
      contacts: contacts.map((c) => ({ name: c.name, relationship: c.relationship, phone: c.phone })),
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router