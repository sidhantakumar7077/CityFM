import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [queueData, setQueueData] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

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

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            fetchQueueStatus();
            loadLanguage();
        }, 2000);
    }, []);

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

    const fetchQueueStatus = async () => {
        setSpinner(true);
        try {
            const response = await fetch('https://uccc.puri.wiredleap.com/api/v1/temple/queue-status', {
                method: 'GET',
                headers: {
                    'x-api-token': 'puri_civic_platform_2024',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                setQueueData(json);
                // console.log("Queue Data:", json);
            } else {
                console.error("Failed to fetch queue data", response.status);
            }
        } catch (err) {
            console.error("Error fetching queue data:", err);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        fetchQueueStatus();
        loadLanguage();
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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଧାଡି ସ୍ଥିତି' : 'Live Queue'}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଏଠାରେ ବର୍ତ୍ତମାନର ଧାଡ଼ି ସ୍ଥିତି ଦେଖାଉଛି' : 'Showing current queue status here'}</Text>
                            {/* <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>All The Properties Below Are Owned By Shree Jagannatha Temple Administration</Text> */}
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                            <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Now →</Text>
                                        </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/Livequeue.png')} style={{ width: 75, height: 75, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {spinner === true ?
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                    :
                    <View style={{ padding: 15 }}>
                        <FlatList
                            data={queueData}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item.queue_id + index}
                            renderItem={({ item }) => (
                                <View style={{
                                    backgroundColor: '#fff',
                                    marginBottom: 15,
                                    borderRadius: 10,
                                    padding: 15,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 3
                                }}>
                                    {/* Zone - Title */}
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#341551', marginBottom: 10 }}>
                                        {item.zone}
                                    </Text>

                                    {/* Key-Value Pairs */}
                                    {[
                                        { key: selectedLanguage === 'Odia' ? 'ସମୟ' : 'Time', value: new Date(item.timestamp).toLocaleString() },
                                        { key: selectedLanguage === 'Odia' ? 'ପ୍ରତିକ୍ଷା ସ୍ତର' : 'Queue Level', value: item.current_queue_level },
                                        { key: selectedLanguage === 'Odia' ? 'ଅନୁମାନିତ ଅପେକ୍ଷା ସମୟ' : 'Estimated Wait', value: `${item.estimated_wait_time_minutes} min` },
                                        { key: selectedLanguage === 'Odia' ? 'ସ୍ଥିତି' : 'Status', value: item.status }
                                    ].map((entry, index) => (
                                        <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <Text style={{ width: 140, fontFamily: 'FiraSans-SemiBold', color: '#292928' }}>{entry.key}</Text>
                                            <Text style={{ flex: 1, fontFamily: 'FiraSans-Regular', color: '#555' }}>: {entry.value}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        />
                    </View>
                }
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
})