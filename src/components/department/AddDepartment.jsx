import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component"

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    deptName: "",
    dscription: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({
      ...department,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
       if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.error) {
        alert("Error from add-department");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md show-md w-96">
      <div className="text-2xl font-bold mb-6">
        <h3>Add Department</h3>
        <form>
          <div>
            <label
              htmlFor="department_name"
              className="text-sm font-medium text-gray-700 "
            >
              Department Name
            </label>
            <input
              type="text"
              name="deptName"
              placeholder="Enter Dept Name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="department_name"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              type="text"
              name="dscription"
              placeholder="Enter Description"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              rows={"4"}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="w-full mt-6 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
