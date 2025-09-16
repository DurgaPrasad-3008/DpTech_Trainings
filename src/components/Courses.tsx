import React from 'react';
import { CheckCircle } from 'lucide-react';

const Courses = () => {
  const modules = [
    {
      title: 'Module 1: Basics of Java',
      content: 'Java syntax, OOP concepts, and basic programming fundamentals'
    },
    {
      title: 'Module 2: Tools for Java',
      content: 'Introduction to IDEs, version control, and essential development tools'
    },
    {
      title: 'Module 3: Core Java Collections & Frameworks',
      content: 'Data structures, multithreading, and Java frameworks'
    },
    {
      title: 'Module 4: Advanced Java with Mini Project',
      content: 'Hands-on project applying learned concepts in real-world scenarios'
    }
  ];

  return (
    <section id="courses" className="py-20 relative">
      {/* Background */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Java Full Stack Development Program
        </h2>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {module.title}
              </h3>
              <p className="text-gray-300">{module.content}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-6">
            Additional Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Resume Building Workshop', 'Mock Interview Sessions', 'IT Career Guidance'].map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
