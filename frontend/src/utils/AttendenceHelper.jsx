import React from "react";
import axios from "axios";

// Columns for Attendance Table
export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

// AttendanceHelper Component
export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/attendance/update/${employeeId}`, // Changed to http
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        statusChange();
      } else {
        console.error("Update failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating attendance:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div>
      {status == null ? (
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => markEmployee("Present", employeeId)}
          >  
            Present
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => markEmployee("Absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => markEmployee("Sick", employeeId)}
          >
            Sick
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-black rounded"
            onClick={() => markEmployee("Leave", employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};