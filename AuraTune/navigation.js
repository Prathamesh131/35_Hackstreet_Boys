import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';

// Import your screen components here
import HomeScreen from './src/screens/HomeScreen';
import UploadedVoiceScreen from './src/screens/UploadedVoiceScreen';
import RecordVoiceScreen from './src/screens/RecordVoiceScreen';
import FunZoneScreen from './src/screens/FunZoneScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Uploaded Voice"
          component={UploadedVoiceScreen}
          options={{
            tabBarLabel: 'Uploaded Voice',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-upload" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Record Voice"
          component={RecordVoiceScreen}
          options={{
            tabBarLabel: 'Record Voice',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mic" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Fun Zone"
          component={FunZoneScreen}
          options={{
            tabBarLabel: 'Fun Zone',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="game-controller" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Contact Us"
          component={ContactUsScreen}
          options={{
            tabBarLabel: 'Contact Us',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mail" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
