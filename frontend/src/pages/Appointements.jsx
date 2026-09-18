import { useEffect, useState } from 'react'
import api from '../services/api'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [doctorName, setDoctorName] = useState('')
  const [reason, setReason] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments')
      setAppointments(res.data.appointments)
    } catch (err) {
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const resetForm = () => {
    setDoctorName('')
    setReason('')
    setDate('')
    setLocation('')
    setNotes('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.put(`/appointments/${editingId}`, { doctorName, reason, date, location, notes })
      } else {
        await api.post('/appointments', { doctorName, reason, date, location, notes })
      }
      resetForm()
      fetchAppointments()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleEdit = (appt) => {
    setEditingId(appt._id)
    setDoctorName(appt.doctorName || '')
    setReason(appt.reason || '')
    setDate(appt.date ? appt.date.slice(0, 10) : '')
    setLocation(appt.location || '')
    setNotes(appt.notes || '')
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/appointments/${id}`)
      fetchAppointments()
    } catch (err) {
      setError('Failed to delete appointment')
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-600">Loading...</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? 'Edit Appointment' : 'Add Appointment'}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Doctor name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for visit"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update Appointment' : 'Add Appointment'}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled.</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((appt) => (
              <li
                key={appt._id}
                className="flex items-center justify-between border border-gray-200 rounded-md p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">{appt.doctorName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString()} — {appt.reason} — {appt.location}
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(appt)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
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

export default Appointments