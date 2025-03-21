import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
// import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const { width } = Dimensions.get('window');

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

    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [weekOffset, setWeekOffset] = useState(0); // Track the week index
    const flatListRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    // Generate the week's dates dynamically
    const getWeekDates = (offset) => {
        const startOfWeek = moment().startOf('week').add(offset, 'weeks'); // Adjust week based on offset
        return Array.from({ length: 7 }).map((_, i) => {
            return {
                date: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
                day: startOfWeek.clone().add(i, 'days').format('ddd'), // Mon, Tue, etc.
                dayNumber: startOfWeek.clone().add(i, 'days').format('D'), // 1, 2, etc.
            };
        });
    };

    useEffect(() => {
        // Ensure FlatList starts at the correct week
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: width, animated: false });
            }
        }, 100);
    }, []);

    const handleScrollDate = (event) => {
        if (isScrolling) return;

        setIsScrolling(true);
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);

        if (index === 0) {
            setWeekOffset((prev) => prev - 1);
        } else if (index === 2) {
            setWeekOffset((prev) => prev + 1);
        }

        // Smoothly reset to the middle (current week)
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: width, animated: false });
            }
            setIsScrolling(false);
        }, 50);
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
                        <Text style={styles.headerText}>Panji</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Today's Tithi</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>All The Jagannatha Panji Details At One Place</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Remind Me →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Weekly Calendar section */}
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        ref={flatListRef}
                        horizontal
                        pagingEnabled
                        initialScrollIndex={1} // Start at current week
                        // onMomentumScrollEnd={handleScrollDate}
                        showsHorizontalScrollIndicator={false}
                        data={[weekOffset - 1, weekOffset, weekOffset + 1, weekOffset + 2, weekOffset + 3]}
                        keyExtractor={(item) => item.toString()}
                        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
                        renderItem={({ item }) => (
                            <View style={{ width, flexDirection: 'row', justifyContent: 'center' }}>
                                {getWeekDates(item).map((day) => (
                                    <TouchableOpacity
                                        key={day.date}
                                        style={[styles.dateContainer, selectedDate === day.date && styles.selectedDate]}
                                        onPress={() => setSelectedDate(day.date)}
                                    >
                                        <Text style={styles.dayText}>{day.day}</Text>
                                        <View style={[styles.circle, selectedDate === day.date && styles.selectedCircle]}>
                                            <Text style={[styles.dateText, selectedDate === day.date && styles.selectedDateText]}>
                                                {day.dayNumber}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </View>

                {/* Tithi content */}
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                    {/* Tithi */}
                    <View style={[styles.nitibox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={{ width: '29%', color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>
                            <Feather name="calendar" size={16} color="#F7941D" /> Tithi
                        </Text>
                        <Text style={{ color: '#606160', fontSize: 13, width: '69%' }}>(20) March, Thursday (Chaitra) Mina Day 7, Sayan Falgun 29th</Text>
                    </View>
                    {/* Sunrise & Sunset */}
                    <View style={styles.nitibox}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Text style={{ color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}><Feather name="sunrise" size={16} color="#F7941D" /> Sunrise </Text>
                                <Text style={{ color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}><Feather name="sunset" size={16} color="#F7941D" /> Sunset </Text>
                            </View>
                            <View style={{ width: '48%', alignItems: 'flex-end' }}>
                                <Text style={{ color: '#606160', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>6:00 AM</Text>
                                <Text style={{ color: '#606160', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>6:00 PM</Text>
                            </View>
                        </View>
                    </View>
                    {/* Nakshatra */}
                    <View style={[styles.nitibox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={{ color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>
                            <Feather name="star" size={16} color="#F7941D" /> Nakshatra
                        </Text>
                        <Text style={{ color: '#606160', fontSize: 13 }}>Anuradha</Text>
                    </View>
                    {/* Yoga */}
                    <View style={[styles.nitibox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={{ color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>
                            <Feather name="activity" size={16} color="#F7941D" /> Yoga
                        </Text>
                        <Text style={{ color: '#606160', fontSize: 13 }}>Braja yoga</Text>
                    </View>
                    {/* Auspicious & Inauspicious Time */}
                    <View style={[styles.nitibox, { marginBottom: 20 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ width: '45%', color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>
                                <Feather name="clock" size={16} color="#F7941D" /> Auspicious Time
                            </Text>
                            <Text style={{ width: '55%', color: '#606160', fontSize: 13 }}>(Amrit) 1:8 to 3:32 (Mahendra)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ width: '45%', color: '#000', fontSize: 14, fontFamily: 'FiraSans-Regular', lineHeight: 23 }}>
                                <Feather name="alert-circle" size={16} color="#F7941D" /> Inauspicious Time
                            </Text>
                            <Text style={{ width: '55%', color: '#606160', fontSize: 13 }}>Daylight hours 2:52 and sunset hours 5:54.</Text>
                        </View>
                    </View>
                </View>
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
    dateContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    dayText: {
        fontSize: 12,
        color: '#777',
        textTransform: 'uppercase',
    },
    circle: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    dateText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    selectedDate: {
        alignItems: 'center',
    },
    selectedCircle: {
        backgroundColor: '#F7941D', // Highlight color
    },
    selectedDateText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nitibox: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#341551',
        backgroundColor: '#FBF5F5',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})