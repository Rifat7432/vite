import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axiosSecure from '../lib/axiosSecure';
import Pagination from '../Components/Dashboard/Pagination';
import Modal from 'react-modal';
import LoadingScreen from '../Components/Dashboard/LoadingScreen';
import { toast } from 'sonner';

const EventQRCode = () => {
  const { eventID } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ticketsPerPage = 5;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [addingTickets, setAddingTickets] = useState(false);

  // Fetch tickets
  const fetchTickets = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosSecure.get(`/api/v1/ticket/get/${eventID}`, {
        params: { page, limit: ticketsPerPage },
      });

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
    if (eventID) fetchTickets(currentPage);
  }, [eventID, currentPage]);

  // Add ticket API
  const handleAddTicket = async () => {
    setIsModalOpen(true);
  };

  const handleSubmitTicket = async () => {
    try {
      setAddingTickets(true);
      await axiosSecure.post(`/api/v1/ticket/generate`, { ticketCount, eventID });
      setIsModalOpen(false);
      setTicketCount(1);
      fetchTickets(currentPage); // refetch after adding
    } catch (err) {
      console.error('Error adding tickets:', err);
      toast.error(err.response?.data?.message || 'Failed to add tickets');
    } finally {
      setAddingTickets(false);
    }
  };

  // CSV Download
  const handleDownloadCSV = () => {
    if (tickets.length === 0) return;
    let csvContent = "Count,QR Code Data\n";
    tickets.forEach((ticket, index) => {
      csvContent += `${index + 1},"${ticket.qr}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event_${eventID}_qr_codes.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <LoadingScreen/>;
  if (error) return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-red-800">Error loading tickets</h3>
        <p className="mt-2 text-sm text-red-700">{error}</p>
        <button onClick={() => fetchTickets(currentPage)} className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 mt-4">Try again</button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event QR Codes</h1>
          <p className="text-gray-600 mt-1">• Total Tickets: {totalTickets}</p>
        </div>
        <button
          onClick={handleAddTicket}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-lg hover:opacity-90 font-medium"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add Ticket
        </button>
      </div>

      {/* Ticket Table */}
      {tickets.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-lg flex items-center justify-center"><Plus className="w-8 h-8" /></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first ticket.</p>
          <button onClick={handleAddTicket} className="px-4 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-lg hover:opacity-90 font-medium">Add First Ticket</button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD]">
                <tr className="text-white font-semibold">
                  <th className="px-6 py-4 text-center">Count</th>
                  <th className="px-6 py-4 text-center">QR Code</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket, index) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 text-center font-medium">{(currentPage - 1) * ticketsPerPage + (index + 1)}</td>
                    <td className="px-6 py-4 flex justify-center">
                      <img src={ticket.qr} alt={`QR Code ${index + 1}`} className="w-20 h-20 border-2 border-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => {const link = document.createElement('a'); link.href = ticket.qr; link.download = `qr-code-${index + 1}.png`; document.body.appendChild(link); link.click(); document.body.removeChild(link);}} className="text-[#2AD4FF] hover:text-[#55FFDD] font-medium text-sm">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={handleDownloadCSV} className="px-6 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded-lg hover:opacity-90 font-medium">Download CSV</button>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false} className="bg-white p-6 rounded-lg max-w-md mx-auto mt-40 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Tickets</h2>
        <input
          type="number"
          min={1}
          value={ticketCount}
          onChange={(e) => setTicketCount(Number(e.target.value))}
          className="w-full border px-4 py-2 rounded mb-4"
          placeholder="Number of tickets"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={handleSubmitTicket} disabled={addingTickets} className="px-4 py-2 bg-gradient-to-r from-[#2AD4FF] to-[#55FFDD] text-white rounded hover:opacity-90">
            {addingTickets ? 'Adding...' : 'Add Tickets'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EventQRCode;
 