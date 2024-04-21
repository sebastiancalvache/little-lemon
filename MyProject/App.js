import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './screens/OnBoarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import Profile from './screens/Profile';
import Splash from './screens/SplashScreen';



export default function App() {
  const [isLoading,changeIsLoading] = useState(true);
  const [loggedIn,changeLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator();
useEffect(() => { 
  (async () => { 
    try{
      //await AsyncStorage.setItem('@loggedIn','false');
      //console.log('entrraaaaa')
      //console.log('before render',await AsyncStorage.getItem('@loggedIn'));
      changeLoggedIn(await AsyncStorage.getItem('@loggedIn') == 'false' ? false : true);
      
      changeIsLoading(false);
    }
    catch(error)
    {
      console.error(`An error occurred: ${error.message}`);
    }
  })(); 
}, []); 

  if (isLoading) {
     // We haven't finished reading from AsyncStorage yet
     return <Splash />;
    }
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? (<Stack.Screen name='Profile' component={Profile}/>) : (
          <><Stack.Screen name='OnBoarding' component={OnBoarding} /><Stack.Screen name='Profile' component={Profile} /></>)}
        </Stack.Navigator>

      </NavigationContainer>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
