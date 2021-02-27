import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expires_in');

    if (new Date().getTime() > Number(expirationTime)) {
      window.location.href = '/login';

      localStorage.clear();
      return config;
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
