import React, {useEffect, useState} from 'react';
import colors from '../utilities/colors';
import localeImage from '../assets/localeImage';
import {normalize, vh, vw} from '../utilities/dimensions';
import { useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @returns Splash screen UI
 */
export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const [progress, setProgress] = useState(new Animated.Value(0));

  /**
   * @returns next screen after 2 second and animation
   */
  useEffect(() => {
    setTimeout(() => {
      // navigation.replace(routesNames.login);
      checkLogin();
    }, 2000);
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000, // the duration of the animation in milliseconds
      useNativeDriver: false, // set to false to animate non-native styles
    }).start();
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const checkLogin: any = async () => {
    try{
   const signedIn=await AsyncStorage.getItem('isSignedIn')
    if (signedIn==='true') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTab' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }
  catch(e){
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }
  };
  return (
    <View style={styles.mainViewStyle}>
      <Image style={styles.Whatsappimg} source={localeImage.logo} />
      <Text style={styles.logoTextStyle}>{'Lets Talk'}</Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.progress, {width}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.white
  },
  Whatsappimg: {
    width: vw(80),
    height: vw(80),
    resizeMode: 'contain',
  },
  logoTextStyle: {
    marginTop: vh(10),
    fontWeight: '500',
    color: colors.black,
    fontSize: normalize(16),
  },
  bar: {
    width: '40%',
    height: vh(10),
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: vh(30),
    backgroundColor: colors.grey,
  },
  progress: {
    height: '100%',
    backgroundColor: colors.purple,
  },
});
