import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Medications', path: '/medications' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'AI Assistant', path: '/ai-chat' },
    { name: 'Contacts', path: '/emergency-contacts' },
    { name: 'Emergency QR', path: '/emergency-qr' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-md">
              <span className="text-2xl">🩺</span>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800 leading-tight">
                Personal Healthcare
              </h1>

              <p className="text-xs text-teal-600 font-medium">
                Your health, your care
              </p>
            </div>

          </Link>

          {/* Navigation */}
          {token && (
            <div className="hidden lg:flex items-center gap-1">

              {navItems.map((item) => {
                const active = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}

            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">

            {token ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-100 hover:bg-red-50 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar