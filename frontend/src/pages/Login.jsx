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
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Login to Your <span className="text-amber-400">Account</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">Welcome back! Sign in to access your bookings and manage your stays.</p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-16 bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-medium">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring focus:ring-amber-300/50 focus:border-amber-400 outline-none transition text-white"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2 font-medium">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring focus:ring-amber-300/50 focus:border-amber-400 outline-none transition text-white"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-white/30 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-indigo-900 py-3 px-4 rounded-lg font-medium hover:from-amber-400 hover:to-amber-500 transition-all disabled:from-amber-400/70 disabled:to-amber-500/70 disabled:cursor-not-allowed shadow-lg transform hover:-translate-y-1 uppercase tracking-wider"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-gray-300">
                  Don't have an account? 
                  <Link to="/register" className="ml-1 text-amber-400 hover:text-amber-300 font-medium">
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