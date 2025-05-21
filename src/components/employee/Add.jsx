import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const depts = await fetchDepartments();
      setDepartments(depts);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://ems-apis.vercel.app/api/employee/add",
        formDataObj,
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
        alert("Error from add-department");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add new Employee</h2>
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
              value={formData.name}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Insert Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          {/* Employee ID */}
          <div>
            <label htmlFor="employeeId" className="block text-gray-600 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              placeholder="Employee ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.employeeId}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-gray-600 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="mm/dd/yyyy"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.dateOfBirth}
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-gray-600 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label htmlFor="maritalStatus" className="block text-gray-600 mb-2">
              Marital Status
            </label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              onChange={handleChange}
              value={formData.maritalStatus}
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
            <label htmlFor="designation" className="block text-gray-600 mb-2">
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              placeholder="Designation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.designation}
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-gray-600 mb-2">
              Department
            </label>
            <select
              id="department"
              name="department"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              onChange={handleChange}
              value={formData.department}
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
              value={formData.salary}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-gray-600 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              {/* <option value="manager">Manager</option> */}
              <option value="employee">Employee</option>
              {/* <option value="intern">Intern</option> */}
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label htmlFor="image" className="block text-gray-600 mb-2">
              Upload Image
            </label>
            <div className="flex">
              <label className="w-full flex items-center px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300">
                <span className="mr-2">Choose File</span>
                <span className="text-gray-500 overflow-hidden whitespace-nowrap">
                  {formData.image ? formData.image.name : "No file chosen"}
                </span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}
