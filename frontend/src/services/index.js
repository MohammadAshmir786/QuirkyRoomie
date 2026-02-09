import api from './api';

export const authService = {
  register: (username, email, password, flatCode) =>
    api.post('/auth/register', { username, email, password, flatCode }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getCurrentUser: () =>
    api.get('/auth/me'),

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const complaintService = {
  fileComplaint: (title, description, complaintType, severity) =>
    api.post('/complaints', { title, description, complaintType, severity }),

  getComplaints: (status = 'Active') =>
    api.get('/complaints', { params: { status } }),

  getComplaint: (id) =>
    api.get(`/complaints/${id}`),

  voteComplaint: (id, voteType) =>
    api.post(`/complaints/${id}/vote`, { voteType }),

  resolveComplaint: (id) =>
    api.put(`/complaints/${id}/resolve`),

  getTrendingComplaints: () =>
    api.get('/complaints/trending'),
};

export const leaderboardService = {
  getLeaderboard: () =>
    api.get('/leaderboard'),

  getMostComplaints: () =>
    api.get('/leaderboard/complaints'),
};

export const flatService = {
  getFlatStats: () =>
    api.get('/flat/stats'),

  getFlatMembers: () =>
    api.get('/flat/members'),
};
