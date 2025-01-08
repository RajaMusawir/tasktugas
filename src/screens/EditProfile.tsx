import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import { supabaseAxios } from './supabaseClient';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const EditProfile = ({ navigation }) => {
  const [show, setShow] = useState(false)
  const [image, setImage] = useState(null)
  const [imageUri, setImageUri] = useState(null);
  const [borderColor, setBorderColor] = useState('#f5f7fb')
  const [borderColor1, setBorderColor1] = useState('#f5f7fb')
  const [borderColor2, setBorderColor2] = useState('#f5f7fb')
  const [borderColor3, setBorderColor3] = useState('#f5f7fb')
  const [genderValue, setGenderValue] = useState('Not Selected')
  const [martialStatus, setMartialStatus] = useState('Not Selected')
  const [borderColor4, setBorderColor4] = useState('#f5f7fb')
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(null);
  const [username, setUsername] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [selectedValue, setSelectedValue] = useState("java");
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState();

  console.log("Current year is:", moment().year())

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY")
  };


  // const verifyButton = () => {
  //   if (phoneNumber === '') {
  //     console.log('khali')
  //   }
  //   else {
  //     <TouchableOpacity style={{backgroundColor:'#53ae2e', borderRadius:120, width:63, height:32,left:273,top:18, justifyContent:'center', paddingLeft:15, elevation:1}}>
  //     <Text style={{color:'white', fontWeight:'700' }}>Verify</Text>
  //   </TouchableOpacity>
  //   }
  // }

  // const inputStyle = phoneNumber ? {...styles.phone_input} : {...styles.job_input} }

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        setLoading(true);
        const userId = auth().currentUser?.uid;
        if (userId) {
          const userDocument = await firestore().collection('users').doc(userId).get();
          if (userDocument.exists) {
            const userData = userDocument.data();
            if (userData?.imageUri) {
              setImageUri(userData.imageUri);
            } else {
              console.log("No image URI found in Firestore");
            }
            setFullName(userData?.fullName || '');
            setUsername(userData?.username || '');
            setJobTitle(userData?.jobTitle || '');
            setPhoneNumber(userData?.phoneNumber || '');
            setLocation(userData?.location || '');
          } else {
            console.log('User document does not exist');
          }
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  const uploadImageToFirebase = async (uri) => {
    try {
      const userId = auth().currentUser.uid;
      const reference = storage().ref(`${userId}.jpg`);

      setLoading(true);
      setShow(false);

      const task = await reference.putFile(uri);
      const downloadURL = await reference.getDownloadURL();

      setImageUri(downloadURL);

      await firestore().collection('users').doc(userId).update({
        imageUri: downloadURL
      });

    } catch (error) {
      console.error("Error your profile image", error);
    }
     finally {
      setLoading(false);
    }
  };

  const removeImageFromFirebase = async () => {
    const userId = auth().currentUser.uid;
    const reference = storage().ref(`${userId}.jpg`);
    await reference.delete();
    setImageUri(null);
    setShow(false);
  };

  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImage(uri)
        uploadImageToFirebase(uri);
      }
    });
  };
  const takeSelfie = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImage(uri)
        uploadImageToFirebase(uri);
      }
    });
  };
  const handleSave = async () => {
    if (fullName === '' || username=== '' || jobTitle=== "" || location === ''){
      Alert.alert('Error', 'Please input all the feilds')
      return false;
    }
    if (phoneNumber.length<10) {
      Alert.alert('Error' , 'Please correct your phone number')
    return false;
    }
    try {
      const userId = auth().currentUser.uid;
      await firestore().collection('users').doc(userId).update({
        fullName,
        username,
        jobTitle,
        phoneNumber,
        location,
      });
      console.log("Profile updated successfully!");
      navigation.navigate('BottomTabs')
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  console.log(image);
  

  

  return (
    <View style={styles.container}>
      
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('./../../assets/arrowgg.png')} style={{ width: 20, height: 18, marginLeft: 14, marginTop: 43, zIndex: 12 }} />
          </TouchableOpacity>
          <Text style={styles.text}>Edit Personal Info</Text>
        </View>

        <View style={{ flexDirection: 'row', top: 12 }}>
          {loading ? (
            <LottieView
              source={require('./../../assets/loader99.json')}
              autoPlay
              loop
              style={{ width: 90, height: 90, top: 10, left: 25, bottom:123 }}
            />
          ) : (
            <TouchableOpacity onPress={() => setShow(true)}>
              <Image
                source={imageUri ? { uri: imageUri } : require('./../../assets/dp.png')}
                style={{ width: 70, height: 70, borderRadius: 400, top: 20, left: 25, bottom:123 }}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{ borderWidth: 1, width: 152, height: 35, top: 35, left: 48, borderRadius: 120, borderColor: '#f3f3f3' }}
            onPress={() => setShow(true)}
          >
            <Text style={{ color: '#68696f', left: 14, top: 7.5, fontWeight: '600',bottom:123 }}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for image options */}
        <Modal
          visible={show}
          transparent
          animationType="slide"
          onRequestClose={() => setShow(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={pickImageFromGallery}>
                <Text style={styles.modalText}>Pick Image From Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={takeSelfie}>
                <Text style={styles.modalText}>Take a Selfie</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={removeImageFromFirebase}>
                <Text style={[styles.modalText, { color: 'red' }]}>Remove Image</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShow(false)}>
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView>
        <View>
          <Text style={{ color: 'black', fontWeight: '500', top: 60, left: 24 }}>Full name</Text>
          <TextInput
            style={[styles.name_input , {borderColor: borderColor}]}
            placeholder="Enter Your Full Name"
            placeholderTextColor={'#e6e9ec'}
            value={fullName}
            onFocus={() => setBorderColor('black')}
            onBlur={() => setBorderColor('#f5f7fb')} 
            onChangeText={setFullName} // Update state on text change
          />
        </View>

        <View style={{ top: 23 }}>
          <Text style={{ color: 'black', fontWeight: '700', top: 60, left: 24 }}>Username</Text>
          <Text style={{color: 'grey',left:30, top:91.5, fontSize:15}}>@</Text>
          <TextInput
            style={[styles.userName_input, {borderColor: borderColor1}]}
            placeholder="Enter Your Username"
            placeholderTextColor={'#e6e9ec'}
            value={username}
            onFocus={() => setBorderColor1('black')}
            onBlur={() => setBorderColor1('#f5f7fb')} 
            onChangeText={setUsername} // Update state on text change
          />
        </View>

        <View style={{ top: 48 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 50, left: 24 }}>Job Title</Text>
          <TextInput
            style={[styles.job_input, {borderColor: borderColor2}]}
            placeholder="Enter Your Job Title"
            placeholderTextColor={'#e6e9ec'}
            onFocus={() => setBorderColor2('black')}
            onBlur={() => setBorderColor2('#f5f7fb')} 
            value={jobTitle}
            onChangeText={setJobTitle} // Update state on text change
          />
        </View>

        <View style={{ top: 67 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 50, left: 24 }}>Phone</Text>
          <TextInput
            style={ phoneNumber ? [styles.phone_input, {borderColor: borderColor3}] : [styles.phone_input , {marginBottom:28}]}
            placeholder="+1 (555)-000-0000"
            placeholderTextColor={'#e6e9ec'}
            keyboardType='numeric'
            value={phoneNumber}
            maxLength={10}
            onFocus={() => setBorderColor3('black')}
            onBlur={() => setBorderColor3('#f5f7fb')} 
            onChangeText={setPhoneNumber} // Update state on text change
          />
         {phoneNumber && (
            <TouchableOpacity style={{backgroundColor:'#53ae2e', borderRadius:120, width:63, height:32,left:273,top:18, justifyContent:'center', paddingLeft:15, elevation:1}} onPress={() => navigation.navigate('PhoneVerify' , {phoneNumber})}>
            <Text style={{color:'white', fontWeight:'700' }}>Verify</Text>
          </TouchableOpacity>
         )}
        </View>

        <View style={{ top: 88 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 20, left: 24 }}>Location</Text>
          <TextInput
            style={[styles.location_input, {borderColor: borderColor4}]}
            placeholder="Enter Your Location"
            placeholderTextColor={'#e6e9ec'}
            onFocus={() => setBorderColor4('black')}
            onBlur={() => setBorderColor4('#f5f7fb')} 
            value={location}
            onChangeText={setLocation} // Update state on text change
          />
        </View>
        <View style={{ top: 108 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 20, left: 24 }}>Gender</Text>
          <View style={{borderColor:'#f5f7fb', borderWidth:1, top:29, borderRadius:213, width:325, height:50, left:18, paddingLeft:12}}>
          <Picker
          selectedValue={genderValue}
          onValueChange={(itemValue) => setGenderValue(itemValue)}
          dropdownIconColor={'green'}
          dropdownIconRippleColor={'green'}
          mode='dropdown'
          style={{color:'black', borderColor:"black", borderWidth:1}}
          >
            <Picker.Item label="Male" value="Male"/>
            <Picker.Item label="Female" value="Female"/>
          </Picker>
          </View>
        </View>
        <View style={{ top: 128 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 20, left: 24 }}>Martial Status</Text>
          <View style={{borderColor:'#f5f7fb', borderWidth:1, top:29, borderRadius:213, width:325, height:50, left:18, paddingLeft:12}}>
          <Picker
          selectedValue={martialStatus}
          onValueChange={(itemValue) => setMartialStatus(itemValue)}
          dropdownIconColor={'green'}
          dropdownIconRippleColor={'green'}
          mode='dropdown'
          style={{color:'black', borderColor:"black", borderWidth:1}}
          >
            <Picker.Item label="Married" value="Married"/>
            <Picker.Item label="Not Married" value="Not Married"/>
          </Picker>
          </View>
        </View>

        <View style={{ top: 148 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 20, left: 24 }}>Birthday</Text>
          <TouchableOpacity style={styles.dateDisplay} onPress={() => setOpen(true)}>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ color: 'black', top: 11, fontWeight: '600', fontSize: 16 }}>{date ? formatDate(date) : 'Select a date'}</Text>
          <Image source={require('./../../assets/calender.png')} style={{ width: 24, height: 24, left: '63%', top: 9 }} />
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        maximumDate={moment().subtract(18, 'years')}
        mainimumDate={new Date()}
        defaultValue={"2000-12-20"}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />
        </View>

        <View style={{ top: 158 }}>
          <Text style={{ color: 'black', fontWeight: 700, top: 20, left: 24 }}>Occupation</Text>
          <View style={{borderColor:'#f5f7fb', borderWidth:1, top:29, borderRadius:213, width:325, height:50, left:18, paddingLeft:12}}>
          <Picker
          selectedValue={martialStatus}
          onValueChange={(itemValue) => setMartialStatus(itemValue)}
          dropdownIconColor={'green'}
          dropdownIconRippleColor={'green'}
          mode='dropdown'
          style={{color:'black', borderColor:"black", borderWidth:1}}
          >
            <Picker.Item label="Teacher" value="Teacher"/>
            <Picker.Item label="Engineer" value="Engineer"/>
            <Picker.Item label="IT Manager" value="IT Manager"/>
            <Picker.Item label="Physician assistant" value="Physician assistant"/>
            <Picker.Item label="Psychiatrist" value="Psychiatrist"/>
            <Picker.Item label="Software Developer" value="Software Developer"/>
            <Picker.Item label="Data Scientist" value="Data Scientist"/>
          </Picker>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    top: 2,
    padding: 5
  },
  text: {
    fontSize: 17,
    top: 43,
    left: 85,
    fontWeight: '500',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  name_input: {
    borderRadius: 120,
    borderColor: '#f5f7fb',
    borderWidth: 1,
    paddingLeft: 22,
    top: 70,
    color: 'black',
    width: 325,
    height:50,
    left: 18
  },
  userName_input: {
    borderRadius: 120,
    borderColor: '#f5f7fb',
    borderWidth: 1,
    color: 'black',
    top: 60,
    height:50,
    width: 325,
    paddingLeft: 32,
    left: 18
  },
  job_input: {
    borderRadius: 120,
    borderColor: '#f5f7fb',
    height:50,
    borderWidth: 1,
    color: 'black',
    paddingLeft: 22,
    top: 60,
    width: 325,
    left: 18
  },
  phone_input: {
    borderRadius: 120,
    borderColor: '#f5f7fb',
    borderWidth: 1,
    paddingLeft: 22,
    top: 60,
    width: 325,
    height:50,
    left: 18,
    color: 'black',
  },
  location_input: {
    borderRadius: 120,
    borderColor: '#f5f7fb',
    borderWidth: 1,
    paddingLeft: 22,
    top: 30,
    color: 'black',
    height:50,
    width: 325,
    left: 18
  },
  saveButton: {
    backgroundColor: '#53ae2e',
    padding: 15,
    width:325,
    borderRadius: 150,
    alignItems: 'center',
    marginTop: '60%',
    marginHorizontal: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateDisplay: {
    borderColor: '#f5f7fb',
    borderWidth: 1,
    borderRadius: 116,
    width: 320,
    height: 50,
    top:20,
    left: 18,
    marginTop: 7,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15,
    color: 'black'
  },
  dateText: {
    color: 'black',
    fontSize: 16,
  },
});

export default EditProfile;
