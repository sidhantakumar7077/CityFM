import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

const Index = () => {

    const navigation = useNavigation();
    // const isFocused = useIsFocused();
    const [active, setActive] = useState('World Wide');
    const { width } = Dimensions.get('window');

    const templeInfo = [
        { id: '1', image: require('../../assets/image/mangala_alati.jpg'), label: 'Shree Mandira' },
        { id: '2', image: require('../../assets/image/rathaanukula5.jpeg'), label: 'Shree Khetra' },
        // { id: '3', image: require('../../assets/image/tradition.png'), label: 'Tradition' },
        { id: '12', image: require('../../assets/image/rathaanukula2.jpg'), label: 'Ratha yatra' },
        // { id: '13', image: require('../../assets/image/nabakalebala.png'), label: 'Nabakalebala' },
        { id: '4', image: require('../../assets/image/mailama.jpeg'), label: 'Matha & Ashram' },
        { id: '5', image: require('../../assets/image/dwaraphita.jpg'), label: 'Festivals' },
        { id: '6', image: require('../../assets/image/charinahak3.jpeg'), label: '36 Nijoga' },
        { id: '7', image: require('../../assets/image/bhajana.jpg'), label: 'Besha' },
        { id: '8', image: require('../../assets/image/mangala_alati.jpg'), label: 'Management' },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/temple654.jpg")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#c91306', padding: 7, borderRadius: 50 }}>
                            <Ionicons name="home-sharp" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 100, width: '100%', left: 13 }}>
                        <View style={{ textAlign: 'center', marginLeft: 8 }}>
                            <Text style={{ color: '#d9dbdb', fontSize: 14, fontFamily: 'FiraSans-Regular', letterSpacing: 0.8 }}>Welcome to</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Jagannatha</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Temple Puri</Text>
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

                {/* About Temple */}
                <View style={{ padding: 15, marginTop: 10 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Temple Information</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20, alignSelf: 'center' }} />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 6 }}>
                        {templeInfo.map((item) => (
                            <View key={item.id} style={{ width: '45%', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 120, height: 120, borderRadius: 100, backgroundColor: '#f1ebf5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    <Image source={item.image} style={{ width: '100%', height: '100%', borderRadius: 100, resizeMode: 'cover' }} />
                                </View>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Temples Worldwide */}
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Jagannatha Temples Worldwide</Text>
                    <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center' }} />
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
