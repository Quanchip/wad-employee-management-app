import React from "react";


/**Creat and style LOGIN page*/
const Login = () => {
    return (
        <div 
            className="flex flex-col items-center h-screem justify-center
            bg-gradient-to-b from-blue-600 from-50% to-gray-100 to-50% space-y-6"    
        >
            <h2 className="font-sevillana text-3xl text-white">Employee Management System</h2>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" className="w-full px-3 py-2 border" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" className="w-full px-3 py-2 border" placeholder="*************" />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label htmlFor="" className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" name="" id="" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-600 text-white py-2">Login</button>
                        <a href="#" className="text-teal-600">
                            Forgot password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login