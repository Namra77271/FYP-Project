import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,ImageBackground, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from './ApplyNav';




const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {

    console.log("log  is calling");
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email and Password are required');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // const url = 'http://192.168.100.90/FinalYearProject1/api/FYP/loginUser'; // Adjust API URL
      const res = await fetch(API.LOGIN_USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, PasswordHash: password }),
      });

      const responseData = await res.json();
      setIsLoading(false);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userName', responseData.Name);

      if (!res.ok) {
        setErrorMessage(`Login failed: ${responseData.message}`);
      } else {
        Alert.alert('Success', `Welcome, ${responseData.Name}!`);

        if (responseData.UserType === 'Admin') {
          navigation.replace('AdminDashboard');
        } else if (responseData.UserType === 'Teacher') {
          navigation.replace('TeacherDashboard'); // 📌 Teacher Dashboard
        } else {
          navigation.replace('UserDashboard'); // Students, Faculty
        }
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Error during login: ' + error.message);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/bg1.jpeg')} // Background image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={require('./assets/logo.png')} // Logo image path
          style={styles.logo} />

        {/* Card Background */}
        <View style={styles.card}>

          <Text style={styles.heading}>Login</Text> {/* Added heading inside the card */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none" />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
// **Styling**
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 20, // تھوڑا نیچے کیا تاکہ بہتر spacing ہو
  },
  card: {
    width: '90%', // تھوڑا بڑا کیا تاکہ زیادہ space cover کرے
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // تھوڑا softer color
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  label: {
    fontSize: 15, // تھوڑا چھوٹا تاکہ زیادہ مناسب لگے
    fontWeight: '600', // Medium weight، زیادہ readable
    color: '#222', // تھوڑا dark grey بہتر visibility کے لیے
    marginBottom: 3, // Label اور input کے درمیان تھوڑا space کم
    alignSelf: 'flex-start', // Left align 
    letterSpacing: 0.5, // تھوڑا gap تاکہ بہتر readability ہو
  },


  button: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#0047AB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
});
export default LoginScreen;


