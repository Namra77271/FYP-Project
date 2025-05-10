import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const BookDetails = ({ route, navigation }) => {
  const { book } = route.params;  // Get the book data passed from navigation
  
  const [bookDetails, setBookDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data for the selected book
  const fetchBookDetails = async (bookId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://192.168.100.90/FinalYearProject1/api/FYP/GetPhysicalBooks/${bookId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setBookDetails(data); // Set the fetched book data
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (book) {
      fetchBookDetails(book.id);  // Fetch book details based on the book id passed
    }
  }, [book]);

  if (isLoading) {
    return <Text>Loading...</Text>;  // Show a loading message while data is being fetched
  }

  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Book Detail</Text>

          <View style={styles.bookRow}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: bookDetails?.image }} style={styles.coverImage} />
            </View>

            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle}>{bookDetails?.title}</Text>
              <Text style={styles.description}>Author: {bookDetails?.author}</Text>
              <Text style={styles.description}>Publisher: {bookDetails?.publisher}</Text>
              <Text style={styles.description}>Category: {bookDetails?.category}</Text>
              <Text style={styles.description}>ISBN: {bookDetails?.isbn}</Text>
              <Text style={styles.description}>Copies: {bookDetails?.copies}</Text>
              <Text style={styles.description}>Shelf No: {bookDetails?.shelfNo}</Text>
              <Text style={styles.description}>Barcode: {bookDetails?.barcode}</Text>
              <Text style={styles.description}>Accession No: {bookDetails?.accessionNo}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.issueButton}
            onPress={() => navigation.navigate('IssueBook', { book: bookDetails })}
          >
            <Text style={styles.issueButtonText}>Issue Book</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default BookDetails;
