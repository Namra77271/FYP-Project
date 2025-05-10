import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { pick } from '@react-native-documents/picker';
import { API } from './ApplyNav';

const AddPersonalBook = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState('');
  const [isbn, setIsbn] = useState('');
  const [format, setFormat] = useState('');
  const [image, setImage] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [toc, setToc] = useState([{ chapterName: '', pageNumber: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookType, setBookType] = useState('Personal');

  const handleImagePick = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const addTocRow = () => {
    setToc([...toc, { chapterName: '', pageNumber: '' }]);
  };

  const updateToc = (index, key, value) => {
    const updatedToc = [...toc];
    updatedToc[index][key] = value;
    setToc(updatedToc);
  };

  const pickDocument = async () => {
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

      const res = await fetch(API.ADD_PDF, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: pdfData,
      });

      const json = await res.json();
      console.log('✅ Upload Response:', json);
    } catch (error) {
      console.error('❌ Upload error:', error);
    }
  };

  const handleSave = async () => {
    if (!title || !author || !publisher || !category || !format) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const generatedIsbn = isbn || `PERS-${Date.now()}`;
    const filteredTOC = toc.filter(item => item.chapterName && item.pageNumber);

    const personalBookData = {
      Title: title,
      Author: author,
      Publisher: publisher,
      Category: category,
      BookType: bookType,
      IsDigital: true,
      ISBN: generatedIsbn,
      Format: format,
      DigitalBookDetails: {
        Format: format,
        DownloadCount: 0,
        ReadCount: 0,
      },
      TableOfContents: filteredTOC,
    };

    try {
      setIsLoading(true);

      const response = await fetch(API.ADD_PersonalBOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalBookData),
      });

      if (!response.ok) {
        const errText = await response.text();
        Alert.alert('Book Save Failed', errText);
        setIsLoading(false);
        return;
      }

      // Upload image if it exists
      if (image) {
        const uniqueImageName = `${generatedIsbn}_${Date.now()}.jpg`;

        const imageData = new FormData();
        imageData.append('ISBN', generatedIsbn);
        imageData.append('imgFile', {
          uri: image,
          name: uniqueImageName,
          type: 'image/jpeg',
        });

        const imageRes = await fetch(API.ADD_PIMAGE, {
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

      // Upload PDF file if selected
      if (filePath) {
        const pdfData = new FormData();
        const uniqueFileName = `book_${Date.now()}.pdf`;
        pdfData.append('ISBN', generatedIsbn);
        pdfData.append('pdfFile', {
          uri: filePath,
          name: uniqueFileName,
          type: 'application/pdf',
        });

        const res = await fetch(API.ADD_PDF, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: pdfData,
        });

        if (!res.ok) {
          const err = await res.text();
          Alert.alert('PDF Upload Failed', err);
          setIsLoading(false);
          return;
        }
      }

      Alert.alert('Success', 'Book added successfully!');
      navigation.navigate('TeacherDashboard');
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
          <Text style={styles.title}>Add Personal Book</Text>

          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
          <TextInput style={styles.input} placeholder="Publisher" value={publisher} onChangeText={setPublisher} />
          <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
          <TextInput style={styles.input} placeholder="ISBN (Optional)" value={isbn} onChangeText={setIsbn} />
          <TextInput style={styles.input} placeholder="Format (e.g. PDF, EPUB)" value={format} onChangeText={setFormat} />

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Table of Contents</Text>
          {toc.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', gap: 5 }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Chapter Name"
                value={item.chapterName}
                onChangeText={(text) => updateToc(index, 'chapterName', text)}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Page Number"
                keyboardType="numeric"
                value={item.pageNumber}
                onChangeText={(text) => updateToc(index, 'pageNumber', text)}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={addTocRow}>
            <Text style={styles.buttonText}>+ Add TOC Section</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleImagePick}>
            <Text style={styles.buttonText}>Choose Book Cover</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={{ width: 100, height: 150, marginTop: 10, borderRadius: 8 }} />
          )}

          <TouchableOpacity style={styles.button} onPress={pickDocument}>
            <Text style={styles.buttonText}>Choose PDF File</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{isLoading ? 'Saving...' : 'Save Book'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
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
  backButton: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddPersonalBook;
