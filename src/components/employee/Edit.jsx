import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";

export default function Edit() {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });
  const { id } = useParams();
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const depts = await fetchDepartments();
      setDepartments(depts);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: emp.userId.name,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            salary: emp.salary,
            department: emp.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error);
        }
      }
    };
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log("error", error.response.data.error);
      if (error.response && !error.response.data.error) {
        alert(error);
      }
    }
  };

  return (
    <>
      {departments && employee ? (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-600 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Insert Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  value={employee.name}
                />
              </div>

              {/* Marital Status */}
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-gray-600 mb-2"
                >
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-gray-600 mb-2"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder="Designation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  value={employee.designation}
                />
              </div>

              {/* Department */}
              <div>
                <label
                  htmlFor="department"
                  className="block text-gray-600 mb-2"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  onChange={handleChange}
                  value={employee.department}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.deptName}
                    </option>
                  ))}
                  {/* <option value="hr">Human Resources</option>
              <option value="it">Information Technology</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option> */}
                </select>
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-gray-600 mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="Salary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  value={employee.salary}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Edit Employee
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
