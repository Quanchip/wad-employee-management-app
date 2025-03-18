import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: "",
        basicSalary: 0,
        allowance: 0,
        deductions: 0,
        payDate: "",
    });

    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        const response = await axios.get(`http://localhost:5000/api/employee?department=${departmentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setEmployees(response.data.employees);
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/salary/add", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                console.log("API Response:", response.data); // Debugging
    
                if (response.data?.success && response.data.employee) {
                    const employee = response.data.employee;
                    setSalary((prev) => ({
                        ...prev,
                        employeeId: employee.userId?._id || "",
                        basicSalary: employee.salary || 0,
                        allowance: employee.allowance || 0,
                        deductions: employee.deductions || 0,
                        payDate: employee.payDate || "",
                    }));
                } else {
                    console.error("Invalid response format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
            }
        };
    
        fetchEmployee();
    }, []);
    

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
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, salary, {
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
            {departments.length > 0 ? (
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
                                    value={salary.employeeId}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.name}
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
                                    value={salary.basicSalary}
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
                                    name="allowance"
                                    value={salary.allowance}
                                    onChange={handleChange}
                                    placeholder="Allowance"
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
                                    value={salary.deductions}
                                    onChange={handleChange}
                                    placeholder="Deductions"
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
                                    value={salary.payDate}
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
                                Edit Employee
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>Loading.....</div>
            )}
        </>
    );
};

export default Add;
