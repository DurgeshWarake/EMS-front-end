import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
const AdminSideBar = () => {
  const [activeRoute, setActiveRoute] = useState();
  const linkStyle = "flex items-center space-x-4 py-2.5 px-4 rounded";

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to={"/admin-dashboard"}
          className={`${
            activeRoute === "/admin-dashboard" ? "bg-teal-500" : " "
          } ${linkStyle}`}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/employees"}
          className={`${
            activeRoute === "/admin-dashboard/employees" ? "bg-teal-500" : " "
          } ${linkStyle}`}
        >
          <FaTachometerAlt />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/departments"}
          className={`${
            activeRoute === "/admin-dashboard/departments" ? "bg-teal-500" : " "
          } ${linkStyle}`}
        >
          <FaTachometerAlt />
          <span>Department</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/leaves"}
          className={`${
            activeRoute === "/admin-dashboard/leaves" ? "bg-teal-500" : " "
          } ${linkStyle}`}
        >
          <FaTachometerAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/salary/add"}
          className={`${
            activeRoute === "/admin-dashboard/salary/add" ? "bg-teal-500" : " "
          } ${linkStyle}`}
        >
          <FaTachometerAlt />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to={"/admin-dashboard/setting"}
          className={`${
            activeRoute === "/admin-dashboard/setting" ? "bg-teal-500" : " "
          } ${linkStyle}`}
        >
          <FaTachometerAlt />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSideBar;
