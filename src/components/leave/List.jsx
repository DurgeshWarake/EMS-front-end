import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/Leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2x1 font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />

        {user.role === "employee" && (
          <NavLink
            to={"/employee-dashboard/add-leave"}
            className="bg-teal-600 text-white px-4 py-1 rounded"
          >
            Add New Leave
          </NavLink>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden dark:border-gray-800 my-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Leave Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  From
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  To
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Description
                </th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Applied Date
                </th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 dark:divide-gray-700">
              {leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-300/50"
                >
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-500 font-mono">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-500">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  {/* <td className="px-6 py-4 text-red-600 dark:text-red-400">
                    -{leave.description}
                  </td> */}

                  <td className="px-6 py-4 text-gray-600 dark:text-gray-500">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-500">
                    {leave.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
