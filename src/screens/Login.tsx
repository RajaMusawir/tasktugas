import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBiometrics from 'react-native-biometrics'; // For biometric authentication
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const saveCredentials = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Both fields are required.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        trimmedEmail,
        trimmedPassword
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        Alert.alert('Success', 'You are now logged in!');
        await saveCredentials(trimmedEmail, trimmedPassword);

        navigation.navigate('BottomTabs');
      } else {
        Alert.alert('Verification Required', 'Please verify your email to log in.');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image source={require('./../../assets/group.jpeg')} style={styles.image} />
        <Text style={styles.text}>Let's Connect With Us!</Text>

        <TextInput
          placeholder="Email or Phone Number"
          placeholderTextColor="#808080"
          style={styles.email_input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#808080"
          style={styles.password_input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}
          style={{ zIndex: 10 }}
        >
          <Text style={styles.forgot_password}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login_button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.login_text}>
            {loading ? <ActivityIndicator size="small" color="white" /> : 'Login'}
          </Text>
        </TouchableOpacity>
        <View style={styles.textRow}>
        <Text style={styles.grayLine}>────────────────</Text>
        <Text style={styles.blackText}>or</Text>
        <Text style={styles.grayLine}>────────────────</Text>
      </View>

      <View style={{ top:12 }}>
        <TouchableOpacity style={styles.apple_signin_button}>
          <View style={{ flexDirection: 'row', left: 15 }}>
            <Image source={require('./../../assets/apple.png')} style={{ height: 38, width: 38, left: 50, top: 9 }} />
            <Text style={styles.apple_signin_text}>SignUp With Apple</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.google_signin_button}>
          <View style={{ flexDirection: 'row', left: 15 }}>
            <Image source={require('./../../assets/google.png')} style={{ height: 26, width: 26, left: 50, top: 13 }} />
            <Text style={styles.google_signin_text}>SignUp With Google</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.alreadyAccount}>
      Don't have an account? 
      </Text> 
      <Text style={{ color: '#145343', fontFamily: 'serif', fontWeight: 'bold', marginLeft:7, top:85}} onPress={() => navigation.navigate('SignUp')}>
      Sign Up
      </Text>
      </View>
      
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom:300
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    left: 50,
    top: 12
  },
  forgot_password: {
    color: '#808080',
    top: 45,
    left: 243,
    fontWeight: '500',
    fontSize: 14,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: "55%"
  },
  email_input: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    color:'black',
    width: '92%',
    left: 15,
    top: 30,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15
  },
  password_input: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    color:'black',
    width: '92%',
    left: 15,
    top: 40,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15
  },
  login_button: {
    backgroundColor: '#c2e96a',
    top: 60,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 1200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login_text: {
    color: '#145343',
    fontSize: 17,
    fontWeight: 'bold',
  },
  google_signin_button: {
    backgroundColor: 'white',
    top: 30,
    width: '92%',
    left: 15,
    height: 53,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 1200,
  },
  google_signin_text: {
    color: 'black',
    left: 67,
    fontSize: 17,
    fontWeight: 'bold',
    top: 15
  },
  alreadyAccount: {
    color: 'black',
    fontSize: 14.5,
    marginTop: 85,
    marginLeft: 90,
    fontWeight: 'bold',
  },
  apple_signin_button: {
    backgroundColor: 'black',
    top: 20,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 1200,
  },
  apple_signin_text: {
    color: 'white',
    left: 60,
    fontSize: 17,
    fontWeight: 'bold',
    top: 18
  },
  grayLine: {
    color: '#D3D3D3',
    flex: 1,
    textAlign: 'center',
  },
  blackText: {
    color: '#D3D3D3',
    fontWeight: 'bold',
    paddingHorizontal: 0,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 90,
  },
});

export default Login;