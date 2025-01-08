import React , {useEffect, useState} from 'react';
import { View, Button, Touchable, TouchableOpacity, Image, StatusBar, Text, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const Youtube = ({navigation}) => {
    const  [uri, setUri] =useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const link = () => {
            setUri('https://google.com')
        }
        link()
    }, [])
    const script = `
  (function() {
    const elements = document.querySelectorAll('.bb.av.m.bc.bd.be.bf.bg.bh');
    elements.forEach(element => {
      element.style.backgroundColor = 'green';
    });
  })();
`;
    
  return (
    <View style={{flex:1}}>
        <StatusBar backgroundColor={'white'}/>
    <View style={{backgroundColor:'white', borderBottomColor:'black', borderWidth:1, borderTopColor:'white', borderLeftColor:'white', borderRightColor:'white', flexDirection:'row', height:84, paddingTop:12,}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={require('./../../assets/close-button.png')} style={{width:22, height:22, left:22,marginTop:32}}/>
    </TouchableOpacity>
    <Text style={{color:'black', left:86, marginTop:34, fontSize:18}}>{uri}</Text>
    </View>
    {loading && (
      <ActivityIndicator size='large' color={'green'} style={{flex:1}}/>
    )}
    <WebView
      source={{ uri:  uri }}
          injectedJavaScript={script}
          startInLoadingState={true}
          onError={() => Alert.alert('Error', 'There is an error while loading the page please try again later')}
renderLoading={() => (
<ActivityIndicator
color="green"
size="large"
style={{ justifyContent:'center',  position: 'absolute',
  top: '50%',
  left: '45%',}}
/>
)}
    />
    </View>
  );
};

export default Youtube;
