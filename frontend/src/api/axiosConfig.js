import axios from 'axios';

/**
 * Dynamically resolves the API base URL.
 * In local dev (localhost/127.0.0.1), uses http://localhost:3636 (or VITE_API_BASE_URL if set).
 * In deployed domain (e.g. gokulanandachaudhurifoundation.com or any cloud host),
 * automatically uses window.location.origin or production VITE_API_BASE_URL.
 */
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    if (!isLocalhost) {
      const envUrl = import.meta.env.VITE_API_BASE_URL;
      if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
        return envUrl.replace(/\/$/, '');
      }
      return window.location.origin;
    }
  }

  const envUrl = import.meta.env.VITE_API_BASE_URL;
  return (envUrl || 'http://localhost:3636').replace(/\/$/, '');
};

export const API_BASE_URL = getApiBaseUrl();

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Update baseURL dynamically per request and add token if present
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.baseURL || config.baseURL === 'http://localhost:3636') {
      config.baseURL = getApiBaseUrl();
    }
    const token = localStorage.getItem('authToken');
    if (token) {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
