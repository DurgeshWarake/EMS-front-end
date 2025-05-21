import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [filterDepts, setFilterDepts] = useState([]);

  const onDepartmentDelete = async (id) => {
    if (id) {
      setIsDeleted((prev) => !prev);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDeptLoading(true);
      try {
        const response = await axios.get(
          "https://ems-apis.vercel.app/api/department/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.departments.map((dep, index) => {
            return {
              _id: dep._id,
              sno: index + 1,
              deptName: dep.deptName,
              action: (
                <DepartmentButtons
                  _id={dep._id}
                  onDepartmentDelete={onDepartmentDelete}
                />
              ),
            };
          });

          setDepartments(data);
          setFilterDepts(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDeptLoading(false);
      }
    };

    fetchDepartments();
  }, [isDeleted]);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.deptName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilterDepts(records);
  };
  return (
    <>
      {deptLoading ? (
        <div>Loading</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dept Name"
              className="px-4 py-0.5 rounded"
              onChange={filterDepartments}
            />
            <NavLink
              to={"/admin-dashboard/add-department"}
              className={"px-4 py-1 bg-teal-600 rounded text-white"}
            >
              Add New Department
            </NavLink>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filterDepts} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
