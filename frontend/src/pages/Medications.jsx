import { useEffect, useState } from 'react'
import api from '../services/api'

function Medications() {
  const [medications, setMedications] = useState([])
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [timeToTake, setTimeToTake] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMedications = async () => {
    try {
      const res = await api.get('/medications')
      setMedications(res.data.medications)
    } catch (err) {
      setError('Failed to load medications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedications()
  }, [])

  const resetForm = () => {
    setName('')
    setDosage('')
    setFrequency('')
    setTimeToTake('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.put(`/medications/${editingId}`, { name, dosage, frequency, timeToTake })
      } else {
        await api.post('/medications', { name, dosage, frequency, timeToTake })
      }
      resetForm()
      fetchMedications()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleEdit = (med) => {
    setEditingId(med._id)
    setName(med.name || '')
    setDosage(med.dosage || '')
    setFrequency(med.frequency || '')
    setTimeToTake(med.timeToTake || '')
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/medications/${id}`)
      fetchMedications()
    } catch (err) {
      setError('Failed to delete medication')
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-600">Loading...</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? 'Edit Medication' : 'Add Medication'}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Medication name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Dosage (e.g. 500mg)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="Frequency (e.g. Twice a day)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={timeToTake}
            onChange={(e) => setTimeToTake(e.target.value)}
            placeholder="Time to take (e.g. 9:00 AM, 9:00 PM)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update Medication' : 'Add Medication'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Medications</h3>
        {medications.length === 0 ? (
          <p className="text-gray-500">No medications added yet.</p>
        ) : (
          <ul className="space-y-3">
            {medications.map((med) => (
              <li
                key={med._id}
                className="flex items-center justify-between border border-gray-200 rounded-md p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">{med.name}</p>
                  <p className="text-sm text-gray-500">
                    {med.dosage} — {med.frequency} — {med.timeToTake}
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(med)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(med._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Medications