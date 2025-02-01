import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UploadedVoiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Voice</Text>
      <Text style={styles.subtitle}>Here, you can view and manage uploaded voices.</Text>

      {/* Action Button */}
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
        <Text style={styles.actionText}>View Uploaded Voices</Text>
      </TouchableOpacity>

      {/* Additional fun or instructional text */}
      <Text style={styles.instructionText}>
        No voices uploaded yet? Start uploading now and explore your collection of voices!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1F5FE', // Soft blue background
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00796B', // Teal color for a fresh look
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#004D40', // Darker teal for subtle contrast
    marginBottom: 30,
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00796B', // Teal button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Adds shadow effect for Android
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for button
    marginLeft: 10,
  },
  instructionText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#00796B', // Match the button's color
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UploadedVoiceScreen;
