import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from "../components/Nav";
import { loginUser } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get the redirect path from location state or default to "/"
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(formData);
      toast.success('Login successful!');
      
      // Redirect after successful login
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">Login to Your Account</h1>
            <p className="text-xl text-gray-600 mb-8">Welcome back! Sign in to access your bookings and manage your stays.</p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account? 
                  <Link to="/register" className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login; 