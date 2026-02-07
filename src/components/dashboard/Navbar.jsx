import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between items-center text-white h-12 bg-teal-600 sticky top-0">
      <p>Welcome {user.name}</p>
      <button
        className="px-4 py-1 bg-teal-700 rounded hover:bg-teal-800 mr-6"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
