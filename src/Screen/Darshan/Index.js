import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';

const nitiTimings = [
    { name: 'Mangal Arati', status: 'Completed', time: '05.30 AM', relativeTime: 'soon', completedAt: '06:00 AM' },
    { name: 'Bhitara Kaatha Darshan', status: 'Completed', time: '06:00 AM', relativeTime: 'in 8 hours', completedAt: '06:00 AM' },
    { name: 'Baahaar Kaatha Darshan', status: 'Running', time: '08:00 AM', relativeTime: '3 hours ago', completedAt: '10:00 AM' },
    { name: 'Bhitara Kaatha Darshan', status: 'Upcoming', time: '10:00 AM', relativeTime: '1 hour ago', completedAt: '12:30 PM' },
    { name: 'Baahaar Kaatha Darshan', status: 'Upcoming', time: '12:30 PM', relativeTime: 'in 1 hour', completedAt: '03:30 PM' },
    { name: 'Bhitara Kaatha Darshan', status: 'Upcoming', time: '03:30 PM', relativeTime: 'in 1 hour', completedAt: '06:30 PM' },
    { name: 'Baahaar Kaatha Darshan', status: 'Upcoming', time: '06:30 PM', relativeTime: 'in 1 hour', completedAt: 'Till Pahuda' },
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

    const [alramModalVisible, setAlramModalVisible] = useState(false);

    const handleAlram = () => {
        setAlramModalVisible(!alramModalVisible);
    };

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
                        <Text style={styles.headerText}>Darshan</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Know The Darshan Timing</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>You Can Find When The Darshan Start's & Halts As Well As When The Sahana Mela Start's</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Darshan →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/darshan.png')} style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Darshan List */}
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={nitiTimings}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => {
                            const isLast = index === nitiTimings.length - 1;
                            const isCompleted = item.status === 'Completed';
                            const isRunning = item.status === 'Running';
                            const isUpcoming = item.status === 'Upcoming';

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
                                        {/* Line above */}
                                        {/* {index !== 0 && <View style={{ height: 12, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />} */}

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
                                        <Text style={{ fontSize: 15, color: '#222', fontFamily: 'FiraSans-SemiBold' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>Started at {item.time}</Text>

                                        {isCompleted && (
                                            <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-Regular' }}>
                                                Completed at {item.completedAt}
                                            </Text>
                                        )}

                                        {isRunning && (
                                            <>
                                                <Text style={{ fontSize: 13, color: '#FFA726', fontFamily: 'FiraSans-Regular' }}>
                                                    Running Now
                                                </Text>
                                                <Text style={{ fontSize: 13, color: '#999', fontFamily: 'FiraSans-Regular' }}>
                                                    Tentative End: 3:50 PM
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
});
