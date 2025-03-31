import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
// import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from 'react-native-swiper';
import { base_url } from "../../../App";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Index = () => {

    const serviceData = [
        { title: 'Darshan', icon: 'calendar-check', color: '#B09ECF' },
        { title: 'MahaPrashad', icon: 'food-apple', color: '#E9A93F' },
        { title: 'Panji', icon: 'calendar-month', color: '#92C362' },
        { title: 'Offering', icon: 'gift', color: '#87B5D8' },
    ];

    const bannerData = [
        {
            image: require('../../assets/image/SplashLogo.png'),
            title: 'Get the latest updates',
            subtitle: 'Subscribe to our newsletter',
        },
        {
            image: require('../../assets/image/SplashLogo.png'),
            title: 'Exclusive Offers',
            subtitle: 'Don’t miss out on discounts',
        },
    ];

    const demoBannerData = [
        {
            image: require('../../assets/image/ratha_yatra123.png'),
            title: 'Ratha Yatra Updates',
            subtitle: 'All types of information',
        },
        {
            image: require('../../assets/image/ratha_yatra.png'),
            title: 'Exclusive Offers',
            subtitle: 'Don’t miss out on discounts',
        },
    ];

    const nearByTemple = [
        {
            id: 1,
            image: 'https://i.pinimg.com/736x/a9/20/0d/a9200d2079ff66d583f09d59263feeb8.jpg',
            title: 'Nearby Temple 1',
            description: 'This is a description for item 1.',
            buttonText: 'Try Now',
        },
        {
            id: 2,
            image: 'https://www.toshaliresort.com/images/resource/jagannath-temple-puri.jpg',
            title: 'Nearby Temple 2',
            description: 'This is a description for item 2.',
            buttonText: 'Explore',
        },
        {
            id: 3,
            image: 'https://i.pinimg.com/736x/49/8b/d5/498bd56d3aa85ed59abb64804b684c91.jpg',
            title: 'Nearby Temple 3',
            description: 'This is a description for item 3.',
            buttonText: 'Discover',
        },
        {
            id: 4,
            image: 'https://www.mistay.in/travel-blog/content/images/2022/11/PuriTemple.jpeg',
            title: 'Nearby Temple 4',
            description: 'This is a description for item 4.',
            buttonText: 'Explore',
        },
        {
            id: 5,
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUyi7x_evyNcYKUGG4qj7ATgSXEBPE-ivU5L9FPCMNxq9_ZGa-KO8cyCQ1qCttXocW5njeMKKgxqega9hsYksx3QmUarClaYDXivUkLTNF3si2HD-ISncG6uFWym2WKJi78PjYHeEokJcp/s1600/puri+jaganatha.jpg',
            title: 'Nearby Temple 5',
            description: 'This is a description for item 5.',
            buttonText: 'Discover',
        },
    ];

    const conveniences = [
        { id: '3', iconType: FontAwesome5, icon: 'wheelchair', label: 'Physical Handicap & Sr Citizen', page: '' },
        { id: '2', iconType: FontAwesome5, icon: 'phone-alt', label: 'Emergency Contact', page: '' },
        { id: '9', iconType: FontAwesome5, icon: 'life-ring', label: 'Life Guard    Contacts', page: 'LifeGuardBooth' },
        { id: '6', iconType: FontAwesome5, icon: 'search', label: 'Lost & Found', page: '' },
        { id: '1', iconType: MaterialCommunityIcons, icon: 'water-pump', label: 'Drinking Water', page: 'DrinkingWater' },
        { id: '7', iconType: FontAwesome5, icon: 'toilet', label: 'Toilet', page: 'Toilet' },
        { id: '12', iconType: FontAwesome5, icon: 'hotel', label: 'Hotel', page: 'Hotel' },
        { id: '13', iconType: FontAwesome5, icon: 'utensils', label: 'Restaurant', page: 'Restaurant' },
        { id: '8', iconType: FontAwesome5, icon: 'umbrella-beach', label: 'Beaches', page: 'Beaches' },
        { id: '5', iconType: FontAwesome, icon: 'hotel', label: 'Dharmashala', page: 'Dharmashala' },
        { id: '15', iconType: FontAwesome5, icon: 'rupee-sign', label: 'ATM', page: 'Atm' },
        { id: '4', iconType: FontAwesome5, icon: 'map-marked-alt', label: 'Route Map', page: '' },
        { id: '11', iconType: FontAwesome5, icon: 'gas-pump', label: 'Petrol Pump', page: 'PetrolPump' },
        { id: '14', iconType: FontAwesome5, icon: 'bus', label: 'Bus Stand/Railway Station', page: 'BusRailwayStop' },
        { id: '10', iconType: FontAwesome5, icon: 'charging-station', label: 'Charging Station', page: 'ChargingStation' },
    ];

    const emergencyContacts = [
        { name: 'Police', phone: '100' },
        { name: 'Ambulance', phone: '108' },
        { name: 'Fire Service', phone: '101' },
        { name: 'Women Helpline', phone: '1091' },
        { name: 'Life Guard', phone: '06752-222002' },
    ];

    const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const templeInfo = [
        { id: '1', image: require('../../assets/image/shreemandira.png'), label: 'Shree Mandira' },
        { id: '2', image: require('../../assets/image/shreekhetra.png'), label: 'Shree Khetra' },
        { id: '3', image: require('../../assets/image/tradition.png'), label: 'Tradition' },
        { id: '12', image: require('../../assets/image/rathaYatra.png'), label: 'Ratha yatra' },
        // { id: '13', image: require('../../assets/image/nabakalebala.png'), label: 'Nabakalebala' },
        { id: '4', image: require('../../assets/image/matha22.png'), label: 'Matha & Ashram' },
        { id: '5', image: require('../../assets/image/festival.png'), label: 'Festivals' },
        { id: '6', image: require('../../assets/image/36nijog.png'), label: '36 Nijoga' },
        { id: '7', image: require('../../assets/image/besha.png'), label: 'Besha' },
        { id: '8', image: require('../../assets/image/people.png'), label: 'Management' },
    ];

    const eventTypes = [
        { icon: '☀️', name: 'Sankranti' },
        { icon: '🌑', name: 'Amavasya' },
        { icon: '🌕', name: 'Pournami' },
        { icon: '🪔', name: 'Festival' },
        { icon: '🌘', name: 'Eclipse' },
        { icon: '🔥', name: 'Pradosha' },
        { icon: '🙏', name: 'Sankashti Chaturthi' },
        { icon: '🕉️', name: 'Shasti' },
        { icon: '〰️', name: 'Ekadashi' }
    ];

    const extraItems = [
        { id: '1', title: 'Bhakta Nibas', description: 'Temple Owned Properties For Pligrimas to stay', image: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png', large: true },
        { id: '2', title: 'Parking', description: '2, 3, 4 Wheelers', image: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png' },
        { id: '3', title: 'Locker & Shoes', description: 'Free Stand Service', image: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png' },
    ];

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    // const [selectedDate, setSelectedDate] = useState('');
    const [active, setActive] = useState('World Wide');
    const [selectedTab, setSelectedTab] = useState('Temples');

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 3 * itemsPerRow; // Show 3 rows initially

    const [nitiList, setNitiList] = useState([]);
    const [banners, setBanners] = useState([]);
    const [nearbyTemples, setNearbyTemples] = useState([]);
    const [previousAmount, setPreviousAmount] = useState(0);

    const getData = async () => {
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Get Home Page Data:', result);

            if (result.status) {
                const { niti_master, banners, nearby_temples, totalPreviousAmount } = result.data;

                setNitiList(niti_master || []);
                setBanners(banners || []);
                setNearbyTemples(nearby_temples || []);
                setPreviousAmount(totalPreviousAmount || 0);
            } else {
                console.warn('API responded with status false:', result.message);
            }

        } catch (error) {
            console.error('Error fetching home section data:', error);
        }
    };


    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/ratha.jpeg")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, resizeMode: 'cover' }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('RathaYatraMainPage')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <SimpleLineIcons name="settings" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 80, width: '100%', left: 13 }}>
                        <View style={{ textAlign: 'center', marginLeft: 8 }}>
                            <Text style={{ color: '#d9dbdb', fontSize: 14, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginBottom: 2 }}>Welcome to</Text>
                            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Jagannatha</Text>
                            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Dham</Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Current Niti Box */}
                <ScrollView style={{ padding: 8, alignSelf: 'center', marginTop: -50 }} horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} decelerationRate="fast" nestedScrollEnabled={true}>
                    <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Dwara Phita & Mangala Alati</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th April</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>5 AM or earlier</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Mailam</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th April</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>6 AM</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 200, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AllNitePage')} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>View All Niti</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Ratha Yatra Banner */}
                <View style={{ height: 150, marginVertical: 10 }}>
                    <Swiper
                        // autoplay
                        // autoplayTimeout={4}
                        showsPagination={true}
                        paginationStyle={{ bottom: -7 }}
                        dotColor="#999"
                        activeDotColor="#341551"
                        containerStyle={{ borderRadius: 10 }}
                    >
                        {demoBannerData.map((item, index) => (
                            <View key={index} style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('RathaYatraMainPage')} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>View</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                    <Image source={item.image} style={{ width: 110, height: 100 }} resizeMode="contain" />
                                </View>
                            </View>
                        ))}
                    </Swiper>
                </View>

                {/* Live Broadcast Section */}
                <View style={styles.liveCard}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '26%' }}>
                            <Text style={styles.liveTitle}>Shree Mandira</Text>
                            <View style={{ marginTop: 5, borderRadius: 7, overflow: 'hidden' }}>
                                <LinearGradient
                                    colors={['#FFA726', '#F06292']} // orange to pink gradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        width: 74,
                                        height: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 7,
                                    }}
                                >
                                    <Octicons name="zap" size={15} color="#fff" />
                                    <Text style={styles.liveSubText}>Live</Text>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={{ width: '34%' }}>
                            <Text style={{ textAlign: 'left', fontFamily: 'FiraSans-Light', color: '#000', fontSize: 13.6 }}>Listen or Watch all the live broadcasts from Shree Mandira</Text>
                        </View>
                        <View style={{ width: '36%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('LivePage')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                    {/* <FontAwesome6 name="radio" size={18} color="#6A0DAD" /> */}
                                    <Image source={require('../../assets/image/radio214142.png')} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#F06292' }}>Radio</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 50, width: 1.4 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Tv')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                    {/* <MaterialCommunityIcons name="youtube-tv" size={20} color="#6A0DAD" /> */}
                                    <Image source={require('../../assets/image/tv241424.png')} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#456096' }}>TV</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Services Section */}
                <View style={{ padding: 15 }}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Quick Services</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Darshan')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'calendar-check'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/darshan4.png')} style={{ width: 75, height: 75 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Darshan</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MahaPrashad')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'food-apple'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/mahaprasadad32412.png')} style={{ width: 75, height: 75 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>MahaPrashad</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Panji')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'calendar-month'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/panji.png')} style={{ width: 60, height: 60 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Panji</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Offering')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'gift'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/OFFERING2.png')} style={{ width: 60, height: 60 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Offering</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Bhakta Nibas</Text>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular', color: '#333', lineHeight: 20 }}>Temple Owned Properties For Pligrimas to stay</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png' }} style={{ width: 50, height: 50 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Parking</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>2, 3, 4 Wheelers</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/parkinng241414.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Locker_shoes')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Locker & Shoes</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Free Stand service</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/locker24214.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Online Donation</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Donate Now</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12209/12209405.png' }} style={{ width: 28, height: 28 }} />
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Hundi Collection</Text>
                                <Text style={{ fontSize: 12, color: '#fc2003', fontFamily: 'FiraSans-Medium', marginTop: 2 }}>₹5,30,000/-</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/619/619034.png' }} style={{ width: 28, height: 28 }} />
                            </View>
                        </View>
                    </View>

                </View>

                {/* Nearby Temples */}
                <View style={styles.nearbyContainer}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Nearby Religious Places</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} />

                    <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, marginVertical: 15, padding: 5 }}>
                        {/* Temples Tab */}
                        <TouchableOpacity
                            onPress={() => setSelectedTab('Temples')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'Temples' ? '#D64C64' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'Temples' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                Temples
                            </Text>
                        </TouchableOpacity>

                        {/* Mathas Tab */}
                        <TouchableOpacity
                            onPress={() => setSelectedTab('Mathas')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'Mathas' ? '#D64C64' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'Mathas' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                Mathas
                            </Text>
                        </TouchableOpacity>

                        {/* Ritual Sites Tab */}
                        <TouchableOpacity
                            onPress={() => setSelectedTab('RitualSites')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'RitualSites' ? '#D64C64' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'RitualSites' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                Ritual Sites
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={nearByTemple}
                        horizontal
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={(content) => {
                            return (
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('NearbyTemple')} style={styles.sliderCard}>
                                        <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={{ uri: content.item.image }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#333', marginTop: 10, marginLeft: 10 }}>{content.item.title}</Text>
                                </View>
                            )
                        }}
                    />
                </View>

                {/* conveniences */}
                <View style={{ padding: 15 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Conveniences</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>
                        {(expanded ? conveniences : conveniences.slice(0, maxVisibleItems)).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    if (item.page !== '') {
                                        navigation.navigate(item.page);
                                    } else if (item.label === 'Emergency Contact') {
                                        setEmergencyModalVisible(true);
                                    }
                                }}
                                style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}
                            >
                                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1ebf5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    <item.iconType name={item.icon} size={24} color="#D64C64" />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>

                    {conveniences.length > maxVisibleItems && (
                        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 20, marginTop: 10, alignSelf: 'center' }}>
                            <AntDesign name={expanded ? 'upcircleo' : 'downcircleo'} size={30} color="#D64C64" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Emergency Contact */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={emergencyModalVisible}
                    onRequestClose={() => setEmergencyModalVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 25, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10, alignItems: 'center' }}>
                            <MaterialIcons name="local-phone" size={40} color="#D64C64" style={{ marginBottom: 10 }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', color: '#341551', marginBottom: 15 }}>Emergency Contacts</Text>

                            {emergencyContacts.map((contact, index) => (
                                <TouchableOpacity key={index} onPress={() => handleCall(contact.phone)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 12, borderBottomWidth: index !== emergencyContacts.length - 1 ? 1 : 0, borderBottomColor: '#eee' }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{contact.name}</Text>
                                        <Text style={{ fontSize: 14, color: '#999' }}>{contact.phone}</Text>
                                    </View>
                                    <MaterialIcons name="call" size={24} color="#D64C64" />
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity onPress={() => setEmergencyModalVisible(false)} style={{ marginTop: 20, backgroundColor: '#D64C64', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 25 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Banner Section */}
                <View style={{ height: 150, marginTop: 10 }}>
                    <Swiper
                        // autoplay
                        // autoplayTimeout={4}
                        showsPagination={true}
                        paginationStyle={{ bottom: -7 }}
                        dotColor="#999"
                        activeDotColor="#341551"
                        containerStyle={{ borderRadius: 10 }}
                    >
                        {bannerData.map((item, index) => (
                            <View key={index} style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                    <TouchableOpacity style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>Subscribe</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                    <Image source={item.image} style={{ width: 85, height: 85 }} resizeMode="contain" />
                                </View>
                            </View>
                        ))}
                    </Swiper>
                </View>

                {/* Calendar Section */}
                {/* <View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Panji & Calendar</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    </View>
                    <ImageBackground source={require('../../assets/image/calendarBG.jpg')} style={styles.calendarContainer} imageStyle={{ resizeMode: 'cover', }}>
                        <Calendar
                            style={{ width: '90%', alignSelf: 'center', borderRadius: 10 }}
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: '#4B7100' },
                            }}
                            theme={{
                                backgroundColor: '#FBF5F5',
                                calendarBackground: '#fff',
                                textSectionTitleColor: '#4B7100',
                                selectedDayBackgroundColor: '#4B7100',
                                selectedDayTextColor: '#fff',
                                todayTextColor: '#D49100',
                                dayTextColor: '#333',
                                textDisabledColor: '#d9e1e8',
                                arrowColor: '#4B7100',
                                monthTextColor: '#4B7100',
                                textDayFontFamily: 'Lora-Bold',
                                textMonthFontFamily: 'Lora-Bold',
                                textDayHeaderFontFamily: 'Lora-Bold',
                                textDayFontSize: 16,
                                textMonthFontSize: 18,
                                textDayHeaderFontSize: 14,
                            }}
                        />
                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>Event's</Text>
                            <FlatList
                                data={eventTypes}
                                scrollEnabled={false}
                                numColumns={3}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <View style={styles.eventItem}>
                                        <Text style={styles.eventIcon}>{item.icon}</Text>
                                        <Text style={styles.eventText}>{item.name}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </ImageBackground>
                </View> */}

                {/* About Temple */}
                <View style={{ padding: 15, marginTop: 10 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Temple Information</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                    {/* Grid Layout */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 6 }}>
                        {templeInfo.map((item) => (
                            <View key={item.id} style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1ebf5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    <Image source={item.image} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Temples Worldwide */}
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Jagannatha Temples Worldwide</Text>
                    <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0 }} />
                    <View style={{ width: 270, alignSelf: 'center', backgroundColor: '#f2f0f0', padding: 5, borderRadius: 10, marginTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {['World Wide', 'India', 'Odisha'].map((location) => (
                                <TouchableOpacity
                                    key={location}
                                    style={{
                                        width: '32%',
                                        padding: 5,
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        borderWidth: active === location ? 1 : 0,
                                        borderColor: active === location ? '#4B0082' : 'transparent',
                                        backgroundColor: active === location ? '#e0d4f5' : 'transparent',
                                    }}
                                    onPress={() => setActive(location)}
                                >
                                    <Text style={{
                                        fontSize: 12,
                                        color: active === location ? '#4B0082' : '#333',
                                        fontFamily: 'FiraSans-Regular',
                                        fontWeight: active === location ? 'bold' : 'normal'
                                    }}>
                                        {location}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {active === 'World Wide' && (
                        <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                            <Image source={require('../../assets/image/world1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                    {active === 'India' && (
                        <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                            <Image source={require('../../assets/image/india1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                    {active === 'Odisha' && (
                        <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                            <Image source={require('../../assets/image/odisha1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Extra Section */}
                {/* <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Extra</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, backgroundColor: '#fff', padding: 10, borderRadius: 15 }}>
                        {serviceData.map((item, index) => (
                            <View key={index} style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity style={{
                                    backgroundColor: item.color,
                                    width: 75,
                                    height: 75,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 3,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                }}>
                                    <MaterialCommunityIcons name={item.icon} size={37} color="white" />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#333',
                                    marginTop: 5,
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}>{item.title}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{
                            width: '47%', height: 200, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                            shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{extraItems[0].title}</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{extraItems[0].description}</Text>
                            <Image source={{ uri: extraItems[0].image }} style={{ width: 70, height: 80, position: 'absolute', right: 0, bottom: 0 }} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'space-between' }}>
                            {extraItems.slice(1).map((item) => (
                                <View key={item.id} style={{
                                    height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                                    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{item.description}</Text>
                                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, position: 'absolute', right: 0, bottom: 0 }} />
                                </View>
                            ))}
                        </View>
                    </View>
                </View> */}
            </ScrollView>
            {/* Ratha Yatra Button */}
            {/* <View style={{ width: 70, height: 70, position: 'absolute', bottom: 20, right: 20, borderRadius: 100, overflow: 'hidden', elevation: 5 }}>
                <TouchableOpacity style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <Image source={require('../../assets/image/ratha1.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 2,
        backgroundColor: "#F8F8F8",
    },
    backgroundImage: {
        width: "100%",
        height: 350,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // borderRadius: 30,
    },
    header: {
        position: "absolute",
        top: 5,
        // left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: "contain",
    },
    liveCard: {
        width: '93%',
        alignSelf: 'center',
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 25,
        borderRadius: 20,
        elevation: 5,
        marginTop: 10,
        marginBottom: 5,
    },
    liveTitle: {
        fontSize: 19,
        fontFamily: "FiraSans-SemiBold",
        color: "#5c5b5b",
    },
    liveSubText: {
        color: "#fff",
        fontFamily: "FiraSans-Medium",
        fontSize: 14,
        marginLeft: 5,
    },
    nearbyContainer: {
        marginBottom: 10,
        width: '93%',
        alignSelf: 'center',
    },
    sliderCard: {
        width: 150,
        height: 210,
        backgroundColor: '#E8F5E9',
        marginRight: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    calendarContainer: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 20,
    },
    eventContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'black',
        opacity: 0.5,
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Lora-Bold',
        color: '#fff',
        marginBottom: 10,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '33%',
        marginBottom: 8,
    },
    eventIcon: {
        fontSize: 18,
        marginRight: 5,
    },
    eventText: {
        fontSize: 14,
        fontFamily: 'Lora-Regular',
        color: '#fff',
    },
});

export default Index;
