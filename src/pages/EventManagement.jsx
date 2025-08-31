import { useState, useEffect } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosSecure from '../lib/axiosSecure';
import LoadingScreen from '../Components/Dashboard/LoadingScreen';
import Pagination from '../Components/Dashboard/Pagination';

const EventManagement = () => {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ticketsPerPage = 4;

  const goToAttendees = () => {
    navigate("/attendees");
  };

  // Fetch tickets from API
  const fetchTickets = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosSecure.get(`/api/v1/ticket/get/${eventID}`, {
        params: { page, limit: ticketsPerPage },
      });

      const statResponse = await axiosSecure.get(`/api/v1/event/get-stats/${eventID}`, {

      });

      if (statResponse.data.success) {
        setStats(statResponse.data.data);
        console.log(statResponse.data.data);
      } else {
        setError('Failed to fetch tickets stats');
      }

      if (response.data.success) {
        setTickets(response.data.data.tickets);
        setTotalTickets(response.data.data.totalTickets);
        setTotalPages(Math.ceil(response.data.data.totalTickets / ticketsPerPage));
      } else {
        setError('Failed to fetch tickets');
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError(err.response?.data?.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Total Tickets
          </h3>
          <p className="text-4xl font-bold text-gray-900">{totalTickets}</p>
        </div>
        <div onClick={goToAttendees} className="bg-white rounded-lg shadow p-6 text-center cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Attendees
          </h3>
          <p className="text-4xl font-bold text-gray-900">{stats.usedTickets}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Absent</h3>
          <p className="text-4xl font-bold text-gray-900">{stats.unusedTickets}</p>
        </div>
      </div>

      {/* QR Code Table (replacing the original event table) */}
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <h3 className="text-sm font-medium text-red-800">Error loading tickets</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button onClick={() => fetchTickets(currentPage)} className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 mt-4">Try again</button>
        </div>
      ) : tickets.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-500">No QR codes have been generated yet.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD]">
                <tr className="text-white font-semibold">
                  <th className="px-6 py-4 text-center">Count</th>
                  <th className="px-6 py-4 text-center">QR Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket, index) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 text-center font-medium">
                      {(currentPage - 1) * ticketsPerPage + (index + 1)}
                    </td>
                    <td className="px-6 py-4 flex justify-center">
                      <img
                        src={ticket.qr}
                        alt={`QR Code ${index + 1}`}
                        className="w-20 h-20 border-2 border-gray-200 rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default EventManagement;