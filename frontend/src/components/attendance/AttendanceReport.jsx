import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null); // Reset error state before making a new request
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

      if (response.data && response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData || {});
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      } else {
        setError('Failed to fetch attendance data. Please try again.');
      }
    } catch (error) {
      setError('Error fetching data: ' + (error.response?.status === 404 ? 'API endpoint not found (404)' : error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [dateFilter, skip]);

  const handleLoadmore = () => { 
    setSkip((prevSkip) => prevSkip + limit); 
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

      <div className="my-4">
        <h2 className="text-xl font-semibold">Filter by Date</h2>
        <input
          type="date"
          className="border bg-gray-100 p-2"
          value={dateFilter}
          onChange={(e) =>{
            setDateFilter(e.target.value);
            setSkip(0); 
          }}
        />
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : Object.keys(report).length === 0 ? (
        <p className="text-center">No attendance data available</p>
      ) : (
        Object.entries(report).map(([date, records], dateIndex) => (
          <div key={date} className="mt-4 border-b">
            <h3 className="text-lg font-semibold mt-6">{date}</h3>
            <table className="w-full mt-2 border" border="1" cellPadding="10">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">No</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Employee ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {records && records.length > 0 ? (
                  records.map((record, idx) => (
                    <tr key={`${date}-${idx}`} className="text-center border-t">
                      <td className="border p-2">{dateIndex * limit + idx + 1}</td>
                      <td className="border p-2">{date}</td>
                      <td className="border p-2">{record.employeeId || 'N/A'}</td>
                      <td className="border p-2">{record.employeeName || 'N/A'}</td>
                      <td className="border p-2">{record.departmentName || 'N/A'}</td>
                      <td className="border p-2">{record.status || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-2">
                      No records for this date
                    </td>
                  </tr>
                )}
              </tbody>
            </table> 
          </div>
        ))
      )} 

      <button className='px-4 py-2 border bg-gray-100 text-lg font-semibold' onClick={handleLoadmore}>Load More</button>
    </div>
  );
};

export default AttendanceReport;