import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const [petrolData, setPetrolData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

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

    const getPetrolData = async () => {
        try {
            setSpinner(true);
            const response = await fetch(base_url + 'api/get-all-service-list');
            const result = await response.json();
            if (result.status) {
                const petrolPumpOnly = result.data.filter(item => item.service_type === 'petrol_pump');
                setPetrolData(petrolPumpOnly);
            }
        } catch (error) {
            console.error('Error fetching petrol pump data:', error);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getPetrolData();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>Petrol Pump</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
            >
                <View style={styles.headerContainer}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15
                    }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>
                                Petrol Pumps Nearby
                            </Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>
                                You Can Click On The Map To Navigate To Petrol Pumps.
                            </Text>
                            <TouchableOpacity style={styles.ctaBtn}>
                                <Text style={styles.ctaText}>Check Now →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/SplashLogo.png')}
                                style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {spinner ? (
                    <View style={{ paddingVertical: 80, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={petrolData}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openMap(item.google_map_link)}
                                style={styles.cardContainer}
                            >
                                <View style={styles.imageBox}>
                                    {item.photo && <Image source={{ uri: item.photo }} style={{ height: '100%', width: '100%', borderRadius: 6 }} />}
                                </View>
                                <View style={{ width: '55%', justifyContent: 'center' }}>
                                    <Text style={styles.title}>{item.description || 'Petrol Pump'}</Text>

                                    <View style={styles.row}>
                                        <MaterialIcons name="location-on" size={14} color="#999" />
                                        <Text style={styles.subText}>
                                            {item.landmark}, {item.district}
                                        </Text>
                                    </View>

                                    <View style={styles.row}>
                                        <MaterialIcons name="access-time" size={13} color="#999" />
                                        <Text style={styles.subText}>
                                            Open: {item.opening_time} - {item.closing_time}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <FontAwesome5 name="air-freshener" size={13} color="#28a745" />
                                        <Text style={{ fontSize: 13, marginLeft: 5, color: '#28a745', textTransform: 'capitalize' }}>{item.status}</Text>
                                    </View>
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
        textTransform: 'capitalize',
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    ctaBtn: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    ctaText: {
        color: '#4B0082',
        fontFamily: 'FiraSans-Regular'
    },
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    imageBox: {
        width: '42%',
        height: 110,
        justifyContent: 'center',
        backgroundColor: '#dedfe0',
        borderRadius: 6,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#341551',
        fontFamily: 'FiraSans-SemiBold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2
    },
    subText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        fontFamily: 'FiraSans-Regular'
    },
    contact: {
        fontSize: 13,
        marginLeft: 4,
        color: '#28a745',
        fontFamily: 'FiraSans-Regular'
    }
});
