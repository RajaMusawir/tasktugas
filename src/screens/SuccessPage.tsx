import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';

const SuccessPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={{flexDirection:'row', marginTop:12,}}>
      <Image source={require('./../../assets/new_logo.png')} style={{ height: 32, width: 32, left:110, top:1 }} />
      <Text style={styles.text}>Tasktagus</Text>
      </View>
      <Image source={require('./../../assets/content.png')} style={{width:305, height:333, left:39, top:62,}}/>
      <View style={{flexDirection:'row'}}>
      <View style={{width:12,height:6, backgroundColor:'#145343', marginTop:92,marginLeft:158, borderRadius:10}}/>
      <View style={{width:12,height:6, backgroundColor:'#edeef1', marginTop:92,marginLeft:5, borderRadius:10}}/>
      <View style={{width:12,height:6, backgroundColor:'#edeef1', marginTop:92,marginLeft:5, borderRadius:10}}/>
      </View>
    <Text style={{color:'black', fontSize:28, fontWeight:'600' , marginLeft:65, marginTop:32}}>Team Up For Success</Text>
    <Text style={{color:'#bebebe', fontSize:15, fontWeight:'500' , marginLeft:30, marginTop:20 }}>Get ready to unleash your potential and witness the</Text>
    <Text style={{color:'#bebebe', fontSize:15, fontWeight:'500' , marginLeft:60}}>power of teamwork as we embark on this</Text>
    <Text style={{color:'#bebebe', fontSize:15, fontWeight:'500' , marginLeft:115}}>extraordinary project.</Text>
    <TouchableOpacity style={styles.next_button} onPress={()=> navigation.navigate('UserFriendly')}>
      <Text style={{color: '#145343', fontSize: 17,fontWeight: 'bold', textAlign:'center'}}>Next</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.skip_button} onPress={()=> navigation.navigate('MixAuth')}>
      <Text style={{color: 'black', fontSize: 17,fontWeight: 'bold', textAlign:'center'}}>Skip</Text>
    </TouchableOpacity>
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
    fontWeight:'bold',
    color: '#145343',
    left:122,
    top:5
  },
  next_button: {
    backgroundColor: '#c2e96a',
    top: 30,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skip_button: {
    backgroundColor: 'white',
    borderColor:'black',
    borderWidth:1,
    top: 40,
    width: '92%',
    left: 15,
    height: 53,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default SuccessPage;