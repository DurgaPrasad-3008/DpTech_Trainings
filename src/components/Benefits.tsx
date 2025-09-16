import React from 'react';
import { Laptop, BookOpen, Award, Users } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Laptop className="h-8 w-8 text-blue-400" />,
      title: '100% Online Learning',
      description: 'Learn at your own pace from anywhere in the world'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-400" />,
      title: 'Industry-Oriented Java Training',
      description: 'Curriculum designed to meet current industry demands'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-400" />,
      title: 'Resume Preparation',
      description: 'Professional guidance for creating standout resumes'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: 'Interview Guidance',
      description: 'Mock interviews and preparation tips from industry experts'
    }
  ];

  return (
    <section className="py-20 relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp2742499.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose DpTech Trainings?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
