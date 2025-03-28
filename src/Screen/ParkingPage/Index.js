import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const parkingList = [
    {
        id: '1',
        parking_name: 'Gadadhar High School',
        parking_address: 'Gadadhar High School, Puri, Odisha 752001',
        image: 'https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg',
        map_url: 'https://maps.app.goo.gl/HFmFrzQHVSNBAzhp6'
    },
    {
        id: '2',
        parking_name: 'Barabati Kalyani Mandap',
        parking_address: 'Barabati Kalyani Mandap, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg',
        map_url: 'https://maps.app.goo.gl/vH465ENw5tS48ZB49'
    },
    {
        id: '3',
        parking_name: 'Loknath Temple Parking',
        parking_address: 'Temple Parking, Jibaramjee Palli, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg',
        map_url: 'https://maps.app.goo.gl/HUVPZtz6bXJAH2Fb6'
    }
];

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [allParking, setAllParking] = useState([]);
    const [selectedTab, setSelectedTab] = useState('FourWheelers');
    const filteredParkingList = selectedTab === 'TwoWheelers' ? parkingList : parkingList;

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

    const getAllParking = async () => {
        try {
            setSpinner(true);
            const response = await fetch(base_url + 'api/get-parking', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                // console.log("get Parking List-------", responseData.data);
                setSpinner(false);
                setAllParking(responseData.data);
            }
        } catch (error) {
            console.log('Error fetching parking data:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getAllParking();
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>Parking</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            {spinner === true ?
                <View style={{ flex: 1, alignSelf: 'center', top: '40%' }}>
                    <Text style={{ color: '#341551', fontSize: 17 }}>Loading...</Text>
                </View>
                :
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
                                <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Vehicle Parking</Text>
                                <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>You Can Park Your Two, Three & Four Wheelers At The Following Parking Places</Text>
                                <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                    <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Online →</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '22%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                            </View>
                        </View>
                    </View>

                    {/* Tab Section */}
                    <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, margin: 15, padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => setSelectedTab('FourWheelers')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'FourWheelers' ? '#4B0082' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'FourWheelers' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                Four Wheelers
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedTab('TwoWheelers')}
                            style={{
                                flex: 1,
                                backgroundColor: selectedTab === 'TwoWheelers' ? '#4B0082' : 'transparent',
                                borderRadius: 10,
                                paddingVertical: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: selectedTab === 'TwoWheelers' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                Two Wheelers
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Parking List */}
                    <FlatList
                        data={filteredParkingList}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.map_url)}
                                style={{
                                    width: '100%',
                                    height: 150,
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View style={{ width: '42%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                                    {/* <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee', marginRight: 12 }}> */}
                                </View>

                                {/* Text Content */}
                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.parking_name}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            Location Address
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            24/7
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <FontAwesome5 name="parking" size={13} color={item.id === '1' ? '#28a745' : '#D64C64'} />
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                marginLeft: 4,
                                                fontFamily: 'FiraSans-Regular',
                                                color: item.id === '1' ? '#28a745' : '#D64C64',
                                            }}
                                        >
                                            {item.id === '1' ? '45/250 Spots Available' : '5/250 Spots Available'}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={{ marginTop: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
                                        <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-SemiBold' }}>Book Now →</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            }
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
        backgroundColor: '#341551',
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
});
