import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { LeaveButton, leaveColumns } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://ems-apis-dwarake627-gmailcoms-projects.vercel.app/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const data = response.data.leaves.map((leave, index) => {
          return {
            _id: leave._id,
            sno: index + 1,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department?.deptName,
            days:
              new Date(leave.endDate).getDate() -
              new Date(leave.startDate).getDate(),
            status: leave.status,
            action: <LeaveButton id={leave._id} />,
          };
        });

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  const buttonStyle = `px-2 py-1 bg-teal-600 text-white hover:bg-teal-700`;

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) => leave.status === status);
    setFilteredLeaves(data);
  };

  return (
    <>
      {leaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className={buttonStyle}
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className={buttonStyle}
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className={buttonStyle}
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>{" "}
          </div>
          <div className="py-6">
            <DataTable
              columns={leaveColumns}
              data={filteredLeaves}
              pagination
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Table;
