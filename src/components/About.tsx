import React from 'react';
import { Target, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            About DpTech Trainings
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We bridge the gap between students and the IT industry by providing practical knowledge,
            real-world projects, and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-blue-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
            </div>
            <p className="text-gray-300">
              Helping students enter the IT field with the right skills. We're committed to
              providing high-quality training that bridges the gap between learning and
              real-world job opportunities.
            </p>
          </div>

          <div className="bg-blue-900 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Our Community</h3>
            </div>
            <p className="text-gray-300">
              Join our growing community of learners and professionals. Participate in live
              webinars, Q&A sessions, and interact with fellow students in our community forum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;