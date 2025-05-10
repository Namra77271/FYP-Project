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
} from 'react-native';
import { API, getFullImageUrl } from './ApplyNav'; // Make sure these imports are correct for your project


const ViewPersonalBook = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to fetch books from the API
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API.Get_PBOOKS);
        const data = await response.json();
        console.log("📡 Fetched Books:", data);
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
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
            <Text style={styles.title}>Personal Books</Text>

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
                      <Text>Chapter: {book.ChapterName}</Text>
                      <Text>Page: {book.PageNumber}</Text>
                      <Text>Format: {book.Format}</Text>
                      <Text>FilePath: {book.FilePath}</Text>
                      <Text>Downloaded: {book.DownloadCount} times</Text>
                      <Text>Read: {book.ReadCount} times</Text>

                      {/* Button Block */}
                      <View style={styles.bookButtonRow}>
                        <TouchableOpacity
                          style={styles.assignButton}
                          onPress={() => navigation.navigate('AssignTOC', { book })}
                        >
                          <Text style={styles.assignButtonText}>Assign TOC</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.viewTocButton}
                          onPress={() => navigation.navigate('ViewToc', { book })}
                        >
                          <Text style={styles.assignButtonText}>View TOC</Text>
                        </TouchableOpacity>
                      </View>
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
    flexDirection: 'row',  // Align items horizontally
    alignItems: 'center',  // Center vertically
    marginBottom: 10,  // Space between image and text
  },
  imageContainer: {
    marginRight: 15, // Space between image and book details
  },

  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  bookDetails: {
    flex: 1, // Allow details to take the remaining space
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
  bookButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  assignButton: {
    backgroundColor: '#005f73',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewTocButton: {
    backgroundColor: '#0a9396',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  viewTocButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ViewPersonalBook;
