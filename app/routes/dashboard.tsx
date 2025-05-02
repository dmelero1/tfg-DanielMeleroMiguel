import React from "react";
import DashboardBeneficios from "~/components/Dashboard/DashboardBeneficios";
import DashboardCarrousel from "~/components/Dashboard/DashboardCarrousel";
import DashboardClases from "~/components/Dashboard/DashboardClases";
import DashboardImg from "~/components/Dashboard/DashboardImg";
import Footer from "~/components/Footer/Footer";
import LegalSection from "~/components/LegalSection/LegalSection";

const Dashboard = () => {
  return (
    <div>
      <DashboardImg />
      <DashboardBeneficios />
      <DashboardClases />
      <DashboardCarrousel />

      <LegalSection />
      <Footer />
    </div>
  );
};

export default Dashboard;
