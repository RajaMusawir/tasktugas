import React, { useState } from 'react';
import { Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { supabaseAxios } from './supabaseClient';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import Verification from './Verification';
import Login from './Login';
import axios from 'axios';

const SelectTopics = ({navigation, route}) => {
  const { name }  = route.params;
  const { email } = route.params
  const { password } = route.params
  const { imageUri } = route.params
  const { username } = route.params
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [Auth, setAuth] = useState()
  const { phoneNumber } = route.params;
  const phoneNumber1 = phoneNumber 
  console.log(phoneNumber)
  console.log('separate each other')
  console.log(phoneNumber1)
  console.log(name)
  console.log(imageUri)
  console.log(email)
  console.log(username)
  const topics = [
    'Business', 'Sport', 'Politics', 'Environment', 'Technology', 'Movie',
    'Game', 'Health', 'Artist', 'Metaverse', 'Music', 'E-Sport', 'Animal', 'Education', 'Food', 'Film'
  ];

  const handleTopicPress = (topic) => {
    setSelectedTopics((prevSelected) =>
      prevSelected.includes(topic)
        ? prevSelected.filter((t) => t !== topic) // Deselect topic
        : [...prevSelected, topic] // Select topic
    );
  };

  const user = {
    email: email,
    password: password
  }
console.log(user);

  const isSelected = (topic) => selectedTopics.includes(topic);
  const submitHandler = async () => {
    try {
      if (selectedTopics.length > 0) {
        const usersSnapshot = await firestore().collection('users').get();
        const userCount = usersSnapshot.size;
        const userId = (userCount + 1).toString().padStart(6, '0');

        // const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
        // const userID = userCredential.user.uid;
        // await firestore().collection('users').doc(userID).set({
        //   id: userId,
        //   fullName: name.trim(),
        //   email: email.trim(),
        //   username,
        //   selectedTopics,
        //   phoneNumber,
        //   imageUri,
        //   friends: [],
        //   friendRequests: [], 
        // });
        try {
          const response = await axios.post('https://doctorapp.gtechsol.au/api/register', {
            email: email,
            password: password,
            password_confirmation: password,
            role_id:3,
            phone_number: +61425425425,
            term_and_conditions: 1,
            created_by: 0
          });
      
          if (response.data) {
            console.log(response.data);
            setAuth(response.data.token)
            navigation.navigate('VerifyPhone', { email : email, auth: Auth});
          }
        } catch (err) {
          console.error(error.response.data)
        }

      
        // await axios.post('https://reqres.in/api/register', {email , password})
        // .then(response => console.log(response.data)
        // ).catch(error => console.log(error))
        Alert.alert('Error' , error.response.data.msg)
        console.log(`User added with static ID: ${userId}`);
        navigation.navigate('VerifyPhone', { email : email});
      } else {
        Alert.alert('Error', 'Please select at least one topic');
      }
    } catch (err) {
      console.error('Error adding user:', error);
    }
}


  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.flex}>
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Login')}>
          <Image source={require('./../../assets/back.png')} style={styles.close_style} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Choose your topic</Text>
      <ScrollView contentContainerStyle={styles.topicsContainer}>
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.topicButton,
              isSelected(topic) ? styles.selectedButton : styles.unselectedButton,
            ]}
            onPress={() => handleTopicPress(topic)}
          >
            <Text
              style={[
                styles.topicText,
                isSelected(topic) ? styles.selectedText : styles.unselectedText,
              ]}
            >
              {topic}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={submitHandler}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom:10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    top:5,
    left:12,
    marginBottom: 16,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  topicButton: {
    width: '48%', // Adjusted width for more spacing
    paddingVertical: 15,
    marginBottom: 12, // Added margin for spacing between buttons
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  unselectedButton: {
    backgroundColor: '#fff',
    borderColor: '#838587', // Grey border for unselected
  },
  selectedButton: {
    backgroundColor: '#c2e96a', // Light green for selected button
    borderColor: '#145343', // Dark green border for selected
  },
  topicText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#145343', // Dark green for selected text
  },
  unselectedText: {
    color: '#838587', // Grey for unselected text
  },
  submitButton: {
    backgroundColor: '#c2e96a',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 144,
  },
  submitText: {
    color: '#145343',
    fontSize: 18,
    fontWeight: 'bold',
  },
    flex: {
        flexDirection: 'row',
        top: 35,
        left: 20,
        marginTop:26
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
    zIndex:10,
    elevation: 3,
  },
});

export default SelectTopics;
