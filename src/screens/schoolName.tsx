import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import { ScrollView } from 'react-native-gesture-handler';

const SchoolName = ({ navigation }) => {

  const fadeOut = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(fadeOut, {
        toValue: 9,
        duration:3000,
        useNativeDriver: true,
      }).start();
    }, []);

    useEffect(() => {
      const getItem = async () => {
        try {
          const price = await AsyncStorage.getItem('price');
          const size = await AsyncStorage.getItem('size');
          const name = await AsyncStorage.getItem('product_name');
          const image = await AsyncStorage.getItem('product_image');
          console.log(price);
          console.log(size)
          console.log(name);
          console.log(image);
        } catch (error) {
          console.error("Error retrieving price from AsyncStorage:", error);
        }
      };
  
      getItem();
    }, []);
  useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem('email');
      const userToken1 = await AsyncStorage.getItem('price');
      console.log(userToken1);
      
      
      if (userToken) {
        const rnBiometrics = new ReactNativeBiometrics();
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if (available) {
          rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to Continue' })
            .then(result => {
              if (result.success) {
                navigation.navigate('FoodHome');
              } else {
                Alert.alert('Authentication Failed !', 'Please Login via Email and Password.');
                navigation.navigate('MixAuth');
              }
            })
            .catch(() => {
              console.log('Error', 'Biometric authentication not available.');
              navigation.navigate('MixAuth');
            });
        } else {
          Alert.alert('Error', `${biometryType} not supported or available.`);
        }
      } else {
        setTimeout(() => {
          navigation.navigate('SuccessPage');
        }, 2000);
      }
    };

    checkAuthentication();
  }, [navigation]);

  return (
    
      <Animated.View style={{ backgroundColor: '#c2e96a',
    flex: 1,}}>
      <ScrollView>
        <StatusBar backgroundColor="#c2e96a" />
        <View style={{ flexDirection: 'row', left: 95 }}>
          <Image source={require('./../../assets/new_logo.png')} style={{ height: 42, width: 42, top: 325 }} />
          <Animated.Text style={{fontSize: 29,
    top: 330,
    left:12,
    fontWeight: 'bold',
    color: '#145343',
    opacity: fadeOut    }}>Tasktogus</Animated.Text>
        </View>
        </ScrollView>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
  text: {
    
  },
});

export default SchoolName;
