import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { API } from './ApplyNav';

const QRCodeScreen = ({ navigation }) => {
  const [isbn, setIsbn] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const myQRCode = useRef();

  // Generate QR code based on ISBN
  const generateQRCode = () => {
    if (!isbn) {
      Alert.alert("Enter ISBN to generate QR code");
      return;
    }
    setQrvalue(isbn); // QR/Barcode value is based on ISBN
  };

  // Save QR code to the database
  const saveQRCode = async () => {
    if (!isbn || !qrvalue) {
      Alert.alert("ISBN or QR Code is missing");
      return;
    }

    const bookData = {
      ISBN: isbn,
      Barcode: qrvalue, // The QR value based on ISBN
    };

    try {
      const response = await fetch(API.SAVE_QRCODE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", `QR Code saved: ${result.filePath}`);
        console.log('Saved:', result);
        navigation.goBack(); // ✅ Go back to AddBookScreen
      } else {
        const error = await response.text();
        console.error('Error:', error);
        Alert.alert("Error", error);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Generate Book QR Code</Text>

        <QRCode
          ref={myQRCode}
          value={qrvalue || 'NA'}
          size={250}
          color="black"
          backgroundColor="white"
        />

        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter ISBN"
          value={isbn}
          onChangeText={(text) => setIsbn(text)}
        />

        <TouchableOpacity style={styles.buttonStyle} onPress={generateQRCode}>
          <Text style={styles.buttonTextStyle}>Generate QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle} onPress={saveQRCode}>
          <Text style={styles.buttonTextStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  textInputStyle: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: '#003366',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QRCodeScreen;
