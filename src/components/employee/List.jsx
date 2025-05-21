import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [filterEmployees, setFilterEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployeeLoading(true);
      try {
        const response = await axios.get("https://ems-apis-dwarake627-gmailcoms-projects.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => {
            return {
              _id: emp._id,
              sno: index + 1,
              deptName: emp.department?.deptName,
              name: emp.userId.name,
              dateOfBirth: new Date(emp.dateOfBirth).toLocaleDateString(),
              profileImage: (
                <img
                  className="w-[35px] h-[35px] rounded-full object-cover"
                  src={
                    emp.userId.profileImage
                      ? `https://ems-apis-dwarake627-gmailcoms-projects.vercel.app/${emp.userId.profileImage}`
                      : emp.gender === "female"
                      ? "https://cdn-icons-png.flaticon.com/128/6997/6997662.png"
                      : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                  }
                  alt="Profile"
                />
              ),
              action: <EmployeeButtons _id={emp._id} />,
            };
          });
          setEmployees(data);
          setFilterEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmployeeLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterEmployees(records);
  };

  return (
    <>
      {employeeLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dept Name"
              className="px-4 py-0.5 rounded"
              onChange={handleFilter}
            />
            <NavLink
              to={"/admin-dashboard/add-employee"}
              className={"px-4 py-1 bg-teal-600 rounded text-white"}
            >
              Add New Employee
            </NavLink>
          </div>
          <div className="mt-6">
            <DataTable columns={columns} data={filterEmployees} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default List;
