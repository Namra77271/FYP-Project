import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';  
import { pick, keepLocalCopy } from '@react-native-documents/picker';
import { API } from './ApplyNav';

const AddBookScreen = ({ navigation }) => {  // Removed route, as it's not necessary
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState('');
  const [bookType, setBookType] = useState('Physical');
  const [isbn, setIsbn] = useState('');
  const [format, setFormat] = useState('');
  const [shelfNo, setShelfNo] = useState('');
  const [accessionNo, setAccessionNo] = useState('');
  const [copies, setCopies] = useState('');
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);  // New state for PDF file
  const [isLoading, setIsLoading] = useState(false);
  const [fileResponse, setFileResponse] = useState(null);


  
  const handleImagePick = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      } else {
        setImage(null);
      }
    });
  };
 
  async function pickDocument() {
    try {
      const result = await pick();
      const file = result[0]; // Contains uri, name, etc.
  
      console.log('📄 Picked File:', file);
  
      const pdfData = new FormData();
      const uniqueFileName = `book_${Date.now()}.pdf`;
  
      pdfData.append('ISBN', isbn); // Add other fields as needed
      pdfData.append('pdfFile', {
        uri: file.uri,
        name: uniqueFileName,
        type: 'application/pdf',
      });
  
      const res = await fetch(API. ADD_PDF, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // DO NOT set Content-Type manually
        },
        body: pdfData,
      });
  
      const json = await res.json();
      console.log('✅ Upload Response:', json);
    } catch (error) {
      console.error('❌ Upload error:', error);
    }
  }
  



  
  const handleSave = async () => {
    if (!title || !author || !publisher || !category || !bookType || !isbn) {
      Alert.alert('Error', 'All required fields must be filled.');
      return;
    }
  
    const bookData = {
      BookID: 0,
      Title: title,
      Author: author,
      Publisher: publisher,
      Category: category,
      BookType: bookType,
      IsDigital: bookType === 'Digital',
      ISBN: isbn,
      Copies: bookType === 'Physical' ? parseInt(copies) : null,
      ShelfNo: bookType === 'Physical' ? shelfNo : null,
      AccessionNo: bookType === 'Physical' ? accessionNo : null,
      Image: null,
      Format: bookType === 'Digital' ? format : null,
    };
  
    try {
      setIsLoading(true);
  
      // Step 1: Send Book Data (always)
      const response = await fetch(API.ADD_BOOKS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        Alert.alert('Book Save Failed', errorText);
        setIsLoading(false);
        return;
      }
  
     // Step 2: Only if Digital, upload image (already saved book)
if (bookType === 'Digital') {
  if (image) {
    const uniqueImageName = `${isbn}_${Date.now()}.jpg`;

    const imageData = new FormData();
    imageData.append('ISBN', isbn);
    imageData.append('imgFile', {
      uri: image,
      name: uniqueImageName,
      type: 'image/jpeg',
    });

    const imageRes = await fetch(API.ADD_IMAGE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: imageData,
    });

    if (!imageRes.ok) {
      const err = await imageRes.text();
      Alert.alert('Image Upload Failed', err);
      setIsLoading(false);
      return;
    }
  }
  // if (pdfFile) {
  //   const uniquePdfName = `${isbn}_${Date.now()}.pdf`;
  
  //   const pdfData = new FormData();
  //   pdfData.append('ISBN', isbn);
  //   console.log(pdfFile); // Log to see the structure of pdfFile object
  //   pdfData.append('pdfFile', {
  //     uri: pdfFile.uri,
  //     name: uniquePdfName,
  //     type: 'application/pdf',
  //   });
  
  //   const pdfRes = await fetch(API.ADD_PDF, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //     body: pdfData,
  //   });
  
  //   if (!pdfRes.ok) {
  //     const err = await pdfRes.text();
  //     Alert.alert('PDF Upload Failed', err);
  //     setIsLoading(false);
  //     return;
  //   }
  // }

 }

  
      // Step 3: Navigate to QR Code Screen to generate barcode
      navigation.navigate('QRCodeScreen', { bookData: { ...bookData } });
  
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
      


  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Book</Text>

          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
          <TextInput style={styles.input} placeholder="Publisher" value={publisher} onChangeText={setPublisher} />
          <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />

          <Picker selectedValue={bookType} style={styles.picker} onValueChange={setBookType}>
            <Picker.Item label="Select Book Type" value="" />
            <Picker.Item label="Physical" value="Physical" />
            <Picker.Item label="Digital" value="Digital" />
            <Picker.Item label="Personal" value="Personal" />
          </Picker>

          {bookType === 'Digital' && (
            <>
              <TextInput style={styles.input} placeholder="ISSN" value={isbn} onChangeText={setIsbn} />
              <TextInput style={styles.input} placeholder="Format (e.g. PDF)" value={format} onChangeText={setFormat} />
              
              <TouchableOpacity style={styles.button} onPress={handleImagePick}>
                <Text style={styles.buttonText}>Choose Cover Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={pickDocument}>
                
                <Text style={styles.buttonText}>Choose PDF File</Text>
              </TouchableOpacity>
              
            </>
          )}

          {bookType === 'Physical' && (
            <>
              <TextInput style={styles.input} placeholder="ISBN" value={isbn} onChangeText={setIsbn} />
              <TextInput style={styles.input} placeholder="Shelf No" value={shelfNo} onChangeText={setShelfNo} />
              <TextInput style={styles.input} placeholder="Accession No" value={accessionNo} onChangeText={setAccessionNo} />
              <TextInput style={styles.input} placeholder="Copies" value={copies} onChangeText={setCopies} keyboardType="numeric" />
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                  console.log("Navigating to QRCodeScreen");
                  navigation.navigate('QRCodeScreen');
                }}
              >
                <Text style={styles.buttonText}>Generate Barcode</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {bookType !== 'Personal' && (
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewBook')}>
                <Text style={styles.buttonText}>ViewBook</Text>
              </TouchableOpacity>
            )}
          </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddBookScreen;

