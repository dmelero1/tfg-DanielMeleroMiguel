import React from "react";
import DashboardCarrousel from "~/components/Dashboard/DashboardCarrousel";
import DashboardClases from "~/components/Dashboard/DashboardClases";
import DashboardImg from "~/components/Dashboard/DashboardImg";

const Dashboard = () => {
  return (
    <div>
      <DashboardImg />
      <DashboardClases />
      <DashboardCarrousel />
    </div>
  );
};

export default Dashboard;
