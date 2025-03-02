import { useState } from 'react';
import Nav from "../components/Nav";

const Booking = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'deluxe',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // Add API call to process booking
  };

  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: 199,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800',
      description: 'Spacious room with modern amenities and a beautiful view.',
      features: ['King-sized bed', 'City view', 'Free Wi-Fi', '40" Smart TV', 'Coffee machine']
    },
    {
      id: 'executive',
      name: 'Executive Suite',
      price: 299,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800',
      description: 'Luxurious suite with separate living area and premium facilities.',
      features: ['King-sized bed', 'Separate living room', 'Mini bar', '55" Smart TV', 'Jacuzzi']
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      price: 499,
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=800',
      description: 'The pinnacle of luxury with panoramic views and butler service.',
      features: ['King-sized bed', 'Panoramic view', 'Private butler', '65" Smart TV', 'Private terrace']
    }
  ];

  const selectedRoom = roomTypes.find(room => room.id === formData.roomType);

  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">Book Your Stay</h1>
            <p className="text-xl text-gray-600 mb-8">Reserve your perfect room and experience the luxury of Zorp Hotel</p>
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
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Reservation Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Dates Selection */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b">Select Dates</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Check-in Date</label>
                        <input 
                          type="date" 
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Check-out Date</label>
                        <input 
                          type="date" 
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
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
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b">Select Room Type</h3>
                    <div className="space-y-4">
                      {roomTypes.map(room => (
                        <div 
                          key={room.id} 
                          className={`border p-4 rounded-lg cursor-pointer transition ${formData.roomType === room.id ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}`}
                          onClick={() => setFormData(prev => ({ ...prev, roomType: room.id }))}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio"
                              name="roomType"
                              id={room.id}
                              value={room.id}
                              checked={formData.roomType === room.id}
                              onChange={handleChange}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={room.id} className="ml-2 flex-1 cursor-pointer">
                              <span className="block font-bold text-lg text-gray-800">{room.name}</span>
                              <span className="block text-indigo-600 font-bold">${room.price} / night</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Guest Information */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
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
                  
                  <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors"
                  >
                    Complete Booking
                  </button>
                </form>
              </div>
              
              {/* Booking Summary */}
              <div className="lg:w-5/12">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 pb-2 border-b">Booking Summary</h2>
                  
                  {selectedRoom && (
                    <div className="mb-6">
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-48 object-cover" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedRoom.name}</h3>
                      <p className="text-gray-600 mb-4">{selectedRoom.description}</p>
                      <h4 className="font-bold text-gray-700 mb-2">Room Features:</h4>
                      <ul className="space-y-1 mb-6">
                        {selectedRoom.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Room Charge:</span>
                      <span>${selectedRoom.price} / night</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes & Fees:</span>
                      <span>${Math.round(selectedRoom.price * 0.15)}</span>
                    </div>
                    
                    <div className="pt-3 border-t mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${selectedRoom.price + Math.round(selectedRoom.price * 0.15)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">* Price shown is for one night</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Booking;