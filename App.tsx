import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// SplashScreen
import SplashScreen from './src/Screen/SplashScreen/Index'

// Pages
import LivePage from './src/Screen/LivePage/Index'
import Home_2 from './src/Screen/Home_2/Index'
import ParkingPage from './src/Screen/ParkingPage/Index'
import AllNitePage from './src/Screen/AllNitePage/Index'
import Darshan from './src/Screen/Darshan/Index'
import MahaPrashad from './src/Screen/MahaPrashad/Index'
import Panji from './src/Screen/Panji/Index'
import Festival from './src/Screen/Festival/Index'
import BhaktaNibas from './src/Screen/BhaktaNibas/Index'
import Locker_shoes from './src/Screen/Locker_shoes/Index'
import NearbyTemple from './src/Screen/NearbyTemple/Index'
import DrinkingWater from './src/Screen/DrinkingWater/Index'
import RouteMap from './src/Screen/RouteMap/Index'
import LostFound from './src/Screen/LostFound/Index'
import Toilet from './src/Screen/Toilet/Index'
import Beaches from './src/Screen/Beaches/Index'
import BusRailwayStop from './src/Screen/BusRailwayStop/Index'
import ChargingStation from './src/Screen/ChargingStation/Index'
import PetrolPump from './src/Screen/PetrolPump/Index'
import Atm from './src/Screen/Atm/Index'
import LifeGuardBooth from './src/Screen/LifeGuardBooth/Index'
import Offering from './src/Screen/Offering/Index'
import OfferingMenu from './src/Screen/OfferingMenu/Index'
import OfferingForm from './src/Screen/OfferingForm/Index'
import OfferingSubmitPage from './src/Screen/OfferingSubmitPage/Index'
import TempleWorldWide from './src/Screen/TempleWorldWide/Index'
import Tv from './src/Screen/Tv/Index'
import RathaYatraMainPage from './src/Screen/RathaYatraMainPage/Index'
import TempleInformationPage from './src/Screen/TempleInformationPage/Index'
import LordSupreme from './src/Screen/TempleInfoDetailsPage/LordSupreme';
import ThroughTheAges from './src/Screen/TempleInfoDetailsPage/ThroughTheAges';
import LivingTradition from './src/Screen/TempleInfoDetailsPage/LivingTradition';
import Festivals from './src/Screen/TempleInfoDetailsPage/Festivals';
import RathaYatra from './src/Screen/TempleInfoDetailsPage/RathaYatra';
import VisitorServices from './src/Screen/TempleInfoDetailsPage/VisitorServices';
import Management from './src/Screen/TempleInfoDetailsPage/Management';
import Privacy_policy from './src/Screen/Privacy_policy/Index';

const Stack = createNativeStackNavigator();

// export const base_url = "http://temple.mandirparikrama.com/";
export const base_url = "http://temple.mandirparikrama.com/";

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4000)
  }, []);

  const getNoticeForToday = async () => {
    try {
      const response = await fetch(`${base_url}api/latest-temple-notice`);
      const result = await response.json();

      if (result.status && Array.isArray(result.data)) {
        const today = moment().format('YYYY-MM-DD');

        // Filter only notices with today's date
        const todaysNotices = result.data.filter(
          (notice: { notice_date: string; }) => notice.notice_date === today
        );

        if (todaysNotices.length > 0) {
          console.log("Today's Notices:", todaysNotices);
          // set todaysNotices to async storage
          await AsyncStorage.setItem('todaysNotices', JSON.stringify(todaysNotices));
        } else {
          console.log("No notices for today.");
        }
      } else {
        console.log("Invalid or empty data.");
      }
    } catch (error) {
      console.log("Fetch Notice Error:", error);
    }
  };

  useEffect(() => {
    getNoticeForToday();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#341551" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
        <>
          <Stack.Screen name="Home_2" component={Home_2} />
          <Stack.Screen name="LivePage" component={LivePage} />
          <Stack.Screen name="Tv" component={Tv} />
          <Stack.Screen name="AllNitePage" component={AllNitePage} />
          <Stack.Screen name="Darshan" component={Darshan} />
          <Stack.Screen name="MahaPrashad" component={MahaPrashad} />
          <Stack.Screen name="Panji" component={Panji} />
          <Stack.Screen name="Festival" component={Festival} />
          <Stack.Screen name="BhaktaNibas" component={BhaktaNibas} />
          <Stack.Screen name="ParkingPage" component={ParkingPage} />
          <Stack.Screen name="Locker_shoes" component={Locker_shoes} />
          <Stack.Screen name="NearbyTemple" component={NearbyTemple} />
          <Stack.Screen name="DrinkingWater" component={DrinkingWater} />
          <Stack.Screen name="RouteMap" component={RouteMap} />
          <Stack.Screen name="LostFound" component={LostFound} />
          <Stack.Screen name="Toilet" component={Toilet} />
          <Stack.Screen name="Beaches" component={Beaches} />
          <Stack.Screen name="BusRailwayStop" component={BusRailwayStop} />
          <Stack.Screen name="ChargingStation" component={ChargingStation} />
          <Stack.Screen name="PetrolPump" component={PetrolPump} />
          <Stack.Screen name="Atm" component={Atm} />
          <Stack.Screen name="LifeGuardBooth" component={LifeGuardBooth} />
          <Stack.Screen name="Offering" component={Offering} />
          <Stack.Screen name="OfferingMenu" component={OfferingMenu} />
          <Stack.Screen name="OfferingForm" component={OfferingForm} />
          <Stack.Screen name="OfferingSubmitPage" component={OfferingSubmitPage} />
          <Stack.Screen name="TempleWorldWide" component={TempleWorldWide} />
          <Stack.Screen name="RathaYatraMainPage" component={RathaYatraMainPage} />
          <Stack.Screen name="TempleInformationPage" component={TempleInformationPage} />
          <Stack.Screen name="LordSupreme" component={LordSupreme} />
          <Stack.Screen name="ThroughTheAges" component={ThroughTheAges} />
          <Stack.Screen name="LivingTradition" component={LivingTradition} />
          <Stack.Screen name="Festivals" component={Festivals} />
          <Stack.Screen name="RathaYatra" component={RathaYatra} />
          <Stack.Screen name="VisitorServices" component={VisitorServices} />
          <Stack.Screen name="Management" component={Management} />
          <Stack.Screen name="Privacy_policy" component={Privacy_policy} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App