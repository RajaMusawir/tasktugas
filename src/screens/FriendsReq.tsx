import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const FriendsReq = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [myId, setMyId] = useState([])
    const currentUserID = auth().currentUser?.uid;

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (currentUserID) {
                const userDocument = await firestore().collection('users').doc(currentUserID).get();
                if (userDocument.exists) {
                    const userData = userDocument.data();
                    setRequests(userData.friendRequests || []);
                    setMyId(userData.id|| [])
                } else {
                    console.log('User document does not exist');
                }
            }
        };
        fetchProfileImage();
        const refreshListener = navigation.addListener('focus', fetchProfileImage);
        return refreshListener;
    }, [navigation, currentUserID]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = await firestore().collection('users').get();
                const userList = usersCollection.docs.map(doc => ({
                    docId: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };
        fetchUsers();
        const refreshListener = navigation.addListener('focus', fetchUsers);
        return refreshListener;
    }, [navigation]);
    
    const requestedUsers = users.filter(user => requests.includes(user.id));

    
    const acceptFriendRequest = async (requesterID) => {
      try {
          const currentUserDocRef = firestore().collection('users').doc(currentUserID);
          const currentUserDoc = await currentUserDocRef.get();
          const requesterSnapshot = await firestore()
              .collection('users')
              .where('id', '==', requesterID)
              .get();
          const requesterDocRef = requesterSnapshot.docs[0].ref;
          const requesterDocData = requesterSnapshot.docs[0].data();
          await currentUserDocRef.update({
              friendRequests: firestore.FieldValue.arrayRemove(requesterID),
              friends: firestore.FieldValue.arrayUnion(requesterID),
          });
          await requesterDocRef.update({
              friends: firestore.FieldValue.arrayUnion(myId),
              friendRequests: firestore.FieldValue.arrayRemove(myId),
          });
          setRequests(prevRequests => prevRequests.filter(id => id !== requesterID));
          console.log(`Friend request from ${requesterID} accepted.`);
      } catch (error) {
          console.error('Error accepting friend request:', error);
      }
  };
  

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('./../../assets/back.png')} style={{ width: 22, height: 22, left: 16 }} />
                    </TouchableOpacity>
                    <Text style={styles.text}>R e q u e s t s</Text>
                </View>
            </View>

            <View style={{ top: 42, left: 12 }}>
                {requestedUsers.length > 0 ? (
                    requestedUsers.map((user) => (
                        <View key={user.id} style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <Image
                                source={user.imageUri ? { uri: user.imageUri } : require('./../../assets/ggProfile.jpg')}
                                style={{ width: 82, height: 82, borderRadius: 41 }}
                            />
                            <Text style={styles.name}>{user.fullName}</Text>
                            <TouchableOpacity onPress={() => acceptFriendRequest(user.id)}>
                                <Image source={require('./../../assets/accept.png')} style={styles.accept} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('./../../assets/decline.png')} style={styles.decline} />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: 'grey', fontSize: 18 }}>No friend requests found</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        top: 2,
    },
    text: {
        fontSize: 20,
        marginLeft: 110,
        color: 'black',
    },
    header: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10,
        marginTop: 35,
        borderColor: '#D3D3D3',
    },
    name: {
        color: 'black',
        fontSize: 20,
        top: 24,
        left: 12,
        fontWeight: '600',
    },
    decline: {
        height: 72,
        width: 72,
        left: 24,
        top: 2,
        tintColor: 'black',
    },
    accept: {
        height: 72,
        width: 72,
        left: 10,
        tintColor: 'green',
    },
});

export default FriendsReq;
