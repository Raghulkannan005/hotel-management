import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    try {
      // Replace with actual API call when backend endpoint is ready
      // await api.post('/contact', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-8">Have questions or need assistance? Reach out to our friendly team.</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Contact Information */}
              <div className="lg:w-5/12">
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Get in Touch</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Address</h3>
                        <p className="text-gray-600">123 Dubai Street, Dubai main road, Dubai</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Phone</h3>
                        <p className="text-gray-600">+91 96776 05417</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">raghulkannan005@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Business Hours</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span className="font-medium">10:00 AM - 11:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span className="font-medium">10:00 AM - 9:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:w-7/12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Send Us a Message</h3>
                  
                  {submitStatus && (
                    <div className={`mb-6 p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Your Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Your Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Your Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-600 outline-none transition"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-8">Our Location</h2>
            <div className="bg-white p-2 rounded-lg shadow-md overflow-hidden h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.4677551798147!2d55.27132507613131!3d25.24618268278219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42eab00f347b%3A0xb27ba145b3349067!2sBurj%20Khalifa!5e0!3m2!1sen!2sin!4v1699959638324!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to Experience Luxury?</h2>
            <p className="text-xl text-indigo-100 mb-8">Book your stay at Zorp Hotel and indulge in unparalleled luxury and service.</p>
            <Link to="/booking" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;