import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";

// SplashScreen
import SplashScreen from './src/Screen/SplashScreen/Index'

// No Internet Page
import NoInternet from './src/Screen/NoInternet/Index'

// Pages
import LivePage from './src/Screen/LivePage/Index'
import Home from './src/Screen/Home/Index'
import ContentList from './src/Screen/ContentList/Index'
import ContentListHome from './src/Screen/ContentListHome/Index'
import PreviousProgram from './src/Screen/PreviousProgram/Index'
import ParkingPage from './src/Screen/ParkingPage/Index'
import AllNitePage from './src/Screen/AllNitePage/Index'

const Stack = createNativeStackNavigator();

export const base_url = "https://pandit.33crores.com/";

const App = () => {

  const [showSplash, setShowSplash] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected ?? false);
    });
    return () => {
      unsubscribe();
      // setTimeout(unsubscribe, 5000);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000)
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#4B7100" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        {!isConnected ? (
          <Stack.Screen name="NoInternet" component={NoInternet} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LivePage" component={LivePage} />
            <Stack.Screen name="ContentList" component={ContentList} />
            <Stack.Screen name="ContentListHome" component={ContentListHome} />
            <Stack.Screen name="PreviousProgram" component={PreviousProgram} />
            <Stack.Screen name="ParkingPage" component={ParkingPage} />
            <Stack.Screen name="AllNitePage" component={AllNitePage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App