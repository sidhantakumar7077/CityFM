import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from 'react-native-vector-icons/Feather';
import DrawerModal from "../../Component/DrawerModal";

const Index = () => {

    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = () => { setIsDrawerOpen(false); };
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

    const conveniences = [
        // { id: '3', iconType: FontAwesome5, icon: 'wheelchair', label: 'Physical Handicap & Sr Citizen', page: '' },
        { id: '2', iconType: FontAwesome5, icon: 'phone-alt', label: 'Emergency Contact', page: '' },
        { id: '9', iconType: FontAwesome5, icon: 'life-ring', label: 'Life Guard    Contacts', page: 'LifeGuardBooth' },
        // { id: '6', iconType: FontAwesome5, icon: 'search', label: 'Lost & Found', page: '' },
        { id: '1', iconType: MaterialCommunityIcons, icon: 'water-pump', label: 'Drinking Water', page: 'DrinkingWater' },
        { id: '7', iconType: FontAwesome5, icon: 'toilet', label: 'Toilet', page: 'Toilet' },
        { id: '12', iconType: FontAwesome5, icon: 'hotel', label: 'Hotel', page: 'Dharmashala' },
        { id: '13', iconType: FontAwesome5, icon: 'utensils', label: 'Restaurant', page: 'Restaurant' },
        { id: '8', iconType: FontAwesome5, icon: 'umbrella-beach', label: 'Beaches', page: 'Beaches' },
        { id: '5', iconType: FontAwesome, icon: 'hotel', label: 'Dharmashala', page: 'Dharmashala' },
        { id: '15', iconType: FontAwesome5, icon: 'rupee-sign', label: 'ATM', page: 'Atm' },
        // { id: '4', iconType: FontAwesome5, icon: 'map-marked-alt', label: 'Route Map', page: '' },
        { id: '11', iconType: FontAwesome5, icon: 'gas-pump', label: 'Petrol Pump', page: 'PetrolPump' },
        { id: '14', iconType: FontAwesome5, icon: 'bus', label: 'Bus Stand/Railway Station', page: 'BusRailwayStop' },
        { id: '10', iconType: FontAwesome5, icon: 'charging-station', label: 'Charging Station', page: 'ChargingStation' },
    ];

    const nitiTimings = [
        {
            id: '2',
            name: 'Chari nahak utha',
            desc: 'Chari Nahak Utha" is a significant ritual in the Jagannath Temple, Puri, Odisha, marking the ceremonial lifting of the chariot for the annual Rath Yatra. It symbolizes the commencement of the chariot construction process and is performed with great devotion and reverence by the temple priests and devotees. The event is celebrated with traditional music, dance, and offerings to Lord Jagannath, signifying the divine connection between the deities and their devotees.',
            status: 'Completed',
            time: '11th June',
            relativeTime: 'in 8 hours',
            images: [
                require('../../assets/image/charinahak3.jpeg'),
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak4.jpeg'),
                require('../../assets/image/charinahak5.jpeg'),
            ]
        },
        {
            id: '1',
            name: 'Ratha Anukula',
            desc: 'Ratha Anukula" in the context of Puri, Odisha, refers to the sacred ritual marking the beginning of chariot construction for the upcoming Rath Yatra, performed at the Jagannath Temple.',
            status: 'Completed',
            time: '30th April',
            relativeTime: 'soon',
            images: [
                require('../../assets/image/rathaanukula1.jpg'),
                require('../../assets/image/rathaanukula2.jpg'),
                require('../../assets/image/rathaanukula3.jpg'),
                require('../../assets/image/rathaanukula4.jpeg'),
                require('../../assets/image/rathaanukula5.jpeg'),
            ]
        },
        {
            id: '3',
            name: 'Sahana mela Darshan',
            desc: '',
            status: 'Running',
            time: '08:15 AM',
            relativeTime: '3 hours ago',
            images: [
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak1.jpg'),
            ]
        },
        {
            id: '4',
            name: 'Sahana mela Darshan',
            desc: '',
            status: 'Upcoming',
            time: '10:00 AM',
            relativeTime: 'in 2 hours',
            images: [
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak1.jpg'),
            ]
        },
        {
            id: '5',
            name: 'Sahana mela Darshan',
            desc: '',
            status: 'Upcoming',
            time: '11:00 AM',
            relativeTime: 'in 3 hours',
            images: [
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak1.jpg'),
            ]
        }
    ];

    const [selectedImages, setSelectedImages] = useState(() => {
        const initialState = {};
        nitiTimings.forEach(item => {
            if (item.images && item.images.length > 0) {
                initialState[item.id] = item.images[0];
            }
        });
        return initialState;
    });

    const handleImageSelect = (itemId, imageUrl) => {
        setSelectedImages(prevState => ({
            ...prevState,
            [itemId]: imageUrl,
        }));
    };

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 1 * itemsPerRow; // Show 3 rows initially

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerModal visible={isDrawerOpen} navigation={navigation} onClose={closeDrawer} loadLanguageForHomePage={loadLanguage} />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/rathayatra123.jpg")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => setIsDrawerOpen(true)}>
                            <View style={{ width: 28, height: 3, backgroundColor: '#ff5733', marginVertical: 3.5 }} />
                            <View style={{ width: 28, height: 3, backgroundColor: '#ffc300', marginVertical: 3.5 }} />
                            <View style={{ width: 28, height: 3, backgroundColor: '#fff', marginVertical: 3.5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 100, width: '100%', left: 13 }}>
                        <View style={{ textAlign: 'center', marginLeft: 8 }}>
                            <Text style={{ color: '#d9dbdb', fontSize: 12, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8 }}>Welcome to</Text>
                            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>ShreeJagannatha</Text>
                            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Ratha Yatra 2025</Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Current Niti Box */}
                <ScrollView style={{ padding: 8, alignSelf: 'center', marginTop: -50 }} horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} decelerationRate="fast" nestedScrollEnabled={true}>
                    <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
                        {/* <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Akhaya Trutiya</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>30th April</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ratha Anukula</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </View>
                        </View> */}
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Deba Snana Purnima</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>11th June</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Chari Nahak Utha</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Ratha Yatra</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>27th June</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Hera Panchami</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>1st July</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Sandhya Darshan</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th July</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Bahuda</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>5th July</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Sona Besha</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>6th July</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Adhara Pana</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>7th July</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Niladri Bije</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>8th July</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>Ghosa Yatra</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Live Broadcast Section */}
                <View style={styles.liveCard}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '26%' }}>
                            <Text style={styles.liveTitle}>Ratha Yatra</Text>
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
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Ratha Yatra Conveniences</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Darshan')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <FontAwesome5 name={'calendar-alt'} size={33} color="#782537" />
                                {/* <Image source={require('../../assets/image/darshan4.png')} style={{ width: 75, height: 75 }} /> */}
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Niti Kanti</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Offering')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'gift'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/traffic3123.png')} style={{ width: 70, height: 70 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Traffic</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Panji')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'calendar-month'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/mela231321.png')} style={{ width: 65, height: 65 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Mela</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MahaPrashad')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <FontAwesome name={'search'} size={33} color="#782537" /> */}
                                <Image source={require('../../assets/image/lostfound45355.png')} style={{ width: 45, height: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Lost & Found</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Travel Plan</Text>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular', color: '#333', lineHeight: 20 }}>Special Bus And Train Schedule For Ratha Yatra</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/image/route2214214.png')} style={{ width: 50, height: 50 }} />
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
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Physical Handicap</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Free Stand service</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <FontAwesome5 name={'wheelchair'} size={30} color="#782537" />
                                {/* <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3239/3239951.png' }} style={{ width: 28, height: 28 }} /> */}
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                    </View> */}
                </View>

                {/* conveniences */}
                <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
                    {/* Title */}
                    {/* <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Conveniences</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} /> */}

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
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

                {/* Nearby Temples */}
                <View style={styles.nearbyContainer}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Ratha Yatra Timeline</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} />

                    {/* <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, marginVertical: 15, padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => setSelectedTab('April')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'April' ? '#D64C64' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'April' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                April
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedTab('May')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'May' ? '#D64C64' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'May' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                May
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedTab('June')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'June' ? '#D64C64' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'June' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                June
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={nitiTimings}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => {
                                const isLast = index === nitiTimings.length - 1;
                                const isCompleted = item.status === 'Completed';
                                const isRunning = item.status === 'Running';
                                const isUpcoming = item.status === 'Upcoming';

                                const getIcon = () => {
                                    if (isCompleted) {
                                        return <Feather name="check-circle" size={20} color="#999" />;
                                    }
                                    if (isRunning) {
                                        return (
                                            <View style={{ backgroundColor: '#dce8e0', padding: 6, borderRadius: 100 }}>
                                                <MaterialCommunityIcons name="timer-outline" size={30} color="#059629" />
                                            </View>
                                        );
                                    }
                                    return (
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="bell-outline" size={22} color="#999" />
                                        </TouchableOpacity>
                                    );
                                };

                                const getColor = () => {
                                    if (isCompleted) return '#341551'; // purple
                                    if (isRunning) return '#059629'; // green
                                    return '#C5C5C5'; // grey
                                };

                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 6 }}>
                                        {/* Left Indicator */}
                                        {!isCompleted &&
                                            <View style={{ alignItems: 'center', width: 40 }}>
                                                {/* Line above */}
                                                {/* {index !== 0 && <View style={{ height: 12, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />} */}

                                                {/* Number Circle */}
                                                <View
                                                    style={{
                                                        height: 24,
                                                        width: 24,
                                                        borderRadius: 12,
                                                        borderWidth: 2,
                                                        borderColor: getColor(),
                                                        backgroundColor:
                                                            isCompleted ? '#341551' :
                                                                isRunning ? '#059629' :
                                                                    '#C5C5C5',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {isCompleted ? (
                                                        <MaterialIcons name="check" size={14} color="white" />
                                                    ) : (
                                                        <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>
                                                            {index + 1}
                                                        </Text>
                                                    )}
                                                </View>

                                                {/* Line below */}
                                                {!isLast && <View style={{ flex: 1, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />}
                                            </View>
                                        }

                                        {/* Right Content */}
                                        {isCompleted ?
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 17, color: '#222', fontFamily: 'FiraSans-Bold', marginBottom: 10 }}>{item.name}</Text>
                                                <View>
                                                    <Image
                                                        source={selectedImages[item.id]}
                                                        style={styles.mainImage}
                                                    />
                                                </View>
                                                {/* Thumbnail Scroll Section */}
                                                <FlatList
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                    data={item.images}
                                                    keyExtractor={(uri, index) => index.toString()}
                                                    contentContainerStyle={{ marginBottom: 8, marginTop: 4 }}
                                                    renderItem={({ item: thumb }) => (
                                                        <TouchableOpacity onPress={() => handleImageSelect(item.id, thumb)}>
                                                            <Image
                                                                source={thumb}
                                                                style={[
                                                                    styles.thumbnail,
                                                                    selectedImages[item.id] === thumb && styles.selectedThumbnail
                                                                ]}
                                                            />
                                                        </TouchableOpacity>
                                                    )}
                                                />
                                                {/* Offers & Address */}
                                                <View style={styles.infoRow}>
                                                    <View style={styles.infoColumn}>
                                                        <Text style={styles.label}>Date: <Text style={styles.value}>{item.time}</Text></Text>
                                                    </View>
                                                    <View style={styles.infoColumn}>
                                                        <Text style={styles.label}>Description: <Text style={styles.value}>{item.desc}</Text></Text>
                                                    </View>
                                                </View>
                                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 20, marginBottom: 10 }} />
                                            </View>
                                            :
                                            <View style={{ flexDirection: 'row', width: '90%' }}>
                                                <View style={{ flex: 1, paddingBottom: 30, marginLeft: 7 }}>
                                                    <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>{item.time}</Text>
                                                    <Text style={{ fontSize: 15, color: '#222', fontFamily: 'FiraSans-SemiBold' }}>{item.name}</Text>

                                                    {isCompleted && (
                                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-Regular' }}>
                                                            Completed at {item.time}
                                                        </Text>
                                                    )}

                                                    {isRunning && (
                                                        <>
                                                            <Text style={{ fontSize: 13, color: '#059629', fontFamily: 'FiraSans-Regular' }}>
                                                                Running since {item.time}
                                                            </Text>
                                                            <Text style={{ fontSize: 13, color: '#999', fontFamily: 'FiraSans-Regular' }}>
                                                                Tentative End: 3:50 PM
                                                            </Text>
                                                        </>
                                                    )}

                                                    {isUpcoming && (
                                                        <Text style={{ fontSize: 13, color: '#999', fontFamily: 'FiraSans-Regular' }}>
                                                            Starts at {item.time}
                                                        </Text>
                                                    )}
                                                </View>

                                                <View style={{ marginTop: 5 }}>
                                                    {getIcon()}
                                                </View>
                                            </View>
                                        }
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
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
        marginVertical: 10,
        width: '93%',
        alignSelf: 'center',
    },
    propertyName: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'FiraSans-Bold',
        marginBottom: 8,
    },
    mainImage: {
        width: '100%',
        height: 166,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    view360Badge: {
        position: 'absolute',
        top: 7,
        right: 7,
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    view360Text: {
        fontSize: 12,
        color: '#f43f5e',
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    selectedThumbnail: {
        borderColor: '#7e22ce',
        borderWidth: 2
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    distanceText: {
        fontSize: 13,
        color: '#7e22ce',
        marginLeft: 5,
        fontFamily: 'FiraSans-Regular'
    },
    infoRow: {
        width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 10
    },
    infoColumn: {
        // flex: 1,
        // paddingRight: 10
    },
    label: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'FiraSans-SemiBold'
    },
    value: {
        fontSize: 12,
        color: '#444',
        marginTop: 2,
        lineHeight: 19,
        fontFamily: 'FiraSans-Regular'
    },
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    bookNowButton: {
        backgroundColor: '#7e22ce',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    bookNowText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600'
    },
    callButton: {
        // backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#b8b8b8',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    callText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600'
    }
});

export default Index;
