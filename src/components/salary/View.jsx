import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filterSalaries, setFilterSalaries] = useState(null);
  const { id } = useParams();
  const {user} = useAuth()

  let sno = 1;

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilterSalaries(response.data.salary);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterSalary = (q) => {
    const filteredRecords = salaries.filter((leave) => {
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase());
    });
    setFilterSalaries(filteredRecords);
  };

  return (
    <>
      {filterSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>

          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={filterSalary}
            />
          </div>

          {filterSalaries.length > 0 ? (
            <div className="rounded-xl border border-gray-100 shadow-sm overflow-hidden dark:border-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Employee ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Basic Salary
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Allowances
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Deductions
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Net Salary
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Pay Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-500 dark:divide-gray-700">
                    {filterSalaries.map((salary, index) => (
                      <tr
                        key={salary._id}
                        className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-300/50"
                      >
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-500 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-500 font-mono">
                          {salary.employeeId?.employeeId}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-500">
                          {salary.basicSalary?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-green-600 dark:text-green-400">
                          +{salary.allowances?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-red-600 dark:text-red-400">
                          -{salary.deductions?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-500 font-semibold">
                          {salary.netSalary?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-500">
                          {new Date(salary.payDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
