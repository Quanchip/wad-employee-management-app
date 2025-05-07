import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState(''); 
  const[loading, setLoading] = useState(false); 

  const fetchReport = async () => { 
    setLoading(true)
    try {
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append('date', dateFilter);
      }

      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      } 
      setLoading(false); 
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [dateFilter]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

      <div className="my-4">
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <input
          type="date"
          className="border bg-gray-100 p-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {Object.keys(report).length === 0 ? (
        <p className="text-center">No attendance data available</p>
      ) : (
      loading ? <div>Loading...</div> : Object.entries(report).map(([date, records], dateIndex) => (
          <div key={date}>
            <h3 className="text-lg font-semibold mt-6">{date}</h3>
            <table className="w-full mt-2 border">
              <thead>
                <tr className="bg-gray-200">
                  <th>No</th>
                  <th>Date</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, idx) => (
                  <tr key={`${date}-${idx}`} className="text-center border-t">
                    <td>{dateIndex * limit + idx + 1}</td>
                    <td>{date}</td>
                    <td>{record.employeeId}</td>
                    <td>{record.employeeName}</td>
                    <td>{record.departmentName}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;
