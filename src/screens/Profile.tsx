import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import Youtube from './Youtube';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState('Personal Info');
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [youtube, SetYoutube] = useState(false)
  const [Job, setJob] = useState('')
  const [Location, setLocation] = useState('')
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userId = auth().currentUser?.uid;
        console.log("Current User ID:", userId);
        
        const userDocument = await firestore().collection('users').doc(userId).get();
        if (userDocument.exists) {
          const userData = userDocument.data();
          setName(userData.fullName);
          setPhone(userData.phoneNumber);
          setEmail(userData.email);
          setUsername(userData.username);
          setJob(userData.jobTitle);
          setLocation(userData.location);
          setProfileImageUri(userData.imageUri || null);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileImage();
    const refreshs = navigation.addListener('focus',fetchProfileImage)
    return refreshs;
  }, [navigation]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

const DeleteData = async () => {
 await AsyncStorage.removeItem("email")
 console.log('krida mail');
 await AsyncStorage.removeItem('password')
 console.log('krida pass');
 navigation.navigate('MixAuth')
}

  const PersonalInfo = () => (
       <View style={{top:12}}>
    <View style={{top:12}}>
    <View style={{flexDirection:'row'}}>
    <Image source={require('./../../assets/gguser.png')} style={{width:40, height:40, tintColor:'grey', top:23, left:22}}/>
    <Text style={{color:'grey', left:32, top:22, fontWeight:'600'}}>Username</Text>
    </View>
    <Text style={{color:'black', left:73, top:3, borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderColor: '#D3D3D3', }}>{username ? `@${username}` : 'Not entered'}</Text>
    </View>
    <View style={{top:18}}>
    <View style={{flexDirection:'row'}}>
    <Image source={require('./../../assets/ggemail.png')} style={{width:18, height:18, tintColor:'grey', top:23, left:34}}/>
    <Text style={{color:'grey', left:53, top:12, fontWeight:'600'}}>Email</Text>
    </View>
    <Text style={{color:'black', left:73, top:15, borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderColor: '#D3D3D3', }}>{email}</Text>
    </View>
    <View style={{top:36}}>
    <View style={{flexDirection:'row'}}>
    <Image source={require('./../../assets/ggphone.png')} style={{width:18, height:18, tintColor:'grey', top:23, left:34}}/>
    <Text style={{color:'grey', left:53, top:12, fontWeight:'600'}}>Phone</Text>
    </View>
    <Text style={{color:'black', left:73, top:15, borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderColor: '#D3D3D3', }}>{phone ? `+92 ${phone}` : 'Not Entered'}</Text>
    </View>
    <View style={{top:62}}>
    <View style={{flexDirection:'row'}}>
    <Image source={require('./../../assets/ggjob.png')} style={{width:18, height:18, tintColor:'grey', top:23, left:34}}/>
    <Text style={{color:'grey', left:53, top:12, fontWeight:'600'}}>Job Title</Text>
    </View>
    <Text style={{color:'black', left:73, top:15, borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderColor: '#D3D3D3', }}>{Job ? Job : 'Not assigned'}</Text>
    </View>
    <View style={{top:78}}>
    <View style={{flexDirection:'row'}}>
    <Image source={require('./../../assets/gglocation.png')} style={{width:18, height:26, tintColor:'grey', top:27, left:34}}/>
    <Text style={{color:'grey', left:53, top:20, fontWeight:'600'}}>Location</Text>
    </View>
    <Text style={{color:'black', left:73, top:15, borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderColor: '#D3D3D3', }}>{Location ? Location : 'Unknown'}</Text>
    </View>
    
    <View >
    <TouchableOpacity style={{flexDirection:'row'}} onPress={DeleteData}>
      <Image source={require('./../../assets/logout.png')} style={{width:32, height:32, marginTop:205, marginLeft:263, tintColor:'red'}}/>
    <Text style={{color:'red', marginTop:212.5, marginLeft:1}}>
        Log out
      </Text>
      </TouchableOpacity>
      </View>
      
  </View>
)

  const Teams = () => (
    <View>
      <Text style={{ color: 'black', textAlign: 'center', top: 163, fontSize: 20, left: 55 }}>
        Teams Coming Soon ...
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('./../../assets/arrowgg.png')} style={{ width: 20, height: 18, left: 14, top: 43 }} />
        </TouchableOpacity>
        <Text style={styles.text}>My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Image source={require('./../../assets/ggedit.png')} style={{ width: 25, height: 25, left: 220, top: 40 }} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', top: 12 }}>
        {loading ? (
          <LottieView
            source={require('./../../assets/loader99.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100, top: 60, left: 20 }}
          />
        ) : (
          <Image 
            source={profileImageUri ? { uri: profileImageUri } : require('./../../assets/dp.png')} 
            style={{ width: 70, height: 70, borderRadius: 35, top: 70, left: 15 }} 
          />
        )}
        <Text style={styles.nameUp}>{name ? name : 'Unknown'}</Text>
      </View>

      <TouchableOpacity style={{ flexDirection:'row', borderColor:'grey', borderWidth:1, top:50, width:100, left:105, height:30, borderRadius:22}}onPress={() => navigation.navigate(Youtube)}>
        <Image source={require('./../../assets/facebook.png')} style={{width:22, height:22, marginLeft:7,top:3}}/>
        <Text style={styles.youtube_logo}>Facebook</Text>
      </TouchableOpacity>

      <View style={styles.background_email_phone}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Personal Info' && styles.selectedOptionButton]}
          onPress={() => handleOptionSelect('Personal Info')}
        >
          <Text style={[styles.optionText, selectedOption === 'Personal Info' ? { color: 'black' } : { color: 'black' }]}>
            Personal Info
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Teams' && styles.selectedOptionButton]}
          onPress={() => handleOptionSelect('Teams')}
        >
          <Text style={[styles.optionText, selectedOption === 'Teams' ? { color: 'black' } : { color: 'black' }]}>
            Teams
          </Text>
        </TouchableOpacity>
      </View>

      {youtube &&(
        <WebView source={{ uri : 'google.com'}}
        style={{flex:1}}
        />
      )}
      {selectedOption === 'Personal Info' && <PersonalInfo />}
      {selectedOption === 'Teams' && <Teams />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 5,
  },
  text: {
    fontSize: 17,
    top: 43,
    left: 119,
    fontWeight: '500',
    color: 'black',
  },
  nameUp: {
    color: 'black',
    fontSize: 24,
    top: 70,
    left: 32,
    fontWeight: '500',
  },
  youtube_logo: {
    color: 'black',
    fontWeight:'600',
    top:4,
    left: 6,
    fontSize: 15,
  },
  background_email_phone: {
    flexDirection: 'row',
    backgroundColor: '#f5f7fb',
    width: 310,
    marginLeft: 22,
    marginTop: 88,
    height: 45,
    borderRadius: 100,
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: '100%',
  },
  selectedOptionButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 35,
    marginTop: 4.5,
    marginRight: 4.5,
    marginLeft: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
