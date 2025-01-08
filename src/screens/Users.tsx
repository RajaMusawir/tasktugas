import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const DoctorCard = ({ name, specialization, rating, isAvailable, imageUrl, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJ2u482NBtw501OOICaZxGrIcxNtG5SuqWQ&s' }} // Default image if no URL is found
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.specialization}>{specialization}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.availability}>{isAvailable ? 'Online Now' : 'Unavailable'}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Send Friend Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await firestore().collection('users').get();
        const usersList = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch profile images from Firebase Storage
        const usersWithImages = await Promise.all(
          usersList.map(async (user) => {
            try {
              const imageUrl = await storage().ref(`profile/${user.id}.jpg`).getDownloadURL();
              return { ...user, imageUrl }; // Add imageUrl to user data
            } catch (error) {
              console.error(`Error fetching image for ${user.id}: `, error);
              return { ...user, imageUrl: null }; // In case image is not found
            }
          })
        );

        setUsers(usersWithImages);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', left: 140, marginBottom: 21 }}>Users</Text>
      <ScrollView>
        {users.map((user) => (
          <DoctorCard
            key={user.id}
            name={user.name}
            specialization={user.specialization || 'Friendly Behaviour'}
            rating={user.rating || '4.9'}
            isAvailable={user.isAvailable || true}
            imageUrl={user.imageUrl}
            onPress={() => alert(`Sending Friend Request to ${user.name}...`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    paddingTop: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  specialization: {
    color: 'gray',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    color: '#FFD700',
  },
  availability: {
    marginTop: 10,
    color: 'green',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#145343',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Users;
