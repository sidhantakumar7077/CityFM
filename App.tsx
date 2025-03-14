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
import Home_2 from './src/Screen/Home_2/Index'
import ContentList from './src/Screen/ContentList/Index'
import ContentListHome from './src/Screen/ContentListHome/Index'
import PreviousProgram from './src/Screen/PreviousProgram/Index'
import ParkingPage from './src/Screen/ParkingPage/Index'
import AllNitePage from './src/Screen/AllNitePage/Index'
import Darshan from './src/Screen/Darshan/Index'
import MahaPrashad from './src/Screen/MahaPrashad/Index'
import BhaktaNibas from './src/Screen/BhaktaNibas/Index'
import Locker_shoes from './src/Screen/Locker_shoes/Index'

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
      <StatusBar backgroundColor="#ba62f5" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        {!isConnected ? (
          <Stack.Screen name="NoInternet" component={NoInternet} />
        ) : (
          <>
            <Stack.Screen name="Home_2" component={Home_2} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LivePage" component={LivePage} />
            <Stack.Screen name="ContentList" component={ContentList} />
            <Stack.Screen name="ContentListHome" component={ContentListHome} />
            <Stack.Screen name="PreviousProgram" component={PreviousProgram} />
            <Stack.Screen name="ParkingPage" component={ParkingPage} />
            <Stack.Screen name="AllNitePage" component={AllNitePage} />
            <Stack.Screen name="Darshan" component={Darshan} />
            <Stack.Screen name="MahaPrashad" component={MahaPrashad} />
            <Stack.Screen name="BhaktaNibas" component={BhaktaNibas} />
            <Stack.Screen name="Locker_shoes" component={Locker_shoes} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App