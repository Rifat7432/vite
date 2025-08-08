import { Link, useLocation } from 'react-router-dom'
import { BarChart2, Users, QrCode, LogOut } from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-lg">
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] bg-clip-text text-transparent">
              XutMasterz
            </h1>
            <p className="text-sm text-gray-500">Fasting your Ideas</p>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="mr-3 w-5 h-5" />
              Event Management
            </Link>
            <Link
              to="/attendees"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/attendees' 
                  ? 'bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="mr-3 w-5 h-5" />
              Event Attendees
            </Link>
            <Link
              to="/qr-code"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/qr-code' 
                  ? 'bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <QrCode className="mr-3 w-5 h-5" />
              Event QR Code
            </Link>
          </nav>
        </div>
        
        {/* Logout Button */}
        <div className="absolute bottom-6 left-6">
          <button className="flex items-center text-red-500 hover:text-red-600 text-sm font-medium">
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex-1"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
