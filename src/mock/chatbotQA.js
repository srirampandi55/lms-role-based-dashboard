export const adminChatbotQA = [
  {
    id: 'admin_1',
    question: 'Show user analytics',
    keywords: ['user', 'analytics', 'growth', 'users'],
    answer: 'Here\'s the current user analytics overview. We have 2,847 total users with 2,156 active users this month.',
    hasChart: true,
    chartType: 'userGrowth'
  },
  {
    id: 'admin_2', 
    question: 'How are courses performing?',
    keywords: ['course', 'performance', 'completion', 'analytics'],
    answer: 'Course performance is strong. JavaScript Fundamentals leads with 85.3% completion rate.',
    hasChart: true,
    chartType: 'courseCompletion'
  },
  {
    id: 'admin_3',
    question: 'What\'s the system health status?',
    keywords: ['system', 'health', 'uptime', 'performance'],
    answer: 'System is performing optimally! Server uptime: 99.9%, Response time: 120ms, Error rate: 0.02%.',
    hasChart: false
  }
];

export const studentChatbotQA = [
  {
    id: 'student_1',
    question: 'Show my progress',
    keywords: ['progress', 'my progress', 'how am I doing'],
    answer: 'Your learning progress is excellent! You\'ve completed 3 out of 5 enrolled courses with 68.4% overall progress.',
    hasChart: true,
    chartType: 'studentProgress'
  },
  {
    id: 'student_2',
    question: 'What assignments are due soon?',
    keywords: ['assignment', 'due', 'deadline', 'upcoming'],
    answer: 'You have 2 upcoming deadlines: Node.js Project (5 days) and Database Quiz (8 days).',
    hasChart: false
  },
  {
    id: 'student_3', 
    question: 'Show my study time',
    keywords: ['study', 'time', 'hours', 'studying'],
    answer: 'You\'ve maintained a 12-day study streak with 147 total study hours. Great consistency!',
    hasChart: true,
    chartType: 'studyTime'
  }
];

export const getChatbotQA = (role) => {
  switch (role) {
    case 'admin':
      return adminChatbotQA;
    case 'student':
      return studentChatbotQA;
    default:
      return [];
  }
};

export const findAnswer = (role, userInput) => {
  const qaData = getChatbotQA(role);
  const input = userInput.toLowerCase().trim();

  const match = qaData.find(qa => 
    qa.keywords.some(keyword => input.includes(keyword.toLowerCase()))
  );

  if (match) {
    return {
      answer: match.answer,
      hasChart: match.hasChart || false,
      chartType: match.chartType || null
    };
  }

  const defaultResponses = {
    admin: 'I can help you with user analytics, course performance, and system health. What would you like to know?',
    student: 'I can help you track your progress, deadlines, and study time. What would you like to see?'
  };

  return {
    answer: defaultResponses[role] || 'I\'m here to help! What would you like to know?',
    hasChart: false,
    chartType: null
  };
};

export const getSuggestedQuestions = (role) => {
  const qaData = getChatbotQA(role);
  return qaData.slice(0, 3).map(qa => qa.question);
};
