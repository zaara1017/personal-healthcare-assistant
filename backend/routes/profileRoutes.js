const express = require('express')
const HealthProfile = require('../models/HealthProfile')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    const { age, gender, bloodGroup, allergies, chronicConditions, currentMedications } = req.body

    let profile = await HealthProfile.findOne({ user: req.userId })

    if (profile) {
      profile.age = age
      profile.gender = gender
      profile.bloodGroup = bloodGroup
      profile.allergies = allergies
      profile.chronicConditions = chronicConditions
      profile.currentMedications = currentMedications
      await profile.save()
      return res.status(200).json({ message: 'Profile updated', profile })
    }

    profile = await HealthProfile.create({
      user: req.userId,
      age,
      gender,
      bloodGroup,
      allergies,
      chronicConditions,
      currentMedications,
    })

    res.status(201).json({ message: 'Profile created', profile })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.userId })
    if (!profile) {
      return res.status(404).json({ message: 'No profile found' })
    }
    res.status(200).json({ profile })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router