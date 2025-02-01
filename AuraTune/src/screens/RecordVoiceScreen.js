import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RecordVoiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Voice</Text>
      <Button title="Start Recording" onPress={() => console.log('Start Recording')} />
      <Button title="Stop Recording" onPress={() => console.log('Stop Recording')} />
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

export default RecordVoiceScreen;
