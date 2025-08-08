import React from 'react';
import { User } from 'lucide-react';

const Header = () => (
  <div className="bg-white shadow-sm border-b px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Event Management</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
