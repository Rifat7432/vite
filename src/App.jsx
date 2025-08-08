
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import EventAttendees from './pages/EventAttendees'
import EventManagement from './pages/EventManagement'
import EventQRCode from './pages/EventQRCode'
import './App.css'
import Dashboard from './Components/dashBoard'

function App() {
 

//   return (
//   <div>

// <Dashboard />

//   </div>
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EventManagement />} />
          <Route path="/attendees" element={<EventAttendees />} />
          <Route path="/qr-code" element={<EventQRCode />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
