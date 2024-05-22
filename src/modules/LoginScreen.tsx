import colors from '../utilities/colors';
import React, {useState} from 'react';
import languages from '../utilities/AppString';
import localeImage from '../assets/localeImage';
import CustomButton from '../components/CustomButton';
import {vh, normalize, vw} from '../utilities/dimensions';
import CustomTextInput from '../components/CustomInput';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  validateEmail,
  validatePassword,
} from '../utilities/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {

  email: string;
  password: string;
  emailError: string;
  passwordError: string;
}

const initialState: State = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
};
const LoginScreen = () => {
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState(initialState);
  const navigation =useNavigation()

  /**
   * @handleToggle Function
   * @description toggle eye to see password
   */
  const handleToggle = () => {
    setToggle(!toggle);
  };


  /**
   * @handleEmailChange Function
   * @description validating email using regex
   */
  const handleEmailChange = (email: string) => {
    const emailError = validateEmail(email);
    setState({...state, email, emailError});
  };

  /**
   * @_onChangePasswordText Function
   * @description  validating password using regex
   */
  const handlePasswordChange = (password: string) => {
    const passwordError = validatePassword(password);
    setState({...state, password, passwordError});
  };

  /**
   * @_onChangePasswordText Function
   * @description  checking input field is filled or not
   */
  const _onPressLogin = () => {
   if (!state.email) {
      Alert.alert('Email is required');
    } else if (!state.password) {
      Alert.alert('password is required');
    }  
    else if(state.emailError || state.passwordError){
      Alert.alert(state.emailError?'Email must be valid':'Password must be valid');
    }
    else {
      login();
    }
  };

  /**
   * @SignUpRequest Function
   * @description  signUp user to firebase
   */
  const login = async () => {
    AsyncStorage.setItem('isSignedIn','true')
    navigation.reset({
      index: 0,
      //@ts-ignore
      routes: [{ name: 'BottomTab' }],
    });
  };

  return (
    <View style={styles.mainContainerStyle}>
      <KeyboardAwareScrollView
        extraHeight={30}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        >
        <>
        <Image style={styles.logoImageStyle} source={localeImage.logo} />
        <Text style={styles.loginTextStyle}>{languages.login}</Text>
        <Text style={styles.greetingTextStyle}>{languages.hello}</Text>

          <CustomTextInput
            value={state.email}
            placeholder="Email"
            leftIcon={localeImage.email}
            onChangeText={handleEmailChange}
            mainViewStyle={styles.textInputViewStyle}
            rightIconStyle={{tintColor: colors.purple}}
            leftIconStyle={{tintColor: colors.dark_grey}}
          />
          <Text style={{color: colors.red, marginLeft: vw(30)}}>
            {state.emailError ? state.emailError : ''}
          </Text>
          <CustomTextInput
            value={state.password}
            placeholder="Password"
            secureTextEntry={toggle}
            leftIcon={localeImage.lock}
            rightIconOnPress={handleToggle}
            onChangeText={handlePasswordChange}
            mainViewStyle={styles.textInputViewStyle}
            leftIconStyle={{tintColor: colors.dark_grey}}
            rightIconStyle={{tintColor: colors.dark_grey}}
            rightIcon={toggle ? localeImage.openView : localeImage.hiddenView}
          />
          <Text style={{color: colors.red, marginLeft: vw(30)}}>
            {state.passwordError ? state.passwordError : ''}
          </Text>
          <CustomButton
            buttonText="Login"
            onPress={_onPressLogin}
            customButtonStyle={styles.submitButtonStyle}
          />
        </>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    
  },
  logoImageStyle: {
    height: vw(150),
    width: vw(150),
    alignSelf: 'center',
    marginTop: vh(100),

  },
  loginTextStyle: {
    fontWeight: '500',
    marginTop: vh(60),
    color: colors.black,
    fontSize: normalize(18),
    marginHorizontal:vw(30),
  },
  greetingTextStyle: {
    color: colors.dark_grey,
    marginHorizontal:vw(30),

  },

  customInputStyle: {
    marginTop: vh(30),
    marginHorizontal: vw(0),
    paddingHorizontal: vw(10),
    borderRadius: normalize(10),
  },
  textInputViewStyle: {
    borderBottomWidth: 1,
    marginHorizontal: vw(30),
    borderBottomColor: colors.dark_grey,
    marginTop: vh(20),
    paddingHorizontal: vw(10),
    borderRadius: normalize(10),
  },
  textInputStyle: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  submitButtonStyle: {
    marginHorizontal: vw(20),
    marginTop: vh(50),
    marginBottom: vh(50),
  },
});