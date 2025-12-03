import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AppText from '../appText/AppText';
import { palette } from '../../../shared/theme';
import Icon from 'react-native-vector-icons/Entypo';

const Header = ({
  onBackPress,
  title,
  iconColor,
  headerStyle,
  iconStyle,
}: {
  onBackPress?: () => void;
  title?: string;
  iconColor?: string;
  headerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.containerStyle, headerStyle]}>
      {onBackPress ? (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backIconContainerStyle}
        >
          <Icon
            name="chevron-left"
            size={30}
            color={iconColor ? iconColor : 'white'}
            style={iconStyle}
          />
        </TouchableOpacity>
      ) : null}
      {title ? <AppText style={styles.titleStyle}>{title}</AppText> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    includeFontPadding: false,
    fontWeight: '500',
  },
  containerStyle: {
    height: 60,
    backgroundColor: palette.primaryGreen,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconContainerStyle: {
    padding: 5,
    borderRadius: 15,
  },
});

export default Header;
