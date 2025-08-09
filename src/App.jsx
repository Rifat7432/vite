import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventManagement from "./pages/EventManagement";
import EventQRCode from "./pages/EventQRCode";
import EventAttendees from "./pages/EventAttendees";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* "/" will show Home */}
          <Route index element={<Home />} />

          {/* Other pages */}
          <Route path="event-management"  element={<EventManagement />} />
          <Route path="qr-code" element={<EventQRCode />} />
          <Route path="attendees" element={<EventAttendees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
