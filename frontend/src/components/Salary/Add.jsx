import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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

    // Fetch Departments on Component Load
    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    // Fetch Employees by Department
    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        try {
            const response = await axios.get(`http://localhost:5000/api/employee?department=${departmentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }); 
            if(response.data.success) {
                setEmployees(response.data.employees);
            } else { 
                setEmployees([]);
            }

        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // Fetch Selected Employee's Salary Details
    useEffect(() => {
        if (!salary.employeeId) return; // Ensure an employee is selected

        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${salary.employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                });

                if (response.data?.success && response.data.employee) {
                    const employee = response.data.employee;
                    setSalary((prev) => ({
                        ...prev,
                        basicSalary: employee.salary || 0,
                        allowance: employee.allowance || 0,
                        deductions: employee.deductions || 0,
                        payDate: employee.payDate || "",
                    }));
                }
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };

        fetchEmployee();
    }, [salary.employeeId]); // Runs when employeeId changes

    // Handle Form Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

    if (!salary.employeeId) {
        alert("Please select an employee before submitting.");
        return;
    }

    try {
        const response = await axios.put( 
            `http://localhost:5000/api/employee/${salary.employeeId}`, // Use salary.employeeId
            salary,  
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (response.data.success) {
            alert("Salary details updated successfully!");
            navigate("/admin-dashboard/employees");
        }
    } catch (error) {
        alert(error.response?.data?.error || "Something went wrong");
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

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Add Salary
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
