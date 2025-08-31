import { useState, useEffect } from "react";
import axiosSecure from "../../lib/axiosSecure";
import LoadingScreen from "./LoadingScreen";

const EditEventModal = ({ show, onClose, event, onEventUpdated }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        eventLocation: "",
        description: "",
        accessPassword: ""
    });

    // Populate form when event changes
    useEffect(() => {
        if (event) {
            const eventDate = new Date(event.date);
            setFormData({
                name: event.name || "",
                date: eventDate.toISOString().split('T')[0],
                eventLocation: event.eventLocation || "",
                description: event.description || "",
                accessPassword: event.accessPassword || ""
            });
        }
    }, [event]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Prepare update data
            const updateData = {
                name: formData.name,
                eventLocation: formData.eventLocation,
                description: formData.description,
                accessPassword: formData.accessPassword,
                date: formData.date
            };

            const response = await axiosSecure.patch(`/api/v1/event/update/${event._id}`, updateData);

            if (response.data.success) {
                onEventUpdated();
                onClose();
            } else {
                setError(response.data.message || "Failed to update event");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update event");
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Edit Event</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                required
                                maxLength={200}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event ID (read-only)
                            </label>
                            <input
                                type="text"
                                value={event.eventID}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="eventLocation"
                                value={formData.eventLocation}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                maxLength={200}
                                placeholder="Event location"
                            />
                        </div>


                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            maxLength={200}
                            placeholder="Event description"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ticket Count (read-only)
                            </label>
                            <input
                                type="number"
                                name="ticketCount"
                                value={event.ticketCount}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 cursor-not-allowed focus:ring-cyan-500 focus:border-transparent"
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Access Password *
                            </label>
                            <input
                                type="text"
                                name="accessPassword"
                                value={formData.accessPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                required
                                placeholder="Event access password"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Event"}
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                        <LoadingScreen />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditEventModal;