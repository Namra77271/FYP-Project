
import React, {  useEffect } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';




const SplashScreen = ({ navigation}) => {    
      useEffect(() => {
        setTimeout(() => {
          navigation.replace('LoginScreen'); // Navigates to Login after 3 sec
        }, 3000);
      }, [navigation]);

      return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/bg1.jpeg')} // Background image path
        style={styles.backgroundImage}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={require('./assets/logo.png')} // Logo image path
            style={styles.logo} 
          />
        </View>
        <Text style={styles.title}>WELCOME</Text>
        <Text style={styles.subtitle}>Library Management System</Text>
        <Text style={styles.subtitle}>with Digital Archive</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    resizeMode: 'cover',
  },
  imageContainer: {
    backgroundColor: '#301934', // Circle background color
    borderRadius: 100, // Makes the background circular
    padding: 20, // Adjusts circle size around logo
    marginBottom: 10, // Space between logo and text
    alignItems: 'center', // Centers logo inside the circle
  },
  logo: {
    width: 100, // Adjust logo size as needed
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5, // Space between logo and title
    textAlign: 'centre',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'centre',
  },
});

export default SplashScreen;
