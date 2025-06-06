import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Image, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [bestTimeModal, setBestTimeModal] = useState(false);
    const [bestTimeData, setBestTimeData] = useState(null);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                fetchQueueStatus();
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

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

    const fetchBestTime = async () => {
        try {
            const response = await fetch("https://uccc.puri.wiredleap.com/api/v1/temple/best-time", {
                method: 'GET',
                headers: {
                    'x-api-token': 'puri_civic_platform_2024',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setBestTimeData(data);
        } catch (err) {
            console.error("Failed to fetch best time:", err);
        }
    };

    useEffect(() => {
        // loadLanguage();
        fetchBestTime();
    }, [isFocused]);

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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଧାଡି ସ୍ଥିତି' : 'Queue & Darshan'}</Text>
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
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଏଠାରେ ବର୍ତ୍ତମାନର ଧାଡ଼ି ସ୍ଥିତି ଦେଖାଉଛି' : 'Showing current queue status here'}</Text>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/Livequeue.png')} style={{ width: 75, height: 75, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}>
                    <View style={{ marginTop: 10, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('LiveQueue')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ width: '20%' }}>
                                {selectedLanguage === 'Odia' ?
                                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>ଧାଡି ସ୍ଥିତି</Text>
                                    :
                                    <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Live Queue</Text>
                                }
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                {selectedLanguage === 'Odia' ?
                                    <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>ଏଠାରେ ବର୍ତ୍ତମାନର ଧାଡ଼ି ସ୍ଥିତି ଦେଖାଉଛି</Text>
                                    :
                                    <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>showing current queue status here</Text>
                                }
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/image/Livequeue.png')} style={{ width: 50, height: 50 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('FestivalAlerts')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Festival Alerts</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/donation435.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setBestTimeModal(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Best Time For Darshan</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/hundiColection654.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Best Time Modal */}
            <Modal
                visible={bestTimeModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setBestTimeModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '90%',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20
                    }}>
                        {bestTimeData ? (
                            <>
                                <Text style={styles.title}>AI-Suggested Best Time</Text>

                                <Text style={styles.label}>Date: <Text style={styles.value}>{bestTimeData.date}</Text></Text>
                                <Text style={styles.label}>Preferred Window: <Text style={styles.value}>{bestTimeData.preferred_window}</Text></Text>
                                <Text style={styles.label}>Suggested Slot: <Text style={styles.value}>{bestTimeData.suggested_best_slot}</Text></Text>
                                <Text style={styles.label}>Expected Wait: <Text style={styles.value}>{bestTimeData.estimated_wait_time} min</Text></Text>
                                <Text style={styles.label}>Queue Level: <Text style={styles.value}>{bestTimeData.expected_queue_level}</Text></Text>
                                <Text style={styles.label}>Confidence Score: <Text style={styles.value}>{(bestTimeData.confidence_score * 100).toFixed(1)}%</Text></Text>
                                <Text style={styles.label}>Reason:</Text>
                                <Text style={styles.value}>{bestTimeData.reason}</Text>

                                <Text style={[styles.label, { marginTop: 10 }]}>Alternative Slots:</Text>
                                {bestTimeData.alternative_slots.map((slot, index) => (
                                    <Text key={index} style={styles.bullet}>• {slot}</Text>
                                ))}

                                <TouchableOpacity
                                    style={{ marginTop: 20, backgroundColor: '#341551', padding: 10, borderRadius: 8 }}
                                    onPress={() => setBestTimeModal(false)}
                                >
                                    <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Close</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text>Failed to load data.</Text>
                        )}
                    </View>
                </View>
            </Modal>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#341551',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'FiraSans-Regular'
    },
    label: {
        fontWeight: 'bold',
        fontFamily: 'FiraSans-Regular',
        color: '#341551',
        marginTop: 5
    },
    value: {
        fontWeight: 'normal',
        color: '#555',
        fontFamily: 'FiraSans-Regular'
    },
    bullet: {
        fontFamily: 'FiraSans-Regular',
        marginLeft: 10,
        color: '#555'
    }
})