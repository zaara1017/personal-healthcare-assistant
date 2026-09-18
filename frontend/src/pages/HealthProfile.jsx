import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function HealthProfile() {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [allergies, setAllergies] = useState('')
  const [chronicConditions, setChronicConditions] = useState('')
  const [currentMedications, setCurrentMedications] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile')
        const profile = res.data.profile
        setAge(profile.age || '')
        setGender(profile.gender || '')
        setBloodGroup(profile.bloodGroup || '')
        setAllergies((profile.allergies || []).join(', '))
        setChronicConditions((profile.chronicConditions || []).join(', '))
        setCurrentMedications((profile.currentMedications || []).join(', '))
      } catch (err) {
        // No profile yet - that's fine, form stays empty
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await api.post('/profile', {
        age: Number(age),
        gender,
        bloodGroup,
        allergies: allergies.split(',').map((a) => a.trim()).filter(Boolean),
        chronicConditions: chronicConditions.split(',').map((c) => c.trim()).filter(Boolean),
        currentMedications: currentMedications.split(',').map((m) => m.trim()).filter(Boolean),
      })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-600">Loading...</p>
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Health Profile</h2>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            placeholder="e.g. O+"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allergies <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Peanuts, Penicillin"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chronic Conditions <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            value={chronicConditions}
            onChange={(e) => setChronicConditions(e.target.value)}
            placeholder="Asthma, Diabetes"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Medications <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            value={currentMedications}
            onChange={(e) => setCurrentMedications(e.target.value)}
            placeholder="Paracetamol"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}

export default HealthProfile