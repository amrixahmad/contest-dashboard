// Mock data for the contest
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', oranges: 23, pledges: 8, journals: 3 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', oranges: 45, pledges: 15, journals: 6 },
  { id: 3, name: 'Carol White', email: 'carol@example.com', oranges: 67, pledges: 22, journals: 9 },
  { id: 4, name: 'David Brown', email: 'david@example.com', oranges: 12, pledges: 4, journals: 1 },
  { id: 5, name: 'Eva Green', email: 'eva@example.com', oranges: 34, pledges: 11, journals: 4 },
];

const pledges = [
  { id: 1, userId: 1, content: 'I pledge to help elderly cross the road', date: '2025-02-23' },
  { id: 2, userId: 1, content: 'I pledge to clean up the local park', date: '2025-02-22' },
  { id: 3, userId: 2, content: 'I pledge to volunteer at the animal shelter', date: '2025-02-23' },
  { id: 4, userId: 3, content: 'I pledge to teach kids programming', date: '2025-02-23' },
  { id: 5, userId: 4, content: 'I pledge to donate blood', date: '2025-02-23' },
];

const journals = [
  { 
    id: 1, 
    userId: 1, 
    pledgeId: 1,
    content: 'Today I helped Mrs. Thompson cross the busy intersection. She was very grateful and shared stories about her grandchildren.',
    date: '2025-02-23'
  },
  { 
    id: 2, 
    userId: 2, 
    pledgeId: 3,
    content: 'Spent 4 hours at the animal shelter. Helped walk dogs and clean kennels. The animals were so happy!',
    date: '2025-02-23'
  },
  { 
    id: 3, 
    userId: 3, 
    pledgeId: 4,
    content: 'Taught a group of 5 kids basic Python. They were excited to make their first "Hello, World!" program.',
    date: '2025-02-23'
  },
];

const analyticsData = {
  totalUsers: 156,
  activeUsers: 89,
  stats: {
    daily: {
      pledges: 45,
      journals: 32,
      newUsers: 8
    },
    weekly: {
      pledges: 287,
      journals: 198,
      newUsers: 43
    },
    monthly: {
      pledges: 1245,
      journals: 876,
      newUsers: 156
    }
  },
  recentActivity: [
    { type: 'pledge', userId: 1, date: '2025-02-23T12:30:00Z' },
    { type: 'journal', userId: 2, date: '2025-02-23T12:15:00Z' },
    { type: 'pledge', userId: 3, date: '2025-02-23T11:45:00Z' },
    { type: 'journal', userId: 4, date: '2025-02-23T11:30:00Z' },
  ]
};

// Simulated API calls
export const api = {
  getLeaderboard: () => Promise.resolve(
    users.sort((a, b) => b.oranges - a.oranges)
  ),
  
  getAnalytics: () => Promise.resolve(analyticsData),
  
  getUsers: () => Promise.resolve(users),
  
  login: (email, password) => {
    // Simulate login - accept any email/password for demo
    const user = users.find(u => u.email === email);
    if (user) {
      return Promise.resolve({ token: 'dummy-token-123', user });
    }
    return Promise.reject(new Error('Invalid credentials'));
  },
  
  deleteUser: (userId) => {
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      return Promise.resolve({ success: true });
    }
    return Promise.reject(new Error('User not found'));
  },
  
  submitPledge: (userId, content) => {
    // Check if user already submitted a pledge today
    const today = new Date().toISOString().split('T')[0];
    const existingPledge = pledges.find(p => 
      p.userId === userId && p.date === today
    );
    
    if (existingPledge) {
      return Promise.reject(new Error('You can only submit one pledge per day'));
    }
    
    return Promise.resolve({
      id: pledges.length + 1,
      userId,
      content,
      date: today
    });
  },
  
  submitJournal: (userId, pledgeId, content) => {
    // Check if user already submitted a journal today
    const today = new Date().toISOString().split('T')[0];
    const existingJournal = journals.find(j => 
      j.userId === userId && j.date === today
    );
    
    if (existingJournal) {
      return Promise.reject(new Error('You can only submit one journal per day'));
    }
    
    return Promise.resolve({
      id: journals.length + 1,
      userId,
      pledgeId,
      content,
      date: today
    });
  }
};
