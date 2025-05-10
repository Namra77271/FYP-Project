import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";

const EditBookScreen = ({ route, navigation }) => {
  const { book } = route.params; // Get book details from navigation
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [image, setImage] = useState(book.image);

  const handleSave = () => {
    if (!title || !author) {
      Alert.alert("Error", "Title and Author fields cannot be empty.");
      return;
    }

    // Mock Save: Normally, update data in state or backend
    Alert.alert("Success", "Book details updated successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Book</Text>

      <Image source={image} style={styles.bookImage} />

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter book title"
      />

      <Text style={styles.label}>Author</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Enter author name"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E6F7FF" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
  },
  bookImage: { width: 100, height: 140, alignSelf: "center", borderRadius: 8, marginBottom: 10 },
  saveButton: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default EditBookScreen;
