import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import api from '../services/api'

function EmergencyQR() {
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me')
        setUserId(res.data.user._id)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return <p className="p-6 text-gray-600">Loading...</p>
  }

  const publicUrl = `http://192.168.29.64:5173/emergency/${userId}`
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Emergency QR Code</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Anyone who scans this QR code will see only the emergency info and contacts you've marked public.
      </p>
      <div className="flex justify-center mb-4">
        <QRCodeSVG value={publicUrl} size={200} />
      </div>
      <p className="text-xs text-gray-500 break-all">{publicUrl}</p>
    </div>
  )
}

export default EmergencyQR