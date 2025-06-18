import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const [allShoesStands, setAllShoesStands] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                getShoesStands(value);
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
            getShoesStands(selectedLanguage);
            loadLanguage();
        }, 2000);
    }, []);

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

    const getShoesStands = async (language) => {
        try {
            setSpinner(true);
            const response = await fetch(`${base_url}api/get-all-service-list/${language}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                const shoeStandsOnly = responseData.data.filter(item => item.service_type === 'locker');
                // const filteredData = shoeStandsOnly.filter(item => item.language === selectedLanguage);
                // console.log("object", filteredData);
                setAllShoesStands(shoeStandsOnly);
                setSpinner(false);
            }
        } catch (error) {
            console.error('Error fetching shoe stand data:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getShoesStands(selectedLanguage);
            loadLanguage();
        }
    }, [isFocused, selectedLanguage]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଲକର୍ ଏବଂ ଜୋତା ଷ୍ଟାଣ୍ଡ' : 'Locker & Shoe Stand'}</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଜିନିଷ ରଖିବା ସ୍ଥାନ ଓ ଜୋତାଷ୍ଟାଣ୍ଡ' : 'Cloakroom & Lockers'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ମନ୍ଦିର ନିକଟରେ ଉପଲବ୍ଧ କିଛି ଲକର ଏବଂ ଜୋତାଷ୍ଟାଣ୍ଡ|' : 'Some Of The Available Lockers & Stands Near To The Temple.'}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Check Now →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/locker675.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {spinner ? (
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={allShoesStands}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
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
                                    {item.photo ?
                                        <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                        :
                                        <Image source={require('../../assets/image/no_image.jpg')} style={{ height: '100%', width: '100%', borderRadius: 6 }} />
                                    }
                                </View>
                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>
                                        {item.service_name || 'Shoe Stand'}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            {item.landmark}, {item.district}
                                        </Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={{ fontSize: 12, color: '#666', marginLeft: 4, fontFamily: 'FiraSans-Regular' }}>
                                            Open: {item.opening_time} - {item.closing_time}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <FontAwesome5 name="air-freshener" size={13} color="#28a745" />
                                        <Text style={{ fontSize: 13, marginLeft: 5, color: '#28a745', textTransform: 'capitalize' }}>{item.status}</Text>
                                    </View> */}
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
        overflow: 'hidden'
    }
});
