import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const MixAuth = ({ navigation }) => {
  const [selected, setSelected] = useState('Login');
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasUpperLower: false,
    hasSpecialChar: false,
  });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checked, setChecked] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateName = (text) => {
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>;''``+=-]/.test(text);
    if (specialCharacters) {
      setNameError('Your name cannot include special characters');
    } else {
      setNameError('');
      setName(text);
    }
  };

  const validateEmail = (text) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(text)) {
      setEmailError('');
      setEmail(text)
      return true;
    } else {
      setEmailError('Your Email Is Not Valid');
      return false;
    }
  };

  const validatePassword = (text) => {
    const lengthValid = text.length >= 8;
    const uppercaseValid = /[A-Z]/.test(text);
    const numberValid = /[0-9]/.test(text);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(text);
  
    setRequirements({
      minLength: lengthValid,
      hasNumber: numberValid,
      hasUpperLower: /[a-z]/.test(text) && uppercaseValid,
      hasSpecialChar: specialValid,
    });
  
    if (lengthValid && uppercaseValid && numberValid && specialValid) {
      setPasswordError('');
      setPassword(text);
      return true;
    } else {
      setPasswordError('Password does not meet the requirements.');
      return false;
    }
  };

  const alertBox = async () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    const validateAll = async () => {
      const isNameValid = !nameError;
      const isEmailValid = validateEmail(email.trim());
      const isPasswordValid = validatePassword(password.trim());
  
      if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return false;
      }
      return true;
    };
  
    if (await validateAll()) {
      try {
        console.log('Creating user...');
        const usersSnapshot = await firestore().collection('users').get();
        const userCount = usersSnapshot.size;
        const userId = (userCount + 1).toString().padStart(6, '0');
    
        const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
        const userID = userCredential.user.uid;
    
        await firestore().collection('users').doc(userID).set({
          id: userId,
          fullName: name.trim(),
          email: email.trim(),
        });
        console.log('User created successfully!');
        setSelected('Login')
        Alert.alert('Success', 'User created successfully!');
      } catch (err) {
        console.error('Error adding user:', err);
        Alert.alert('Error', 'Failed to create user. Please try again.');
      }
    }
  };

  const saveCredentials = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        trimmedEmail,
        trimmedPassword
      );
      const user = userCredential.user;
        Alert.alert('Success', 'You are now logged in!');
        await saveCredentials(trimmedEmail, trimmedPassword);

        navigation.navigate('FoodHome');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '977584652282-u7ognivr3ju232vj6nrfdgj58u05lvl6.apps.googleusercontent.com',
    });
  }, []);
  console.log('webclint passed');
  
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log('hsa play services');
      
      const { idToken } = await GoogleSignin.signIn();
      console.log('haave token');
      
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('idtoken');
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log('User Info:', userCredential.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('Play Services not available or outdated');
      } else {
        console.error('Error:', error);
      }
    }
  };

  const Login = () => (
    <View style={{ backgroundColor: '#f4f4f4', flex: 1 }}>
      <ScrollView>
        <TouchableOpacity style={{ backgroundColor: 'white', marginTop: 20, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }} onPress={signInWithGoogle}>
          <View style={{ flexDirection: 'row', left: 15 }}>
            <Image source={require('./../../assets/google.png')} style={{ height: 26, width: 26, left: 50, top: 13 }} />
            <Text style={styles.google_signin_text}>SignIn With Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'black', marginTop: 10, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
          <View style={{ flexDirection: 'row', left: 15 }}>
            <Image source={require('./../../assets/apple.png')} style={{ height: 38, width: 38, left: 50, top: 9 }} />
            <Text style={styles.apple_signin_text}>SignIn With Apple</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.textRow}>
          <Text style={styles.grayLine}>───────────</Text>
          <Text style={styles.blackText}>or continue with email</Text>
          <Text style={styles.grayLine}>───────────</Text>
        </View>
        <View style={{ marginTop: 42 }}>
          <View style={{ backgroundColor: 'white', marginTop: 10, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
            <View style={styles.emailContainer}>
              <Image
                source={require('./../../assets/envelope.png')}
                style={styles.emailIcon}
              />
              <TextInput
                placeholder='Enter your email'
                placeholderTextColor={'#808080'}
                style={styles.email_input}
                onChangeText={setEmail} />
            </View>
          </View>

          <View style={{ backgroundColor: 'white', marginTop: 10, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
            <View style={styles.passwordContainer}>
              <Image
                source={require('./../../assets/lock.png')}
                style={styles.passwordIcon}
              />
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={'#808080'}
                style={styles.password_input}
                maxLength={10}
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}
        >
          <Text style={styles.forgot_password}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
          <Text style={{ color: '#145343', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.termsText2}>
          By Logging in you agree to our
          <Text style={styles.redText}> terms and conditions </Text>
          and
          <Text style={styles.redText}> privacy policy</Text>
        </Text>
      </ScrollView>
    </View>
  )
  
  
  const SignUp = () => (
    <View style={{ backgroundColor: '#f4f4f4', flex: 1 }}>
      <View style={{ backgroundColor: 'white', marginTop: 20, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
        <View style={styles.profileContainer}>
          <Image source={require('./../../assets/profile.png')} style={styles.profileIcon} />
          <TextInput
            placeholder='Your Name'
            placeholderTextColor={'#808080'}
            style={styles.profile_input}
            onChangeText={validateName}
          />
        </View>
      </View>
      <View style={{ backgroundColor: 'white', marginTop: 10, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
        <View style={styles.emailContainer}>
          <Image source={require('./../../assets/envelope.png')} style={styles.emailIcon} />
          <TextInput
            placeholder='Enter your email'
            placeholderTextColor={'#808080'}
            style={styles.email_input}
            onChangeText={(text) => validateEmail(text)} />
        </View>
      </View>
      <View style={{ backgroundColor: 'white', marginTop: 10, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
        <View style={styles.passwordContainer}>
          <Image source={require('./../../assets/lock.png')} style={styles.passwordIcon} />
          <TextInput
            placeholder='Enter your password'
            placeholderTextColor={'#808080'}
            style={styles.password_input}
            secureTextEntry
            onChangeText={validatePassword}
          />
        </View>
      </View>
      <View style={{ backgroundColor: 'white', marginTop: 10, width: '92%', height: 52, borderRadius: 12, marginLeft: 17 }}>
        <View style={styles.passwordContainer}>
          <Image source={require('./../../assets/lock.png')} style={styles.passwordIcon} />
          <TextInput
            placeholder='Confirm your password'
            placeholderTextColor={'#808080'}
            style={styles.password_input}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>
      
      {/* Validation Requirements */}
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Image source={require('./../../assets/verfytick.png')} style={{ width: 14, height: 14, marginLeft: 29, marginTop: 20, tintColor: requirements.hasNumber ? 'green' : 'grey' }} />
        <Text style={{ color: '#8f8f8f', marginLeft: 10, marginTop: 18 }}>At least 8 characters</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('./../../assets/verfytick.png')} style={{ width: 14, height: 14, marginLeft: 29, marginTop: 10, tintColor: requirements.minLength ? 'green' : 'grey' }} />
        <Text style={{ color: '#8f8f8f', marginLeft: 10, marginTop: 10 }}>At least 1 number</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('./../../assets/verfytick.png')} style={{ width: 14, height: 14, marginLeft: 29, marginTop: 10, tintColor: requirements.hasUpperLower ? 'green' : 'grey' }} />
        <Text style={{ color: '#8f8f8f', marginLeft: 10, marginTop: 10 }}>Both upper and lower case letters</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ top: 106, left: 12 }}>
          <Checkbox.Android status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} color="green" />
        </View>
        <Text style={styles.termsText}>
          I agree to your
          <Text style={styles.redText}> terms and conditions </Text>
          and
          <Text style={styles.redText}> privacy policy</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.signUp_button} onPress={alertBox}>
        <Text style={{ color: '#145343', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={{ flexDirection: 'row', marginTop: 12, }}>
        <Image source={require('./../../assets/new_logo.png')} style={{ height: 32, width: 32, left: 110, top: 1 }} />
        <Text style={styles.text}>Tasktugas</Text>
      </View>
      <Text style={{ color: 'black', fontSize: 26, fontWeight: '500', marginTop: 30, marginLeft: 72 }}>Welcome to Tasktugas</Text>
      <Text style={{ color: '#bebebe', fontSize: 15, marginLeft: 75, marginTop: 12 }}>Sign up or login below to manage your</Text>
      <Text style={{ color: '#bebebe', fontSize: 15, marginLeft: 105 }}>project, task, and productivity</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelected('Login')}
        >
          <Text style={[styles.text_modal_login, selected === 'Login' && styles.selectedText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelected('SignUp')}
        >
          <Text style={[styles.text_modal_signup, selected === 'SignUp' && styles.selectedText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.underlineContainer}>
        {selected === 'Login' ? (
          <View style={[styles.underline, styles.leftUnderline]} />
        ) : (
          <View style={[styles.underline, styles.rightUnderline]} />
        )}
      </View>
      {selected === 'SignUp' && SignUp()}
      {selected === 'Login' && Login()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#145343',
    left: 122,
    top: 5
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    elevation: 120,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  selectedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  underlineContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  underline: {
    height: 2,
    backgroundColor: 'green',
    width: '50%',
  },
  leftUnderline: {
    marginRight: '50%',
  },
  rightUnderline: {
    marginLeft: '50%',
  },
  text_modal_login: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 32
  },
  text_modal_signup: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 60
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    width: '92%',
    marginTop: 7,
    paddingHorizontal: 10,
    height: 40,
  },
  profileIcon: {
    width: 24,
    height: 24,
    left: 2,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  profile_input: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    height: 50,
    fontWeight: '500',
    paddingBottom: 12,
    fontSize: 15,
    paddingTop: 17,
    backgroundColor: 'white'
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    width: '92%',
    marginTop: 7,
    paddingHorizontal: 10,
    height: 40,
  },
  emailIcon: {
    width: 27,
    height: 27,
    left: 2,
    top: 2,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  email_input: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    height: 50,
    fontWeight: '500',
    paddingBottom: 12,
    fontSize: 15,
    paddingTop: 17,
    backgroundColor: 'white'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    width: '92%',
    marginTop: 7,
    paddingHorizontal: 10,
    height: 40,
  },
  passwordIcon: {
    width: 24,
    height: 24,
    left: 2,
    bottom: 0.5,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  password_input: {
    flex: 1,
    color: 'black',
    marginLeft: 10,
    height: 50,
    fontWeight: '500',
    paddingBottom: 12,
    fontSize: 15,
    paddingTop: 17,
    backgroundColor: 'white'
  },
  signUp_button: {
    backgroundColor: '#c2e96a',
    marginTop: 27,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login_button: {
    backgroundColor: '#c2e96a',
    marginTop: 77,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  termsText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginTop: 116,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  termsText2: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  redText: {
    color: '#145343',
    fontWeight: '500',
    alignItems: 'center',
  },
  google_signin_text: {
    color: 'black',
    left: 67,
    fontSize: 17,
    fontWeight: 'bold',
    top: 15
  },
  apple_signin_text: {
    color: 'white',
    left: 60,
    fontSize: 17,
    fontWeight: 'bold',
    top: 17
  },
  apple_signin_button: {
    backgroundColor: 'black',
    top: 20,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 1200,
  },

  grayLine: {
    color: '#D3D3D3',
    flex: 1,
    textAlign: 'center',
  },
  blackText: {
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 0,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  forgot_password: {
    color: '#808080',
    top: 15,
    left: 23,
    fontWeight: '500',
    fontSize: 14,
    zIndex: 10,
  },
});

export default React.memo(MixAuth);
