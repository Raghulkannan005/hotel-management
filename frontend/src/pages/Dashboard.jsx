import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import { getBookingHistory, cancelBooking } from '../services/bookingService';
import { getCurrentUser, logoutUser } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
    
    fetchBookings();
  }, []);
  
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookingHistory = await getBookingHistory();
      setBookings(bookingHistory);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        toast.success('Booking cancelled successfully');
        // Refresh bookings
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
        toast.error(error.message || 'Failed to cancel booking');
      }
    }
  };
  
  const handleLogout = () => {
    logoutUser();
    window.location.href = '/';
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <>
      <Nav />
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">My Dashboard</h1>
                <p className="text-xl text-gray-600">Welcome back, {user?.username || 'Guest'}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Log Out
              </button>
            </div>
            
            {/* Tabs */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex border-b">
                <button 
                  className={`px-6 py-3 text-lg font-medium ${activeTab === 'bookings' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  My Bookings
                </button>
                <button 
                  className={`px-6 py-3 text-lg font-medium ${activeTab === 'profile' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif font-bold text-gray-800">Your Bookings</h2>
                  <Link 
                    to="/booking" 
                    className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Book Another Stay
                  </Link>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map(booking => (
                      <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.room.type}</h3>
                            <div className="flex items-center text-gray-600 mb-4">
                              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                              </svg>
                              <span>Booking ID: {booking._id.substring(0, 8)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Status: <span className={`font-medium ${booking.status === 'booked' ? 'text-green-600' : 'text-red-600'}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0">
                            {booking.status === 'booked' && (
                              <button 
                                onClick={() => handleCancelBooking(booking._id)}
                                className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
                    <p className="text-gray-600 mb-6">You haven't made any bookings yet. Ready to plan your stay?</p>
                    <Link 
                      to="/booking" 
                      className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Book Your First Stay
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8">Your Profile</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-600 mb-1">Username</h3>
                      <p className="text-xl font-medium">{user?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 mb-1">Email</h3>
                      <p className="text-xl font-medium">{user?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 mb-1">Account Type</h3>
                      <p className="text-xl font-medium capitalize">{user?.role || 'user'}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 mb-1">Member Since</h3>
                      <p className="text-xl font-medium">{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profile
                      </button>
                      <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Change Password
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard; 