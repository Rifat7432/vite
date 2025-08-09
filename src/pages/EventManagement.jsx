import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EventManagement = () => {
    const navigate = useNavigate();

  const goToAttendees = () => {
    navigate("/attendees");
  };
  const [searchTerm, setSearchTerm] = useState("");

  const events = [
    {
      id: 1254,
      name: "Birthday",
      date: "1.07.2025",
      location: "Dhaka",
      tickets: 500,
    },
    {
      id: 1254,
      name: "Birthday",
      date: "1.07.2025",
      location: "Dhaka",
      tickets: 500,
    },
    {
      id: 1254,
      name: "Birthday",
      date: "1.07.2025",
      location: "Dhaka",
      tickets: 500,
    },
    {
      id: 1254,
      name: "Birthday",
      date: "1.07.2025",
      location: "Dhaka",
      tickets: 500,
    },
    {
      id: 1254,
      name: "Birthday",
      date: "1.07.2025",
      location: "Dhaka",
      tickets: 500,
    },
    {
      id: 1254,
      name: "Birthday",
      date: "1.07.2025",
      location: "Dhaka",
      tickets: 500,
    },
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Total Tickets
          </h3>
          <p className="text-4xl font-bold text-gray-900">500</p>
        </div>
        <div onClick={goToAttendees} className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Attendess
          </h3>
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
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-0"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD]">
            <tr className="text-white font-semibold">
              <th className="px-6 py-4 text-left">Event ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Live Monitoring</th>
              <th className="px-6 py-4 text-left">Ticket</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{event.id}</td>
                <td className="px-6 py-4 text-gray-900">{event.name}</td>
                <td className="px-6 py-4 text-gray-600">{event.date}</td>
                <td className="px-6 py-4 text-gray-600">{event.location}</td>
                <td className="px-6 py-4">
                  <Link
                    to="/event-management"
                    className="px-4 py-1 text-cyan-500 rounded-full border border-cyan-500"
                  >
                    View
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-900">{event.tickets}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/qr-code"
                      className="px-4 py-1 text-cyan-500 rounded-full border border-cyan-500"
                    >
                      QR Code
                    </Link>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-600">
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
};

export default EventManagement;
