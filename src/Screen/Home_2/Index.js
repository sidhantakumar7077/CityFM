import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal, ActivityIndicator, RefreshControl } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Calendar } from 'react-native-calendars';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from 'react-native-swiper';
import { base_url } from "../../../App";
import moment from "moment";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Index = () => {

    const TempleBanner = [
        {
            image: require('../../assets/image/temple546.png'),
            title: 'Shree Jagannatha',
            subtitle: 'All Information about Temple.',
            pageName: 'TempleInformationPage',
        },
        // {
        //     image: require('../../assets/image/ratha_yatra123.png'),
        //     title: 'Ratha Yatra Updates',
        //     subtitle: 'All types of information',
        //     pageName: 'RathaYatraMainPage',
        // },
    ];

    const conveniences = [
        { id: '1', label: 'Physical Handicap & Sr Citizen', page: '', image: require('../../assets/image/physical21.png') },
        { id: '2', label: 'Emergency Contact', page: '', image: require('../../assets/image/emergencyontact.png') },
        { id: '3', label: 'Life Guard    Contacts', page: 'LifeGuardBooth', image: require('../../assets/image/life432.png') },
        { id: '4', label: 'Lost & Found', page: '', image: require('../../assets/image/lost&found21.png') },
        { id: '5', label: 'Drinking Water', page: 'DrinkingWater', image: require('../../assets/image/drinkingWater32.png') },
        { id: '6', label: 'Toilet', page: 'Toilet', image: require('../../assets/image/toilet543.png') },
        // { id: '7', label: 'Hotel', page: 'Hotel', image: require('../../assets/image/hotel89.png') },
        // { id: '8', label: 'Restaurant', page: 'Restaurant', image: require('../../assets/image/restaurant87.png') },
        { id: '9', label: 'Beaches', page: 'Beaches', image: require('../../assets/image/beaches21.png') },
        // { id: '10', label: 'Dharmashala', page: 'Dharmashala', image: require('../../assets/image/dharamasala67.png') },
        { id: '11', label: 'ATM', page: 'Atm', image: require('../../assets/image/atm.png') },
        { id: '12', label: 'Route Map', page: '', image: require('../../assets/image/routeMap.png') },
        { id: '13', label: 'Petrol Pump', page: 'PetrolPump', image: require('../../assets/image/petrolPump21.png') },
        { id: '14', label: 'Bus Stand/Railway Station', page: 'BusRailwayStop', image: require('../../assets/image/busRaily.png') },
        { id: '15', label: 'Charging Station', page: 'ChargingStation', image: require('../../assets/image/charghingstation89.png') },
    ];

    const emergencyContacts = [
        { name: 'Police', phone: '100' },
        { name: 'Ambulance', phone: '108' },
        { name: 'Fire Service', phone: '101' },
        { name: 'Elder Person Helpline', phone: '1090' },
        { name: 'Child Helpline', phone: '1098' },
        { name: 'Women Helpline', phone: '1091' },
        { name: 'Life Guard', phone: '8260777771' },
        { name: 'National Highway Helpline', phone: '1033' },
    ];

    const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [active, setActive] = useState('World Wide');
    const [selectedTab, setSelectedTab] = useState("temple");
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            getData();
        }, 2000);
    }, []);

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 3 * itemsPerRow; // Show 2 rows initially

    const [nitiList, setNitiList] = useState([]);
    const [banners, setBanners] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [hundi, setHundi] = useState({});
    const [showHundi, setShowHundi] = useState(false);

    const getHundi = async () => {
        try {
            const response = await fetch(`${base_url}api/get-hundi-collections`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Hundi Data:', result.data);
            setHundi(result.data[0] || {});
        } catch (error) {
            console.error('Error fetching hundi data:', error);
        }
    };

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Home Page Data:', result);

            if (result.status) {
                const { niti_master, banners, nearby_temples, totalPreviousAmount } = result.data;

                setNitiList(niti_master || []);
                setBanners(banners || []);
                setNearbyPlaces(nearby_temples || []);
                setIsLoading(false);
            } else {
                console.warn('API responded with status false:', result.message);
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Error fetching home section data:', error);
            setIsLoading(false);
        }
    };

    const hendlegetNitiFOrRefresh = async () => {
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Home Page Data:', result);

            if (result.status) {
                setNitiList(result.data.niti_master || []);
            } else {
                console.warn('API responded with status false:', result.message);
            }

        } catch (error) {
            console.error('Error fetching home section data:', error);
        }
    };

    const [donationModal, setDonationModal] = useState(false);
    const handleOk = () => {
        Linking.openURL('https://www.shreejagannatha.in/donation/');
        onClose(); // Optional: close modal after redirect
    };

    const runningNiti = nitiList.find(item => item.niti_status === 'Started');
    const upcomingNitis = nitiList
        .filter(item => item.niti_status === 'Upcoming')
        .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
    const nextNiti = upcomingNitis[0];

    const [duration, setDuration] = useState("00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const start = moment(runningNiti?.start_time, "HH:mm:ss");
            const diff = moment.utc(now.diff(start)).format("HH:mm:ss");
            setDuration(diff);
        }, 1000);

        return () => clearInterval(interval);
    }, [runningNiti?.start_time]);


    useEffect(() => {
        if (isFocused) {
            getData();
            getHundi();
        }
    }, [isFocused]);

    useEffect(() => {
        if (selectedTab === 'temple') {
            setFilteredPlaces(nearbyPlaces?.filter(place => place.place_type === 'temple'));
        } else if (selectedTab === 'Mathas') {
            setFilteredPlaces(nearbyPlaces?.filter(place => place.place_type === 'matha'));
        } else if (selectedTab === 'RitualSites') {
            setFilteredPlaces(nearbyPlaces?.filter(place => place.place_type === 'ritualsite'));
        }
    }, [selectedTab, nearbyPlaces]);

    const [notices, setNotices] = useState([]);
    const [noticeModalVisible, setNoticeModalVisible] = useState(false);

    // ✅ Get Today's Notices from AsyncStorage
    const loadNoticesFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('todaysNotices');
            if (data !== null) {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNotices(parsed);
                    setNoticeModalVisible(true);
                    console.log('Notices loaded from storage:', parsed);
                }
            }
        } catch (error) {
            console.log('Error reading notices from storage:', error);
        }
    };

    useEffect(() => {
        loadNoticesFromStorage();
    }, []);

    const renderItem = ({ item }) => (
        <View
            style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 12,
                padding: 15,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2D3748', marginBottom: 5 }}>
                {item.notice_name}
            </Text>
            {item.notice_descp ? (
                <Text style={{ fontSize: 14, color: '#4A5568', marginBottom: 8 }}>
                    {item.notice_descp}
                </Text>
            ) : null}
            <Text style={{ fontSize: 13, color: '#718096', fontStyle: 'italic' }}>
                📅 {moment(item.notice_date).format('MMMM Do, YYYY')}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#fa0000" />
                </View>
            ) : (
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    bounces={false} // Prevents bounce effect on iOS
                    overScrollMode="never" // Prevents overscroll glow on Android
                >
                    {/* Background Image with Overlay */}
                    <ImageBackground source={require("../../assets/image/templeImage1.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, resizeMode: 'cover' }} style={styles.backgroundImage}>
                        <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('RealsPage')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <SimpleLineIcons name="settings" size={26} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', top: 110, width: '100%', left: 13 }}>
                            <View style={{ textAlign: 'center', marginLeft: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'FiraSans-Regular', letterSpacing: 0.8, marginBottom: 2 }}>Welcome to</Text>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Jagannatha</Text>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Dham</Text>
                            </View>
                        </View>
                    </ImageBackground>

                    {/* Current Niti Box */}
                    <ScrollView
                        style={{ padding: 8, alignSelf: 'center', marginTop: -50 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        nestedScrollEnabled={true}
                        onScroll={() => hendlegetNitiFOrRefresh()}
                    >
                        <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
                            {runningNiti && (
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>{runningNiti.niti_name}</Text>
                                            <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                                    <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Start Time: {moment(runningNiti.start_time, "HH:mm:ss").format("hh:mm A")}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                                    <Ionicons name="time-outline" size={16} color="#fa0000" />
                                                    <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>
                                                        {duration}
                                                    </Text>
                                                </View>
                                            </View>
                                            {runningNiti.running_sub_niti && runningNiti.running_sub_niti.sub_niti_name && (
                                                <Text style={{ color: '#fa0000', fontFamily: 'FiraSans-Medium', marginTop: 5, fontSize: 14 }}>
                                                    {runningNiti.running_sub_niti.sub_niti_name}
                                                </Text>
                                            )}
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'green', width: 80, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', top: 10, right: 20 }}>
                                        <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12 }}>Running</Text>
                                    </View>
                                </View>
                            )}
                            {nextNiti && (
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>{nextNiti.niti_name}</Text>
                                            <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                                    <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>{moment(new Date).format("DD MMM YYYY")}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                                    <Ionicons name="time-outline" size={16} color="#fa0000" />
                                                    <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>{moment(nextNiti.date_time).format("hh:mm A")}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: '10%' }}>
                                            <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'red', width: 80, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, position: 'absolute', top: 10, right: 20 }}>
                                        <Text style={{ color: '#fff', fontFamily: 'FiraSans-Medium', fontSize: 12 }}>Upcoming</Text>
                                    </View>
                                </View>
                            )}
                            <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 200, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('AllNitePage')} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>View All Niti</Text>
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
                            {TempleBanner.map((item, index) => (
                                <LinearGradient
                                    colors={['#F06292', '#FFA726']} // orange to pink gradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    key={index}
                                    style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    {/* <View key={index} style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}
                                    <View style={{ width: '70%' }}>
                                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                        <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate(item.pageName)} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>View</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                        <Image source={item.image} style={{ width: 110, height: 100 }} resizeMode="contain" />
                                    </View>
                                    {/* </View> */}
                                </LinearGradient>
                            ))}
                        </Swiper>
                    </View>

                    {/* Live Broadcast Section */}
                    {/* <View style={styles.liveCard}>
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
                                    <Image source={require('../../assets/image/radio214142.png')} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#dd4c2f' }}>Radio</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 50, width: 1.4 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Tv')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                    <Image source={require('../../assets/image/tv43.png')} style={{ width: 27, height: 27 }} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#dd4c2f' }}>TV</Text>
                            </View>
                        </View>
                    </View>
                        </View> */}

                    {/* Quick Services Section */}
                    <View style={{ padding: 15 }}>
                        {/* Title Section */}
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Quick Services</Text>
                        {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} /> */}
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                            }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                            <View style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Darshan')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                    {/* <MaterialCommunityIcons name={'calendar-check'} size={33} color="white" /> */}
                                    <Image source={require('../../assets/image/darshan34.png')} style={{ width: 45, height: 45 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Darshan</Text>
                            </View>
                            <View style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('MahaPrashad')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                    {/* <MaterialCommunityIcons name={'food-apple'} size={33} color="white" /> */}
                                    <Image source={require('../../assets/image/prasad879.png')} style={{ width: 55, height: 55 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>MahaPrashad</Text>
                            </View>
                            <View style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Panji')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                    {/* <MaterialCommunityIcons name={'calendar-month'} size={33} color="white" /> */}
                                    <Image source={require('../../assets/image/panji765.png')} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Panji</Text>
                            </View>
                            <View style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Festival')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                    <Image source={require('../../assets/image/festival21.png')} style={{ width: 60, height: 60 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Festivals</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <View style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Bhakta Nibas</Text>
                                </View>
                                <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>Temple owned properties for pligrims to stay Comfortably</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/image/bhaktanibash54.png')} style={{ width: 50, height: 50 }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                                <View style={{ width: '60%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Parking</Text>
                                    <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>2, 3, 4 Wheelers</Text>
                                </View>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    {/* <FontAwesome5 name="parking" size={30} color="#D64C64" /> */}
                                    <Image source={require('../../assets/image/parking765.png')} style={{ width: 38, height: 38, resizeMode: 'contain' }} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Locker_shoes')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                                <View style={{ width: '60%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Locker & Shoes Stand</Text>
                                    <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Free services</Text>
                                </View>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    <Image source={require('../../assets/image/locker675.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => setDonationModal(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                                <View style={{ width: '60%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Online Donation</Text>
                                    <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Donate Now</Text>
                                </View>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    <Image source={require('../../assets/image/donation435.png')} style={{ width: 33, height: 33 }} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setShowHundi(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                                <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Hundi Collection</Text>
                                    <Text style={{ fontSize: 12, color: '#fc2003', fontFamily: 'FiraSans-Medium', marginTop: 2 }}>₹{hundi.rupees}/-</Text>
                                </View>
                                <View style={{ width: '40%', alignItems: 'center' }}>
                                    {/* <FontAwesome5 name="rupee-sign" size={27} color="#D64C64" /> */}
                                    <Image source={require('../../assets/image/hundiColection654.png')} style={{ width: 33, height: 33 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Nearby Temples */}
                    <View style={styles.nearbyContainer}>
                        {/* Title Section */}
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Nearby Religious Places</Text>
                        {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} /> */}
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                            }}
                        />

                        <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, marginVertical: 15, padding: 5 }}>
                            {/* Temples Tab */}
                            <LinearGradient
                                colors={selectedTab === 'temple' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    borderRadius: 10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setSelectedTab('temple')}
                                    style={{
                                        flex: 1,
                                        // backgroundColor: selectedTab === 'temple' ? '#D64C64' : 'transparent',
                                        borderRadius: 10,
                                        paddingVertical: 8,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: selectedTab === 'temple' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                        Temples
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            {/* Mathas Tab */}
                            {/* <LinearGradient
                                colors={selectedTab === 'Mathas' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    borderRadius: 10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setSelectedTab('Mathas')}
                                    style={{
                                        flex: 1,
                                        // backgroundColor: selectedTab === 'Mathas' ? '#D64C64' : 'transparent',
                                        borderRadius: 10,
                                        paddingVertical: 8,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: selectedTab === 'Mathas' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                        Mathas
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient> */}

                            {/* Ritual Sites Tab */}
                            <LinearGradient
                                colors={selectedTab === 'RitualSites' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    flex: 1,
                                    borderRadius: 10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setSelectedTab('RitualSites')}
                                    style={{
                                        flex: 1,
                                        // backgroundColor: selectedTab === 'RitualSites' ? '#D64C64' : 'transparent',
                                        borderRadius: 10,
                                        paddingVertical: 8,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: selectedTab === 'RitualSites' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                        Ritual Sites
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={filteredPlaces}
                            horizontal
                            keyExtractor={(key) => {
                                return key.id
                            }}
                            renderItem={(content) => {
                                return (
                                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('NearbyTemple', content?.item)} style={styles.sliderCard}>
                                            <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={{ uri: content?.item?.cover_photo }} />
                                        </TouchableOpacity>
                                        <Text style={{ width: 140, fontSize: 14, fontFamily: 'FiraSans-Medium', color: '#333', marginTop: 7, textAlign: 'center' }}>{content?.item?.name}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>

                    {/* conveniences */}
                    <View style={{ padding: 15 }}>
                        {/* Title */}
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Conveniences</Text>
                        {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} /> */}
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                            }}
                        />

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
                                    <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: item.page === 'DrinkingWater' ? "#feefec" : 'transparent', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                        {/* <item.iconType name={item.icon} size={24} color="#D64C64" /> */}
                                        <Image source={item.image} style={{ width: item.page === 'DrinkingWater' ? 40 : 55, height: item.page === 'DrinkingWater' ? 40 : 55 }} resizeMode="contain" />
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
                    {/* <View style={{ height: 150, marginTop: 10, marginBottom: 0 }}>
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
                                <View style={{ width: '80%' }}>
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('TempleInformationPage')} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>Know More</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-start' }}>
                                    <Image source={item.image} style={{ width: 85, height: 85 }} resizeMode="contain" />
                                </View>
                            </View>
                        ))}
                    </Swiper>
                    </View> */}

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
                    {/* <View style={{ padding: 15, marginTop: 10 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Temple Information</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

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
                    </View> */}

                    {/* Temples Worldwide */}
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Jagannatha Temples Worldwide</Text>
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                            }}
                        />
                        <View style={{ width: 270, alignSelf: 'center', backgroundColor: '#f2f0f0', padding: 5, borderRadius: 10, marginTop: 20 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {['World Wide', 'India', 'Odisha'].map((location) => (
                                    <LinearGradient
                                        key={location}
                                        colors={active === location ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            flex: 1,
                                            borderRadius: 10,
                                            width: '32%',
                                            padding: 5,
                                            alignItems: 'center',
                                            borderRadius: 5,
                                        }}
                                    >
                                        <TouchableOpacity onPress={() => setActive(location)}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: active === location ? '#fff' : '#333',
                                                fontFamily: 'FiraSans-Regular',
                                                fontWeight: active === location ? 'bold' : 'normal'
                                            }}>
                                                {location}
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
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
            )}

            {/* Today Hundi Collection Modal */}
            <Modal
                visible={showHundi}
                transparent
                animationType="fade"
                onRequestClose={() => setShowHundi(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '85%',
                        backgroundColor: '#fff',
                        borderRadius: 14,
                        padding: 20,
                        elevation: 10,
                    }}>
                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#B7070A' }}>
                                🪙  Hundi Collection
                            </Text>
                            <TouchableOpacity onPress={() => setShowHundi(false)}>
                                <Ionicons name="close-circle" size={26} color="#B7070A" />
                            </TouchableOpacity>
                        </View>

                        {/* Date */}
                        <Text style={{
                            fontSize: 14,
                            color: '#555',
                            marginBottom: 16,
                            textAlign: 'center'
                        }}>
                            {moment(hundi?.date).format("DD MMM YYYY")}, {moment(hundi?.date).format("dddd")}
                        </Text>

                        {/* Rupees */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 12,
                        }}>
                            <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                💰 Rupees:
                            </Text>
                            <Text style={{ fontSize: 16, color: '#444' }}>
                                ₹ {hundi?.rupees || 0}
                            </Text>
                        </View>

                        {/* Gold */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 12,
                        }}>
                            <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                🥇 Gold:
                            </Text>
                            <Text style={{ fontSize: 16, color: '#444' }}>
                                {hundi?.gold || '0 grams'}
                            </Text>
                        </View>

                        {/* Silver */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 12,
                        }}>
                            <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>
                                🥈 Silver:
                            </Text>
                            <Text style={{ fontSize: 16, color: '#444' }}>
                                {hundi?.silver || '0 grams'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal for navigating Donation site */}
            <Modal
                visible={donationModal}
                transparent
                animationType="fade"
                onRequestClose={() => setDonationModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '88%',
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 25,
                        elevation: 8,
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                        shadowOffset: { width: 0, height: 4 }
                    }}>
                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#B7070A'
                            }}>
                                Alert
                            </Text>
                            <TouchableOpacity onPress={() => setDonationModal(false)}>
                                <Ionicons name="close-circle-outline" size={28} color="#B7070A" />
                            </TouchableOpacity>
                        </View>

                        {/* Info Text */}
                        <Text style={{
                            fontSize: 16,
                            color: '#444',
                            marginBottom: 30,
                            lineHeight: 24
                        }}>
                            You are navigating to Shree Mandira official Donation Platform.
                        </Text>

                        {/* Buttons */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity
                                onPress={() => setDonationModal(false)}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#ccc',
                                    paddingVertical: 12,
                                    marginRight: 10,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleOk}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#B7070A',
                                    paddingVertical: 12,
                                    marginLeft: 10,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Today Notice */}
            <Modal visible={noticeModalVisible} transparent animationType="slide">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: width * 0.9,
                            maxHeight: '80%',
                            backgroundColor: '#fff',
                            borderRadius: 15,
                            padding: 20,
                            elevation: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#222',
                                marginBottom: 15,
                                textAlign: 'center',
                            }}
                        >
                            📢 Today's Notices
                        </Text>

                        <FlatList
                            data={notices}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <Text style={{ textAlign: 'center', color: '#555', marginTop: 20 }}>
                                    No notices for today.
                                </Text>
                            }
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />

                        <TouchableOpacity
                            style={{
                                marginTop: 10,
                                backgroundColor: '#E53E3E',
                                paddingVertical: 10,
                                borderRadius: 10,
                            }}
                            onPress={() => setNoticeModalVisible(false)}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
                            >
                                Close ✖️
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        elevation: 1,
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
        marginVertical: 10,
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
