import React from 'react';
import { Calendar, LogOut } from 'lucide-react';

const Sidebar = () => (
  <div className="bg-white shadow-lg h-full min-h-screen flex flex-col justify-between" style={{ minWidth: '250px', maxWidth: '350px', width: '20vw' }}>
    <div className="p-4 border-b">
      <h1 className="text-xl font-bold text-blue-600">
        <span className="text-orange-500">Art</span>Masterz
      </h1>
      <p className="text-xs text-gray-500 mt-1">DIGITAL ARTS & EVENTS</p>
    </div>
    <nav className="mt-6">
      <div className="px-4">
        <button className="w-full flex items-center px-3 py-2 text-white bg-cyan-500 rounded-lg mb-2">
          <Calendar className="w-4 h-4 mr-3" />
          Event Management
        </button>
      </div>
    </nav>
    <div className="px-4 pb-6 mt-auto">
      <button className="w-full flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold">
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </button>
    </div>
  </div>
);

export default Sidebar;
