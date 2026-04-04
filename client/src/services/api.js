import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // Added trailing slash for safety
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('contentcraft_user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  const response = await api.post('auth/login', credentials);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post('auth/signup', userData);
  return response.data;
};

export const generateContent = async (data) => {
  const response = await api.post('generate', data);
  return response.data;
};

export const askQuestion = async (question) => {
  const response = await api.post('ask', { question });
  return response.data;
};

export const generateIdeas = async (topic, platform) => {
  const response = await api.post('ideas', { topic, platform });
  return response.data;
};

export const improveContent = async (content, platform) => {
  const response = await api.post('improve', { content, platform });
  return response.data;
};

export const getTrends = async (platform) => {
  const response = await api.get(`trends?platform=${platform || 'Instagram'}`);
  return response.data;
};

export default api;
