import React from 'react';
import { ArrowRight } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const Hero = () => {
  const title = 'Empowering Future IT Professionals';
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section
      id="home"
      className="pt-20 relative min-h-screen flex items-center"
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp7250087.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <style>
        {`
          @keyframes rainbowColor {
            0% { color: #ff0080; }
            14% { color: #ff8c00; }
            28% { color: #ffff00; }
            42% { color: #00ff00; }
            57% { color: #00ffff; }
            71% { color: #0000ff; }
            85% { color: #8a2be2; }
            100% { color: #ff0080; }
          }
        `}
      </style>

      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-snug">
            {title.split('').map((char, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  marginRight: char === ' ' ? '0.35em' : '0',
                  animation: 'rainbowColor 3s infinite',
                  animationDelay: `${index * 0.1}s`,
                  fontSize: '0.9em' // Slightly reduced font size
                }}
              >
                {char}
              </span>
            ))}
          </h1>


          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            DpTech Trainings is built to inspire, educate, and transform students into IT professionals.
            We believe that with the right knowledge and guidance, anyone can achieve their dream career.
          </p>

          <div className="mb-24">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center px-8 py-4 text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:text-xl transform hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-blue-500/50"
            >
              <span className="absolute -inset-x-1 -inset-y-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Start Your IT Journey Today
                <ArrowRight className="ml-2 h-6 w-6" />
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;