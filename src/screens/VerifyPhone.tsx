import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const VerifyPhone = ({ navigation, route }) => {
  const { email, auth } = route.params;
  const [otp, setOtp] = useState('');

  const confirmOtp = async () => {
    try {
      const response = await axios.post(
        'https://doctorapp.gtechsol.au/api/code-verification',
        { 
          email: email, 
          code: otp, 
          role_id: 3
        },
        {
          headers: {
            Authorization: auth,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message === 'Verified successfully') {
        Alert.alert('Success', 'Verification successful!');
        navigation.navigate('BottomTabs');
      } else {
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during verification. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
          <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Login')}>
            <Image source={require('./../../assets/back.png')} style={styles.close_style} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Enter your OTP</Text>
      <Text style={styles.text_tagline}>Enter the 4-Digit Code which was sent to your email</Text>
      <Image source={require('./../../assets/verify.png')} style={styles.image_sent} />
      <TextInput
        placeholder="Enter OTP here"
        placeholderTextColor="#D3D3D3"
        cursorColor="red"
        style={styles.text_OTP}
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        maxLength={4}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={confirmOtp}>
        <Text style={{ color: '#145343', fontWeight: 'bold', fontSize:17 }}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -27,
    left: 125,
  },
  text_tagline: {
    color: '#bebebe',
    fontWeight:'bold',
    marginTop: 30,
    fontSize: 15,
    paddingLeft: 36,
  },
  back_arrow: {
    width: 25,
    height: 25,
  },
  image_sent: {
    height: 250,
    width: 250,
    left: 50,
    top: 75,
  },
  text_OTP: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    color: 'black',
    width: 120,
    height: 50,
    fontWeight:'bold',
    marginTop: 140,
    left: 118,
    paddingLeft: 20,
  },
  flex: {
    flexDirection: 'row',
    marginTop: 50,
    left: 20,
  },
  close_style: {
    width: 15,
    height: 14,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    zIndex:10,
    backgroundColor: '#f5f5f4',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  
  buttonContainer: {
    marginTop: 185,
    borderRadius: 100,
    height: 50,
    left: 15,
    width: 330,
    backgroundColor: '#c2e96a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VerifyPhone;
