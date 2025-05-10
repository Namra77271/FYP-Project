import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { API, getFullImageUrl } from './ApplyNav'; // Make sure these imports are correct for your project

const ViewBook = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch physical and digital books from the API
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API.VIEW_BOOKS);  // Assuming API.VIEW_BOOKS is your endpoint to fetch books
      const data = await response.json();
      console.log("📡 Fetched Books:", data);
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      Alert.alert('Error', 'Failed to load books.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = books.filter((book) =>
      book.Title?.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Library Books</Text>

          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Title"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {isLoading ? (
            <ActivityIndicator size="large" color="#003366" />
          ) : (
            filteredBooks.map((book, index) => (
              <View key={index} style={styles.bookCard}>
                <View style={styles.bookRow}>
                  {/* Book Image */}
                  <View style={styles.imageContainer}>
                    {book.Image ? (
                      <Image
                        source={{ uri: getFullImageUrl(book.Image) }}
                        style={styles.coverImage}
                        onError={() => console.log('❌ Image failed to load:', book.Image)}
                      />
                    ) : (
                      <Text style={{ fontStyle: 'italic' }}>No Cover Available</Text>
                    )}
                  </View>

                  {/* Book Details */}
                  <View style={styles.bookDetails}>
                    <Text style={styles.bookTitle}>{book.Title}</Text>
                    <Text>Author: {book.Author}</Text>
                    <Text>Publisher: {book.Publisher}</Text>
                    <Text>Category: {book.Category}</Text>
                    <Text>Type: {book.BookType}</Text>
                    <Text>ISBN/ISSN: {book.ISBN}</Text>

                    {/* Display additional details based on book type */}
                    {book.BookType === 'Physical' || book.BookType === 'Printed' ? (
                      <>
                        <Text>Shelf No: {book.ShelfNo}</Text>
                        <Text>Accession No: {book.AccessionNo}</Text>
                        <Text>Copies: {book.Copies}</Text>
                      </>
                    ) : (
                      <>
                        <Text>Format: {book.Format}</Text>
                        <Text>File Size: {book.FilePath }</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            ))
          )}

          {/* Back Button */}
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
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  bookCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 15,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#003366',
  },
  backButton: {
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

export default ViewBook;
