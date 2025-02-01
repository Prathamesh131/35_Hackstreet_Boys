import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const funThoughts = [
  "Music is the universal language of mankind. 🎶",
  "Where words fail, music speaks. 🎵",
  "Turn up the volume of your dreams. 🔊",
  "Sing like no one is listening. 🎤",
  "Every song has a story to tell. 📖",
];

const HomeScreen = ({ navigation }) => {
  const [randomThought, setRandomThought] = useState("");

  useEffect(() => {
    setRandomThought(funThoughts[Math.floor(Math.random() * funThoughts.length)]);
  }, []);

  return (
    <View style={styles.container}>
      {/* App Logo & Name */}
      {/* <Image source={require('../../assets/logo.png')} style={styles.logo} /> */}
      <Text style={styles.appName}>AuraTune</Text>

      {/* Lottie Animation */}
      <LottieView
        source={require('../../assets/animation.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Fun Thought */}
      <Text style={styles.funThought}>{randomThought}</Text>

      {/* Navigation Buttons */}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Uploaded Voice')}>
        <Text style={styles.buttonText}>Uploaded Voice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Record Voice')}>
        <Text style={styles.buttonText}>Record Voice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fun Zone')}>
        <Text style={styles.buttonText}>Fun Zone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact Us')}>
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD', // Light blue background
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A148C', // Deep Purple
    marginBottom: 15,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  funThought: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#FF6D00', // Vibrant Orange
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#2962FF', // Cool Blue
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Adds shadow effect for Android
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text
    textAlign: 'center',
  },
});

export default HomeScreen;
