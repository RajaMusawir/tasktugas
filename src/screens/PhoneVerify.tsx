import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  LogBox,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import { ScrollView } from 'react-native-gesture-handler';

const PhoneVerify = ({ navigation, route }) => {
    const [selectedOption, setSelectedOption] = useState('Email');
    const {phoneNumber} = route.params;
    console.log(phoneNumber)
    const phoneNumber1 = (`+92${phoneNumber}`)
    console.log(phoneNumber);
    

    const sendEmail = async () => {
        try {
            await auth().currentUser.sendEmailVerification();
            navigation.navigate(Login)
            Alert.alert('Success', 'Email verification sent');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const sendOTPToPhoneNumber = async () => {
        Alert.alert('Note', 'This function is under maintainance')
    //     try {
    //         const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //         navigation.navigate('VerifyPhone', { confirmation });
    //     } catch (error) {
    //         Alert.alert('Error', error.message);
    //     }
    }

    // const handleOptionSelect = (option) => {
    //     setSelectedOption(option);
    // };

    // const EmailVerificationForm = () => (
    //     <ScrollView>
    //     <View>
    //         <Image source={require('./../../assets/verify.png')} style={styles.image_email} />
    //         <Text style={styles.email_sent}>Send Email !</Text>
    //         <Text style={styles.check}>Tap on the button below to send verification email</Text>
    //         <Text style={styles.check1}>and check your inbox</Text>
    //         <TouchableOpacity style={styles.red_back} onPress={sendEmail}>
    //             <Text style={styles.login}>Send Email</Text>
    //         </TouchableOpacity>
    //         {/* <Text style={styles.alreadyAccount1}>
    //             Already have an account or verified?
    //             <Text style={{ color: 'red', fontFamily: 'serif' }} onPress={() => navigation.navigate('Login')}> Log In</Text>
    //         </Text> */}
    //     </View>
    //     </ScrollView>
    // );

    const PhoneVerificationForm = () => (
        <ScrollView>
        <SafeAreaView>
            <Image source={require('./../../assets/file.png')} style={styles.image_phone} />
            <Text style={{ fontWeight: 'bold', color: 'black', paddingLeft: 110, fontSize: 22 }}>Verification Code</Text>
            <Text style={styles.check}>Tap on the button below to send verification code</Text>
            <Text style={styles.check1}>to your phone number</Text>
            <TouchableOpacity style={styles.red_back1} onPress={sendOTPToPhoneNumber}>
                <Text style={styles.verify}>Send OTP</Text>
            </TouchableOpacity>
            {/* <Text style={styles.alreadyAccount}>
                Already have an account or verified?
                <Text style={{ color: 'red', fontFamily: 'serif' }} onPress={() => navigation.navigate('Login')}> Log In</Text>
            </Text> */}
        </SafeAreaView>
        </ScrollView>
    );

    return (
        
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.flex}>
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('EditProfile')}>
          <Image source={require('./../../assets/back.png')} style={styles.close_style} />
        </TouchableOpacity>
      </View>
            <Text style={styles.text}>Verify your Number!</Text>
            <Text style={styles.text_tagline}>Hey! Please tap on the button below to verify your</Text>
            <Text style={styles.text_tagline1}>account</Text>
            <PhoneVerificationForm/>
            {/* <View style={styles.background_email_phone}> */}
                {/* <TouchableOpacity
    style={[
        styles.optionButton,
        selectedOption === 'Email' && styles.selectedOptionButton
    ]}
    onPress={() => handleOptionSelect('Email')}
>
    <Text style={[
        styles.optionText, 
        selectedOption === 'Email' 
        ? { color: '#145343' } 
        : { color: 'white' }
    ]}>
        Email
    </Text>
</TouchableOpacity>
<TouchableOpacity
    style={[
        styles.optionButton,
        selectedOption === 'Phone Number' && styles.selectedOptionButton
    ]}
    onPress={() => handleOptionSelect('Phone Number')}
>
    <Text style={[
        styles.optionText, 
        selectedOption === 'Phone Number' 
        ? { color: '#145343' } 
        : { color: 'white' }
    ]}>
        Phone Number
    </Text>
</TouchableOpacity>
            </View>
            {selectedOption === 'Email' && <EmailVerificationForm />}
            {selectedOption === 'Phone Number' && <PhoneVerificationForm />} */}
        </ScrollView>
        </SafeAreaView>
        
    );   
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 4,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 18,
        paddingLeft: 92,
    },
    text_tagline: {
        color: '#838587',
        marginTop: 40,
        fontSize: 15,
        paddingLeft: 37,
    }, 
    text_tagline1: {
        color: '#838587',
        marginTop: 3,
        fontSize: 15,
        paddingLeft: 156,
    },
    back_arrow: {
        width: 25,
        height: 25,
    },
    background_email_phone: {
        flexDirection: 'row',
        backgroundColor: '#145343',
        width: 310,
        marginLeft: 22,
        marginTop: 18,
        height: 45, // Default height of the buttons
        borderRadius: 100,
        justifyContent: 'space-between',
    },
    flex: {
        flexDirection: 'row',
        top: 50,
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
    optionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: '100%', // Make buttons fill parent height
    },
    selectedOptionButton: {
        backgroundColor: '#c2e96a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        height: 35,
        width:20,
        marginTop:4.5,
        marginRight:4.5,
        marginLeft:4 // Set a smaller height for the selected button
    },
    optionText: {
        color: '#145343',
        fontSize: 16,
        fontWeight: 'bold',
    },
    alreadyAccount: {
        color: '#D3D3D3',
        marginTop: 138,
        marginLeft: 70,
        fontWeight: 'bold',
    },
    alreadyAccount1: {
        color: '#D3D3D3',
        marginTop: 118,
        marginLeft: 70,
        fontWeight: 'bold',
    },
    image_email:{
        height:230,
        width:230,
        marginLeft:62,
        marginTop:50,
        marginBottom:20
    },
    image_phone:{
        height:250,
        width:250,
        marginLeft:52,
        marginTop:20,
        marginBottom:20
    },
    email_sent:{
        color:'black',
        paddingLeft:135,
        fontWeight:'bold',
        fontSize:20
    },
    check:{
        color: '#D3D3D3',
        fontWeight:'bold', 
        paddingLeft:35,
        paddingTop:15,
        fontSize:15
    },
    check1:{
        color: '#D3D3D3',
        fontWeight:'bold',
        paddingLeft:123,
        paddingTop:4,
        fontSize:15
    },
    red_back:{
        backgroundColor:'#c2e96a',
        height:52,
        width:'92%',
        marginLeft:20,
        marginTop:156,
        borderRadius:100,
        paddingLeft:125,
        marginBottom:10,
        paddingTop:15,
    },
    login:{
        color:'#145343',
        fontWeight:'900',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
    },
    text_input:{
        borderColor:'red',
        borderWidth:1.5,
        borderRadius:30,
        height:50,
        width:309,
        paddingLeft:115,
        marginLeft:24
    },
    red_back1:{
        backgroundColor:'#c2e96a',
        height:52,
        width:'92%',
        marginLeft:15,
        marginTop:180,
        borderRadius:100,
        paddingLeft:135,
        marginBottom:10,
        paddingTop:15,
    },
    verify:{
        color:'#145343',
        fontWeight:'900',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
    },
});

export default PhoneVerify;
