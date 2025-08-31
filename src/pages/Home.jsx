import { useState, useEffect } from "react";
import StatsCard from "../Components/Dashboard/StatsCard";
import EventTable from "../Components/Dashboard/EventTable";
import CreateEventModal from "../Components/Dashboard/CreateEventModal";
import axiosSecure from "../lib/axiosSecure";
import LoadingScreen from "../Components/Dashboard/LoadingScreen";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch events from API
  const fetchEvents = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search: search })
      });

      const response = await axiosSecure.get(`/api/v1/event/get?${params.toString()}`);

      if (response.data.success) {
        // Transform API data to match your table format
        const transformedEvents = response.data.data.events.map(event => ({
          id: event.eventID,
          name: event.name,
          password: event.accessPassword,
          date: new Date(event.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          location: event.eventLocation,
          liveMonitoring: "View",
          tickets: event.ticketCount,
          // Keep original data for reference if needed
          _originalData: event
        }));

        console.log(transformedEvents);
        setEvents(transformedEvents);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to fetch events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount and when page/search changes
  useEffect(() => {
    fetchEvents(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Handle successful event creation
  const handleEventCreated = () => {
    setShowCreateModal(false);
    // Refetch events to show the new one (reset to first page)
    setCurrentPage(1);
    fetchEvents(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Loading state
  if (loading && events.length === 0) {
    return <LoadingScreen />;
  }

  // Error state
  if (error && events.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading events
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => fetchEvents(currentPage, searchTerm)}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="p-6">
          <StatsCard
            eventsCount={pagination?.totalItems || events.length}
          />
          <EventTable
            events={events}
            pagination={pagination}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            onCreateEvent={() => setShowCreateModal(true)}
            onRefresh={() => fetchEvents(currentPage, searchTerm)}
          />
        </div>
      </div>
      <CreateEventModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

export default Home;