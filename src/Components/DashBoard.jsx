import { Outlet } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import Header from "./Dashboard/Header";

const Dashboard = () => {
  return (
    <div className="flex   bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
