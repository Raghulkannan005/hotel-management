import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import { getFeaturedRooms } from '../services/roomService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await getFeaturedRooms();
        setFeaturedRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast.error('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, []);

  // Default room data if no featured rooms are available
  const defaultRooms = [
    {
      _id: 'default1',
      type: 'Deluxe Room',
      price: 199,
      description: 'Spacious room with modern amenities and a beautiful view.',
      images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'],
      capacity: 2
    },
    {
      _id: 'default2',
      type: 'Executive Suite',
      price: 299,
      description: 'Luxurious suite with separate living area and premium amenities.',
      images: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
      capacity: 2
    },
    {
      _id: 'default3',
      type: 'Family Room',
      price: 249,
      description: 'Comfortable room designed for families with extra space and amenities.',
      images: ['https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg'],
      capacity: 4
    },
    {
      _id: 'default4',
      type: 'Presidential Suite',
      price: 499,
      description: 'Our most luxurious accommodation with exclusive services and amenities.',
      images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'],
      capacity: 2
    }
  ];

  // Use featured rooms from API if available, otherwise use default rooms
  const displayRooms = featuredRooms.length > 0 ? featuredRooms : defaultRooms;

  return (
    <>
      <Nav />
      <ToastContainer position="top-right" autoClose={5000} />
      
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/70 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Experience <span className="text-amber-400">Luxury</span> at Zorp Hotel
            </h1>
            <p className="text-xl text-white mb-8 drop-shadow-md">Where comfort meets elegance. Enjoy our premium amenities and world-class service.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/booking" className="bg-gradient-to-r from-amber-500 to-amber-600 text-indigo-900 px-8 py-4 rounded-md hover:from-amber-400 hover:to-amber-500 transition-all font-medium text-lg shadow-lg transform hover:-translate-y-1 uppercase tracking-wider">Book Now</Link>
              <Link to="/about" className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-md hover:bg-white/20 transition-all font-medium text-lg shadow-lg transform hover:-translate-y-1 uppercase tracking-wider">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-white">Why Choose <span className="text-amber-400">Zorp Hotel</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all border border-white/10 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white text-center">Luxury Experience</h3>
              <p className="text-gray-300 text-center">Indulge in our luxurious accommodations designed for your ultimate comfort and relaxation.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all border border-white/10 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white text-center">24/7 Service</h3>
              <p className="text-gray-300 text-center">Our dedicated staff is always available to cater to your needs, day or night.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all border border-white/10 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white text-center">Fine Dining</h3>
              <p className="text-gray-300 text-center">Experience exquisite culinary delights prepared by our world-class chefs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-white">Our <span className="text-amber-400">Premium Rooms</span></h2>
          <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">Choose from our selection of luxury rooms and suites, each designed to offer you the ultimate comfort during your stay.</p>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRooms.map(room => (
                <div key={room._id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/10 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={room.images?.[0] || "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"} 
                      alt={room.type} 
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-70"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{room.type}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-bold">₹{room.price} / night</span>
                      <Link to="/booking" className="bg-amber-500 text-indigo-900 px-4 py-2 rounded-md hover:bg-amber-400 transition-colors shadow-md transform hover:-translate-y-1 hover:shadow-lg">Book Now</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-white">What Our <span className="text-amber-400">Guests Say</span></h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/10 transform hover:-translate-y-2 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-amber-400">
                    <img src="https://filmfare.wwmindia.com/content/2023/apr/deepikapadukone11682765623.jpg" alt="Guest" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Deepika Padukone</h4>
                    <p className="text-gray-300">Actress</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic">"Between film shoots, Zorp Hotel is my sanctuary. The staff's discretion and attention to detail is unmatched. The spa treatments are divine, and I always leave feeling refreshed and rejuvenated. It's truly my home away from home in the city."</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/10 transform hover:-translate-y-2 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-amber-400">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Aamir_Khan_at_Delhi_Airport.jpg" alt="Guest" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Aamir Khan</h4>
                    <p className="text-gray-300">Actor & Producer</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic">"I've stayed at luxury hotels worldwide, but Zorp Hotel stands out for its authentic Indian hospitality with international standards. The culinary offerings are exceptional, and the staff anticipates your needs before you even express them. A true gem!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-950 to-indigo-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6">Zorp <span className="text-amber-400">Hotel</span></h3>
              <p className="text-gray-300">Where luxury meets comfort. Experience the best hospitality in town.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-amber-400 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-300 hover:text-amber-300 transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-amber-300 transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-amber-300 transition-colors">Contact</Link></li>
                <li><Link to="/booking" className="text-gray-300 hover:text-amber-300 transition-colors">Book Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-amber-400 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  123 Dubai Street, Dubai main road, Dubai
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 96776 05417
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  raghulkannan005@gmail.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-amber-400 uppercase tracking-wider">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-amber-400 hover:text-indigo-900 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-amber-400 hover:text-indigo-900 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-amber-400 hover:text-indigo-900 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Zorp Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;