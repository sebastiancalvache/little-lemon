// Navigation.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from './OnBoarding';
import Profile from './Profile';
import Splash from './SplashScreen';
import Home from './Home';
import { UserContext } from '../context/UserContext';
import * as Font from "expo-font";
import { fetchMenu, getMenuItems, saveMenuInDB } from '../services/menuService';

export default function Navigation() {
  const [isLoading, changeIsLoading] = useState(true);
  const Stack = createNativeStackNavigator();
  const { isLoggedIn, setIsLoggedIn, setUserInfo, setMenu, setCategories,filters } = React.useContext(UserContext);
  const [fontLoaded] = Font.useFonts({
    Markazi: require("../assets/fonts/MarkaziText-Regular.ttf"),
    Karla: require("../assets/fonts/Karla-Regular.ttf"),
  });
 
  useEffect(() => {


    const getLoggedIn = async () => {
      try {
        setIsLoggedIn((await AsyncStorage.getItem('@loggedIn')) === 'true');
        setUserInfo(JSON.parse(await AsyncStorage.getItem('@personal_info')));
        await processMenu();
      } catch (error) {
        setIsLoggedIn(false);
        console.error(`An error occurred: ${error.message}`);
      } finally {
        changeIsLoading(false);
      }
    };

    getLoggedIn();
  }, []);
  
  async function  processMenu(){
    let menuItems = await getMenuItems(filters,'');
    if(menuItems.length == 0)
    {
      const fetchedData = await fetchMenu();
      await saveMenuInDB(fetchedData.menu);
      menuItems = await getMenuItems(filters,'');
    }

    let categories = [];
     menuItems.map((item) =>{
      if(categories.indexOf(item.category) == -1) categories.push(item.category);
    });
    setCategories(categories);
    setMenu(menuItems);
  }

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Profile' component={Profile} />
          </>
        ) : (
          <>  
            <Stack.Screen name='OnBoarding' component={OnBoarding} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}