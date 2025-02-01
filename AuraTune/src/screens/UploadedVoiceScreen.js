import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadedVoiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Voice</Text>
      <Text>Here, you can view uploaded voices.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default UploadedVoiceScreen;
