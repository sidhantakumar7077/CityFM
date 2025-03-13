import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Index = () => {

    const serviceData = [
        { title: 'Darshan', icon: 'calendar-check', color: '#B09ECF' },
        { title: 'MahaPrashad', icon: 'food-apple', color: '#E9A93F' },
        { title: 'Panji', icon: 'calendar-month', color: '#92C362' },
        { title: 'Offering', icon: 'gift', color: '#87B5D8' },
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
        // { id: '1', icon: 'car', label: 'Parking' },
        // { id: '2', icon: 'user-lock', label: 'Locker' },
        // { id: '3', icon: 'shoe-prints', label: 'Shoes Stand' },
        { id: '4', icon: 'tint', label: 'Drinking Water' },
        { id: '12', icon: 'phone-alt', label: 'Emergency Contact' },
        { id: '18', icon: 'wheelchair', label: 'Physical Handicap & Sr Citizen' },
        { id: '5', icon: 'map-marked-alt', label: 'Route Map' },
        { id: '6', icon: 'utensils', label: 'Free Food' },
        { id: '7', icon: 'search', label: 'Lost & Found' },
        // { id: '8', icon: 'street-view', label: 'Ratha Yatra Mela' },
        { id: '9', icon: 'toilet', label: 'Toilet' },
        { id: '10', icon: 'umbrella-beach', label: 'Beaches' },
        { id: '11', icon: 'life-ring', label: 'Life Guard Booth' },
        { id: '13', icon: 'charging-station', label: 'Charging Station' },
        { id: '14', icon: 'gas-pump', label: 'Petrol Pump' },
        { id: '15', icon: 'hotel', label: 'Hotel/Dharmashala' },
        { id: '16', icon: 'utensils', label: 'Restaurant' },
        { id: '17', icon: 'bus', label: 'Bus Stand/Railway Station' },
        { id: '19', icon: 'layer-group', label: 'Bhakta Nibasha' },
    ];

    const templeInfo = [
        { id: '1', image: require('../../assets/image/temple_about.png'), label: 'About Temple' },
        // { id: '2', image: require('../../assets/image/history.png'), label: 'History' },
        { id: '3', image: require('../../assets/image/shreekhetra.png'), label: 'Shree Khetra' },
        { id: '12', image: require('../../assets/image/ratha_yatra.png'), label: 'Ratha yatra' },
        { id: '13', image: require('../../assets/image/nabakalebala.png'), label: 'Nabakalebala' },
        { id: '4', image: require('../../assets/image/mathha.png'), label: 'Matha & Ashram' },
        { id: '5', image: require('../../assets/image/festival.png'), label: 'Festivals' },
        { id: '6', image: require('../../assets/image/nijoga.png'), label: '36 Nijoga' },
        { id: '7', image: require('../../assets/image/besha.png'), label: 'Besha' },
        { id: '8', image: require('../../assets/image/darshan.png'), label: 'Darshan Facility' },
        // { id: '9', image: require('../../assets/image/temple_about.png'), label: 'Donation' },
        // { id: '10', image: require('../../assets/image/temple_about.png'), label: 'Hundi Collection' },
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
    const [selectedDate, setSelectedDate] = useState('');

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 3 * itemsPerRow; // Show 3 rows initially

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/sandhyaalati.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/logo1.png")} style={styles.logo} />
                            <View style={{ textAlign: 'center', marginLeft: 8 }}>
                                <Text style={{ color: '#fff', textTransform: 'uppercase', fontFamily: 'FiraSans-Medium' }}>Shree</Text>
                                <Text style={{ color: '#fff', textTransform: 'uppercase', fontFamily: 'FiraSans-Medium', marginTop: -5 }}>Jagannatha</Text>
                                <Text style={{ color: '#fff', textTransform: 'uppercase', fontFamily: 'FiraSans-Medium', marginTop: -3 }}>Dham</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="settings-sharp" size={26} color="#fff" />
                        </TouchableOpacity>
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
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th Mar</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>03:17 pm</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>Bada Sinhgara Besha</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th Mar</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>03:17 pm</Text>
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

                {/* Live Broadcast Section */}
                <View style={styles.liveCard}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '26%' }}>
                            <Text style={styles.liveTitle}>Shree Mandira</Text>
                            <View style={{ width: 74, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fa0000', borderRadius: 100, marginTop: 5 }}>
                                <Octicons name="zap" size={15} color="#fff" />
                                <Text style={styles.liveSubText}>Live</Text>
                            </View>
                        </View>
                        <View style={{ width: '34%' }}>
                            <Text style={{ textAlign: 'left', fontFamily: 'FiraSans-Light', color: '#000', fontSize: 13.6 }}>Listen or Watch all the live broadcasts from Shree Mandira</Text>
                        </View>
                        <View style={{ width: '36%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('LivePage')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 15 }}>
                                    <FontAwesome6 name="radio" size={18} color="#6A0DAD" />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 18, color: '#6A0DAD' }}>Radio</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 50, width: 1.4 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 15 }}>
                                    <MaterialCommunityIcons name="youtube-tv" size={20} color="#6A0DAD" />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 18, color: '#6A0DAD' }}>TV</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Services Section */}
                <View style={{ padding: 15 }}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Quick Services</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Darshan')} style={{ backgroundColor: '#B09ECF', width: 60, height: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                                <MaterialCommunityIcons name={'calendar-check'} size={33} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontWeight: '500' }}>Darshan</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MahaPrashad')} style={{ backgroundColor: '#E9A93F', width: 60, height: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                                <MaterialCommunityIcons name={'food-apple'} size={33} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontWeight: '500' }}>MahaPrashad</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity style={{ backgroundColor: '#92C362', width: 60, height: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                                <MaterialCommunityIcons name={'calendar-month'} size={33} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontWeight: '500' }}>Panji</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity style={{ backgroundColor: '#87B5D8', width: 60, height: 60, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                                <MaterialCommunityIcons name={'gift'} size={33} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontWeight: '500' }}>Offering</Text>
                        </View>
                    </View>

                    {/* Grid Layout */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        {/* Left Large Card */}
                        <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ width: '47%', height: 200, backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Bhakta Nibas</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Temple owned properties for pilgrimas to stay</Text>
                            <Image source={require('../../assets/image/hotel.png')} style={{ width: 80, height: 90, position: 'absolute', right: 0, bottom: 0 }} />
                        </TouchableOpacity>

                        {/* Right Two Small Cards */}
                        <View style={{ width: '50%', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} style={{ height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Parking</Text>
                                <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>2, 3, 4 Wheelers</Text>
                                <Image source={require('../../assets/image/demo.png')} style={{ width: 45, height: 45, position: 'absolute', right: 0, bottom: 0 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Locker_shoes')} style={{ height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Locker & Shoes</Text>
                                <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Free Stand service</Text>
                                <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png' }} style={{ width: 45, height: 45, position: 'absolute', right: 0, bottom: 0 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '47%', height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Online Donation</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Donate Now</Text>
                            <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png' }} style={{ width: 45, height: 45, position: 'absolute', right: 0, bottom: 0 }} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'space-between' }}>
                            <View style={{ height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Hundi Colection</Text>
                                <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>12th Jan</Text>
                                <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>₹5,30,000</Text>
                                <Image source={{ uri: 'https://cdn4.iconfinder.com/data/icons/e-commerce-line-color-special-delivery/512/payment_bill-512.png' }} style={{ width: 45, height: 45, position: 'absolute', right: 0, bottom: 0 }} />
                            </View>
                        </View>
                    </View>

                    {/* Services Grid */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
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
                    </View> */}
                </View>

                {/* Nearby Temple */}
                <View style={styles.nearbyContainer}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Nearby Temples</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

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
                                    <View style={styles.sliderCard}>
                                        <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={{ uri: content.item.image }} />
                                    </View>
                                    <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Medium', color: '#333', marginTop: 10, marginLeft: 10 }}>{content.item.title}</Text>
                                </View>
                            )
                        }}
                    />
                </View>

                {/* conveniences */}
                <View style={{ padding: 15 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Conveniences</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                    {/* Grid Layout */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {(expanded ? conveniences : conveniences.slice(0, maxVisibleItems)).map((item) => (
                            <View key={item.id} style={{
                                width: '30%',
                                backgroundColor: '#F6F0FC',
                                borderWidth: 0.7,
                                borderColor: '#fab278',
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 15,
                                marginBottom: 10,
                            }}>
                                <FontAwesome5 name={item.icon} size={24} color="#8753A2" />
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                    {conveniences.length > maxVisibleItems && (
                        <TouchableOpacity
                            onPress={() => setExpanded(!expanded)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // borderWidth: 1,
                                // borderColor: '#fab278',
                                // backgroundColor: '#F6F0FC',
                                borderRadius: 8,
                                // paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 10,
                                alignSelf: 'center',
                            }}>
                            <AntDesign name={expanded ? 'upcircleo' : 'downcircleo'} size={30} color="#8753A2" />
                            {/* <Text style={{ fontSize: 14, color: '#8753A2', fontWeight: 'bold', marginLeft: 8 }}>
                                {expanded ? "View Less" : "View More"}
                            </Text> */}
                        </TouchableOpacity>

                    )}
                </View>

                {/* Calendar Section */}
                <View>
                    {/* Title */}
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Panji & Calendar</Text>
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
                        {/* Calendar Event Section */}
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
                </View>

                {/* About Temple */}
                <View style={{ padding: 15 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Temple Information</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                    {/* Grid Layout */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {templeInfo.map((item) => (
                            <View key={item.id} style={{
                                width: '30%',
                                backgroundColor: '#F6F0FC',
                                borderWidth: 0.7,
                                borderColor: '#fab278',
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 15,
                                marginBottom: 10,
                            }}>
                                {/* <FontAwesome5 name={item.icon} size={24} color="#8753A2" /> */}
                                <Image source={item.image} style={{ width: 40, height: 40 }} />
                                <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Temples Worldwide */}
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Jagannatha Temples Worldwide</Text>
                    <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    <ImageBackground source={require('../../assets/image/worldMap.jpg')} style={{ width: width * 0.9, height: 200, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15 }}>
                        {/* Offer Image */}
                        {/* <View style={{ width: 120, height: 140, borderRadius: 12, overflow: 'hidden' }}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/736x/a9/20/0d/a9200d2079ff66d583f09d59263feeb8.jpg' }}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                    </View> */}

                        {/* Offer Text */}
                        {/* <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: '#333' }}>Watch & Earn!</Text>
                    <Text style={{ fontSize: 14, textAlign: 'center', color: 'gray', marginTop: 5 }}>On XStream Play & Get a Chance to Win an iPhone 15</Text> */}

                        {/* CTA Button */}
                        {/* <TouchableOpacity style={{ backgroundColor: '#1E1E1E', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 15 }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>START WATCHING</Text>
                    </TouchableOpacity> */}
                    </ImageBackground>
                </View>

                {/* Extra Section */}
                <View style={{ padding: 15 }}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Extra</Text>
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

                    {/* Grid Layout */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        {/* Left Large Card */}
                        <View style={{
                            width: '47%', height: 200, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                            shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{extraItems[0].title}</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{extraItems[0].description}</Text>
                            <Image source={{ uri: extraItems[0].image }} style={{ width: 70, height: 80, position: 'absolute', right: 0, bottom: 0 }} />
                        </View>

                        {/* Right Two Small Cards */}
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
                </View>
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
        top: 20,
        // left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    logo: {
        width: 60,
        height: 60,
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
