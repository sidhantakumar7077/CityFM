import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const mainLockerShoesStand = [
    {
        id: '1',
        locker_name: 'Barabati Kalyani Mandap',
        locker_address: 'Barabati Kalyani Mandap, Puri, Odisha 752001',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/11_1668840715.jpg',
        map_url: 'https://maps.app.goo.gl/HFmFrzQHVSNBAzhp6'
    },
    {
        id: '2',
        locker_name: 'Barabati Kalyani Mandap',
        locker_address: 'Barabati Kalyani Mandap, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/11_1668840715.jpg',
        map_url: 'https://maps.app.goo.gl/vH465ENw5tS48ZB49'
    },
    {
        id: '3',
        locker_name: 'Loknath Temple Parking',
        locker_address: 'Temple Parking, Jibaramjee Palli, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/11_1668840715.jpg',
        map_url: 'https://maps.app.goo.gl/HUVPZtz6bXJAH2Fb6'
    },
    {
        id: '4',
        locker_name: 'Loknath Temple Parking',
        locker_address: 'Temple Parking, Jibaramjee Palli, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/11_1668840715.jpg',
        map_url: 'https://maps.app.goo.gl/HUVPZtz6bXJAH2Fb6'
    }
];

const lockerShoesStand = [
    {
        id: '1',
        locker_name: 'Barabati Kalyani Mandap',
        locker_address: 'Barabati Kalyani Mandap, Puri, Odisha 752001',
        image: 'https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg',
        map_url: 'https://maps.app.goo.gl/HFmFrzQHVSNBAzhp6'
    },
    {
        id: '2',
        locker_name: 'Barabati Kalyani Mandap',
        locker_address: 'Barabati Kalyani Mandap, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg',
        map_url: 'https://maps.app.goo.gl/vH465ENw5tS48ZB49'
    },
    {
        id: '3',
        locker_name: 'Loknath Temple Parking',
        locker_address: 'Temple Parking, Jibaramjee Palli, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg',
        map_url: 'https://maps.app.goo.gl/HUVPZtz6bXJAH2Fb6'
    }
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
                        {isScrolled && <Text style={styles.headerText}>Locker & Shoes</Text>}
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
                {/* Main Locker & Shoes Stands */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={mainLockerShoesStand}
                    scrollEnabled={false}
                    numColumns={2}
                    contentContainerStyle={{ width: '95%', alignSelf: 'center', marginTop: 8 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => openMap(item.map_url)} style={{ width: '48%', margin: '1%', backgroundColor: '#fff', borderRadius: 12, padding: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                            <Image source={{ uri: item.image }} style={styles.lockerImage} />
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: '#000', fontSize: 15, fontFamily: 'FiraSans-Regular' }}>{item.locker_name}</Text>
                                <Text style={{ color: '#666', fontSize: 12, fontFamily: 'FiraSans-Regular' }}>
                                    {item.locker_address.length > 25 ? `${item.locker_address.substring(0, 25)}...` : item.locker_address}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                {/* Locker & Shoes Stands */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={lockerShoesStand}
                    scrollEnabled={false}
                    contentContainerStyle={{ width: '95%', alignSelf: 'center', marginTop: 8 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.secondLocker, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <Text style={{ fontSize: 18, fontFamily: 'FiraSans-Regular', color: '#333', marginVertical: 5 }}>{item.locker_name}</Text>
                            <TouchableOpacity onPress={() => openMap(item.map_url)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome5 name="directions" size={30} color="#666" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

export default Index;

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
    /* List Styles */
    mostPPlrItem: {
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: '1.3%'
    },
    mostPPImage: {
        height: '100%',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover'
    },
    hotBtm: {
        position: 'absolute',
        top: 10,
        left: 6,
        backgroundColor: '#f00062',
        padding: 2,
        borderRadius: 6
    },
    saveBtm: {
        position: 'absolute',
        top: 10,
        right: 6,
        backgroundColor: '#fff',
        width: 26,
        height: 26,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lockerImage: {
        height: 100,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    secondLocker: {
        backgroundColor: '#fff',
        width: '100%',
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
});
