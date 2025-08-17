import React, { useState } from 'react';
import { Shield, GraduationCap, LogIn, Eye, EyeOff, Sun, Moon, Monitor, Clock, AlertCircle } from 'lucide-react';
import { authenticateUser, setCurrentUser } from '../mock/users.js';
import { useTheme } from '../contexts/ThemeContext.jsx';

const RoleSelector = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { themeMode, cycleTheme, getThemeLabel } = useTheme();

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return <Sun className="w-5 h-5" />;
      case 'dark': return <Moon className="w-5 h-5" />;
      case 'system': return <Monitor className="w-5 h-5" />;
      case 'time-based': return <Clock className="w-5 h-5" />;
      default: return <Sun className="w-5 h-5" />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setCredentials({ username: 'admin', password: 'admin123' });
    } else {
      setCredentials({ username: 'student', password: 'student123' });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      const user = authenticateUser(credentials.username, credentials.password);

      if (user) {
        setCurrentUser(user);
        onLogin(user);
      } else {
        setError('Invalid username or password. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4 theme-transition">
      {/* Theme Toggle Button */}
      <button
        onClick={cycleTheme}
        className="fixed top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-200 z-10 border border-white/20 hover:scale-110"
        title={'Current theme: ' + getThemeLabel()}
        disabled={isLoading}
      >
        {getThemeIcon()}
      </button>

      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 animate-bounce-gentle">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-slide-up">Welcome to LMS</h1>
          <p className="text-white/80 animate-slide-up" style={{animationDelay: '0.1s'}}>Role-Based Learning Management System</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="text-white font-semibold text-center mb-3 flex items-center justify-center gap-2">
            ✨ Demo Credentials
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-200 disabled:opacity-50 hover:scale-105 group"
            >
              <Shield className="w-4 h-4 group-hover:animate-bounce-gentle" />
              Admin
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('student')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-200 disabled:opacity-50 hover:scale-105 group"
            >
              <GraduationCap className="w-4 h-4 group-hover:animate-bounce-gentle" />
              Student
            </button>
          </div>
          <div className="text-xs text-white/70 text-center space-y-1">
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>Student:</strong> student / student123</div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 theme-transition animate-slide-up" style={{animationDelay: '0.3s'}}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm animate-slide-up">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                placeholder="Enter your username"
                disabled={isLoading}
                autoComplete="username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !credentials.username || !credentials.password}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        </div>

        {/* Features Info */}
      </div>
    </div>
  );
};

export default RoleSelector;
