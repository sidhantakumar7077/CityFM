import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const images = [
    'https://admin.stayatpurijagannatha.in/images/hotels/11_1668840715.jpg',
    'https://admin.stayatpurijagannatha.in/images/hotels/bhsl1_1668837595.jpg',
    'https://admin.stayatpurijagannatha.in/images/hotels/22_1668840168.jpg',
    'https://admin.stayatpurijagannatha.in/images/hotels/nsl1_1668836524.jpg'
];

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsScrolled(offsetY > 50); // Change header color after 50px scroll
            }
        }
    );

    const openMap = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#ba62f5', '#ba62f5'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        {isScrolled && <Text style={styles.headerText}>Details</Text>}
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Pitch-perfect Travel Offers</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>Save up to ₹5000 on Flights to any cricket match venue</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Now →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, width: '100%', alignSelf: 'center', marginTop: 10 }}>
                    <View onPress={() => navigation.navigate('BhaktaNibasDetails')} style={styles.bhaktanibasbox}>
                        <Swiper
                            style={{ height: 200 }}
                            showsPagination={false}
                            autoplay={true}
                            autoplayTimeout={5}
                            activeDotColor="#ff6347"
                        >
                            {images.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={styles.bhaktanibasImage} />
                            ))}
                        </Swiper>
                    </View>
                    <View style={[styles.bhaktanibasbox, { padding: 10 }]}>
                        <Text style={{ fontSize: 18, fontFamily: 'FiraSans-Regular', color: '#333', marginVertical: 5 }}>Neeladri Bhakta Nivas</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5, fontFamily: 'FiraSans-Regular' }}>Puri, Odisha</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5, fontFamily: 'FiraSans-Regular' }}>Price: ₹5000</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5, fontFamily: 'FiraSans-Regular' }}>Contact: 1234567890</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5, fontFamily: 'FiraSans-Regular' }}>Email: demo@gmail.com</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5, fontFamily: 'FiraSans-Regular' }}>Address: Puri, Odisha</Text>
                    </View>
                    <View style={[styles.bhaktanibasbox, { flexDirection: 'row', justifyContent: 'space-between', padding: 10 }]}>
                        <Text style={{ fontSize: 18, fontFamily: 'FiraSans-Regular', color: '#333', marginVertical: 5 }}>Direction</Text>
                        <TouchableOpacity onPress={() => openMap('https://maps.app.goo.gl/vH465ENw5tS48ZB49')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="directions" size={30} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.bhaktanibasbox, { padding: 10 }]}>
                        <Text style={{ fontSize: 18, fontFamily: 'FiraSans-Regular', color: '#333', marginVertical: 5 }}>Story In This Bhakta Nibas</Text>
                        <Text style={{ fontSize: 14, color: '#666', marginBottom: 5, fontFamily: 'FiraSans-Regular' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in lectus pretium ultricies. Nullam nec purus in lectus pretium ultricies.</Text>
                    </View>
                </View>
                <View style={{ height: 200 }}></View>
            </ScrollView>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF5F5',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'FiraSans-Regular',
        color: 'white',
        textTransform: 'capitalize'
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#ba62f5',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
    },
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B7100',
    },
    // main content
    bhaktanibasbox: {
        backgroundColor: '#fff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
        padding: 8
    },
    bhaktanibasImage: {
        height: 200,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
})