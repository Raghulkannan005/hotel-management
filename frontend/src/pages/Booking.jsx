import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";
import { createBooking } from '../services/bookingService';
import { searchRooms } from '../services/roomService';
import { isAuthenticated } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    guests: 1,
    roomId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    // Fetch available rooms from backend
    const fetchRooms = async () => {
      try {
        const availableRooms = await searchRooms({ availability: true });
        
        if (availableRooms.length > 0) {
          setRooms(availableRooms);
          setFormData(prev => ({
            ...prev,
            roomId: availableRooms[0]._id
          }));
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast.error('Failed to load available rooms. Please try again later.');
      }
    };
    
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateStayDuration = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const difference = end.getTime() - start.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    
    return days > 0 ? days : 0;
  };

  const calculateTotalPrice = () => {
    const selectedRoom = rooms.find(room => room._id === formData.roomId);
    if (!selectedRoom) return 0;
    
    const duration = calculateStayDuration();
    const roomCharge = selectedRoom.price * duration;
    const taxes = Math.round(roomCharge * 0.15);
    
    return { roomCharge, taxes, total: roomCharge + taxes };
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.startDate || !formData.endDate || !formData.roomId) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (calculateStayDuration() <= 0) {
        toast.error('Check-out date must be after check-in date');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast.error('Please log in to complete your booking');
      // Store booking details in session storage and redirect to login
      sessionStorage.setItem('pendingBooking', JSON.stringify(formData));
      navigate('/login', { state: { from: '/booking' } });
      return;
    }
    
    setLoading(true);
    
    try {
      // Format data for API
      const bookingData = {
        room: formData.roomId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        guestInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests
        },
        guests: formData.guests
      };
      
      const response = await createBooking(bookingData);
      
      toast.success('Booking successful!');
      // Clear form and move to confirmation step
      setCurrentStep(3);
      
      // Store booking confirmation in state or redirect to booking confirmation page
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRoom = rooms.find(room => room._id === formData.roomId) || {};
  const { roomCharge, taxes, total } = calculateTotalPrice();
  const stayDuration = calculateStayDuration();

  // Define steps
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/* Step 1: Select Dates and Room */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b">Select Dates</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Check-in Date</label>
                  <input 
                    type="date" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Check-out Date</label>
                  <input 
                    type="date" 
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-700 mb-2">Number of Guests</label>
                <select 
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Room Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b">Select Room Type</h3>
              <div className="space-y-4">
                {rooms.length > 0 ? (
                  rooms.map(room => (
                    <div 
                      key={room._id} 
                      className={`border p-4 rounded-lg cursor-pointer transition ${formData.roomId === room._id ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}
                      onClick={() => setFormData(prev => ({ ...prev, roomId: room._id }))}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio"
                          name="roomId"
                          id={room._id}
                          value={room._id}
                          checked={formData.roomId === room._id}
                          onChange={handleChange}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={room._id} className="ml-2 flex-1 cursor-pointer">
                          <span className="block font-bold text-lg text-gray-800">{room.type}</span>
                          <p className="text-gray-600 mb-2">{room.description}</p>
                          <span className="block text-indigo-600 text-xl font-bold">Rs.{room.price} <span className='text-base text-indigo-400'>/night</span></span>
                        </label>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Loading available rooms...</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Continue to Guest Information
              </button>
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            {/* Step 2: Guest Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b">Guest Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
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
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-gray-700 mb-2">Special Requests (Optional)</label>
                <textarea 
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-gray-200 text-gray-800 py-3 px-8 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
              >
                {loading ? 'Processing...' : 'Complete Booking'}
              </button>
            </div>
          </>
        );
      
      case 3:
        return (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">Thank you for choosing Zorp Hotel. Your booking has been confirmed.</p>
            <p className="text-gray-600 mb-6">We've sent a confirmation email to {formData.email} with all the details.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              View My Bookings
            </button>
          </div>
        );
      
      default:
        return null;
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">Book Your Stay</h1>
            <p className="text-xl text-gray-600 mb-8">Reserve your perfect room and experience the luxury of Zorp Hotel</p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`w-20 h-1 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`w-20 h-1 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Form Section */}
              <div className="lg:w-7/12">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">
                  {currentStep === 1 && 'Select Your Stay Details'}
                  {currentStep === 2 && 'Complete Your Information'}
                  {currentStep === 3 && 'Booking Confirmed'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {renderStepContent()}
                </form>
              </div>
              
              {/* Booking Summary */}
              {currentStep < 3 && (
                <div className="lg:w-5/12">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 pb-2 border-b">Booking Summary</h2>
                    
                    {selectedRoom && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedRoom.type || 'Selected Room'}</h3>
                        <p className="text-gray-600 mb-4">{selectedRoom.description || 'Room details loading...'}</p>
                        
                        {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
                          <>
                            <h4 className="font-bold text-gray-700 mb-2">Room Amenities:</h4>
                            <ul className="space-y-1 mb-6">
                              {selectedRoom.amenities.map((amenity, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                  <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  {amenity}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {formData.startDate && formData.endDate && (
                        <div className="flex justify-between text-gray-600">
                          <span>Stay Duration:</span>
                          <span>{stayDuration} {stayDuration === 1 ? 'Night' : 'Nights'}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Room Charge:</span>
                        <span>Rs.{roomCharge || selectedRoom.price || 0}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Taxes & Fees:</span>
                        <span>Rs.{taxes || 0}</span>
                      </div>
                      
                      <div className="pt-3 border-t mt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>Rs.{total || 0}</span>
                        </div>
                        {stayDuration > 0 && (
                          <p className="text-sm text-gray-500 mt-2">* Price shown is for {stayDuration} {stayDuration === 1 ? 'night' : 'nights'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Booking;