import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, TextInput, Alert } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  const trim = () => {
  email.trim();
  }
  trim();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Your Email Is Not Valid");
      return false;
    }
  };

  const handleSendPasswordReset = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter the email address');
      return;
    }
    else if (emailError) {
      Alert.alert('Error', 'Please enter the email address correctly')
      return;
    }

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Success', 'If this email is registered, a password reset email has been sent.');
        navigation.navigate('Login'); // Navigate to login screen after sending email
      })
      .catch((error) => {
        // Log the entire error object for debugging
        console.error('Error sending password reset email:', error);

        // Handle specific error cases
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'The email address is not valid.');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'The email address is not registered.');
        } else if (error.code === 'auth/too-many-requests') {
          Alert.alert('Error', 'Too many requests. Please try again later.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <StatusBar translucent />
      <View style={styles.flex}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
    <Image source={require('./../../assets/back.png')} style={styles.backImage} />
  </TouchableOpacity>
</View>
      <Text style={styles.text}>Forget Password</Text>
      <Text style={{ color: '#bebebe', fontWeight: '600', top: 22, left: 67 }}>Enter your email address to send Verification</Text>
      <Text style={{ color: '#bebebe', fontWeight: '600', top: 22, left: 177 }}>link</Text>
      <TextInput
        placeholder='Email Address'
        placeholderTextColor={'#808080'}
        style={styles.email_input}
        onChangeText={text => { setEmail(text); validateEmail(text); }}
          onBlur={trim}
        />
        {emailError ? <Text style={styles.errorText_email}>{emailError}</Text> : null}
        <View style={[emailError ? { paddingBottom:12 } : {}]}>
      <TouchableOpacity style={styles.send_button} onPress={handleSendPasswordReset}>
        <Text style={styles.send_text}>Send</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
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
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 16,
  },
  close_style: {
    width: 15,
    height: 14,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f5f5f4',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  flex: {
    flexDirection: 'row',
    position: 'absolute',
    top: 45,
    left: 20,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 5,
    zIndex:10,
    padding: 10, 
    borderRadius: 50,
    backgroundColor: '#f5f5f4',
    elevation: 3,
  },
  backImage: {
    width: 15,
    height: 14,
  },
  email_input: {
    borderColor: '#bebebe',
    borderWidth: 1,
    borderRadius: 16,
    color: 'black',
    width: '92%',
    left: 15,
    top: 60,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15,
  },
  send_button: {
    backgroundColor: '#c2e96a',
    borderRadius: 16,
    top: 570,
    left: 15,
    width: '92%',
    zIndex:10,
    marginBottom:92,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send_text: {
    color: '#145343',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText_email: {
    color: 'red',
    fontWeight:'bold',
    left: 210,
    top: 27,
  },
});

export default ForgetPassword;
