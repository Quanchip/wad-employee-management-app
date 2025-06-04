import React, { createContext, useState } from "react";
import axios from "axios"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


/**Creat and style LOGIN page*/
const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]  = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()


    // Handle submit button event
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            if(response.data.success){
                toast.success("Successfully login")
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if (response.data.user.role === "admin") {
                   navigate('/admin-dashboard') 
                } else{
                    navigate('/employee-dashboard')
                }
            }

        } catch (error) {
            if (error.response && !error.response.data.success){
                setError(error.response.data.error)
            }else{
                setError("Server error")
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 p-4">
            <div className="max-w-6xl w-full flex bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Left side - Illustration */}
                <div className="hidden lg:block lg:w-1/2 bg-blue-50 p-8">
                    <div className="h-full flex flex-col justify-center items-center">
                        <img 
                            src="/images/management-pana.png"
                            alt="HR Management Illustration"
                            className="w-full max-w-md object-contain"
                        />
                        <h1 className="text-2xl font-bold text-blue-900 mt-6 text-center">
                            Employee Management System
                        </h1>
                        <p className="text-blue-700 mt-2 text-center">
                            Streamline your workforce management
                        </p>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="w-full lg:w-1/2 p-8">
                    <div className="max-w-md mx-auto">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Please sign in to your account
                            </p>
                        </div>
                        
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login