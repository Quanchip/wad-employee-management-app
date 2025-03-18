import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import axios from 'axios';  

const View = () => { 
    const [salaries, setSalaries] = useState([]); 
    const [filteredSalaries, setFilteredSalaries] = useState([]); 
    const { id } = useParams(); 

    const fetchSalaries = async () => { 
        try { 
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, { 
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            console.log(response); 
            if (response.data.success) { 
                setSalaries(response.data.data);
                setFilteredSalaries(response.data.data);
            } 
        } catch (error) { 
            console.error("Error fetching salaries:", error);
            alert("Error fetching salaries");
        }
    }; 

    useEffect(() => { 
        fetchSalaries(); 
    }, [id]);  

    const filterSalaries = (q) => { 
        if (q === "") {
            setFilteredSalaries(salaries); // Reset to all salaries if the search query is empty
        } else {
            const filteredRecords = salaries.filter((salary) => 
                salary.employeeId.toString().toLowerCase().includes(q.toLowerCase()) // Convert to string if necessary
            ); 
            setFilteredSalaries(filteredRecords);
        }
    }; 

    return ( 
        <>  
            {filteredSalaries.length === 0 ? ( 
                <div>Loading...</div>
            ) : ( 
                <div className="overflow-x-auto p-5">
                    <h2 className="text-2xl font-bold mb-4">Salary Records</h2>
                    <input 
                        type="text" 
                        placeholder="Search by Employee ID" 
                        className="p-2 border rounded mb-4" 
                        onChange={(e) => filterSalaries(e.target.value)}
                    />
                    {filteredSalaries.length === 0 && (
                        <div>No records found</div>
                    )}
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Employee ID</th>
                                <th className="px-4 py-2">Basic Salary</th>
                                <th className="px-4 py-2">Allowances</th>
                                <th className="px-4 py-2">Deductions</th>
                                <th className="px-4 py-2">Pay Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salary, index) => (
                                <tr key={salary.id} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td> {/* This will auto-increment the serial number */}
                                    <td className="px-4 py-2">{salary.employeeId}</td>
                                    <td className="px-4 py-2">${salary.basicSalary}</td>
                                    <td className="px-4 py-2">${salary.allowances}</td>
                                    <td className="px-4 py-2">${salary.deductions}</td>
                                    <td className="px-4 py-2">{new Date(salary.payDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default View;
