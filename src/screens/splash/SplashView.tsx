import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { palette } from '../../shared/theme';
import AppText from '../../components/common/appText/AppText';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/RootNavigator';

type SplashProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashView: React.FC<SplashProp> = (props: any) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const userData = useSelector((state: any) => state.auth.user);
  const provider = useSelector((state: any) => state.auth.provider);

  console.log('isLoggedIn', isLoggedIn);
  console.log('userData', userData);
  console.log('provider', provider);

  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('MainTabs');
    }, 2000);
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/shop_logo.png')}
        resizeMode="cover"
      />
      <AppText style={styles.title}>Ecommerce</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: palette.background,
  },
  logo: { width: 120, height: 120, marginBottom: 4, borderRadius: 20 },
  title: { fontSize: 20, fontWeight: '700', color: palette.text },
  hint: { fontSize: 12, color: palette.textMuted },
});

export default SplashView;
