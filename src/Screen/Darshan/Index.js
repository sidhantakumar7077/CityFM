import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Modal from 'react-native-modal';
import { base_url } from "../../../App";
import moment from 'moment';

const darshanTimings = [
    { name: 'Mangal Arati', status: 'Completed', time: '05.30 AM', completedAt: '06:00 AM' },
    { name: 'Bhitara Kaatha Darshan', status: 'Completed', time: '06:00 AM', completedAt: '06:00 AM' },
    { name: 'Baahaar Kaatha Darshan', status: 'Running', time: '08:00 AM', completedAt: '10:00 AM' },
    { name: 'Bhitara Kaatha Darshan', status: 'Upcoming', time: '10:00 AM', completedAt: '12:30 PM' },
    { name: 'Baahaar Kaatha Darshan', status: 'Upcoming', time: '12:30 PM', completedAt: '03:30 PM' },
    { name: 'Bhitara Kaatha Darshan', status: 'Upcoming', time: '03:30 PM', completedAt: '06:30 PM' },
    { name: 'Baahaar Kaatha Darshan', status: 'Upcoming', time: '06:30 PM', completedAt: 'Till Pahuda' },
];

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [darshanData, setDarshanData] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
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
            getDarshanList();
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

    const [alramModalVisible, setAlramModalVisible] = useState(false);

    const handleAlram = () => {
        setAlramModalVisible(!alramModalVisible);
    };

    const getDarshanList = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${base_url}api/darshan-list`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Darshan Data:', result);

            if (result.status) {
                // Filter or Find the Darshan item with status "Started"
                const startedDarshan = result.data.find(item => item.darshan_status === 'Started');
                console.log("Started Darshan", startedDarshan);

                if (startedDarshan) {
                    setDarshanData(startedDarshan); // Set only the Started Darshan
                } else {
                    console.log('No Darshan with status "Started" found.');
                    setDarshanData(null); // Optional: set empty if not found
                }

                setIsLoading(false);
            } else {
                console.warn('API responded with status false:', result.message);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching darshan data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getDarshanList();
            loadLanguage();
        }
    }, [isFocused, selectedLanguage]);

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
                        <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଦର୍ଶନ' : 'Darshan'}</Text>
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
                    {/* <ImageBackground source={require('../../assets/image/mangala_alati.jpg')} style={styles.headerImage} /> */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଦର୍ଶନ ସ୍ଥିତିକୁ ଜାଣନ୍ତୁ |' : 'Know The Darshan Status'}</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଏଠାରେ ସମସ୍ତ ଦର୍ଶନର ବିବରଣୀ ପାଇପାରିବେ । ଯଥା ଭିତର କାଠ ଦର୍ଶନ ଓ ବାହାର କାଠ ଦର୍ଶନ ଏବଂ ଦର୍ଶନ କେତେବେଳେ ବନ୍ଦ ରହୁଛି ।' : "You Can Find When The Darshan Starts & Halts As Well As When The Bhitara Katha Darshan Starts."}</Text>
                            {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Darshan →</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/darshan34.png')} style={{ width: 85, height: 85, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Darshan List */}
                {!isLoading ? (
                    <View style={{ marginTop: 20 }}>
                        {/* <FlatList
                            data={darshanData}
                            keyExtractor={(item) => item.darshan_id.toString()}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => {
                                const isLast = index === darshanData.length - 1;
                                const isCompleted = item.darshan_status === 'Completed';
                                const isRunning = item.darshan_status === 'Started';
                                const isUpcoming = item.darshan_status === 'Upcoming';

                                const getIcon = () => {
                                    if (isCompleted) {
                                        return <Feather name="check-circle" size={20} color="#999" />;
                                    }
                                    if (isRunning) {
                                        return (
                                            <View style={{ backgroundColor: '#dce8e0', padding: 6, borderRadius: 100 }}>
                                                <MaterialCommunityIcons name="timer-outline" size={30} color="#059629" />
                                            </View>
                                        );
                                    }
                                    return (
                                        null
                                        // <TouchableOpacity onPress={handleAlram}>
                                        //     <MaterialCommunityIcons name="bell-outline" size={22} color="#999" />
                                        // </TouchableOpacity>
                                    );
                                };

                                const getColor = () => {
                                    if (isCompleted) return '#FFA726'; // purple
                                    if (isRunning) return '#F06292'; // green
                                    return '#C5C5C5'; // grey
                                };

                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 15 }}>
                                        <View style={{ alignItems: 'center', width: 40 }}>
                                            <LinearGradient
                                                colors={isUpcoming ? ['#C5C5C5', '#C5C5C5'] : ['#FFA726', '#F06292']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={{
                                                    height: 24,
                                                    width: 24,
                                                    borderRadius: 12,
                                                    borderWidth: 2,
                                                    borderColor: getColor(),
                                                    backgroundColor:
                                                        isCompleted ? '#341551' :
                                                            isRunning ? '#059629' :
                                                                '#C5C5C5',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {isCompleted ? (
                                                    <MaterialIcons name="check" size={14} color="white" />
                                                ) : (
                                                    <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>
                                                        {index + 1}
                                                    </Text>
                                                )}
                                            </LinearGradient>

                                            {!isLast && <View style={{ flex: 1, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />}
                                        </View>

                                        <View style={{ flex: 1, paddingBottom: 30, marginLeft: 7 }}>
                                            <Text style={{ fontSize: 15, color: '#222', fontFamily: 'FiraSans-SemiBold', textTransform: 'capitalize' }}>{item.darshan_name}</Text>
                                            {item.darshan_status !== 'Upcoming' && <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>Started at {item.start_time}</Text>}

                                            {isCompleted && (
                                                <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-Regular' }}>
                                                    Completed at {item.end_time}
                                                </Text>
                                            )}

                                            {isRunning && (
                                                <Text style={{ fontSize: 13, color: '#FFA726', fontFamily: 'FiraSans-Regular' }}>
                                                    Running Now
                                                </Text>
                                            )}
                                        </View>

                                        <View style={{ marginTop: 5 }}>
                                            {getIcon()}
                                        </View>
                                    </View>
                                );
                            }}
                        /> */}
                        {darshanData ?
                            <LinearGradient
                                colors={['#F06292', '#FFA726']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.nitiItem}
                            >
                                {/* Status Indicator */}
                                <View style={styles.statusIndicator} />

                                {/* Niti Details */}
                                <View style={styles.nitiDetails}>
                                    <Text style={styles.nitiName}>{selectedLanguage === 'Odia' ? 'ଦର୍ଶନ ଚାଲୁଅଛି' : 'Darshan Running'}</Text>
                                    <Text style={{ color: '#333', fontSize: 14, fontFamily: 'FiraSans-SemiBold' }}>{selectedLanguage === 'Odia' ? darshanData?.darshan_name : darshanData?.english_darshan_name}</Text>
                                    {/* <Text style={styles.nitiTime}>
                                        <Text style={styles.nitiStatus}>{selectedLanguage === 'Odia' ? 'ଆରମ୍ଭ ହୋଇଥିଲା ' : 'Started at '}</Text>
                                        <Text style={{ color: '#000' }}> | {moment(darshanData?.start_time, 'HH:mm:ss').format('hh:mm A')}</Text>
                                    </Text> */}
                                </View>
                            </LinearGradient>
                            :
                            <LinearGradient
                                colors={['#F06292', '#FFA726']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.nitiItem}
                            >
                                {/* Status Indicator */}
                                <View style={styles.statusIndicator} />

                                {/* Niti Details */}
                                <View style={styles.nitiDetails}>
                                    <Text style={{ color: '#333', fontSize: 14, fontFamily: 'FiraSans-SemiBold' }}>{selectedLanguage === 'Odia' ? 'ଦର୍ଶନ ବନ୍ଦ ଅଛି |' : 'Darshan is on halt.'}</Text>
                                </View>
                            </LinearGradient>
                        }
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: '50%' }}>
                        <Text style={{ fontSize: 16, color: '#999', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                )}

                {/* Alarm Modal */}
                <Modal
                    isVisible={alramModalVisible}
                    onBackdropPress={handleAlram}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropTransitionOutTiming={0}
                    backdropOpacity={0.5}
                >
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'FiraSans-SemiBold', color: '#222' }}>Set Alarm</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular', color: '#999', marginTop: 5 }}>You can set alarm for this darshan</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>Bhitara Kaatha Darshan</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>10:00 AM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>Set Alarm</Text>
                            <TouchableOpacity style={{ backgroundColor: '#341551', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={handleAlram}>
                                <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Set</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Regular', color: '#222' }}>Cancel</Text>
                            <TouchableOpacity style={{ backgroundColor: '#341551', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={handleAlram}>
                                <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        backgroundColor: '#341551',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
    },
    nitiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statusIndicator: {
        width: 5,
        height: 55,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#341551',
    },
    nitiDetails: {
        flex: 1,
    },
    nitiName: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'FiraSans-SemiBold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    nitiTime: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'FiraSans-Regular'
    },
    nitiStatus: {
        fontWeight: 'bold',
        color: '#333',
    },
});
