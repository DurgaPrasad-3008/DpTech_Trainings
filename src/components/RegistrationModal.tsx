import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, GraduationCap, Calendar, Users } from 'lucide-react';
import { supabase, Student } from '../lib/supabase';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
  education: string;
  dateOfBirth: string;
  course: string;
  experience: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    address: '',
    education: '',
    dateOfBirth: '',
    course: '',
    experience: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create student object for database
      const studentData: Student = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        gender: formData.gender,
        address: formData.address,
        education: formData.education,
        date_of_birth: formData.dateOfBirth,
        course: formData.course,
        experience: formData.experience,
        registration_date: new Date().toISOString()
      };

      // Try to save to Supabase database first
      if (supabase) {
        const { data, error } = await supabase
          .from('students')
          .insert([studentData])
          .select()
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Student saved to database:', data);
      } else {
        // Fallback to localStorage if Supabase not configured
        console.warn('Supabase not configured, using localStorage fallback');
        const localStudentData = {
          id: Date.now().toString(),
          ...formData,
          registrationDate: new Date().toISOString()
        };
        
        const existingStudents = JSON.parse(localStorage.getItem('dptech_students') || '[]');
        existingStudents.push(localStudentData);
        localStorage.setItem('dptech_students', JSON.stringify(existingStudents));
      }

      // Create WhatsApp message
      const message = `🎓 *New Student Registration - DpTech Trainings*

👤 *Personal Details:*
• Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Mobile: ${formData.mobile}
• Gender: ${formData.gender}
• Date of Birth: ${formData.dateOfBirth}

📍 *Address:* ${formData.address}

🎓 *Education & Course:*
• Education: ${formData.education}
• Interested Course: ${formData.course}
• Experience Level: ${formData.experience}

Thank you for registering with DpTech Trainings! 🚀`;

      const whatsappUrl = `https://wa.me/7731878344?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Success - close modal and reset form
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        address: '',
        education: '',
        dateOfBirth: '',
        course: '',
        experience: ''
      });

    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 animate-modal-enter">
        {/* Header */}
        <div className="sticky top-0 bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-t-2xl border-b border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Join DpTech Trainings</h2>
              <p className="text-gray-200">Start your IT journey with us today!</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="mr-2 text-blue-400" size={20} />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" className="bg-gray-800">Select Gender</option>
                  <option value="Male" className="bg-gray-800">Male</option>
                  <option value="Female" className="bg-gray-800">Female</option>
                  <option value="Other" className="bg-gray-800">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Phone className="mr-2 text-green-400" size={20} />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-200">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter your complete address"
              />
            </div>
          </div>

          {/* Educational & Course Information */}
          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <GraduationCap className="mr-2 text-purple-400" size={20} />
              Educational & Course Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Highest Education *</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" className="bg-gray-800">Select Education</option>
                  <option value="10th" className="bg-gray-800">10th Grade</option>
                  <option value="12th" className="bg-gray-800">12th Grade</option>
                  <option value="Diploma" className="bg-gray-800">Diploma</option>
                  <option value="Bachelor's" className="bg-gray-800">Bachelor's Degree</option>
                  <option value="Master's" className="bg-gray-800">Master's Degree</option>
                  <option value="Other" className="bg-gray-800">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">Interested Course *</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" className="bg-gray-800">Select Course</option>
                  <option value="Java Full Stack Development" className="bg-gray-800">Java Full Stack Development</option>
                  <option value="Core Java" className="bg-gray-800">Core Java</option>
                  <option value="Advanced Java" className="bg-gray-800">Advanced Java</option>
                  <option value="Other" className="bg-gray-800">Other (Please specify in WhatsApp)</option>
                </select>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-200">Programming Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" className="bg-gray-800">Select Experience Level</option>
                  <option value="Complete Beginner" className="bg-gray-800">Complete Beginner</option>
                  <option value="Some Basic Knowledge" className="bg-gray-800">Some Basic Knowledge</option>
                  <option value="Intermediate" className="bg-gray-800">Intermediate</option>
                  <option value="Advanced" className="bg-gray-800">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;