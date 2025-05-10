import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [allParking, setAllParking] = useState([]);
    const [selectedTab, setSelectedTab] = useState('FourWheelers');

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                getAllParking(value);
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            getAllParking(selectedLanguage);
            loadLanguage();
        }, 2000);
    }, []);

    const filteredParkingList = selectedTab === 'TwoWheelers'
        ? allParking.filter(item => item.vehicle_type?.toLowerCase().includes('two wheeler'))
        : allParking.filter(item => item.vehicle_type?.toLowerCase().includes('four wheeler'));

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsScrolled(offsetY > 50);
            }
        }
    );

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const getAllParking = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-parking/${language}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                setSpinner(false);
                // const filteredData = responseData.data.filter(item => item.language === selectedLanguage);
                setAllParking(responseData.data);
                // console.log("Parking Data:", filteredData);
            }
        } catch (error) {
            console.log('Error fetching parking data:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getAllParking(selectedLanguage);
            loadLanguage();
        }
    }, [isFocused, selectedLanguage])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ପାର୍କିଂ' : 'Parking'}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
            >
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଯାନବାହାନ ପାର୍କିଂ ସ୍ଥଳ' : 'Vehicle Parking'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଆପଣ ଆପଣଙ୍କର ଦୁଇ, ତିନି ଏବଂ ଚାରି ଚକିଆ ଯାନ ନିମ୍ନଲିଖିତ ପାର୍କିଂ ସ୍ଥାନଗୁଡ଼ିକରେ ପାର୍କ କରିପାରିବେ।' : 'You Can Park Your Two, Three & Four Wheelers At The Following Parking Places.'}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Online →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/image/parking765.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, margin: 15, padding: 5 }}>
                    <LinearGradient
                        colors={selectedTab === 'FourWheelers' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            backgroundColor: selectedTab === 'FourWheelers' ? '#4B0082' : 'transparent',
                            borderRadius: 10,
                            paddingVertical: 8,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => setSelectedTab('FourWheelers')}>
                            <Text style={{ color: selectedTab === 'FourWheelers' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ଚାରି ଚକିଆ' : 'Four Wheelers'}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={selectedTab === 'TwoWheelers' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            flex: 1,
                            backgroundColor: selectedTab === 'TwoWheelers' ? '#4B0082' : 'transparent',
                            borderRadius: 10,
                            paddingVertical: 8,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => setSelectedTab('TwoWheelers')}>
                            <Text style={{ color: selectedTab === 'TwoWheelers' ? '#fff' : '#4B0082', fontFamily: 'FiraSans-Regular' }}>
                                {selectedLanguage === 'Odia' ? 'ଦୁଇ ଚକିଆ' : 'Two Wheelers'}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {spinner ? (
                    <View style={{ flex: 1, alignSelf: 'center', top: '40%' }}>
                        <Text style={{ color: '#341551', fontSize: 17 }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredParkingList}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.map_url)}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <View style={{ width: '42%', justifyContent: 'center', backgroundColor: '#dedfe0', borderRadius: 6 }}>
                                    {item.parking_photo ?
                                        <Image source={{ uri: item.parking_photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>

                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.parking_name}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark} {item.district}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            24/7
                                        </Text>
                                    </View> */}

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <FontAwesome5 name="parking" size={13} color={'#28a745'} />
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                marginLeft: 4,
                                                fontFamily: 'FiraSans-Regular',
                                                color: '#28a745',
                                            }}
                                        >
                                            {item.parking_availability} Spots Available
                                        </Text>
                                    </View> */}
                                    {/* <TouchableOpacity style={{ marginTop: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
                                        <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-SemiBold' }}>Book Now →</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
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
        overflow: 'hidden',
    }
});