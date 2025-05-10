import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const AdminDashboard = ({ navigation, route }) => {
  const { userName } = route.params || {};

  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>

        {/* Top Menu */}
        <View style={styles.menuBar}>
        <TouchableOpacity >
          <Icon name="menu" size={28} color="#FFFFFF" />
           </TouchableOpacity>
        </View>
        
         
        {/* Logo */}
        <Image source={require('./assets/logo.png')} style={styles.logo} />

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome {userName || 'librarian'}</Text>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.row}>
            <InfoCard title="Total Users" value="120" />
            <InfoCard title="Total Books" value="500" />
          </View>
          <View style={styles.row}>
            <InfoCard title="Borrowed Books" value="50" />
            <InfoCard title="Overdue Books" value="10" />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <ActionButton title="Add Book" onPress={() => navigation.navigate('AddBookScreen')} />
          <ActionButton title="Issue Book" onPress={() => navigation.navigate('IssueBookScreen')} />
          <ActionButton title="Return Book" onPress={() => navigation.navigate('ReturnBookScreen')} />
          <ActionButton title="Digital Archive" onPress={() => navigation.navigate('DigitalArchiveScreen')} />
        </View>

      </View>
      
    </ImageBackground>
  );
};

// Info Card Component
const InfoCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

// Action Button Component
const ActionButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
   
);



// Styles
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
  menuBar: {
    position: 'absolute',
    top: 30,
    left: 15,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 15,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    width: '48%',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginVertical: 7,
    shadowColor: '#00509E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AdminDashboard;
