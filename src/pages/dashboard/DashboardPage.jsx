import React from "react";
import AdminDashBoard from "./AdminDashBoard";
import UserDashboard from "./UserDashBoard";

const DashboardPage = () => {
  const userRole = localStorage.getItem("role");

  return (
    <div>{userRole === "Admin" ? <AdminDashBoard /> : <UserDashboard />}</div>
  );
};
export default DashboardPage;
