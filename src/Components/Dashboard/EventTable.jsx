import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const EventTable = ({ events, onCreateEvent }) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="flex items-center justify-between p-6 border-b gap-4 flex-wrap">
      <h3 className="text-lg font-semibold text-gray-800">Event Management</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm outline-0"
        />
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Search
        </button>
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2"
          onClick={onCreateEvent}
        >
          Create Event
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-cyan-400 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Event ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Password
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Location
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Live Monitoring
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">Tickets</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {events.map((event, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{event.id}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{event.name}</td>
              <td className="px-4 py-3 text-sm text-gray-900 flex items-center">
                {event.password}
                <Eye className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">{event.date}</td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {event.location}
              </td>
              <td className="px-4 py-3">
                <Link
                  to="/event-management"
                  className="px-4 py-1 text-cyan-500  rounded-full border border-cyan-500 "
                >
                  {event.liveMonitoring}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {event.tickets}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Link
                    to="/qr-code"
                    className="px-4 py-1 text-cyan-500  rounded-full border border-cyan-500 "
                  >
                    QR Code
                  </Link>

                  <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EventTable;
