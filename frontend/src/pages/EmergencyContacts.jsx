import { useEffect, useState } from 'react'
import api from '../services/api'

function EmergencyContacts() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [phone, setPhone] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    try {
      const res = await api.get('/emergency-contacts')
      setContacts(res.data.contacts)
    } catch (err) {
      setError('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const resetForm = () => {
    setName('')
    setRelationship('')
    setPhone('')
    setIsPublic(false)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.put(`/emergency-contacts/${editingId}`, { name, relationship, phone, isPublic })
      } else {
        await api.post('/emergency-contacts', { name, relationship, phone, isPublic })
      }
      resetForm()
      fetchContacts()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleEdit = (contact) => {
    setEditingId(contact._id)
    setName(contact.name || '')
    setRelationship(contact.relationship || '')
    setPhone(contact.phone || '')
    setIsPublic(contact.isPublic || false)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/emergency-contacts/${id}`)
      fetchContacts()
    } catch (err) {
      setError('Failed to delete contact')
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-600">Loading...</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? 'Edit Contact' : 'Add Emergency Contact'}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contact name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="Relationship (e.g. Mother)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Show this contact on my public emergency QR page
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update Contact' : 'Add Contact'}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Emergency Contacts</h3>
        {contacts.length === 0 ? (
          <p className="text-gray-500">No emergency contacts added yet.</p>
        ) : (
          <ul className="space-y-3">
            {contacts.map((contact) => (
              <li
                key={contact._id}
                className="flex items-center justify-between border border-gray-200 rounded-md p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {contact.name} {contact.isPublic && <span className="text-xs text-green-600">(Public)</span>}
                  </p>
                  <p className="text-sm text-gray-500">
                    {contact.relationship} — {contact.phone}
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
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

export default EmergencyContacts