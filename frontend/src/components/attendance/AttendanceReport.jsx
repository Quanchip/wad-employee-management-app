import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'present':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'absent':
      return 'bg-red-100 text-red-700 border-red-300';
    case 'late':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
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
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-blue-700 mb-6">Attendance Report</h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-6 bg-white p-4 rounded-xl shadow">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Filter by Date</h2>
            <input
              type="date"
              className="border-2 border-blue-200 bg-gray-50 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setSkip(0);
              }}
            />
          </div>
        </div>

        {error && <p className="text-center text-red-500 mb-3">{error}</p>}

        {loading ? (
          <div className="text-center text-base text-gray-500">Loading...</div>
        ) : Object.keys(report).length === 0 ? (
          <p className="text-center text-gray-500">No attendance data available</p>
        ) : (
          Object.entries(report).map(([date, records], dateIndex) => (
            <div key={date} className="mt-6 bg-white rounded-lg shadow p-3 border border-blue-100">
              <h3 className="text-base font-bold text-blue-600 mb-2">{date}</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-100 text-blue-800">
                      <th className="p-2 font-semibold">No</th>
                      <th className="p-2 font-semibold">Date</th>
                      <th className="p-2 font-semibold">Employee ID</th>
                      <th className="p-2 font-semibold">Name</th>
                      <th className="p-2 font-semibold">Department</th>
                      <th className="p-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records && records.length > 0 ? (
                      records.map((record, idx) => (
                        <tr key={`${date}-${idx}`} className="text-center border-t hover:bg-blue-50 transition">
                          <td className="p-2">{dateIndex * limit + idx + 1}</td>
                          <td className="p-2">{date}</td>
                          <td className="p-2">{record.employeeId || 'N/A'}</td>
                          <td className="p-2">{record.employeeName || 'N/A'}</td>
                          <td className="p-2">{record.departmentName || 'N/A'}</td>
                          <td className={`p-2 font-semibold rounded-lg ${statusColor(record.status)}`}>{record.status || 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-2 text-gray-500">
                          No records for this date
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-teal-600 transition"
            onClick={handleLoadmore}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;