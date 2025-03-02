import { useState } from 'react';
import Nav from "../components/Nav";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Here you would typically send the form data to an API
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Reset form state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-8">Have questions or need assistance? We're here to help you with any inquiries.</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Address */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Our Location</h3>
                <p className="text-gray-600">123, Dubai Cross Street </p>
                <p className="text-gray-600">Dubai Main Road, Dubai</p>
              </div>
              
              {/* Phone */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Phone Number</h3>
                <p className="text-gray-600">+91 96776 05417</p>
              </div>
              
              {/* Email */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Email Address</h3>
                <p className="text-gray-600">raghulkannan005@gmail.com</p>
                <p className="text-gray-600">info@zorphotel.com</p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg mb-8">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Thank you for your message!</span>
                    </div>
                    <p className="mt-2">We've received your inquiry and will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
              
              {/* Map Section */}
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Find Us</h2>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                  {/* Replace with actual map implementation */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <p className="text-gray-600">Interactive Map Coming Soon</p>
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

export default Contact;