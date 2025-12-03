import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppText from '../appText/AppText';
import { palette } from '../../../shared/theme';
import Icon from 'react-native-vector-icons/Entypo';

const Header = ({
  onBackPress,
  title,
}: {
  onBackPress?: () => void;
  title: string;
}) => {
  return (
    <View style={styles.containerStyle}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
      ) : null}
      <AppText style={styles.titleStyle}>{title}</AppText>
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
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoStyle: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
});

export default Header;
