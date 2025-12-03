import { StyleSheet, TouchableOpacity } from 'react-native';
import { palette } from '../../../shared/theme';
import AppText from '../appText/AppText';

const Button = ({
  onPress,
  title,
  buttonStyle,
  buttonTextStyle,
  disabled,
}: {
  onPress: () => void;
  title: string;
  buttonStyle?: any;
  buttonTextStyle?: any;
  disabled?: boolean;
}) => {

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <AppText style={[styles.buttonText, buttonTextStyle]}>{title}</AppText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.primaryGreen,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: palette.background,
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
export default Button;
