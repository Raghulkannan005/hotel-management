import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">About Zorp Hotel</h1>
            <p className="text-xl text-gray-600 mb-8">Discover the story behind our luxury hotel and our commitment to exceptional service.</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000" alt="Hotel History" className="rounded-lg shadow-lg w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Our History</h2>
              <p className="text-gray-600 mb-4">Founded in 2005, Zorp Hotel began as a small boutique establishment with a clear vision: to provide an unparalleled hospitality experience that combines luxury with authentic personalized service.</p>
              <p className="text-gray-600 mb-4">Over the years, we've grown to become one of the most prestigious hotels in the region, known for our attention to detail and commitment to guest satisfaction.</p>
              <p className="text-gray-600">Today, Zorp Hotel stands as a landmark of luxury and excellence, continually evolving to meet the changing needs of our discerning guests while maintaining our core values of exceptional service and attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
              <p className="text-gray-600">Guiding principles that define our approach to hospitality</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Our Mission</h3>
                <p className="text-gray-600 text-center">To create memorable experiences for our guests through impeccable service, luxurious accommodations, and attention to every detail.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Our Vision</h3>
                <p className="text-gray-600 text-center">To be recognized as the leading luxury hotel, setting the standard for excellence in hospitality and creating a legacy of unforgettable guest experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet the talented professionals who work tirelessly to ensure your stay exceeds expectations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src="https://media.gq-magazine.co.uk/photos/62ac38f82da9f5f89. . ./4:3/w_1440,h_1080,c_limit/shah-rukh-khan-record-deal.jpeg" alt="CEO" className="w-full h-64 object-cover object-top" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Shah Rukh Khan</h3>
                <p className="text-indigo-600 mb-4">Chief Executive Officer</p>
                <p className="text-gray-600">With his charismatic leadership and visionary approach, Shah Rukh has transformed Zorp Hotel into a landmark of luxury hospitality.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src="https://m.media-amazon.com/images/M/MV5BMjAxNTM4MDcyN15BMl5BanBnXkFtZTcwMjg4NDgwNA@@._V1_.jpg" alt="Operations Director" className="w-full h-64 object-cover object-top" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Priyanka Chopra</h3>
                <p className="text-indigo-600 mb-4">Director of Operations</p>
                <p className="text-gray-600">Priyanka's international expertise and attention to detail ensures that every aspect of our hotel runs with precision and excellence.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src="https://starsunfolded.com/wp-content/uploads/2016/01/Sanjeev-Kapoor-1.jpg" alt="Culinary Director" className="w-full h-64 object-cover object-top" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Sanjeev Kapoor</h3>
                <p className="text-indigo-600 mb-4">Culinary Director</p>
                <p className="text-gray-600">India's most celebrated chef brings his culinary mastery to create unforgettable dining experiences that blend tradition with innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Experience Zorp Hotel Yourself</h2>
            <p className="text-xl text-indigo-100 mb-8">Book your stay today and discover why our guests keep returning year after year.</p>
            <Link to="/booking" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">Book Your Stay</Link>
          </div>
        </div>
      </section>
      
      {/* Footer included via Nav component */}
    </>
  );
}

export default About;