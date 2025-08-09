import  { useState } from "react";
import StatsCard from "../Components/Dashboard/StatsCard";
import EventTable from "../Components/Dashboard/EventTable";
import CreateEventModal from "../Components/Dashboard/CreateEventModal";


const Home = () => {
  const [events] = useState([
    {
      id: 1254,
      name: "Birthday",
      password: "******",
      date: "1 Jul 2025",
      location: "Dhaka",
      liveMonitoring: "View",
      tickets: 393,
    },
    // ...add more events as needed
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      <div>
        <div className="p-6">
          <StatsCard />
          <EventTable
            events={events}
            onCreateEvent={() => setShowCreateModal(true)}
          />
        </div>
      </div>
      <CreateEventModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Home;
