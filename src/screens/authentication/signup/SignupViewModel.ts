import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { ApiService } from '../../../api/ApiService';
import WSCall from '../../../api/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface NewUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export default function useSignupViewModel(navigation: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSignup = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const userData: NewUser = {
          id: Math.random(),
          username: username,
          email: email,
          password: password,
        };

        const response = await new Promise<LoginResponse>((resolve, reject) => {
          WSCall.postResponse(
            ApiService.ADD_USER,
            userData,
            'post',
            (data: LoginResponse, err: any) => {
              if (err) {
                reject(err);
                return;
              }
              console.log('Signup response:', data);
              resolve(data);
            },
          );
        });
      } catch (err: any) {
        console.error('Login error:', err);
        setError(err.message || 'Login failed. Please try again.');
        Alert.alert('Error', err.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [navigation],
  );

  return {
    handleSignup,
    isLoading,
    error,
  };
}
