import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

export default function Add() {
  const [employee, setEmployee] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const depts = await fetchDepartments();
      setDepartments(depts);
    };
    getDepartments();
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
      const response = await axios.post(
        `https://ems-apis-o83l.vercel.app/api/salary/add/`,
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
      if (error.response && !error.response.data.error) {
        alert(error);
      }
    }
  };

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    console.log(emps);
    setEmployees(emps);
  };


  return (
    <>
      {departments ? (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg my-6">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  onChange={handleDepartment}
                  value={employee.department}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.deptName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Department */}
              <div>
                <label htmlFor="Employee" className="block text-gray-600 mb-2">
                  Employee
                </label>
                <select
                  id="employeeId"
                  name="employeeId"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>
                  {employees?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-gray-600 mb-2"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  id="basicSalary"
                  name="basicSalary"
                  placeholder="Basic Salary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  value={employee.designation}
                />
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-gray-600 mb-2">
                  Allowances
                </label>
                <input
                  type="number"
                  id="allowances"
                  name="allowances"
                  placeholder="Allowances"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-gray-600 mb-2">
                  Deductions
                </label>
                <input
                  type="number"
                  id="deductions"
                  name="deductions"
                  placeholder="Deductions"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-gray-600 mb-2">
                  Pay Date
                </label>
                <input
                  type="date"
                  id="payDate"
                  name="payDate"
                  placeholder="Pay Date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Salary
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
