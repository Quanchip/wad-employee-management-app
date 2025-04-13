    import React, { useState, useEffect } from 'react'; 
    import { Link } from 'react-router-dom';
    import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
    import DataTable from 'react-data-table-component'
    import axios from 'axios';


    const List = () => { 

        const [employees, setEmployees] = useState([])
        const [emploading, setEmpLoading] = useState(false)
        const [filteredEmployee, setFilteredEmployees] = useState([])

        useEffect(() => {
            const fetchEmployees = async () => {
                setEmpLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                })

                console.log("API Response:", response.data);


                if (response.data.success) {
                let sno = 1
                const data = response.data.employees.map((emp) => ({
                    _id: emp._id,
                    sno: sno++,
                    dep_name: emp.department.dep_name,
                    name: emp.userId.name,
                    dob: new Date(emp.dob).toLocaleDateString(),
                    profileImage: <img width={300}  
                                    className='rounded-full object-cover'
                                    style={{ width: "150px", height: "150px" }}
                                    src={`http://localhost:5000/${emp.userId.profileImage}`}/> ,
                    action: (
                    <EmployeeButtons Id={emp._id} />
                    ),
                }))
                setEmployees(data)
                setFilteredEmployees(data)

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
            };
            fetchEmployees()
        }, [])

        const handleFilter = (e) => {
            const records = employees.filter((emp) => (
                emp.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
            setFilteredEmployees(records)
        }

        return ( 
            <div className='p-6'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Manage Employee</h3>
                </div>

                <div className='flex justify-between items-center my-4'>
                    <input
                    type='text'
                    placeholder='Search by Department Name'
                    className='px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    onChange={handleFilter}
                    />
                    <Link
                    to='/admin-dashboard/add-employee'
                    className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
                    >
                    Add New Employee
                    </Link>
                </div>
                <div>
                    <DataTable columns={columns} data={filteredEmployee} pagination/>
                </div>

            </div>
        )
    } 

    export default List