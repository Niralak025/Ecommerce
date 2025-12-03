import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { ApiService } from '../../../api/ApiService';
import WSCall from '../../../api/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface User {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export default function useLoginViewModel(navigation: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const userData: User = {
          username: email,
          password: password,
        };

        const response = await new Promise<LoginResponse>((resolve, reject) => {
          WSCall.postResponse(
            ApiService.AUTH.LOGIN,
            userData,
            'post',
            (data: LoginResponse, err: any) => {
              if (err) {
                reject(err);
                return;
              }
              console.log('Login response:', data);
              resolve(data);
            },
          );
        });

        // Save token to AsyncStorage
        await AsyncStorage.setItem('access_token', response.token);

        // Dispatch login success action
        dispatch(
          login({
            token: response.token,
          }),
        );

        // Navigate to main app
        navigation.replace('MainTabs');
      } catch (err: any) {
        console.error('Login error:', err);
        setError(err.message || 'Login failed. Please try again.');
        Alert.alert('Error', err.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, navigation],
  );

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      console.log('Token:', token);
      if (token) {
        // Here you might want to validate the token with your backend
        // For now, we'll just check if it exists
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  }, []);

  return {
    handleLogin,
    checkAuthStatus,
    isLoading,
    error,
  };
}
