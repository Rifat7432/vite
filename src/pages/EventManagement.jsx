import { useState } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react'

const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const events = [
    { id: 1254, name: 'Birthday', date: '1.07.2025', location: 'Dhaka', tickets: 500 },
    { id: 1254, name: 'Birthday', date: '1.07.2025', location: 'Dhaka', tickets: 500 },
    { id: 1254, name: 'Birthday', date: '1.07.2025', location: 'Dhaka', tickets: 500 },
    { id: 1254, name: 'Birthday', date: '1.07.2025', location: 'Dhaka', tickets: 500 },
    { id: 1254, name: 'Birthday', date: '1.07.2025', location: 'Dhaka', tickets: 500 },
    { id: 1254, name: 'Birthday', date: '1.07.2025', location: 'Dhaka', tickets: 500 },
  ]

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Tickets</h3>
          <p className="text-4xl font-bold text-gray-900">500</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Attendess</h3>
          <p className="text-4xl font-bold text-gray-900">400</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Absent</h3>
          <p className="text-4xl font-bold text-gray-900">100</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] px-6 py-4">
          <div className="grid grid-cols-7 gap-4 text-white font-semibold">
            <div>Event ID</div>
            <div>Name</div>
            <div>Date</div>
            <div>Location</div>
            <div>Live Monitoring</div>
            <div>Ticket</div>
            <div>Action</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {events.map((event, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-7 gap-4 items-center">
                <div className="text-gray-900">{event.id}</div>
                <div className="text-gray-900">{event.name}</div>
                <div className="text-gray-600">{event.date}</div>
                <div className="text-gray-600">{event.location}</div>
                <div>
                  <button className="px-3 py-1 text-sm bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-full hover:opacity-90">
                    View
                  </button>
                </div>
                <div className="text-gray-900">{event.tickets}</div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-full hover:opacity-90">
                    QR Code
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventManagement
