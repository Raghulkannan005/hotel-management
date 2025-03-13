import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";
import { registerUser, loginUser } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      
      // Register the user
      await registerUser(registrationData);
      
      toast.success('Registration successful! Logging you in...');
      
      // Automatically log the user in
      await loginUser({
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to homepage after registration and login
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">Create an Account</h1>
            <p className="text-xl text-gray-600 mb-8">Join Zorp Hotel to unlock exclusive benefits and easily manage your bookings.</p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  placeholder="Choose a username"
                />
              </div>
              
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
                  placeholder="Create a password"
                />
                <p className="text-sm text-gray-500 mt-1">Password must be at least 6 characters long</p>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  placeholder="Confirm your password"
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </label>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account? 
                  <Link to="/login" className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign in
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

export default Register; 