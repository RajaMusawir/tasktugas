import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const FingerprintAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthentication = async () => {
    console.log(rnBiometrics);
    
    const rnBiometrics = new ReactNativeBiometrics() 

    try {
      const {available , biometryType} = await rnBiometrics.isSensorAvailable();
      const gg = await rnBiometrics.isSensorAvailable

      if (available) {
        const result = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate with your fingerprint',
        });
        console.log(`Biometric type detected: ${biometryType}`);

        if (result.success) {
          setAuthenticated(true);
          Alert.alert('Authentication Successful');
          console.log('CHAL GIyA BIRUUU');
          
        } else {
          Alert.alert('Authentication Failed');
          console.log('SAI LaGA BIRUUU');
          
        }
      } else {
        Alert.alert('Biometric sensor not available');
        console.log("THAKAL DEVICE HY ACHI DEVICE LY");
        
      }
    } catch (error) {
      console.error('Biometric authentication error', error);
      console.log('ERROR AAGYA HY NOOB');
      
    }
  };

  return (
    <View>
      <Text>{authenticated ? 'Authenticated!' : 'Please authenticate with your fingerprint.'}</Text>
      <Button title="Authenticate" onPress={handleAuthentication} />
    </View>
  );
};

export default FingerprintAuth;
