import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { palette } from '../../../shared/theme';
import Button from '../../../components/common/button/Button';
import Header from '../../../components/common/header/Header';
import useLoginViewModel from './LoginViewModel';

const LoginView: React.FC = (props: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { handleLogin, checkAuthStatus, isLoading } = useLoginViewModel(
    props.navigation,
  );

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (isAuthenticated) {
        props.navigation.replace('MainTabs');
      }
    };
    checkAuth();
  }, [checkAuthStatus, props.navigation]);

  const handleSubmit = () => {
    console.log('handleSubmit');

    if (!email || !password) {
      return;
    }
    handleLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <Header title="Login" />
      <View style={styles.scrollContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          title="Login"
          onPress={() => {
            handleSubmit();
          }}
          buttonStyle={styles.button}
        />
        <Button
          title="Signup"
          onPress={() => {
            props.navigation.navigate('Signup');
          }}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: palette.textMuted,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: palette.primaryGreen,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(LoginView);
