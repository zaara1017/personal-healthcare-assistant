import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [medications, setMedications] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, medsRes, apptsRes] = await Promise.all([
          api.get('/profile').catch(() => null),
          api.get('/medications'),
          api.get('/appointments'),
        ])

        if (profileRes) {
          setProfile(profileRes.data.profile)
        }

        setMedications(medsRes.data.medications)
        setAppointments(apptsRes.data.appointments)

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">
            Loading your health dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden">

        <div
          className="relative min-h-[330px] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(239,248,255,0.97) 0%, rgba(239,248,255,0.88) 45%, rgba(239,248,255,0.35) 100%), url('/health-bg.jpg')",
          }}
        >

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-12">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-600 font-medium mb-5 shadow-sm">
                <span>💙</span>
                Welcome to your health space
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Take care of your
                <span className="text-blue-600"> health </span>
                today.
              </h2>

              <p className="mt-4 text-gray-600 text-lg max-w-xl">
                Keep your health information organized, manage your
                medications and appointments, and get general health
                guidance whenever you need it.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <Link
                  to="/ai-chat"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition"
                >
                  🤖 Ask AI Assistant
                </Link>

                <Link
                  to="/profile"
                  className="bg-white/90 text-gray-700 px-6 py-3 rounded-xl font-medium shadow-md hover:bg-white transition"
                >
                  🩺 View Health Profile
                </Link>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Profile */}
          <Link
            to="/profile"
            className="group bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              🩺
            </div>

            <h3 className="font-bold text-gray-800">
              Health Profile
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Manage your personal health information
            </p>

            <p className="text-blue-600 text-sm font-medium mt-4">
              View Profile →
            </p>
          </Link>

          {/* Medications */}
          <Link
            to="/medications"
            className="group bg-white rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              💊
            </div>

            <h3 className="font-bold text-gray-800">
              Medications
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Manage your medication schedule
            </p>

            <p className="text-green-600 text-sm font-medium mt-4">
              View Medications →
            </p>
          </Link>

          {/* Appointments */}
          <Link
            to="/appointments"
            className="group bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              📅
            </div>

            <h3 className="font-bold text-gray-800">
              Appointments
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Keep track of upcoming appointments
            </p>

            <p className="text-purple-600 text-sm font-medium mt-4">
              View Appointments →
            </p>
          </Link>

          {/* AI */}
          <Link
            to="/ai-chat"
            className="group bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-6 text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              🤖
            </div>

            <h3 className="font-bold">
              AI Assistant
            </h3>

            <p className="text-sm text-blue-50 mt-1">
              Get general health information
            </p>

            <p className="text-white text-sm font-medium mt-4">
              Start Chat →
            </p>
          </Link>

          {/* Emergency Contacts */}
          <Link
            to="/emergency-contacts"
            className="group bg-white rounded-2xl p-6 border border-red-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              🚨
            </div>

            <h3 className="font-bold text-gray-800">
              Emergency Contacts
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Manage people to contact during emergencies
            </p>

            <p className="text-red-600 text-sm font-medium mt-4">
              View Contacts →
            </p>
          </Link>

          {/* Emergency QR */}
          <Link
            to="/emergency-qr"
            className="group bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
              📱
            </div>

            <h3 className="font-bold text-gray-800">
              Emergency QR
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Access your emergency health information quickly
            </p>

            <p className="text-orange-600 text-sm font-medium mt-4">
              View QR Code →
            </p>
          </Link>

        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Health Profile */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">

            <div className="p-6 border-b border-gray-100 flex items-center justify-between">

              <div>
                <p className="text-sm text-blue-500 font-medium">
                  PERSONAL INFORMATION
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  Health Profile
                </h3>
              </div>

              <Link
                to="/profile"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Edit
              </Link>

            </div>

            {profile ? (
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {profile.age || '—'}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {profile.gender || '—'}
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Blood Group</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {profile.bloodGroup || '—'}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Allergies</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {profile.allergies?.length || 0}
                  </p>
                </div>

                <div className="col-span-2 md:col-span-4 bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Allergies
                  </p>

                  <p className="text-sm text-gray-700">
                    {profile.allergies?.length
                      ? profile.allergies.join(', ')
                      : 'No allergies recorded'}
                  </p>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center">

                <div className="text-4xl mb-3">
                  🩺
                </div>

                <p className="text-gray-500">
                  No health profile created yet.
                </p>

                <Link
                  to="/profile"
                  className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Create Profile
                </Link>

              </div>
            )}

          </div>

          {/* Health Summary */}
          <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">

            <p className="text-sm text-teal-100 font-medium">
              YOUR HEALTH SUMMARY
            </p>

            <h3 className="text-2xl font-bold mt-2">
              Stay organized 💙
            </h3>

            <p className="text-sm text-blue-50 mt-3 leading-relaxed">
              Keep your health information updated so your
              Personal Healthcare Assistant can provide more
              relevant general information.
            </p>

            <div className="mt-6 space-y-3">

              <div className="bg-white/15 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm">Medications</span>
                <span className="text-xl font-bold">
                  {medications.length}
                </span>
              </div>

              <div className="bg-white/15 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm">Appointments</span>
                <span className="text-xl font-bold">
                  {appointments.length}
                </span>
              </div>

            </div>

            <Link
              to="/ai-chat"
              className="block text-center bg-white text-blue-600 rounded-xl py-3 mt-6 font-semibold hover:bg-blue-50 transition"
            >
              Talk to AI Assistant
            </Link>

          </div>

        </div>

        {/* Medications + Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* Medications */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm">

            <div className="p-6 border-b flex items-center justify-between">

              <div>
                <p className="text-sm text-green-600 font-medium">
                  MEDICATION TRACKER
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  Your Medications
                </h3>
              </div>

              <Link
                to="/medications"
                className="text-sm text-green-600 font-medium hover:underline"
              >
                Manage
              </Link>

            </div>

            <div className="p-6">

              {medications.length > 0 ? (
                <div className="space-y-3">

                  {medications.slice(0, 4).map((med) => (
                    <div
                      key={med._id}
                      className="flex items-center gap-4 bg-green-50 rounded-xl p-4"
                    >

                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                        💊
                      </div>

                      <div className="flex-1">

                        <p className="font-semibold text-gray-800">
                          {med.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {med.dosage || 'Dosage not specified'}
                        </p>

                      </div>

                      <span className="text-xs bg-white px-3 py-1 rounded-full text-green-600">
                        {med.frequency || 'Schedule not set'}
                      </span>

                    </div>
                  ))}

                </div>
              ) : (
                <div className="text-center py-8">

                  <div className="text-4xl mb-3">
                    💊
                  </div>

                  <p className="text-gray-500">
                    No medications added yet.
                  </p>

                  <Link
                    to="/medications"
                    className="inline-block mt-4 text-green-600 font-medium text-sm"
                  >
                    Add Medication →
                  </Link>

                </div>
              )}

            </div>

          </div>

          {/* Appointments */}
          <div className="bg-white rounded-2xl border border-purple-100 shadow-sm">

            <div className="p-6 border-b flex items-center justify-between">

              <div>
                <p className="text-sm text-purple-600 font-medium">
                  UPCOMING
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  Appointments
                </h3>
              </div>

              <Link
                to="/appointments"
                className="text-sm text-purple-600 font-medium hover:underline"
              >
                Manage
              </Link>

            </div>

            <div className="p-6">

              {appointments.length > 0 ? (
                <div className="space-y-3">

                  {appointments.slice(0, 4).map((appt) => (
                    <div
                      key={appt._id}
                      className="flex items-center gap-4 bg-purple-50 rounded-xl p-4"
                    >

                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                        📅
                      </div>

                      <div className="flex-1">

                        <p className="font-semibold text-gray-800">
                          {appt.doctorName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {appt.reason || 'Appointment'}
                        </p>

                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-purple-600">
                          {new Date(appt.date).toLocaleDateString()}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>
              ) : (
                <div className="text-center py-8">

                  <div className="text-4xl mb-3">
                    📅
                  </div>

                  <p className="text-gray-500">
                    No appointments scheduled.
                  </p>

                  <Link
                    to="/appointments"
                    className="inline-block mt-4 text-purple-600 font-medium text-sm"
                  >
                    Add Appointment →
                  </Link>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Bottom Features */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100 p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

            <div>
              <div className="text-3xl mb-2">🔐</div>
              <h4 className="font-semibold text-gray-800">
                Your Information
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Keep your personal health information organized.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">🤖</div>
              <h4 className="font-semibold text-gray-800">
                AI Health Guidance
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Get general health information through your AI assistant.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">❤️</div>
              <h4 className="font-semibold text-gray-800">
                Personal Healthcare
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Manage your health information in one place.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Dashboard