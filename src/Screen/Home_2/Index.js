import React from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const HomeScreen = () => {

    const serviceData = [
        { title: 'Darshan', icon: 'calendar-check', color: '#B09ECF' },
        { title: 'MahaPrashad', icon: 'bed', color: '#E9A93F' },
        { title: 'Offering', icon: 'gift', color: '#87B5D8' },
        { title: 'Bhajan', icon: 'music', color: '#92C362' },
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

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    return (

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
                <View style={{ flexDirection: 'row' }}>
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
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>View All Niti</Text>
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
                            <TouchableOpacity style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 15 }}>
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

                {/* Services Grid */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
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
            </View>

            {/* Nearby Temple */}
            <View style={styles.nearbyContainer}>
                {/* Title Section */}
                <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#673AB7' }}>Nearby Temples</Text>
                <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

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
        </ScrollView>
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
        paddingVertical: 10,
        borderRadius: 10,
    },
    sliderCard: {
        width: 150,
        height: 210,
        backgroundColor: '#E8F5E9',
        marginRight: 10,
        borderRadius: 15,
        alignItems: 'center',
    }
});

export default HomeScreen;
