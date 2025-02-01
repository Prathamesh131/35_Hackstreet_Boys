import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const funThoughts = [
  "Music is the universal language of mankind. 🎶",
  "Where words fail, music speaks. 🎵",
  "Turn up the volume of your dreams. 🔊",
  "Sing like no one is listening. 🎤",
  "Every song has a story to tell. 📖",
];

const HomeScreen = () => {
  const [randomThought, setRandomThought] = useState("");
  const navigation = useNavigation();

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
    </View>
  );
};

// Set custom header options
HomeScreen.navigationOptions = {
  title: "AuraTune",
  headerStyle: {
    backgroundColor: "#4A148C", // Deep Purple Background
  },
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
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
    color: '#4A148C',
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
    color: '#FF6D00',
    marginBottom: 25,
  },
});

export default HomeScreen;
