import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera'; // Import the camera component from react-native-camera

const IssueBook = ({ route, navigation }) => {
  const { book } = route.params; // Getting book details passed from BookDetails screen
  const [barcode, setBarcode] = useState(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to scan QR codes',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // When a barcode is detected
  const onBarcodeScan = (e) => {
    const scannedData = e.data;
    setBarcode(scannedData);
    Alert.alert('Barcode Scanned', `Book Barcode: ${scannedData}`);
    issueBook(scannedData); // Automatically issue the book when barcode is scanned
  };

  // API request to issue the book
  const issueBook = async (barcode) => {
    try {
      const response = await fetch('http://your-api-url/api/books/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barcode: barcode,
          userId: 'user-id', // Replace with actual user ID
        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Book issued successfully');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to issue the book');
    }
  };

  // Call this function when the component mounts
  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Issue Book</Text>
      <Text style={styles.bookTitle}>{book.title}</Text>

      {/* RNCamera to scan QR Code */}
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onBarCodeRead={onBarcodeScan} // Use onBarCodeRead for scanning
        captureAudio={false} // Don't capture audio if not needed
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan Book Barcode</Text>
        </View>
      </RNCamera>

      {/* Manual issue button (optional) */}
      {barcode && (
        <TouchableOpacity style={styles.issueButton} onPress={() => issueBook(barcode)}>
          <Text style={styles.issueButtonText}>Issue Book</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bookTitle: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  issueButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#003366',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  issueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IssueBook;
