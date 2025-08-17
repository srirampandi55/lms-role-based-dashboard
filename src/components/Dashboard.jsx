import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Monitor, 
  Clock,
  Home,
  Settings as SettingsIcon,
  BarChart3,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  TrendingUp
} from 'lucide-react';
import { getCurrentUser, clearCurrentUser } from '../mock/users.js';
import { getDashboardData } from '../mock/dashboardData.js';
import { useTheme } from '../contexts/ThemeContext.jsx';

// Import page components
import UserManagement from './pages/UserManagement.jsx';
import CourseManagement from './pages/CourseManagement.jsx';
import Analytics from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';
import MyCourses from './pages/MyCourses.jsx';
import Progress from './pages/Progress.jsx';
import AdminWidgets from './widgets/AdminWidgets.jsx';
import StudentWidgets from './widgets/StudentWidgets.jsx';
import ChatbotModal from './ChatbotModal.jsx';
import Achievements from './pages/Achievements.jsx';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const { themeMode, cycleTheme, getThemeLabel } = useTheme();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      const data = getDashboardData(currentUser.role);
      setDashboardData(data);
    }
  }, []);

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      case 'system': return <Monitor className="w-4 h-4" />;
      case 'time-based': return <Clock className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const handleLogout = () => {
    clearCurrentUser();
    onLogout();
  };

  const getGreeting = () => {
    if (!user) return 'Welcome!';

    const hour = new Date().getHours();
    let timeGreeting = 'Hello';

    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    return timeGreeting + ', ' + user.name.split(' ')[0] + '!';
  };

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'user-management', icon: Users, label: 'User Management' },
        { id: 'course-management', icon: BookOpen, label: 'Course Management' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'settings', icon: SettingsIcon, label: 'Settings' }
      ];
    } else {
      return [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'my-courses', icon: BookOpen, label: 'My Courses' },
        { id: 'progress', icon: TrendingUp, label: 'Progress' },
        { id: 'achievements', icon: Award, label: 'Achievements' },
        { id: 'settings', icon: SettingsIcon, label: 'Profile' }
      ];
    }
  };

  const renderPageContent = () => {
    if (user?.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminWidgets data={dashboardData} />;
        case 'user-management':
          return <UserManagement />;
        case 'course-management':
          return <CourseManagement />;
        case 'analytics':
          return <Analytics />;
        case 'settings':
          return <Settings />;
        default:
          return <AdminWidgets data={dashboardData} />;
      }
    } else {
      switch (currentPage) {
        case 'dashboard':
          return <StudentWidgets data={dashboardData} />;
        case 'my-courses':
          return <MyCourses />;
        case 'progress':
          return <Progress />;
        case 'achievements':
          return <Achievements />; // For now, use Progress page for achievements
        case 'settings':
          return <Settings />;
        default:
          return <StudentWidgets data={dashboardData} />;
      }
    }
  };

  const menuItems = getMenuItems();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 theme-transition">
      {/* Sidebar */}
      <div className={'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out ' + 
        (sidebarOpen ? 'translate-x-0' : '-translate-x-full') + ' lg:translate-x-0'}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            {user.role === 'admin' ? (
              <Users className="w-5 h-5 text-white" />
            ) : (
              <GraduationCap className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {user.role === 'admin' ? 'Admin Portal' : 'Student Portal'}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              LMS Dashboard
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left font-medium transition-all duration-200 ' + 
                  (isActive 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-102')
                }
              >
                <IconComponent className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {getGreeting()}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Welcome to your {user.role} dashboard
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
              title={'Current theme: ' + getThemeLabel()}
            >
              {getThemeIcon()}
            </button>

            {/* Chatbot Toggle */}
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* User Info with animated avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 object-cover animated-avatar avatar-glow transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                  onError={(e) => {
                    e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.name.charAt(0) + '&backgroundColor=b6e3f4';
                  }}
                />
                {/* Online status indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {user.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                  {user.role} • Online
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-110"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 custom-scrollbar overflow-y-auto">
          {renderPageContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <ChatbotModal
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          userRole={user.role}
        />
      )}
    </div>
  );
};

export default Dashboard;
