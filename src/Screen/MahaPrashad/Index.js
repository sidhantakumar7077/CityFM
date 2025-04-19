import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Easing, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Modal from 'react-native-modal';
import { base_url } from '../../../App';
import moment from 'moment';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [mahaPrasadData, setMahaPrasadData] = useState([]);
    const [specialMahaPrasadData, setSpecialMahaPrasadData] = useState([]);
    const [isBellActive, setIsBellActive] = useState(false);
    const swingAnim = useRef(new Animated.Value(0)).current;

    const triggerBellSwing = () => {
        // Toggle bell state
        setIsBellActive(prev => !prev);

        // Reset animation
        swingAnim.setValue(0);

        // Perform the swing animation
        Animated.sequence([
            Animated.timing(swingAnim, {
                toValue: 1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(swingAnim, {
                toValue: -1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(swingAnim, {
                toValue: 0.6,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(swingAnim, {
                toValue: -0.6,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(swingAnim, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const rotateInterpolate = swingAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-20deg', '20deg'],
    });

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

    const fetchMahaPrasadData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${base_url}api/get-maha-prasad`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Darshan Data:', result);

            if (result.status) {
                console.log("Darshan List", result.data);
                const today = moment().format("YYYY-MM-DD");

                // const normalPrasad = result.data.filter(item => item.prasad_type === "normal");
                const specialTodayPrasad = result.data.filter(item => item.prasad_type === "special" && item.date === today);

                // Merge and sort by start_time
                // const combined = [...normalPrasad, ...specialTodayPrasad].sort((a, b) => {
                //     return moment(a.start_time, "HH:mm").diff(moment(b.start_time, "HH:mm"));
                // });
                // console.log("Combined Prasad List", combined);
                // console.log("Special Prasad List", specialTodayPrasad[0]);
                setSpecialMahaPrasadData(specialTodayPrasad[0]);
                setMahaPrasadData(result.data);
                setIsLoading(false);
            } else {
                console.warn('API responded with status false:', result.message);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching home section data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchMahaPrasadData();
        }
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
                        <Text style={styles.headerText}>Maha Prashad</Text>
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
                    {/* <ImageBackground source={require('../../assets/image/mangala_alati.jpg')} style={styles.headerImage} /> */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Maha Prasad Bhoga Timing</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>Know The Bhoga Being Offered To Mahaprabhu & Mahaprasad Availability at Ananda Bazar</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Set Alert →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/image/prasad879.png')} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Today Special Prasad */}
                {specialMahaPrasadData &&
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
                            <Text style={styles.nitiName}>Today Special MahaPrasad</Text>
                            <Text style={{ color: '#333', fontSize: 14, fontFamily: 'FiraSans-SemiBold' }}>{specialMahaPrasadData?.prasad_name}</Text>
                            <Text style={styles.nitiTime}>
                                <Text style={styles.nitiStatus}>Tentative Start </Text>
                                <Text style={{ color: '#000' }}> | {specialMahaPrasadData?.start_time}</Text>
                            </Text>
                        </View>

                        {/* Bell Icon for Upcoming Niti Only */}
                        <TouchableOpacity onPress={triggerBellSwing}>
                            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                                <MaterialCommunityIcons
                                    name={isBellActive ? 'bell-ring' : 'bell-outline'}
                                    size={30}
                                    color={'#dd4c2f'}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </LinearGradient>
                }

                {/* Prashad List */}
                {!isLoading ? (
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={mahaPrasadData}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => {
                                const isLast = index === mahaPrasadData.length - 1;
                                const isCompleted = item.master_prasad_status === 'Completed';
                                const isRunning = item.master_prasad_status === 'Started';
                                const isUpcoming = item.master_prasad_status === 'Upcoming';

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
                                        <TouchableOpacity onPress={handleAlram}>
                                            <MaterialCommunityIcons name="bell-outline" size={22} color="#999" />
                                        </TouchableOpacity>
                                    );
                                };

                                const getColor = () => {
                                    if (isCompleted) return '#FFA726'; // purple
                                    if (isRunning) return '#F06292'; // green
                                    return '#C5C5C5'; // grey
                                };

                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 15 }}>
                                        {/* Left Indicator */}
                                        <View style={{ alignItems: 'center', width: 40 }}>
                                            {/* Number Circle */}
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

                                            {/* Line below */}
                                            {!isLast && <View style={{ flex: 1, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />}
                                        </View>

                                        {/* Right Content */}
                                        <View style={{ flex: 1, paddingBottom: 30, marginLeft: 7 }}>
                                            <Text style={{ fontSize: 15, color: '#222', fontFamily: 'FiraSans-SemiBold' }}>{item.prasad_name}</Text>
                                            {item.master_prasad_status !== 'Upcoming' && <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>Started at {item.start_time}</Text>}

                                            {isRunning && (
                                                <>
                                                    <Text style={{ fontSize: 13, color: '#FFA726', fontFamily: 'FiraSans-Regular' }}>
                                                        Running Now
                                                    </Text>
                                                </>
                                            )}
                                        </View>

                                        {/* Right-side icon */}
                                        <View style={{ marginTop: 5 }}>
                                            {getIcon()}
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: '50%' }}>
                        <Text style={{ fontSize: 16, color: '#999', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                )}
                <View style={{ height: 400 }} />
            </ScrollView>

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
    /* List Item Styles */
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
