import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <img
                src="/Dp-TechInstitute/images/dp-logo11.jpg"
                alt="DpTech Logo"
                className="w-10 h-10 object-contain rounded-full"
              />

              <span className="text-xl font-bold">DpTech Trainings</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-graduation-cap w-8 h-8 text-emerald-400"
              >
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                <path d="M22 10v6"></path>
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
              </svg>

            </div>
            <p className="text-gray-400 max-w-md mt-3">
              Empowering students with the skills and knowledge needed to succeed in the IT industry.
              Join us on your journey to becoming a successful IT professional.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Home</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Courses</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-amber-400">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: dptechdeveloper77@gmail.com</li>
              <li>WhatsApp: +91 7731878344</li>
              <li>Address: Nandigama, Hyderabad, Telangana</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DpTech Trainings. All rights reserved.
          </p>
          <p className="text-gray-500 mt-1">Created by Puttala Durga Prasad</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;