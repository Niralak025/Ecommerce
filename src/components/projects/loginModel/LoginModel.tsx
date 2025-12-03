import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { palette } from '../../../shared/theme';
import Button from '../../common/button/Button';

interface LoginModelProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginModel: React.FC<LoginModelProps> = ({
  visible,
  onClose,
  onLogin,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>You need to login to continue</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              buttonStyle={[styles.button, { backgroundColor: palette.cancel }]}
            />
            <Button
              title="Login"
              onPress={onLogin}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: palette.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.black,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: palette.black,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: palette.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: palette.black,
  },
  loginButton: {
    width: '100%',
  },
  errorText: {
    color: palette.error,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
});

export default LoginModel;
