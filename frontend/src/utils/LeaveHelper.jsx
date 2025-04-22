
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export const columns = [
  {
    name: 'S Number',
    selector: (row) => row.sno,
    minWidth: "80px"
  },
  {
    name: 'Emp ID',
    selector: (row) => row.employeeId,
    minWidth: "150px",
    center: true
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    minWidth: "150px",
    center: "true"
    
  },
  {
    name: 'Leave Type',
    selector: (row) => row.leaveType,
    minWidth: "120px",
    center: "true"
    
  },
  {
    name: 'Department',
    selector: (row) => row.department,
    sortable : true,
    minWidth: "150px",
    center: "true"
  },
  {
    name: 'Days',
    selector: (row) => row.days,
    center: "true",
    minWidth: "120px"
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    center: "true",
    minWidth: "120px"
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    minWidth: "100px",
    center: "true"
  },
];

export const LeaveButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leave/${id}`);
    };

    return (
        <button className='px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600'
                onClick={() => handleView(Id)}
        >
            View
        </button>
    )
};