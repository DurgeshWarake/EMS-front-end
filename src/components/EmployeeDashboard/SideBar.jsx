import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SideBar = () => {
  const linkStyle = "flex items-center space-x-4 py-2.5 px-4 rounded";
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/employee-dashboard"
          end // Add this prop
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-teal-500" : ""}`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-teal-500" : ""}`
          }
        >
          <FaTachometerAlt />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-teal-500" : ""}`
          }
        >
          <FaTachometerAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-teal-500" : ""}`
          }
        >
          <FaTachometerAlt />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-teal-500" : ""}`
          }
        >
          <FaTachometerAlt />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
