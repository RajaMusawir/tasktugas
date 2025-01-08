import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import LottieView from 'lottie-react-native';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false); 
  const [phoneTouched, setPhoneTouched] = useState(false); 
  const [nameTouched, setNameTouched] = useState(false);  

  const validateAll = () => {
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPhoneNumber = phoneNumber.trim();
    const trimmedPassword = password.trim();

    const isNameValid = validateName(trimmedName);
    const isUsernameValid = validateUsername(trimmedUsername)
    const isEmailValid = validateEmail(trimmedEmail);
    const isPhoneValid = validatePhone(trimmedPhoneNumber);
    const isPasswordValid = validatePassword(trimmedPassword);

    return isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isUsernameValid;
  };

  const validateName = (name) => {
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>;''``+=-]/.test(name);
    if (specialCharacters) {
      setNameError("Your name cannot include special characters");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const validateUsername = (username) => {
    const emailPattern = /[!@#$%^&*(),.?":{}|<>;''``+=-]/;
    if (emailPattern.test(username)) {
      setUsernameError("");
      return true;
    } else {
      setUsernameError("Your Username Is Not Valid");
      return false;
    }
  };

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

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthValid && uppercaseValid && numberValid && specialValid) {
      setPasswordError("");
      return true;
    } else {
      let errorMsg = "Password must include: ";
      if (!lengthValid) errorMsg += "minimum length of 8, ";
      if (!uppercaseValid) errorMsg += "one uppercase letter, ";
      if (!numberValid) errorMsg += "one number, ";
      if (!specialValid) errorMsg += "one special character, ";
      setPasswordError(errorMsg.slice(0, -2));
      return false;
    }
  };

  const validatePhone = (phoneNumber) => {
    const phoneValid = /^[0-9]{10,}$/.test(phoneNumber);
    if (phoneValid) {
      setPhoneError("");
      return true;
    } else {
      setPhoneError("Your number is not valid");
      return false;
    }
  };

  const handleSignUp = async () => {
    setLoading(true);

    // Validate all inputs
    if (!validateAll()) {
      Alert.alert('Error','Please input all the feild')
        setLoading(false);
        return;
    }

    try {
        navigation.navigate("SelectTopics", {
            phoneNumber: phoneNumber.trim(),
            name: name.trim(),
            email: email.trim(),
            username: username.trim(),
            password: password.trim(),
            imageUri: imageUri
        });
        setImageUri(null);
    } catch (error) {
        Alert.alert("Error", error.message);
    } finally {
        setLoading(false);
    }
};


  const [show, setShow] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
        if (!auth().currentUser || imageUri) return;
        
        const userId = auth().currentUser.uid;
        const reference = storage().ref(`${userId}.jpg`);

        try {
            const downloadURL = await reference.getDownloadURL();
            setImageUri(downloadURL);
        } catch (error) {
            console.log('No image found or error fetching image:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchProfileImage();
}, [imageUri]);

  const uploadImageToFirebase = async (uri) => {
    const userId = auth().currentUser.uid;
    const reference = storage().ref(`${userId}.jpg`);
    setLoading(true);
    setShow(false);
    const task = reference.putFile(uri);
    await task;
    const downloadURL = await reference.getDownloadURL();
    setImageUri(downloadURL);
    setLoading(false);
    console.log(imageUri)
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
      const uri = response.assets[0].uri;
      uploadImageToFirebase(uri);
    });
  };

  const takeSelfie = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      const uri = response.assets[0].uri;
      uploadImageToFirebase(uri);
    });
  };


  return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.flex}>
          <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Login')}>
            <Image source={require('./../../assets/back.png')} style={styles.close_style} />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Setup Your Account</Text>
        <View style={{ left: 12 }}>
          <Text style={{ color: '#bebebe', fontWeight: 'bold', marginTop: 22, left: 57 }}>
            Please Complete Your Information Below To
          </Text>
          <Text style={{ color: '#bebebe', fontWeight: 'bold', marginTop: 12, left: 117 }}>
            Create Your Account
          </Text>
        </View>
    <View style={{flexDirection:'row'}}>
    {loading ? (
            <LottieView
              source={require('./../../assets/loader99.json')}
              autoPlay
              loop
              style={{ width: 110, height: 110, top: 50, left: 140 }}
            />
          ) : (
        <Image style={{width:98, height:98, left:130, top:50, borderRadius:200}} source={imageUri ? { uri: imageUri } : require('./../../assets/dp.png')}/>
          )}
        <TouchableOpacity style={styles.cameraButton2} onPress={() => setShow(true)}>
          <Image source={require('./../../assets/camera_icon.png')} style={styles.cameraIcon} />
        </TouchableOpacity>
        </View>


        {/* Full Name Input */}
        <TextInput
          placeholder='Full Name'
          placeholderTextColor={'#808080'}
          style={styles.name_input}
          value={name}
          onChangeText={text => { setNameTouched(true); setName(text); validateName(text); }}
          onBlur={validateAll}
        />
        {nameError && nameTouched ? <Text style={styles.errorText_name}>{nameError}</Text> : null}

        <TextInput
          placeholder='Username'
          placeholderTextColor={'#808080'}
          style={styles.username_input}
          value={username}
          onChangeText={text => { setUsername(text); validateUsername(text); }}
          onBlur={validateAll}
        />
        {usernameError ? <Text style={styles.errorText_username}>{usernameError}</Text> : null}

        {/* Email Address Input */}
        <TextInput
          placeholder='Email Address'
          placeholderTextColor={'#808080'}
          style={styles.email_input}
          value={email}
          onChangeText={text => { setEmailTouched(true); setEmail(text); validateEmail(text); }}
          onBlur={validateAll}
        />
        {emailError && emailTouched ? <Text style={styles.errorText_email}>{emailError}</Text> : null}

        {/* Phone Number Input with Country Code */}
        <View style={styles.phoneContainer}>
          <Image
            source={require('./../../assets/pakistan.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.countryCode}>+92</Text>
          <TextInput
            placeholder='Phone Number'
            placeholderTextColor={'#808080'}
            style={styles.phoneNumber_input}
            maxLength={10}
            value={phoneNumber}
            inputMode='numeric'
            onChangeText={text => { setPhoneTouched(true); setPhoneNumber(text); validatePhone(text); }}
            onBlur={validateAll}
          />
        </View>
        {phoneError && phoneTouched ? <Text style={styles.errorText_phone}>{phoneError}</Text> : null}

        {/* Password Input */}
        <TextInput
          placeholder='Password'
          placeholderTextColor={'#808080'}
          style={styles.password_input}
          value={password}
          onChangeText={text => { setPassword(text); }}
          onBlur={() => {
            setPasswordTouched(true);
            validatePassword(password);
          }}
          secureTextEntry
        />
        {passwordTouched && passwordError ? (
          <Text style={styles.errorText_password}>{passwordError}</Text>
        ) : null}
        <View style= {[emailError && phoneError ? { marginTop: 30 } : {}]}>
        <View style={[passwordError ? { marginTop: -40 } : {}]}>
          <View style={{marginTop:-335}}>
          <Text style={styles.termsText}>
            By Signing up you agree to our
            <Text style={styles.redText}> terms and conditions </Text>
            and
            <Text style={styles.redText}> privacy policy</Text>
          </Text>

          <TouchableOpacity style={styles.login_button} onPress={handleSignUp}>
            <Text style={styles.login_text}>Create Account</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
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
        </ScrollView>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom:20
  },
  termsText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginTop: 450,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  cameraButton2: {
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    zIndex:3,
    width: 38,
    marginTop: 117,
    height:45,
    left: 100,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -30,
    left: 110,
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
  redText: {
    color: '#145343',
    fontWeight: '500',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    marginTop: 80,
    left: 20,
  },
  close_style: {
    width: 15,
    height: 14,
  },
  name_input: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    width: '92%',
    left: 15,
    marginTop: 7,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15,
    color:'black'
  },
  username_input: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    width: '92%',
    left: 15,
    marginTop: 7,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15,
    color:'black'
  },
  email_input: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    color:'black',
    width: '92%',
    left: 15,
    marginTop: 7,
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    width: '92%',
    left: 15,
    marginTop: 7,
    paddingHorizontal: 10,
    height: 50,
  },
  flagIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countryCode: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  phoneNumber_input: {
    flex: 1,
    color:'black',
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 15,
  },
  password_input: {
    borderColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 16,
    width: '92%',
    left: 15,
    marginTop: 7,
    color:'black',
    paddingLeft: 12,
    fontWeight: '500',
    fontSize: 15,
  },
  login_button: {
    backgroundColor: '#c2e96a',
    borderRadius: 16,
    marginTop: 0,
    left: 15,
    width: '92%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_text: {
    color: '#145343',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText_email: {
    color: 'red',
    fontWeight:'bold',
    left: 200,
    marginTop: 85,
  },
  errorText_phone: {
    color: 'red',
    fontWeight:'bold',
    left: 205,
    marginTop: 95,
  },
  errorText_name: {
    color: 'red',
    fontWeight:'bold',
    left: 90,
    marginTop: 75,
  },
  errorText_username: {
    color: 'red',
    fontWeight:'bold',
    left: 180,
    marginTop: 80,
  },
  errorText_password: {
    color: 'red',
    fontWeight: 'bold',
    left: 25,
    marginRight:40,
    marginTop: 155,
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
});

export default SignUp;