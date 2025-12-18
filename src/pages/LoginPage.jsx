import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/auth/login', loginData);
            
            if (response.data.access_token) {
                // Store token in localStorage
                localStorage.setItem('authToken', response.data.access_token);
                
                toast.success('Login successful! Redirecting...', {
                    position: "top-right",
                    theme: "dark",
                    autoClose: 2000
                });

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    navigate('/userhome');
                }, 2000);
            }
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.response?.status === 401) {
                toast.error('Invalid email or password', {
                    position: "top-right",
                    theme: "dark"
                });
            } else {
                toast.error('Login failed. Please try again.', {
                    position: "top-right",
                    theme: "dark"
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
            <ToastContainer 
                position="top-right"
                theme="dark"
                toastStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
            />
            
            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                    <i className='bx bx-diamond text-[#e99b63]'></i>
                    <span className="text-xl font-semibold tracking-wider">LOGIN</span>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => navigate('/register')}
                        className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
                    >
                        <i className='bx bx-user-plus'></i>
                        Sign Up
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
                    >
                        <i className='bx bx-home'></i>
                        Home
                    </button>
                </div>
            </nav>

            <main className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-6rem)] px-8 py-12">
                {/* Left Content Panel */}
                <div className="max-w-2xl z-10 w-full lg:w-1/2">
                    <div className="relative w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full mb-8">
                        <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-2">
                            <i className='bx bx-lock-alt'></i>
                            SECURE ACCESS
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-semibold tracking-wider mb-6">
                        ENHANCE
                        <br />
                        YOUR RESUME
                    </h1>

                    <p className="text-lg tracking-wider text-gray-400 mb-12 max-w-[30rem]">
                        An AI-powered ATS that instantly scores your resume 
                    against job requirements and suggests smart improvements to help you stand out.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                        <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                            <p className="text-sm text-gray-400">Resume uploaded</p>
                            <p className="text-2xl font-bold">1,247</p>
                        </div>
                        <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                            <p className="text-sm text-gray-400">Accuracy</p>
                            <p className="text-2xl font-bold">99.9%</p>
                        </div>
                        <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                            <p className="text-sm text-gray-400">Security</p>
                            <p className="text-2xl font-bold">256-bit</p>
                        </div>
                    </div>

                    {/* Features */}
                    {/* <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <i className='bx bx-shield-quarter'></i>
                            Security Features
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-400">
                                <i className='bx bx-check text-[#e99b63]'></i>
                                <span>End-to-end encryption</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <i className='bx bx-check text-[#e99b63]'></i>
                                <span>JWT token authentication</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <i className='bx bx-check text-[#e99b63]'></i>
                                <span>Brute force protection</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <i className='bx bx-check text-[#e99b63]'></i>
                                <span>Password hashing with bcrypt</span>
                            </div>
                        </div> */}
                    {/* </div> */}
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:pl-12">
                    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#656565] to-[#e99b63] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(233,155,99,0.3)]">
                                <i className='bx bx-lock text-3xl'></i>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
                            <p className="text-gray-400">Sign in to your account</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        <i className='bx bx-envelope mr-2'></i>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e99b63] transition-all"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        <i className='bx bx-lock-alt mr-2'></i>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e99b63] transition-all"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-[#e99b63]" />
                                        <span className="text-sm text-gray-400">Remember me</span>
                                    </label>
                                    <button 
                                        type="button" 
                                        onClick={() => navigate('/forgot-password')}
                                        className="text-sm text-[#e99b63] hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-[#656565] to-[#e99b63] text-black font-semibold py-3 px-8 rounded-full tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(233,155,99,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className='bx bx-loader-alt bx-spin'></i>
                                            Authenticating...
                                        </span>
                                    ) : (
                                        'SIGN IN'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                            {/* <div className="text-center">
                                <p className="text-gray-400 mb-4">Don't have an account?</p>
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className="w-full border border-[#2a2a2a] py-3 rounded-full font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
                                >
                                    <i className='bx bx-user-plus mr-2'></i>
                                    Create New Account
                                </button>
                            </div> */}

                            {/* Demo Credentials */}
                            {/* <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                    <i className='bx bx-info-circle'></i>
                                    Demo Credentials
                                </p>
                                <div className="space-y-1 text-xs text-gray-500">
                                    <p>Email: demo@example.com</p>
                                    <p>Password: demo123</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* 3D Background Element */}
                {/* <Spline 
                    className="absolute lg:top-[-5%] lg:right-[-10%] h-[800px] w-[800px] opacity-20 pointer-events-none"
                    scene="https://prod.spline.design/hwiWk6EJqZrjuYYp/scene.splinecode"
                /> */}
            </main>

            {/* Bottom Footer */}
            <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                        <i className='bx bx-shield text-green-400'></i>
                        <span>System Status: <span className="text-green-400 font-semibold">Secure</span></span>
                    </span>
                    <span>•</span>
                    <span>Encryption: 256-bit AES</span>
                    <span>•</span>
                    <span>Version: 2.4.1</span>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]">
                        <i className='bx bx-help-circle'></i>
                        Help
                    </button>
                    <button className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]">
                        <i className='bx bx-cog'></i>
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;