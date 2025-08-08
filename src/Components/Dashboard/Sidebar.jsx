import React, { useState } from 'react';
import { Calendar, LogOut, Menu } from 'lucide-react';


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Drawer Toggle Button (visible on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-cyan-600" />
      </button>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar Drawer */}
      <div
        className={`fixed md:static top-0 left-0 z-50 bg-white shadow-lg h-full min-h-screen flex flex-col justify-between transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ minWidth: '250px', maxWidth: '350px', width: '20vw' }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            <span className="text-orange-500">Art</span>Masterz
          </h1>
          {/* Close button for drawer */}
          <button
            className="md:hidden text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            &times;
          </button>
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
    </>
  );
};

export default Sidebar;
