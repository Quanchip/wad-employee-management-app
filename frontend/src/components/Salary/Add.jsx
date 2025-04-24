import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployees } from '../../utils/EmployeeHelper.jsx';
const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: "",
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: "",
    });

    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

  

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps);
    };


   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/salary/add`, salary, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {departments ? (
                <div className='p-6 bg-gray-100 min-h-screen'>
                <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <select
                                    name="department"
                                    onChange={handleDepartment}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>
                                            {dep.dep_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Employee */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Employee</label>
                                <select
                                    name="employeeId"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.employeeId}
                                        </option>   
                                    ))}
                                </select>
                            </div>

                            {/* Basic Salary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    // value={salary.basicSalary}
                                    onChange={handleChange}
                                    placeholder="Basic Salary"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Allowance */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Allowance</label>
                                <input
                                    type="number"
                                    name="allowances"
                                    // value={salary.allowance}
                                    onChange={handleChange}
                                    placeholder="allowances"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Deductions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deductions</label>
                                <input
                                    type="number"
                                    name="deductions"
                                    // value={salary.deductions}
                                    onChange={handleChange}
                                    placeholder="deductions"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Pay Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                                <input
                                    type="date"
                                    name="payDate"
                                    // value={salary.payDate}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            ) : (
                <div>Loading.....</div>
            )}
        </>
    );
};

export default Add;
