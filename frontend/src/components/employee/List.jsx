import React from 'react'; 
import { Link } from 'react-router-dom';

const List = () => { 
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

                />
                <Link
                to='/admin-dashboard/add-employee'
                className='px-4 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition'
                >
                Add New Employee
                </Link>
            </div>

        </div>
    )
} 

export default List