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

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('userInfo');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;