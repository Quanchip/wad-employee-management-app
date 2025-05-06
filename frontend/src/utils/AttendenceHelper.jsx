import React from 'react'  


export const columns = [
  {
    name: 'S NO',
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable : true,
    width: "150px"
  },

  {
    name: 'Department',
    selector: (row) => row.department,
    width: "120px",
    center: true
    
  },
  
  {
    name: 'Action',
    selector: (row) => row.action,
    center: true
  },
];

export const AttendanceHelper = ({ status }) => {
    return (
      <div>
        {status == null ? (
          <div className="flex space-x-8">
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              Present
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded">
              Absent
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded">
              Sick
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-black rounded">
              Leave
            </button>
          </div>
        ) : (
          <p className="bg-gray-100 w-20 text-center py-2 rounded">
            {status}
          </p>
        )}
      </div>
    );
  };



