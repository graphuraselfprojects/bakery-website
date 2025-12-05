import React from "react";
import StatsCards from "./StatsCards";
import SalesChart from "./SalesChart";
import OrdersPieChart from "./OrdersPieChart";
import RecentOrder from "./RecentOrder";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <TopBar />

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* MAIN CONTENT — scrollable */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <StatsCards />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <SalesChart />
            <OrdersPieChart />
          </div>

          {/* Recent Orders */}
          <div className="mt-6">
            <RecentOrder />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
