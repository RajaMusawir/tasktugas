import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Auth } from "firebase/auth";
import auth from '@react-native-firebase/auth';

const Search = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [newId, setNewId] = useState('')

    useEffect(() => {
        const fetchProfileImage = async () => {
            const userId = auth().currentUser?.uid;
            console.log("Current User ID:", userId);
            
            const userDocument = await firestore().collection('users').doc(userId).get();
            if (userDocument.exists) {
              const userData = userDocument.data();
              setNewId(userData.id)
            } else {
              console.log('User document does not exist');
            }
        };
        fetchProfileImage();
        const refreshs = navigation.addListener('focus', fetchProfileImage)
        return refreshs;
      }, [navigation]);
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
        const refreshs = navigation.addListener('focus', fetchUsers);
        return refreshs;
    }, [navigation]);
const sendFriendRequest = async (recipientDocId) => {
    try {
        const recipientDocRef = firestore().collection('users').doc(recipientDocId);
        await recipientDocRef.update({
            friendRequests: firestore.FieldValue.arrayUnion(newId),
        });
        console.log('doneeeeeeeee!');
    } catch (error) {
        console.error('Error req', error);
    }
};

    const currentUserID = auth().currentUser?.uid
    

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().startsWith(query.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.userProfile}>
            <Image
                source={item.imageUri ? { uri: item.imageUri } : require('./../../assets/dp.png')}
                style={styles.userImage}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.userName}>{item.fullName}</Text>
                {item.docId !== currentUserID && (
                <TouchableOpacity onPress={() => sendFriendRequest(item.docId)}>
                    <Image source={require('./../../assets/add_user.png')} style={styles.icon_add} />
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
    
    
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={'transparent'} />
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.flex}>
                            <Text style={styles.titleText}>I N N O V A T I O N</Text>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <View style={styles.flex1}>
                            <View style={{ position: 'relative' }}>
                                <Image source={require('./../../assets/students_evening.jpg')} style={styles.headerImage} />
                                <Text style={styles.headerText}>All Users</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.searchContainer}>
                        <View style={styles.search_icon_inTxT}>
                            <Image
                                style={styles.search_icon}
                                source={require('./../../assets/search.png')}
                            />
                            <TextInput
                                style={styles.searchBox}
                                placeholder="Search users..."
                                placeholderTextColor={'grey'}
                                value={query}
                                onChangeText={(text) => setQuery(text)}
                            />
                        </View>
                    </View>
                    {filteredUsers.length > 0 ? (
                        <View>
                            <FlatList
                                data={filteredUsers}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                                contentContainerStyle={styles.listContainer}
                            />
                        </View>
                    ) : (
                        <View style={styles.noUsersFoundContainer}>
                            <Text style={styles.noUsersFoundText}>No users were found</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 10,
    },
    header: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10,
        borderColor: '#D3D3D3',
    },
    flex: {
        flexDirection: 'row',
        marginBottom: 12,
        left: 109,
    },
    flex1: {
        marginBottom: 12,
        left: 17,
    },
    titleText: {
        color: 'black',
        fontSize: 20,
        fontWeight: "700",
        top: 22,
        marginTop: 12,
        marginBottom: 12,
    },
    headerImage: {
        width: 330,
        height: 150,
        marginTop: 22,
        borderRadius: 17,
    },
    headerText: {
        position: 'absolute',
        top: 105,
        left: 15,
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    searchContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 17,
        borderColor: '#D3D3D3',
    },
    search_icon_inTxT: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        position: 'relative',
    },
    search_icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 25,
        top: 20,
        zIndex: 1,
        elevation: 4,
    },
    searchBox: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        backgroundColor: '#f5f5f4',
        borderRadius: 100,
        color: 'black',
        width: '100%',
        height: 40,
        paddingLeft: 50,
        marginTop: 10,
        padding: 10,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    userProfile: {
        margin: 5,
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    icon_add:{
        width:20,
        height:20,
        left:12
    },
    userImage: {
        height: 130,
        width: 130,
        borderRadius: 20,
        marginBottom: 10,
    },
    userName: {
        color: 'black',
        fontSize: 15,
        top:2,
        fontWeight: 'bold',
    },
    noUsersFoundContainer: {
        flex: 1,
        paddingBottom: 365,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    noUsersFoundText: {
        fontSize: 18,
        color: 'grey',
    },
});

export default Search;
