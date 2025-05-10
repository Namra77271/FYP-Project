import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from './ApplyNav'; // Assuming you have an API constant to call the backend

const UserDashboard = ({ navigation }) => {
  const [userName, setUserName] = useState('User'); // Default name if no name found

  // Function to fetch userId from AsyncStorage
  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      return storedUserId ? storedUserId : null;
    } catch (error) {
      console.error('Failed to fetch user ID from AsyncStorage:', error);
      return null;
    }
  };

  // Function to fetch user name from the backend using the userId
  const fetchUserName = async () => {
    const userId = await fetchUserId();
    if (!userId) {
      Alert.alert('Error', 'User is not logged in. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`${API.Get_User_By_ID}?userId=${userId}`);
      const data = await response.json();
      
      if (data && data.Name) {
        setUserName(data.Name); // Set user name
      } else {
        setUserName('User');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      Alert.alert('Error', 'Unable to fetch user name.');
    }
  };

  useEffect(() => {
    fetchUserName(); // Fetch user name when the component mounts
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userId'); // Remove userId on logout
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome, {userName}</Text> {/* Display fetched name */}

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecommendedBooks')}>
            <Text style={styles.buttonText}>Teacher Recommendations</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewArrivals')}>
            <Text style={styles.buttonText}>🆕 New Arrivals</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchArchive')}>
            <Text style={styles.buttonText}>🔍 Search Archive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BrowseCategories')}>
            <Text style={styles.buttonText}>📂 Browse Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyBorrowedBooks')}>
            <Text style={styles.buttonText}>📖 My Borrowed Books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>👤 Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#005f73',
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  logoutButton: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDashboard;
