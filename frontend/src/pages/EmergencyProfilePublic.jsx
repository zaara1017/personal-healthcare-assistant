import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EmergencyProfilePublic() {
  const { userId } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://192.168.29.64:5000/api/public/emergency/${userId}`)
      } catch (err) {
        setError('Emergency profile not found')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId])

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-red-600">Emergency Info</h2>
      <p className="text-lg font-semibold text-gray-800 mb-4">{data.name}</p>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Blood Group</p>
        <p className="text-gray-800">{data.bloodGroup || 'Not provided'}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Allergies</p>
        <p className="text-gray-800">{data.allergies.join(', ') || 'None listed'}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Chronic Conditions</p>
        <p className="text-gray-800">{data.chronicConditions.join(', ') || 'None listed'}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Emergency Contacts</p>
        {data.contacts.length > 0 ? (
          <ul className="space-y-1">
            {data.contacts.map((c, i) => (
              <li key={i} className="text-gray-800">
                {c.name} ({c.relationship}) — {c.phone}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No public contacts shared.</p>
        )}
      </div>
    </div>
  )
}

export default EmergencyProfilePublic