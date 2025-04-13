import React from 'react'; 
import { NavLink } from 'react-router-dom'; 
import { FaTachometerAlt, FaUser, FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaCog, FaCogs } from 'react-icons/fa'; 
import { useAuth } from '../../context/authContext';

const Sidebar = () => { 
    const {user} = useAuth()
    return ( 
        <div className="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0">  
            
            {}
            <div className="bg-blue-500 text-white text-center font-bold text-lg py-4">
                Employee MS
            </div>

            <nav className="flex flex-col space-y-4 mt-4"> 
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

                <NavLink to="/employee-dashboard/leaves" className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaBuilding className="text-lg" />
                    <span>Leaves</span>
                </NavLink> 

                <NavLink to={`/employee-dashboard/salary/${user._id}`} className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaCalendarAlt className="text-lg" />
                    <span>Salary</span>
                </NavLink> 

                <NavLink to="/employee-dashboard/setting" className= {({isActive}) => `${isActive ? "bg-blue-500" : " "} flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700`}
                    >
                    <FaCogs className="text-lg" />
                    <span>Setting</span>
                </NavLink>
            </nav>
        </div>
    );
}; 

export default Sidebar;
