import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { palette } from '../../../shared/theme';
import Button from '../../../components/common/button/Button';
import Header from '../../../components/common/header/Header';
import useSignupViewModel from './SignupViewModel';

const SignupView: React.FC = (props: any) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { handleSignup } = useSignupViewModel(props);
  return (
    <View style={styles.container}>
      <Header
        title="Signup"
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.scrollContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />
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
          title="Signup"
          onPress={() => {
            handleSignup(username, email, password);
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

export default React.memo(SignupView);
