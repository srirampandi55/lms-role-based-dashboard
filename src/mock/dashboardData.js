export const adminDashboardData = {
  userStats: {
    totalUsers: 2847,
    activeUsers: 2156,
    newThisMonth: 234,
    retentionRate: 87.3,
    trend: '+12.5%'
  },
  courseAnalytics: [
    { course: 'JavaScript Fundamentals', enrolled: 456, completed: 389, rate: 85.3 },
    { course: 'React Development', enrolled: 342, completed: 267, rate: 78.1 },
    { course: 'Node.js Backend', enrolled: 289, completed: 234, rate: 81.0 },
    { course: 'Database Design', enrolled: 198, completed: 167, rate: 84.3 },
    { course: 'Python Basics', enrolled: 378, completed: 289, rate: 76.5 }
  ],
  systemHealth: {
    serverUptime: '99.9%',
    responseTime: '120ms',
    errorRate: '0.02%',
    activeConnections: 1847,
    status: 'optimal'
  },
  recentActivities: [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'Completed JavaScript Advanced Course',
      time: '2 minutes ago',
      type: 'completion',
      icon: '🎉'
    },
    {
      id: 2, 
      user: 'Mike Chen',
      action: 'Enrolled in React Development',
      time: '15 minutes ago',
      type: 'enrollment',
      icon: '📚'
    },
    {
      id: 3,
      user: 'Emma Davis', 
      action: 'Submitted final project',
      time: '1 hour ago',
      type: 'submission',
      icon: '📝'
    }
  ],
  userGrowth: [
    { month: 'Jan', users: 1820, newUsers: 145 },
    { month: 'Feb', users: 1950, newUsers: 167 },
    { month: 'Mar', users: 2100, newUsers: 189 },
    { month: 'Apr', users: 2280, newUsers: 198 },
    { month: 'May', users: 2450, newUsers: 156 },
    { month: 'Jun', users: 2580, newUsers: 178 },
    { month: 'Jul', users: 2720, newUsers: 201 },
    { month: 'Aug', users: 2847, newUsers: 234 }
  ]
};

export const studentDashboardData = {
  myProgress: {
    coursesEnrolled: 5,
    coursesCompleted: 3,
    overallProgress: 68.4,
    currentGPA: 3.8,
    studyStreak: 12,
    totalStudyHours: 147
  },
  myCourses: [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      instructor: 'Dr. Alex Thompson',
      progress: 100,
      grade: 'A+',
      status: 'completed',
      nextLesson: null,
      dueDate: null,
      thumbnail: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      duration: '4.5 hours',
      lessons: 24,
      completedLessons: 24,
      color: 'bg-yellow-500'
    },
    {
      id: 2,
      title: 'React Development', 
      instructor: 'Prof. Maria Garcia',
      progress: 75,
      grade: 'A',
      status: 'in_progress',
      nextLesson: 'React Hooks Advanced',
      dueDate: '2024-12-20',
      thumbnail: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      duration: '6.2 hours',
      lessons: 32,
      completedLessons: 24,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Node.js Backend',
      instructor: 'John Smith',
      progress: 60,
      grade: 'B+', 
      status: 'in_progress',
      nextLesson: 'Express.js Middleware',
      dueDate: '2024-12-15',
      thumbnail: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      duration: '5.8 hours',
      lessons: 28,
      completedLessons: 17,
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Database Design',
      instructor: 'Dr. Sarah Lee',
      progress: 40,
      grade: 'B', 
      status: 'in_progress',
      nextLesson: 'SQL Joins and Relations',
      dueDate: '2024-12-18',
      thumbnail: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      duration: '4.2 hours',
      lessons: 20,
      completedLessons: 8,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Python Basics',
      instructor: 'Dr. Alex Thompson', 
      progress: 100,
      grade: 'A',
      status: 'completed',
      nextLesson: null,
      dueDate: null,
      thumbnail: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      duration: '3.8 hours',
      lessons: 18,
      completedLessons: 18,
      color: 'bg-blue-600'
    }
  ],
  upcomingDeadlines: [
    {
      id: 1,
      title: 'Node.js Project Submission',
      course: 'Node.js Backend',
      dueDate: '2024-12-15',
      daysLeft: 5,
      priority: 'high',
      type: 'project'
    },
    {
      id: 2,
      title: 'Database Design Quiz',
      course: 'Database Design', 
      dueDate: '2024-12-18',
      daysLeft: 8,
      priority: 'medium',
      type: 'quiz'
    }
  ],
  achievements: [
    {
      id: 1,
      title: 'JavaScript Master',
      description: 'Completed JavaScript course with A+ grade',
      icon: '🏆',
      earned: true,
      date: '2024-11-28'
    },
    {
      id: 2,
      title: 'Study Streak Champion',
      description: '10+ consecutive days of study',
      icon: '🔥',
      earned: true, 
      date: '2024-11-15'
    }
  ]
};

export const getDashboardData = (role) => {
  switch (role) {
    case 'admin':
      return adminDashboardData;
    case 'student':
      return studentDashboardData;
    default:
      return {};
  }
};
