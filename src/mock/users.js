export const mockUsers = [
  {
    id: 'admin-001',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'John Administrator',
    email: 'admin@lms.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=b6e3f4&clothesColor=262e33&eyebrowType=default&eyeType=default&facialHairColor=auburn&facialHairType=default&hairColor=auburn&hatColor=black&mouthType=smile&skinColor=light&topType=shortHairShortWaved',
    department: 'IT Administration',
    joinDate: '2023-01-15'
  },
  {
    id: 'student-001', 
    username: 'student',
    password: 'student123',
    role: 'student',
    name: 'Alice Student',
    email: 'alice.student@lms.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=ffeaa7&clothesColor=3742fa&eyebrowType=defaultNatural&eyeType=happy&facialHairType=blank&hairColor=brown&mouthType=smile&skinColor=light&topType=longHairStraight&accessoriesType=round',
    studentId: 'STU2024001',
    program: 'Computer Science',
    year: 3,
    gpa: 3.7
  }
];

export const authenticateUser = (username, password) => {
  return mockUsers.find(user => 
    user.username === username && user.password === password
  ) || null;
};

export const getUserById = (userId) => {
  return mockUsers.find(user => user.id === userId) || null;
};

export const getCurrentUser = () => {
  try {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

export const clearCurrentUser = () => {
  try {
    sessionStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error clearing current user:', error);
  }
};
