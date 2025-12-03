import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import { ApiService } from '../../../api/ApiService';
import WSCall from '../../../api/ApiClient';
import { Alert } from 'react-native';
import { setLoading } from '../../../redux/appSlice';

interface User {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export default function useLoginViewModel(navigation: any) {
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        dispatch(setLoading(true));
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

        // Dispatch login success action
        dispatch(
          login({
            token: response.token,
          }),
        );

        // Navigate to main app
        navigation.replace('MainTabs');
      } catch (err: any) {
        Alert.alert('Error', err.message || 'Login failed. Please try again.');
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, navigation],
  );

  return {
    handleLogin,
  };
}
