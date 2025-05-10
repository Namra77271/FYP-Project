import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";

const booksData = [
  { id: "1234", title: "English Grammar", author: "Mark Twain", image: require("./assets/abc.jpg") },
  { id: "1224", title: "Computer Science", author: "Jane Austen", image: require("./assets/new.jpg") },
  { id: "0434", title: "Namal", author: "Nimra Ahmad", image: require("./assets/science.jpg") },
  { id: "0552", title: "Aangan", author: "Parveen Shakir", image: require("./assets/magazine.jpg") },
];

const DigitalArchiveScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState(booksData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = booksData.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.id.includes(query)
    );
    setBooks(filtered);
  };

  const handleDelete = (bookId) => {
    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => setBooks(books.filter((book) => book.id !== bookId)),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Digital Archive</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Add Book Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBookScreen")}>
        <Text style={styles.addButtonText}>+ Add New Book</Text>
      </TouchableOpacity>

      {/* Book List */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={item.image} style={styles.bookImage} />
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
              <Text style={styles.bookId}>ISBN: {item.id}</Text>
            </View>

            {/* Edit & Delete Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditBookScreen", { book: item })}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#E6F7FF" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  searchBar: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: { color: "white", fontSize: 16 },
  bookItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  bookImage: { width: 50, height: 70, borderRadius: 5 },
  bookDetails: { flex: 1, marginLeft: 10 },
  bookTitle: { fontSize: 16, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "#555" },
  bookId: { fontSize: 12, color: "#777" },
  actions: { flexDirection: "row", gap: 5 },
  editButton: {
    backgroundColor: "#003366",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#003366",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default DigitalArchiveScreen;
