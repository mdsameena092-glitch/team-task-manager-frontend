import axios from 'axios';

const API = axios.create({
  baseURL: 'https://team-task-manager-backend-production-3154.up.railway.app'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Projects
export const getProjects = () => API.get('/projects');
export const createProject = (data) => API.post('/projects', data);
export const getProjectById = (id) => API.get(`/projects/${id}`);

// Tasks
export const createTask = (data) => API.post('/tasks', data);
export const getTasksByProject = (id) => API.get(`/tasks/project/${id}`);
export const updateTaskStatus = (id, status) => API.put(`/tasks/${id}/status?status=${status}`);

// Dashboard
export const getDashboardStats = () => API.get('/dashboard/stats');