import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../lib/axiosSecure";
import LoadingScreen from "./LoadingScreen";
import Pagination from "./Pagination";
import EditEventModal from "./EditEventModal";

const EventTable = ({ events, pagination, onCreateEvent, onRefresh, onPageChange, onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEventDelete = async (eventId) => {
    try {
      setLoading(true);
      await axiosSecure.delete(`/api/v1/event/delete/${eventId}`);
    } catch (error) {
      setLoading(false);
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false);
      onRefresh();
    }
  }

  const handleEditClick = (event) => {
    setEditingEvent(event._originalData);
    setShowEditModal(true);
  };

  const handleEventUpdated = () => {
    setShowEditModal(false);
    setEditingEvent(null);
    onRefresh();
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-6 border-b gap-4 flex-wrap">
          <h3 className="text-lg font-semibold text-gray-800">Event Management</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm outline-0"
            />
            <button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={handleSearch}
            >
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
                <th className="px-4 py-3 text-left text-sm font-medium">Event ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Password</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Live Monitoring</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Tickets</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event, index) => (
                <tr key={event._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{event.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{event.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 flex items-center min-w-40">
                    <span
                      id={`password-span-${index}`}
                      style={{ letterSpacing: '2px' }}
                    >
                      ••••••••
                    </span>
                    <Eye
                      onClick={() => {
                        const span = document.getElementById(`password-span-${index}`);
                        if (span.textContent === '••••••••') {
                          span.textContent = event.password;
                        } else {
                          span.textContent = '••••••••';
                        }
                      }}
                      className="w-4 h-4 ml-2 text-gray-400 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {event.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {event.location}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/event-management/${event._originalData._id}`}
                      className="px-4 py-1 text-cyan-500 rounded-full border border-cyan-500 text-sm"
                    >
                      Monitor
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {event.tickets}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/qr-code/${event._originalData._id}`}
                        className="px-3 py-1 text-cyan-500 rounded-full border border-cyan-500 text-xs"
                      >
                        QR Code
                      </Link>
                      <button 
                        className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                        onClick={() => handleEditClick(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        onClick={() => handleEventDelete(event._originalData._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Edit Event Modal */}
      <EditEventModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        event={editingEvent}
        onEventUpdated={handleEventUpdated}
      />
    </>
  );
};

export default EventTable;