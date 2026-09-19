const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const medicationRoutes = require('./routes/medicationRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const emergencyContactRoutes = require('./routes/emergencyContactRoutes')
const aiRoutes = require("./routes/aiRoutes");
const publicRoutes = require('./routes/publicRoutes')

connectDB()

const app = express()
app.use(cors({
  origin: 'https://personal-healthcare-assistant-front.vercel.app',
}))
app.use(express.json())
app.use("/api/ai", aiRoutes);
app.use('/api/public', publicRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/medications', medicationRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/emergency-contacts', emergencyContactRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/health`)
})