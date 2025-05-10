import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API } from './ApplyNav';

const AssignTOCScreen = () => {
  const [students, setStudents] = useState([]);
  const [toc, setToc] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTOC, setSelectedTOC] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API.Get_Student);
      const text = await response.text();
      
      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.status} ${text}`);
      }

      const data = JSON.parse(text);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid student data format received');
      }
      
      setStudents(data);
    } catch (error) {
      console.error('Student fetch error:', error);
      Alert.alert('Error', error.message || 'Failed to fetch students.');
    }
  };

  const fetchTOC = async () => {
    try {
      const response = await fetch(API.Get_TableOfContents);
      const text = await response.text();
      
      if (!response.ok) {
        throw new Error(`Failed to fetch TOC: ${response.status} ${text}`);
      }

      const data = JSON.parse(text);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid TOC data format received');
      }
      
      setToc(data);
    } catch (error) {
      console.error('TOC fetch error:', error);
      Alert.alert('Error', error.message || 'Failed to fetch TOC.');
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTOC();
  }, []);

  const handleAssignTOC = async () => {
    if (!selectedStudent || !selectedTOC) {
      Alert.alert('Error', 'Please select both student and TOC.');
      return;
    }

    try {
      const payload = {
        StudentID: parseInt(selectedStudent, 10),
        TOCID: parseInt(selectedTOC, 10)
      };

      const response = await fetch(API.Assign_TOC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result || 'Failed to assign TOC');
      }

      Alert.alert('Success', result === 'TOC assigned successfully.' ? result : 'TOC assigned successfully.');
      setSelectedStudent(null);
      setSelectedTOC(null);
    } catch (error) {
      console.error('Assignment error:', error);
      Alert.alert('Error', error.message || 'Failed to assign TOC. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('./assets/bg1.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
        <Text style={styles.header}>Assign Chapters To Student</Text>
          <Text style={styles.title}>Select Student:</Text>
          <Picker
            selectedValue={selectedStudent}
            onValueChange={setSelectedStudent}
            style={styles.picker}
          >
            <Picker.Item label="-- Select Student --" value={null} />
            {students.map((student) => (
              <Picker.Item
                key={student.UserID}
                label={student.Name || 'Unnamed Student'}
                value={student.UserID.toString()}
              />
            ))}
          </Picker>

          <Text style={styles.title}>Select TOC:</Text>
          <Picker
            selectedValue={selectedTOC}
            onValueChange={setSelectedTOC}
            style={styles.picker}
          >
            <Picker.Item label="-- Select TOC --" value={null} />
            {toc.map((item) => (
              <Picker.Item
                key={item.TOCID}
                label={`${item.ChapterName} (Page ${item.PageNumber})` || 'Untitled Section'}
                value={item.TOCID.toString()}
              />
            ))}
          </Picker>

          <Button 
            title="Assign TOC" 
            onPress={handleAssignTOC} 
            color="#003366"
          />
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
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#003366',
    textAlign: 'center',
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#003366',
  },
  picker: {
    marginBottom: 20,
  },
});

export default AssignTOCScreen;