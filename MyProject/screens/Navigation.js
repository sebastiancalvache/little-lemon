import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './OnBoarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import Profile from './Profile';
import Splash from './SplashScreen';
import React,{useContext} from 'react';
import { UserContext } from '../context/UserContext'; // Import the useUser hook



export default function Navigation() {
  const [isLoading,changeIsLoading] = useState(true);
  const Stack = createNativeStackNavigator();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const getLoggedIn = async() => {
    
    try{
      setIsLoggedIn(await AsyncStorage.getItem('@loggedIn') == 'true');
    }
    catch(error)
    {
      setIsLoggedIn(false)
      console.error(`An error occurred: ${error.message}`);
    }
    finally{
      changeIsLoading(false);
    }
  }
React.useEffect(() => { 
  getLoggedIn();
}, []); 

  if (isLoading) {
    return <Splash />;
    }
  return (
    <NavigationContainer>
    <Stack.Navigator>
      {isLoggedIn ? (<Stack.Screen name='Profile' component={Profile}/>) : (<Stack.Screen name='OnBoarding' component={OnBoarding} />)}
    </Stack.Navigator>

  </NavigationContainer>
  );
}

