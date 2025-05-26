import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaUsers, FaCog, FaCogs, FaTasks, FaPeopleArrows } from 'react-icons/fa'; 
import { useAuth } from '../../context/authContext';

const Sidebar = () => { 

    
    const {user} = useAuth()
    return ( 
        <div className="bg-white text-gray-800 h-screen w-64 fixed left-0 top-0 border-r shadow-sm">  
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold text-xl py-6">
                Employee Panel
            </div>

            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUsers className="text-blue-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">Employee</p>
                    </div>
                </div>
            </div>

            

            <nav className="flex flex-col space-y-1 p-4"> 
                <NavLink to="/employee-dashboard" className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    end
                    >
                    <FaTachometerAlt className="text-lg" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to={`/employee-dashboard/profile/${user._id}`} className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    
                    >
                    <FaUser className="text-lg" />
                    <span>My profile</span>
                </NavLink> 

                <NavLink to={`/employee-dashboard/leaves/${user._id}`} className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaBuilding className="text-lg" />
                    <span>Leaves</span>
                </NavLink> 

                <NavLink to={`/employee-dashboard/salary/${user._id}`} className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaCalendarAlt className="text-lg" />
                    <span>Salary</span>
                </NavLink>   

                <NavLink to={`/employee-dashboard/task/${user._id}`}  className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaTasks className="text-lg" />
                    <span>Task</span>
                </NavLink>


                <NavLink to={`/employee-dashboard/team/${user._id}`}  className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaPeopleArrows className="text-lg" />
                    <span>Team</span>
                </NavLink>

                <NavLink to="/employee-dashboard/setting" className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaCog className="text-lg" />
                    <span>Setting</span>
                </NavLink>
            </nav>
        </div>
    );
}; 

export default Sidebar;
