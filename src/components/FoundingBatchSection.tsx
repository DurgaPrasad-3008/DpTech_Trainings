import React from 'react';
import { Star, Trophy, Briefcase, Heart, Users, Gift, Clock, Target } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const FoundingBatchSection = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const benefits = [
    {
      icon: <Star className="h-8 w-8 text-yellow-400" />,
      title: 'Founding Batch Benefits',
      description: 'Exclusive perks and privileges reserved only for our first students',
      highlight: 'Limited to first 50 students'
    },
    {
      icon: <Trophy className="h-8 w-8 text-gold-400" />,
      title: 'Exclusive Projects',
      description: 'Work on premium industry projects not available to regular batches',
      highlight: 'Portfolio advantage'
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-400" />,
      title: 'Career Guidance',
      description: 'One-on-one career counseling and job placement assistance',
      highlight: 'Personalized support'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-400" />,
      title: 'Lifetime Support',
      description: 'Continuous mentorship and guidance throughout your IT career',
      highlight: 'Forever connected'
    }
  ];

  return (
    <section className="py-20 relative">
      <div id="founding-batch"></div>
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555099962-4199c345e5dd")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full font-bold text-sm mb-6">
            <Gift className="mr-2 h-5 w-5" />
            EARLY BIRD SPECIAL - LIMITED TIME
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            🎓 Be Among Our First Students!
          </h2>
          
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Register now and be part of our founding batch. Get exclusive benefits and personalized attention as we begin this exciting journey together.
          </p>

          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 p-6 rounded-2xl shadow-2xl border-2 border-yellow-400 mb-12 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Clock className="text-yellow-300 mr-3 h-8 w-8" />
              <span className="text-2xl md:text-3xl font-bold text-white">Early Bird Special</span>
            </div>
            <div className="text-4xl md:text-5xl font-black text-yellow-300 mb-2">
              Up to 70% Discount
            </div>
            <div className="text-lg text-pink-100">
              For First 50 Students Only!
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Target className="text-yellow-300 mr-2 h-5 w-5" />
              <span className="text-white font-semibold">Limited Seats Available</span>
            </div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-105 border border-white border-opacity-20 hover:border-opacity-40 relative overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {benefit.description}
                </p>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold text-center">
                  {benefit.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 rounded-3xl shadow-2xl border-2 border-yellow-400 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Users className="text-yellow-300 mr-3 h-10 w-10" />
                <span className="text-3xl font-bold text-white">Join the Founding Batch</span>
              </div>
              
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Don't miss this opportunity to be part of something special. Our founding batch students will receive unparalleled attention and exclusive benefits that won't be available to future batches.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center px-12 py-4 text-xl font-bold rounded-2xl text-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 hover:from-yellow-300 hover:via-orange-300 hover:to-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50"
              >
                <span className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                <span className="relative flex items-center">
                  <Star className="mr-3 h-6 w-6" />
                  Secure Your Spot Now
                  <Gift className="ml-3 h-6 w-6" />
                </span>
              </button>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-yellow-300 font-bold">⚡ Instant Confirmation</span>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-green-300 font-bold">🎯 Limited Seats</span>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-blue-300 font-bold">💎 Exclusive Benefits</span>
                </div>
              </div>
            </div>
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

export default FoundingBatchSection;