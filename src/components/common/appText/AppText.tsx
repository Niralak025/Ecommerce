import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { palette } from '../../../shared/theme';

type AppTextProps = {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  color?: string;
} & TextProps;

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  color,
  ...props
}) => {
  return (
    <Text style={[{ color: color ? color : palette.text }, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
