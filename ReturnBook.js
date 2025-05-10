import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ReturnBookScreen = ({ navigation }) => {
    const [bookId, setBookId] = useState('');
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fine, setFine] = useState(0);

    // Dummy function to simulate fetching book details
    const fetchBookDetails = () => {
        if (!bookId) return;
        setLoading(true);
        setTimeout(() => {
            setBookDetails({
                title: 'The Great Gatsby',
                borrowerName: 'John Doe',
                dueDate: '2025-03-10',
            });
            setFine(10); // Dummy fine value
            setLoading(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Return Book</Text>

            <TextInput
                placeholder="Enter Book ID"
                value={bookId}
                onChangeText={setBookId}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={fetchBookDetails}>
                <Text style={styles.buttonText}>Fetch Book Details</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}

            {bookDetails && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Book Title: {bookDetails.title}</Text>
                    <Text style={styles.detailText}>Borrower: {bookDetails.borrowerName}</Text>
                    <Text style={styles.detailText}>Due Date: {bookDetails.dueDate}</Text>
                    <Text style={[styles.detailText, { color: 'red' }]}>Fine: ${fine}</Text>

                    <TouchableOpacity style={styles.returnButton}>
                        <Text style={styles.buttonText}>Return Book</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6', // Light blue background
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#003366',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    returnButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    backButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loader: {
        marginTop: 10,
    },
    detailsContainer: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#f8f9fa',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ReturnBookScreen;
