import React, { useState } from 'react';
import Sidebar from './Dashboard/Sidebar';
import Header from './Dashboard/Header';
import StatsCard from './Dashboard/StatsCard';
import EventTable from './Dashboard/EventTable';
import CreateEventModal from './Dashboard/CreateEventModal';

const Dashboard = () => {
  const [events] = useState([
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    },
    {
      id: 1254,
      name: 'Birthday',
      password: '******',
      date: '1 Jul 2025',
      location: 'Dhaka',
      liveMonitoring: 'Live',
      tickets: 393
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex   bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-auto">
        <Header />
        <div className="p-6">
          <StatsCard />
          <EventTable events={events} onCreateEvent={() => setShowCreateModal(true)} />
        </div>
      </div>
      <CreateEventModal show={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};

export default Dashboard;