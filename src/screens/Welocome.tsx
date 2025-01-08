import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Welcome = ({navigation}) => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.text}>Welcome To Innovation!</Text>
      <Text style={{color:'#bebebe', fontWeight:'bold', top:62, left:57}}>
        We Welcome you to Pakistan's First School App
      </Text>

      {/* First button */}
      <View style={styles.touchable_1}>
        <Image source={require('./../../assets/announcements.png')} 
          style={styles.icon}/>
        <Text style={styles.buttonText}>Announcements</Text>
      </View>

      {/* Second button */}
      <View style={styles.touchable_2}>
        <Image source={require('./../../assets/OnlineLearning.png')} 
          style={styles.icon}/>
        <Text style={styles.buttonText}>News</Text>
      </View>

      {/* Third button */}
      <View style={styles.touchable_3}>
        <Image source={require('./../../assets/Certificate.png')} 
          style={styles.icon}/>
        <Text style={styles.buttonText}>Events</Text>
      </View>

      {/* Fourth button */}
      <View style={styles.touchable_4}>
        <Image source={require('./../../assets/Teacher.png')} 
          style={styles.icon}/>
        <Text style={styles.buttonText}>Contact Us</Text>
      </View>

      {/* Fifth button */}
      <View style={styles.touchable_5}>
        <Image source={require('./../../assets/LessonNotes.png')} 
          style={styles.icon}/>
        <Text style={styles.buttonText}>Profile</Text>
      </View>
      <TouchableOpacity style={styles.login_button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.login_text}>Get Started</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom:460
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    top: 50,
    left: 69,
  },
  icon: {
    height: 32,
    width: 32,
    left: 12,
    top: 4,
  },
  buttonText: {
    color: 'black',
    left: 22,
    top: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
  touchable_1:{
    borderColor: '#bebebe',
    borderWidth: 1,
    flexDirection: 'row',
    width: 320,
    height: 45,
    top: 130,
    borderRadius: 12,
    left: 20,
  },
  touchable_2:{
    borderColor: '#bebebe',
    borderWidth: 1,
    flexDirection: 'row',
    width: 320,
    height: 45,
    top: 140,
    borderRadius: 12,
    left: 20,
  },
  login_button:{
    backgroundColor:'#c2e96a',
    top:450,
    width:'92%',
    left:15,
    height:53,
    borderRadius:1200,
  },
  login_text:{
    color:'#145343',
    left:123,
    fontSize:17,
    fontWeight:'bold',
    top:16
  },
  touchable_3:{
    borderColor: '#bebebe',
    borderWidth: 1,
    flexDirection: 'row',
    width: 320,
    height: 45,
    top: 150,
    borderRadius: 12,
    left: 20,
  },
  touchable_4:{
    borderColor: '#bebebe',
    borderWidth: 1,
    flexDirection: 'row',
    width: 320,
    height: 45,
    top: 160,
    borderRadius: 12,
    left: 20,
  },
  touchable_5:{
    borderColor: '#bebebe',
    borderWidth: 1,
    flexDirection: 'row',
    width: 320,
    height: 45,
    top: 170,
    borderRadius: 12,
    left: 20,
  },
});

export default Welcome;
