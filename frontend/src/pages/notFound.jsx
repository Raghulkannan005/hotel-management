import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const NotFound = () => {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl font-serif font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Oops! The page you're looking for seems to have checked out early.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Return Home
            </Link>
            <Link 
              to="/booking" 
              className="bg-amber-500 text-indigo-900 px-6 py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors shadow-md hover:shadow-lg"
            >
              Book a Room
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-gray-600">
          <p>Need assistance? <Link to="/contact" className="text-indigo-600 hover:text-indigo-800 font-medium">Contact our support team</Link></p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
