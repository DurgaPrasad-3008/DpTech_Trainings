import React, { useState, useRef } from 'react';
import { X, Lock, User, Eye, EyeOff } from 'lucide-react';
import Dashboard from './Dashboard';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  showLoginForm?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, showLoginForm: initialShowLoginForm = false }) => {
  const [showLoginForm, setShowLoginForm] = useState(initialShowLoginForm);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  // Update showLoginForm when prop changes
  React.useEffect(() => {
    setShowLoginForm(initialShowLoginForm);
  }, [initialShowLoginForm]);

  // Encoded credentials (Base64 + custom encoding)
  const encodedCredentials = {
    username: 'UHV0dGFsYSBEdXJnYSBQcmFzYWQ=', // Base64 encoded
    password: 'MTIxNTMwQEFTVUQ=' // Base64 encoded
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Decode credentials for comparison
    const decodedUsername = atob(encodedCredentials.username);
    const decodedPassword = atob(encodedCredentials.password);

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (username === decodedUsername && password === decodedPassword) {
      // Successful login
      setShowDashboard(true);
      // Don't close login modal or reset form yet
    } else {
      setError('Invalid credentials. Access denied.');
    }

    setIsLoading(false);
  };

  const resetModal = () => {
    setShowLoginForm(false);
    setUsername('');
    setPassword('');
    setError('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 animate-modal-enter">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Lock className="mr-3 text-white" size={24} />
              <div>
                <h2 className="text-xl font-bold text-white">Owner Login</h2>
                <p className="text-blue-100 text-sm">Secure Access Portal</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showLoginForm ? (
            // Warning Message
            <div className="text-center space-y-6">
              <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 border-opacity-30 rounded-lg p-4">
                <div className="flex items-center justify-center mb-3">
                  <Lock className="text-yellow-400 mr-2" size={20} />
                  <span className="text-yellow-200 font-semibold">Restricted Access</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Only the owner can login here. Please register your details by clicking the 
                  <span className="font-semibold text-blue-300"> "Start Your IT Journey Today" </span>
                  button to join our courses.
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  I Understand
                </button>
              </div>
            </div>
          ) : (
            // Login Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    <User className="inline mr-2" size={16} />
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter owner name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    <Lock className="inline mr-2" size={16} />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-12 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-lg p-3">
                  <p className="text-red-200 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLoginForm(false)}
                  className="flex-1 py-3 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
      
      <Dashboard 
        isOpen={showDashboard} 
        onClose={() => {
          setShowDashboard(false);
          // Reset login form when dashboard closes
          setUsername('');
          setPassword('');
          setShowLoginForm(false);
          setError('');
          setShowPassword(false);
          resetModal();
        }} 
      />
    </>
  );
};

export default LoginModal;