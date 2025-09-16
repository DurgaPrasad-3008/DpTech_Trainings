import React, { useState, useEffect } from 'react';
import { X, Users, Calendar, Mail, Phone, MapPin, GraduationCap, Download, Search, Trash2 } from 'lucide-react';
import { supabase, Student as SupabaseStudent } from '../lib/supabase';

interface Student {
  id: string;
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
  registrationDate: string;
}

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; student: Student | null }>({
    show: false,
    student: null
  });
  const [isLoading, setIsLoading] = useState(false);

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    const timer = setTimeout(() => {
      onClose();
    }, 2 * 60 * 1000); // 2 minutes
    
    setInactivityTimer(timer);
  };

  // Start inactivity timer when dashboard opens
  useEffect(() => {
    if (isOpen) {
      resetInactivityTimer();
    }
    
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [isOpen]);

  // Reset timer on any user activity
  const handleUserActivity = () => {
    if (isOpen) {
      resetInactivityTimer();
    }
  };

  useEffect(() => {
    const loadStudents = async () => {
      if (!isOpen) return;
      
      setIsLoading(true);
      
      try {
        if (supabase) {
          // Load from Supabase database
          const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error loading students:', error);
            throw error;
          }

          // Convert Supabase format to local format
          const convertedStudents: Student[] = data.map((student: SupabaseStudent) => ({
            id: student.id || '',
            firstName: student.first_name,
            lastName: student.last_name,
            email: student.email,
            mobile: student.mobile,
            gender: student.gender,
            address: student.address,
            education: student.education,
            dateOfBirth: student.date_of_birth,
            course: student.course,
            experience: student.experience,
            registrationDate: student.registration_date || student.created_at || ''
          }));

          setStudents(convertedStudents);
          setFilteredStudents(convertedStudents);
        } else {
          // Fallback to localStorage
          console.warn('Supabase not configured, using localStorage');
          const savedStudents = localStorage.getItem('dptech_students');
          if (savedStudents) {
            const parsedStudents = JSON.parse(savedStudents);
            setStudents(parsedStudents);
            setFilteredStudents(parsedStudents);
          }
        }
      } catch (error) {
        console.error('Failed to load students:', error);
        // Fallback to localStorage on error
        const savedStudents = localStorage.getItem('dptech_students');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          setStudents(parsedStudents);
          setFilteredStudents(parsedStudents);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, [isOpen]);

  useEffect(() => {
    // Filter students based on search term
    const filtered = students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobile.includes(searchTerm) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const exportToCSV = () => {
    const headers = [
      'Registration Date', 'First Name', 'Last Name', 'Email', 'Mobile', 
      'Gender', 'Date of Birth', 'Education', 'Course', 'Experience', 'Address'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(student => [
        student.registrationDate,
        student.firstName,
        student.lastName,
        student.email,
        student.mobile,
        student.gender,
        student.dateOfBirth,
        student.education,
        student.course,
        student.experience,
        `"${student.address.replace(/"/g, '""')}"` // Escape quotes in address
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dptech_students_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteClick = (student: Student) => {
    setDeleteConfirm({ show: true, student });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.student) return;

    const studentToDelete = deleteConfirm.student;
    
    try {
      if (supabase && studentToDelete.id) {
        // Delete from Supabase database
        const { error } = await supabase
          .from('students')
          .delete()
          .eq('id', studentToDelete.id);

        if (error) {
          console.error('Error deleting student:', error);
          throw error;
        }
      } else {
        // Fallback: Remove from localStorage
        const updatedStudents = students.filter(s => s.id !== studentToDelete.id);
        localStorage.setItem('dptech_students', JSON.stringify(updatedStudents));
      }

      // Remove from local state
      const updatedStudents = students.filter(s => s.id !== studentToDelete.id);
      setStudents(updatedStudents);
      
      // Create deleted data file and download
      const deletedData = {
        deletedAt: new Date().toISOString(),
        deletedBy: 'Puttala Durga Prasad',
        studentData: studentToDelete
      };
      
      const jsonContent = JSON.stringify(deletedData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `deleted_student_${studentToDelete.firstName}_${studentToDelete.lastName}_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Failed to delete student:', error);
      alert('Failed to delete student. Please try again.');
    }
    
    // Close confirmation dialog
    setDeleteConfirm({ show: false, student: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, student: null });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Full Screen Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
      
      {/* Backdrop */}
      
      {/* Dashboard Modal */}
      <div 
        className="relative w-full h-full overflow-hidden bg-white bg-opacity-5 backdrop-blur-lg shadow-2xl border-0 animate-modal-enter"
        onMouseMove={handleUserActivity}
        onKeyDown={handleUserActivity}
        onClick={handleUserActivity}
        onScroll={handleUserActivity}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome, Puttala Durga Prasad</h2>
              <p className="text-blue-100">Student Management Dashboard</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 text-lg font-semibold"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto h-[calc(100vh-120px)]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white bg-opacity-15 backdrop-blur-md p-8 rounded-xl border border-white border-opacity-30 shadow-xl">
              <div className="flex items-center">
                <Users className="h-10 w-10 text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-200 text-base">Total Students</p>
                  <p className="text-3xl font-bold text-white">{students.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-md p-8 rounded-xl border border-white border-opacity-30 shadow-xl">
              <div className="flex items-center">
                <GraduationCap className="h-10 w-10 text-green-400 mr-4" />
                <div>
                  <p className="text-gray-200 text-base">Java Full Stack</p>
                  <p className="text-3xl font-bold text-white">
                    {students.filter(s => s.course === 'Java Full Stack Development').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-md p-8 rounded-xl border border-white border-opacity-30 shadow-xl">
              <div className="flex items-center">
                <Calendar className="h-10 w-10 text-purple-400 mr-4" />
                <div>
                  <p className="text-gray-200 text-base">This Month</p>
                  <p className="text-3xl font-bold text-white">
                    {students.filter(s => {
                      const regDate = new Date(s.registrationDate);
                      const now = new Date();
                      return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Export */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" size={22} />
              <input
                type="text"
                placeholder="Search students by name, email, mobile, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg bg-white bg-opacity-15 backdrop-blur-md border border-white border-opacity-30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              onClick={exportToCSV}
              className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center shadow-lg"
            >
              <Download className="mr-3" size={22} />
              Export CSV
            </button>
          </div>

          {/* Students Table */}
          <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-xl border border-white border-opacity-30 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white bg-opacity-20">
                  <tr>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Registration Date</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Name</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Contact</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Course</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Experience</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Education</th>
                    <th className="px-6 py-4 text-left text-base font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white divide-opacity-20">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-200 text-lg">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                          Loading students...
                        </div>
                      </td>
                    </tr>
                  ) : filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-200 text-lg">
                        {students.length === 0 ? 'No students registered yet.' : 'No students match your search.'}
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
                        <td className="px-6 py-4 text-base text-gray-200">
                          {new Date(student.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-base font-medium text-white">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-gray-300">{student.gender} • {student.dateOfBirth}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-200 flex items-center">
                              <Mail className="mr-2" size={14} />
                              {student.email}
                            </p>
                            <p className="text-sm text-gray-200 flex items-center">
                              <Phone className="mr-2" size={14} />
                              {student.mobile}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 bg-opacity-30 text-blue-100">
                            {student.course}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-base text-gray-200">
                          {student.experience}
                        </td>
                        <td className="px-6 py-4 text-base text-gray-200">
                          {student.education}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteClick(student)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-200"
                            title="Delete Student"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && deleteConfirm.student && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>
          <div className="relative bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-30 p-8 max-w-md w-full animate-modal-enter">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500 bg-opacity-20 mb-6">
                <Trash2 className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Delete Student</h3>
              <p className="text-gray-200 mb-2">
                Are you sure you want to delete this student?
              </p>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
                <p className="text-white font-semibold">
                  {deleteConfirm.student.firstName} {deleteConfirm.student.lastName}
                </p>
                <p className="text-gray-300 text-sm">{deleteConfirm.student.email}</p>
                <p className="text-gray-300 text-sm">{deleteConfirm.student.mobile}</p>
              </div>
              <p className="text-yellow-200 text-sm mb-6">
                ⚠️ This action cannot be undone. The deleted data will be downloaded to your system.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 px-6 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;