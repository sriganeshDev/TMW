import React from "react";
import AdminDashBoard from "../../components/DashBoard/AdminDashBoard";
import UserDashboard from "../../components/DashBoard/UserDashBoard";

const DashboardPage = () => {
  const userRole = localStorage.getItem("role");

  return (
    <div>{userRole === "Admin" ? <AdminDashBoard /> : <UserDashboard />}</div>
  );
};
export default DashboardPage;
