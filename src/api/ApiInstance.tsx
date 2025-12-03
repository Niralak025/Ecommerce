import axios from 'axios';
import { Alert } from 'react-native';
import { store } from '../redux/store';

const productionUrl = '';
const localUrl = 'https://fakestoreapi.com/';

const axiosInstance = axios.create({
  baseURL: localUrl,
  timeout: 300000,
});

// ✅ Always attach latest access token
axiosInstance.interceptors.request.use(
  async config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (__DEV__) {
      console.log('%c📤 [API Request]', 'color:#00bfff;font-weight:bold;', {
        url: `${config.baseURL}${config.url}`,
        method: config.method?.toUpperCase(),
        headers: config.headers,
        params: config.params,
        data: config.data,
      });
    }
    return config;
  },
  error => {
    if (__DEV__) {
      console.log(
        '%c🚨 [Request Error]',
        'color:#ff4d4d;font-weight:bold;',
        error,
      );
    }
    return Promise.reject(error);
  },
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response): any => {
    if (__DEV__) {
      console.log('%c📥 [API Response]', 'color:#32cd32;font-weight:bold;', {
        url: response.config?.url,
        status: response.status,
        headers: response.headers,
        data: response.data,
      });
    }

    return { success: true, data: response.data, statusCode: response.status };
  },
  async error => {
    if (!error.response) {
      if (__DEV__) {
        console.log(
          '%c❌ [Network Error]',
          'color:#ff4d4d;font-weight:bold;',
          error,
        );
      }
      return Promise.reject(error);
    }

    const { status } = error.response;
    
    // Handle server error
    if (status === 500) {
      Alert.alert(
        'Server Error',
        'Something went wrong. Please try again later.',
        [{ text: 'OK' }],
      );
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
