import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import { API } from './ApplyNav';

const StudentTOCProgress = ({ route }) => {
  const { book } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`${API.Get_Student_TOC_Progress}?bookId=${book.BookID}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  const renderChapter = (chapter) => (
    <View key={chapter.TOCID} style={styles.chapterItem}>
      <Text style={styles.chapterName}>📘 {chapter.ChapterName} (Pg {chapter.PageNumber})</Text>
      <Text style={styles.status}>
        {chapter.Read ? '✅ Read' : '❌ Not Read'} | 
        {chapter.Downloaded ? '⬇️ Downloaded' : '❌ Not Downloaded'}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.studentCard}>
      <Text style={styles.studentName}>👤 {item.StudentName} (Reg: {item.RegNo})</Text>
      {item.Chapters.map(renderChapter)}
    </View>
  );

  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Student Progress - {book.Title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.StudentID.toString()}
          renderItem={renderItem}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 15,
  },
  studentCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  chapterItem: {
    marginLeft: 10,
    marginBottom: 5,
  },
  chapterName: {
    fontSize: 14,
    color: '#003366',
  },
  status: {
    fontSize: 13,
    marginLeft: 5,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default StudentTOCProgress;
