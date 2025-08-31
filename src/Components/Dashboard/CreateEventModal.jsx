import { useState } from 'react';
import axiosSecure from '../../lib/axiosSecure';
import { toast } from 'sonner';

const CreateEventModal = ({ show, onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    eventLocation: '',
    date: '',
    ticketCount: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform form data to match API structure
      const eventData = {
        name: formData.name,
        date: new Date(formData.date).toISOString(),
        eventLocation: formData.eventLocation,
        description: formData.description,
        ticketCount: parseInt(formData.ticketCount, 10)
      };

      const response = await axiosSecure.post('/api/v1/event/create', eventData);

      toast.success(response.data.message || 'Event created successfully...');

      // Reset form
      setFormData({
        name: '',
        eventLocation: '',
        date: '',
        ticketCount: '',
        description: ''
      });

      // Call success callback if provided
      if (onEventCreated) {
        onEventCreated();
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error creating event:', error);
       toast.error(error.response.data.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-x-hidden">
      <div className="bg-white rounded-lg p-8 w-full max-w-xl mx-4 relative" style={{ overflowX: 'hidden' }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Enter event name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Enter event location"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Count</label>
            <input
              type="number"
              name="ticketCount"
              value={formData.ticketCount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Enter number of tickets"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none resize-none"
              rows={4}
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(90deg, #4fd1c5 0%, #38b2ac 100%)' }}
            >
              {isSubmitting ? 'Creating...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;