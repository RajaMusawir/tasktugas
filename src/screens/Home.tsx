import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
    
    const [name, setName] = useState('')

    useEffect(() => {
        getDataBase();
    }, []);

    const getDataBase = async () => {
            const documentSnapshot = await firestore().collection('People').doc('lVkhqYCE9fs0Go9oBFre').get();
            
            if (documentSnapshot.exists) {
                const data = documentSnapshot.data();
                console.log('Document data:', data);
                setName(data);
             }
            };

    const navigateSearch = () => {
        navigation.navigate('Search');
    };
    const navigateProfile = () => {
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Hello Raja!
            </Text>
            <TouchableOpacity onPress={navigateSearch}>
                <Text style={styles.text_search}>Go to Search</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={navigateProfile}>
                <Text style={styles.text_profile}>Go to Profile</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 200,
        paddingLeft: 110
    },
    text: {
        color: 'black',
        fontSize: 35
    },
    text_search: {
        paddingTop: 100,
        paddingLeft: 20,
        color: 'blue',
        fontSize: 20
    },
    text_profile: {
        paddingTop: 120,
        paddingLeft: 20,
        color: 'blue',
        fontSize: 20
    }
});

export default Home;
