import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { palette } from '../../../shared/theme';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
  fullScreen?: boolean;
  isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = palette.primaryGreen,
  style,
  fullScreen = true,
  isLoading = false,
}) => {
  return (
    <>
      {isLoading ? (
        <View
          style={[styles.container, fullScreen && styles.fullScreen, style]}
        >
          <ActivityIndicator size={size} color={color} />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
    justifyContent: 'center',
  },
});

export default React.memo(Loader);
