import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "../components/dashboard/AdminSideBar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (loading) {
  //       return <div>Loading....</div>;
  //     }

  //     if (!user) {
  //       navigate("/login");
  //     } else {
  //       if (user.role !== "admin") {
  //         navigate("/employee-dashboard");
  //       }
  //     }
  //   }, [user]);

  return (
    <div className="flex">
      {" "}
      <AdminSideBar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
