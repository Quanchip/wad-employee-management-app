import React from 'react';
import axios from 'axios';

// Columns for Attendance Table
export const columns = [
  {
    name: 'S NO',
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: 'Emp ID',
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px",
  },
  {
    name: 'Department',
    selector: (row) => row.department,
    width: "120px",
    center: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    center: true,
  },
];

// AttendanceHelper Component
export const AttendanceHelper = ({ status, employeeId }) => {
  const markEmployee = async (status, employeeId) => {
    try {
      const response = await axios.put(
        `https://localhost:5000/api/attendance/update/${employeeId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Attendance updated:", response.data);
      // Optionally, update UI or notify parent
    } catch (error) {
      console.error("Error updating attendance:", error);
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
