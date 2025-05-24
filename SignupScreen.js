import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image,ImageBackground, ActivityIndicator } from 'react-native';
import { API } from './ApplyNav';


const SignupScreen = ({ navigation }) => {
  // const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if ( !name || !email || !phoneNo || !userType || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const signupData = {
      // UserID: userId,
      Name: name,
      Email: email,
      PhoneNo: phoneNo,
      UserType: userType,
      PasswordHash: password, // Ensure backend hashes before storing
    };

    try {
      // const url = 'http://192.168.100.90/FinalYearProject1/api/FYP/adduser'; // Update API URL

      const res = await fetch(API.ADD_USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      setIsLoading(false);

      if (!res.ok) {
        const errorDetails = await res.text();
        setErrorMessage(`Signup failed: ${res.status} - ${errorDetails}`);
      } else {
        Alert.alert('Success', 'Account created successfully!');
        navigation.replace('LoginScreen');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Error during signup: ' + error.message);
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
              style={styles.logo} 
            />
    
            {/* Card Background */}
            <View style={styles.card}>
            
            <Text style={styles.heading}>Signup</Text> {/* Added heading inside the card */}
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      
      {/* <Text style={styles.label}>Enter User ID</Text>
      <TextInput style={styles.input} value={userId} onChangeText={setUserId} keyboardType="numeric" /> */}

      <Text style={styles.label}>Enter Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Enter Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Enter Phone No</Text>
      <TextInput style={styles.input} value={phoneNo} onChangeText={setPhoneNo} keyboardType="phone-pad" />

      <Text style={styles.label}>Enter User Type</Text>
      <TextInput style={styles.input} value={userType} onChangeText={setUserType} />

      <Text style={styles.label}>Enter Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Signing Up...' : 'Sign Up'}</Text>
      </TouchableOpacity>

    <TouchableOpacity onPress={() => {
            console.log("Navigating to LoginScreen...");
           navigation.navigate('LoginScreen');
              }}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
           </TouchableOpacity>
       </View>
            </View>
          </ImageBackground>
  );
};

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
    marginBottom: 5, // تھوڑا نیچے کیا تاکہ بہتر spacing ہو
  },
  card: {
    width: '90%',  // تھوڑا بڑا کیا تاکہ زیادہ space cover کرے
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    height: 40,
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




export default SignupScreen;

