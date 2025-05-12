import { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('2025-01-24'); // Default date from screenshot
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`/api/attendance/report?date=${date}&page=${page}`);
        setRecords(res.data.records);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load report');
        setLoading(false);
      }
    };
    fetchReport();
  }, [date, page]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Report</h2>
      <div className="mb-4">
        <label className="mr-2">Filter by Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Serial No</th>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Employee Name</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record._id} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{record.employeeId}</td>
              <td className="border p-2">{record.employeeName}</td>
              <td className="border p-2">{record.department}</td>
              <td className="border p-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;