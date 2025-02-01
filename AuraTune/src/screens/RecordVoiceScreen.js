import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const RecordVoiceScreen = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);
  const [sound, setSound] = useState();

  // Start recording function
  const startRecording = async () => {
    try {
      setIsLoading(true);
      await Audio.requestPermissionsAsync();
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Stop recording function
  const stopRecording = async () => {
    try {
      setIsLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedUri(uri);

      // Upload the file to the backend
      await uploadAudioToBackend(uri);

      setRecording(null);
      setIsRecording(false);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  // Function to upload the recording to the backend
  const uploadAudioToBackend = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('audioFile', {
        uri,
        name: 'audio.mp4',
        type: 'audio/mp4', // Adjust based on your recorded file format
      });

      const response = await fetch('http://192.168.137.1:5000/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Upload Successful', `File uploaded: ${data.filePath}`);
      } else {
        Alert.alert('Upload Failed', data.message);
      }
    } catch (error) {
      console.error('Upload failed', error);
      Alert.alert('Error', 'Failed to upload the audio file.');
    }
  };

  // Function to play the recorded audio
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Your Voice</Text>
      <Text style={styles.subtitle}>Press to start and stop recording your voice.</Text>

      {/* Recording Buttons */}
      {!isRecording ? (
        <TouchableOpacity
          style={styles.recordButton}
          onPress={startRecording}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <Ionicons name="mic" size={30} color="#fff" />
              <Text style={styles.recordText}>Start Recording</Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.stopButton}
          onPress={stopRecording}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <Ionicons name="stop" size={30} color="#fff" />
              <Text style={styles.recordText}>Stop Recording</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Display Recorded Audio and Play Option */}
      {recordedUri && (
        <View style={styles.recordedFile}>
          <Text style={styles.recordedFileText}>Recording Saved!</Text>
          <Text style={styles.recordedFileUri}>{recordedUri}</Text>
          <TouchableOpacity onPress={playSound} style={styles.playButton}>
            <Ionicons name="play" size={30} color="#6200EE" />
            <Text style={styles.playButtonText}>Play Recording</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A148C',
    marginBottom: 30,
    textAlign: 'center',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 20,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 20,
  },
  recordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  recordedFile: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  recordedFileText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordedFileUri: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#6200EE',
    borderRadius: 50,
  },
  playButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
});

export default RecordVoiceScreen;
