import axios from 'axios';

const api = axios.create({ baseURL: '/' });

api.interceptors.request.use((config) => {
  const userInfoRaw = localStorage.getItem('userInfo');
  if (userInfoRaw) {
    try {
      const { token } = JSON.parse(userInfoRaw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

export default api;