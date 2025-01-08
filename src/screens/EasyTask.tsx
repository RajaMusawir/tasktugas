import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';

const EasyTask = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={{flexDirection:'row', marginTop:12,}}>
      <Image source={require('./../../assets/new_logo.png')} style={{ height: 32, width: 32, left:110, top:1 }} />
      <Text style={styles.text}>Tasktagus</Text>
      </View>
      <Image source={require('./../../assets/easyTask.jpg')} style={{width:300, height:300, left:32, top:72,}}/>
      <View style={{flexDirection:'row'}}>
      <View style={{width:12,height:6, backgroundColor:'#edeef1', marginTop:122,marginLeft:158, borderRadius:10}}/>
      <View style={{width:12,height:6, backgroundColor:'#edeef1', marginTop:122,marginLeft:5, borderRadius:10}}/>
      <View style={{width:12,height:6, backgroundColor:'#145343', marginTop:122,marginLeft:5, borderRadius:10}}/>
      </View>
    <Text style={{color:'black', fontSize:28, fontWeight:'600' , marginLeft:82, marginTop:32}}>Easy Task Creation</Text>
    <Text style={{color:'#bebebe', fontSize:15, fontWeight:'500' , marginLeft:60, marginTop:20 }}>Quickly add tasks, set due dates, and add</Text>
    <Text style={{color:'#bebebe', fontSize:15, fontWeight:'500' , marginLeft:34}}>descriptions with ease using our task manager app.</Text>
    <Text style={{color:'#bebebe', fontSize:15, fontWeight:'500' , marginLeft:60}}>Simplify your workflow and stay organized.</Text>
    <TouchableOpacity style={styles.next_button} onPress={()=> navigation.navigate('MixAuth')}>
      <Text style={{color: '#145343', fontSize: 17,fontWeight: 'bold', textAlign:'center'}}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.skip_button} onPress={()=> navigation.navigate('MixAuth')}>
      <Text style={{color: 'black', fontSize: 17,fontWeight: 'bold', textAlign:'center'}}>Sign Up</Text>
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

export default EasyTask;