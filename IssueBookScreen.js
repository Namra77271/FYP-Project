import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const IssueBookScreen = ({ navigation }) => {
    const [memberID, setMemberID] = useState('');
    const [bookID, setBookID] = useState('');
    const [issueDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState('');

    const issueBook = () => {
        if (!memberID || !bookID || !dueDate) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        Alert.alert("Success", `Book ID: ${bookID} issued to Member ID: ${memberID}`);
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.title}>Issue Book</Text>

                <Text style={styles.label}>Member ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Member ID"
                    value={memberID}
                    onChangeText={setMemberID}
                />

                <Text style={styles.label}>Book ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Book ID"
                    value={bookID}
                    onChangeText={setBookID}
                />

                <Text style={styles.label}>Issue Date</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={issueDate}
                    editable={false}
                />

                <Text style={styles.label}>Due Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={dueDate}
                    onChangeText={setDueDate}
                />

                <TouchableOpacity style={styles.button} onPress={issueBook}>
                    <Text style={styles.buttonText}>Issue Book</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </Card>
        </ScrollView>
    );
};

// 🎨 Styles - Matched to Your Preference
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6F7FF',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#003366',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#66A3FF',
        marginBottom: 10,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
        color: '#666',
    },
    button: {
        backgroundColor: '#003366',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    backButton: {
        backgroundColor: '#003366',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default IssueBookScreen;
