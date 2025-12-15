import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom";

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState({
  name: '',
  email: '',
  age: 0,
  password: ''
}); 
const navigate = useNavigate();
    // Authentication token (simulating logged-in user)
    const token = localStorage.getItem('authToken');

    // Fetch all users (protected route)
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3000/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users. Please login again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get current user profile
    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    // Create new user (public route)
   const createUser = async (e) => {
  e.preventDefault();
  try {
    setIsLoading(true);

    await axios.post('http://localhost:3000/users', newUser);

    toast.success('User created successfully! Redirecting to login...');

    setNewUser({ name: '', email: '', age: 0, password: '' });

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      toast.error(message.join(", "));
    } else if (typeof message === "string") {
      toast.error(message);
    } else {
      toast.error("Failed to create user.");
    }
  } finally {
    setIsLoading(false);
  }
};


    useEffect(() => {
        if (token) {
            fetchUsers();
            fetchCurrentUser();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
            <ToastContainer 
                position="top-right"
                theme="dark"
                toastStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
            />
            
            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                    <i className='bx bx-diamond text-[#e99b63]'></i>
                    <span className="text-xl font-semibold tracking-wider">REGISTER</span>
                </div>
                {currentUser && (
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Welcome back</p>
                            <p className="font-semibold">{currentUser.name}</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] rounded-full flex items-center justify-center">
                            <span className="font-bold">{currentUser.name.charAt(0)}</span>
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex flex-col lg:flex-row items-start justify-between min-h-[calc(100vh-6rem)] px-8 py-12">
                {/* Left Panel - Users List */}
                <div className="w-full lg:w-1/2 pr-0 lg:pr-12">
                    <div className="relative w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full mb-8">
                        <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-2">
                            <i className='bx bx-group'></i>
                            USER DIRECTORY
                        </div>
                    </div>
{/* 
                    <h1 className="text-4xl lg:text-5xl font-semibold tracking-wider mb-6">
                        SYSTEM
                        <br />
                        USERS
                    </h1> */}

                     <p className="text-lg tracking-wider text-gray-400 mb-12 max-w-[30rem]">
                        Create new user accounts with specific roles and permissions.
                        All user data is securely stored and encrypted.
                    </p>

                    {/* Quick Stats */}
                    {/* {token && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                                <p className="text-sm text-gray-400">Total Users</p>
                                <p className="text-3xl font-bold">{users.length}</p>
                            </div>
                            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                                <p className="text-sm text-gray-400">Active Now</p>
                                <p className="text-3xl font-bold">42</p>
                            </div>
                            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                                <p className="text-sm text-gray-400">Admins</p>
                                <p className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                            </div>
                            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4">
                                <p className="text-sm text-gray-400">Storage</p>
                                <p className="text-3xl font-bold">87%</p>
                            </div>
                        </div>
                    )} */}

                    {/* Users List Container */}
                    {/* <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 h-[600px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <i className='bx bx-group'></i>
                                ALL USERS
                            </h2>
                            {token && (
                                <button 
                                    onClick={fetchUsers}
                                    className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
                                >
                                    <i className='bx bx-refresh'></i>
                                    Refresh
                                </button>
                            )}
                        </div>

                        {!token ? (
                            <div className="text-center py-16">
                                <i className='bx bx-lock-alt text-6xl text-gray-600 mb-4'></i>
                                <p className="text-xl mb-4">Authentication Required</p>
                                <p className="text-gray-400 mb-8">
                                    Please login to view and manage users
                                </p>
                                <a 
                                    href="/login"
                                    className="inline-flex items-center gap-2 border border-[#2a2a2a] py-3 px-6 rounded-full font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
                                >
                                    <i className='bx bx-log-in'></i>
                                    Go to Login
                                </a>
                            </div>
                        ) : isLoading ? (
                            <div className="flex justify-center items-center h-48">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e99b63]"></div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {users.map((user) => (
                                    <div 
                                        key={user._id} 
                                        className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#e99b63] transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-[#656565] to-[#e99b63] rounded-full flex items-center justify-center font-bold">
                                                {user.username.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{user.username}</h3>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.role === 'admin' 
                                                    ? 'bg-red-500/20 text-red-400' 
                                                    : user.role === 'moderator'
                                                    ? 'bg-blue-500/20 text-blue-400'
                                                    : 'bg-green-500/20 text-green-400'
                                            }`}>
                                                {user.role.toUpperCase()}
                                            </span>
                                            <div className="flex gap-2">
                                                <button className="w-8 h-8 flex items-center justify-center border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-all">
                                                    <i className='bx bx-edit'></i>
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center border border-[#2a2a2a] rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">
                                                    <i className='bx bx-trash'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}
                                {/* ))}
                            </div>
                        )}
                    </div>*/}
                </div>

                {/* Right Panel - User Creation Form */}
                {/* <div className="w-full lg:w-1/2 mt-12 lg:mt-0 lg:pl-12"> */}
                    {/* <div className="relative w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full mb-8">
                        <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-2">
                            <i className='bx bx-user-plus'></i>
                            CREATE USER
                        </div>
                    </div> */}

                    {/* <h1 className="text-4xl lg:text-5xl font-semibold tracking-wider mb-6">
                        ADD NEW
                        <br />
                        USERS
                    </h1> */}

                   

                    {/* User Creation Form */}
                    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <i className='bx bx-user-circle'></i>
                            USER REGISTRATION
                        </h2>
                        <form onSubmit={createUser}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

    {/* Name */}
    <div>
      <label className="block text-sm text-gray-400 mb-2">Name</label>
      <input
        type="text"
        value={newUser.name}
        onChange={(e) =>
          setNewUser({ ...newUser, name: e.target.value })
        }
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e99b63]"
        placeholder="Enter name"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm text-gray-400 mb-2">Email</label>
      <input
        type="email"
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e99b63]"
        placeholder="Enter email"
        required
      />
    </div>

    {/* Age */}
    <div>
      <label className="block text-sm text-gray-400 mb-2">Age</label>
      <input
        type="number"
        value={newUser.age}
        onChange={(e) =>
          setNewUser({ ...newUser, age: Number(e.target.value) })
        }
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e99b63]"
        placeholder="Enter age"
        required
      />
    </div>

    {/* Password */}
    <div>
      <label className="block text-sm text-gray-400 mb-2">Password</label>
      <input
        type="password"
        value={newUser.password}
        onChange={(e) =>
          setNewUser({ ...newUser, password: e.target.value })
        }
        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e99b63]"
        placeholder="Enter password"
        required
      />
    </div>

  </div>

  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-gradient-to-r from-[#656565] to-[#e99b63] text-black font-semibold py-3 px-8 rounded-full tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(233,155,99,0.3)] disabled:opacity-50"
  >
    {isLoading ? "Creating User..." : "CREATE USER"}
  </button>
  
</form>


                        {/* Form Tips */}
                        {/* <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <i className='bx bx-info-circle'></i>
                                Quick Tips
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <i className='bx bx-check text-[#e99b63] mt-1'></i>
                                    Passwords are automatically encrypted
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className='bx bx-check text-[#e99b63] mt-1'></i>
                                    Admins have full system access
                                </li>
                                <li className="flex items-start gap-2">
                                    <i className='bx bx-check text-[#e99b63] mt-1'></i>
                                    Email addresses must be unique
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>

                {/* 3D Background Element */}
                {/* <Spline 
                    className="absolute lg:top-[-5%] lg:right-[-10%] h-[800px] w-[800px] opacity-20 pointer-events-none"
                    scene="https://prod.spline.design/hwiWk6EJqZrjuYYp/scene.splinecode"
                /> */}
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center">
                <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]">
                        <i className='bx bx-download'></i>
                        Export Data
                    </a>
                    <a href="#" className="flex items-center gap-2 border border-[#2a2a2a] py-2 px-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]">
                        <i className='bx bx-cog'></i>
                        Settings
                    </a>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>API Status: <span className="text-green-400 font-semibold">Online</span></span>
                    <span>•</span>
                    <span>Last Updated: Just now</span>
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;