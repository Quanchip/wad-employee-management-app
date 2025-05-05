import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [date] = useState(new Date().toISOString().split('T')[0]); // Default to today

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employees');
        setEmployees(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load employees');
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleAttendance = (empId, status) => {
    setAttendance((prev) => ({ ...prev, [empId]: status }));
  };

  const submitAttendance = async () => {
    try {
      await Promise.all(
        Object.entries(attendance).map(([empId, status]) =>
          axios.post('http://localhost:5000/api/attendance', { employeeId: empId, date, status })
        )
      );
      alert('Attendance marked successfully');
      setAttendance({}); // Clear attendance state after successful submission
    } catch (err) {
      alert('Failed to mark attendance');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Attendance</h2>
      <h3 className="text-lg mb-4">Mark Attendance for {date}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">S No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Emp ID</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.employeeId}</td>
              <td className="border p-2">{emp.department}</td>
              <td className="border p-2 flex space-x-2">
                <button
                  onClick={() => handleAttendance(emp.employeeId, 'present')}
                  className={`px-3 py-1 rounded ${attendance[emp.employeeId] === 'present' ? 'bg-green-500' : 'bg-gray-300'} text-white`}
                >
                  Present
                </button>
                <button
                  onClick={() => handleAttendance(emp.employeeId, 'absent')}
                  className={`px-3 py-1 rounded ${attendance[emp.employeeId] === 'absent' ? 'bg-red-500' : 'bg-gray-300'} text-white`}
                >
                  Absent
                </button>
                <button
                  onClick={() => handleAttendance(emp.employeeId, 'sick')}
                  className={`px-3 py-1 rounded ${attendance[emp.employeeId] === 'sick' ? 'bg-orange-500' : 'bg-gray-300'} text-white`}
                >
                  Sick
                </button>
                <button
                  onClick={() => handleAttendance(emp.employeeId, 'leave')}
                  className={`px-3 py-1 rounded ${attendance[emp.employeeId] === 'leave' ? 'bg-yellow-500' : 'bg-gray-300'} text-white`}
                >
                  Leave
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={submitAttendance}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={Object.keys(attendance).length === 0}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default Attendance;