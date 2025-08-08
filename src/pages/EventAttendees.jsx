import { useState } from 'react'
import { Search } from 'lucide-react'

const EventAttendees = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const attendees = [
    { name: 'birthday', entry: '7:50 PM', exitTime: '9:30 AM', status: 'Valid' },
    { name: 'birthday', entry: '7:50 PM', exitTime: '9:30 AM', status: 'Valid' },
    { name: 'birthday', entry: '7:50 PM', exitTime: '9:30 AM', status: 'Valid' },
    { name: 'birthday', entry: '7:50 PM', exitTime: '9:30 AM', status: 'Valid' },
    { name: 'birthday', entry: '7:50 PM', exitTime: '9:30 AM', status: 'Valid' },
    { name: 'birthday', entry: '7:50 PM', exitTime: '9:30 AM', status: 'Valid' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Attendees</h1>
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
          <div className="grid grid-cols-4 gap-4 text-white font-semibold">
            <div>Name</div>
            <div>Entry</div>
            <div>Exit Time</div>
            <div>Ticket Status</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {attendees.map((attendee, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="text-gray-900">{attendee.name}</div>
                <div className="text-gray-600">{attendee.entry}</div>
                <div className="text-gray-600">{attendee.exitTime}</div>
                <div>
                  <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                    {attendee.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventAttendees
