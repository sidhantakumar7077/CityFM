import { StatusBar, StyleSheet, View, Text, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import VersionCheck from 'react-native-version-check';

// SplashScreen
import SplashScreen from './src/Screen/SplashScreen/Index';

// Pages
import LivePage from './src/Screen/LivePage/Index';
import Home_2 from './src/Screen/Home_2/Index';
import ParkingPage from './src/Screen/ParkingPage/Index';
import AllNitePage from './src/Screen/AllNitePage/Index';
import Darshan from './src/Screen/Darshan/Index';
import MahaPrashad from './src/Screen/MahaPrashad/Index';
import Panji from './src/Screen/Panji/Index';
import Festival from './src/Screen/Festival/Index';
import BhaktaNibas from './src/Screen/BhaktaNibas/Index';
import Locker_shoes from './src/Screen/Locker_shoes/Index';
import NearbyTemple from './src/Screen/NearbyTemple/Index';
import DrinkingWater from './src/Screen/DrinkingWater/Index';
import RouteMap from './src/Screen/RouteMap/Index';
import LostFound from './src/Screen/LostFound/Index';
import Toilet from './src/Screen/Toilet/Index';
import Beaches from './src/Screen/Beaches/Index';
import BusRailwayStop from './src/Screen/BusRailwayStop/Index';
import ChargingStation from './src/Screen/ChargingStation/Index';
import PetrolPump from './src/Screen/PetrolPump/Index';
import Atm from './src/Screen/Atm/Index';
import LifeGuardBooth from './src/Screen/LifeGuardBooth/Index';
import Offering from './src/Screen/Offering/Index';
import OfferingMenu from './src/Screen/OfferingMenu/Index';
import OfferingForm from './src/Screen/OfferingForm/Index';
import OfferingSubmitPage from './src/Screen/OfferingSubmitPage/Index';
import TempleWorldWide from './src/Screen/TempleWorldWide/Index';
import Tv from './src/Screen/Tv/Index';
import RathaYatraMainPage from './src/Screen/RathaYatraMainPage/Index';
import TempleInformationPage from './src/Screen/TempleInformationPage/Index';
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
export const base_url = "https://shreejagannathadham.com/";

const App = () => {

  const [showSplash, setShowSplash] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const currentVersion = await VersionCheck.getCurrentVersion(); // Ensure this is awaited
        const storeVersion = await VersionCheck.getLatestVersion({
          provider: 'playStore', // For iOS, use 'appStore'
        });

        console.log("storeVersion:", storeVersion);
        console.log("currentVersion:", currentVersion);

        const updateInfo = await VersionCheck.needUpdate({
          currentVersion,
          latestVersion: storeVersion,
        });

        console.log("Update needed:", updateInfo.isNeeded);

        if (updateInfo.isNeeded) {
          setLatestVersion(storeVersion);
          setShowUpdateModal(true);
          console.log("Update is required to version:", storeVersion);
        }
      } catch (error) {
        console.error('Error checking app version:', error);
      }
    };

    checkForUpdates();
  }, []);

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
        const today = moment().startOf('day');

        // Filter notices where today is within start_date and end_date (inclusive)
        const todaysNotices = result.data.filter((notice: { start_date: moment.MomentInput; end_date: moment.MomentInput; }) => {
          const start = moment(notice.start_date, 'YYYY-MM-DD').startOf('day');
          const end = moment(notice.end_date, 'YYYY-MM-DD').endOf('day');

          return today.isBetween(start, end, undefined, '[]'); // [] = inclusive
        });

        if (todaysNotices.length > 0) {
          console.log("Today's Notices:", todaysNotices);
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
    // getNoticeForToday();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#341551" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null} */}
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

      {/* Version Update Modal */}
      <Modal isVisible={showUpdateModal} style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.modalHeader}>Update Available</Text>
          <Text style={styles.modalText}>
            A new version of the app is available. Please update to version <Text style={styles.modalVersion}>{latestVersion}</Text> for the best experience.
          </Text>
          <View style={styles.modalButtonContainer}>
            <Text
              style={styles.modalButton}
              onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.shreejagannatha.dham')}
            >
              Update Now
            </Text>
          </View>
        </View>
      </Modal>

    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c9170a', // Highlight color for the header
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalVersion: {
    fontWeight: 'bold',
    color: '#333',
  },
  modalButtonContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#c9170a',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '80%',
  },
});