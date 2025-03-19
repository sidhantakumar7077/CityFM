import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const { width } = Dimensions.get('window');

const dailyNiti = [
    {
        id: 1,
        name: 'Mailama',
        time: 'Morning 6 AM',
        desc: 'The scheduled time of this rituals is 6 am. But as soon as  when the Magal aalati is completed then Mailama will be done.',
        itemHeading: 'Items Needed',
        itemList: '1) 4 pieces of tadpa, (2) 2 pieces of uttariya, (3) 1 piece of khandua',
    },
    {
        id: 2,
        name: 'Beshalagi',
        time: 'Morning 8 AM to 8:30 AM',
        desc: 'The rule for the besha in between morning 8 am and 8:30 am. The flower-dressers perform all the beshas. Different beshas are performed for the deities at different times and in different seasons.',
        itemHeading: 'Items Needed',
        itemList: '(1) Pushpalak, (2) Raja Superintendant',
    },
    {
        id: 3,
        name: 'Pahuda Phitiba And Sandhya Aalati',
        time: '6 pm',
        desc: 'Rules for opening the doors at around 6 pm. For this rituals, Camphor, Pata Patani, Phula and Sandalwood are provided by the Raja Superintendent.',
        itemHeading: 'Items Needed',
        itemList: '(1) Camphor, (2) Pata Patani, (3) Flowers, (4) Sandalwood',
    },
    {
        id: 4,
        name: 'Bada Singhara Besha',
        time: '10:30 pm',
        desc: 'The rules for Badasinghara Besha at 10.30 pm. For this Besha, Sriram Das Matha provides flower garlands, earrings and garlands. Emara Matha provides flower garlands.',
        itemHeading: 'Items Needed',
        sebakList: '(1) Changada Mekapa , (2) Pushpalaka',
    },
]

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
                        <Text style={styles.headerText}>Offering</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Bhakti Bhaba Offering</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>You Can Offer Various Divine Items At The Feet Of Our Chaturdha Murti</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Offer Now →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/Offerings.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Weekly Calendar section */}
                {/* <View style={{ marginTop: 20 }}>
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
                </View> */}
                <View style={{ width: '100%', marginTop: 20 }}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Select The Date For Offering</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    </View>
                    <Calendar
                        style={{ width: '95%', alignSelf: 'center', borderRadius: 10 }}
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#4B7100' },
                        }}
                        theme={{
                            backgroundColor: '#FBF5F5',
                            calendarBackground: '#fff',
                            textSectionTitleColor: '#4B7100',
                            selectedDayBackgroundColor: '#4B7100',
                            selectedDayTextColor: '#fff',
                            todayTextColor: '#D49100',
                            dayTextColor: '#333',
                            textDisabledColor: '#d9e1e8',
                            arrowColor: '#4B7100',
                            monthTextColor: '#4B7100',
                            textDayFontFamily: 'Lora-Bold',
                            textMonthFontFamily: 'Lora-Bold',
                            textDayHeaderFontFamily: 'Lora-Bold',
                            textDayFontSize: 16,
                            textMonthFontSize: 18,
                            textDayHeaderFontSize: 14,
                        }}
                    />
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 30 }}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 17, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Offerings Available On The Selected Date</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        data={dailyNiti}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(niti) => {
                            return (
                                <View style={styles.smallCell1}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={{ color: '#000', fontSize: 16, fontFamily: "FiraSans-SemiBold", }}><Text style={{ fontSize: 15 }}>Niti Name: </Text>{niti.item.name}</Text>
                                        <Text style={{ color: '#000', fontSize: 14, fontFamily: "FiraSans-SemiBold", }}>Niti Time : {niti.item.time}</Text>
                                        {niti.item.desc &&
                                            <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{niti.item.desc}</Text>
                                        }
                                        {niti.item.itemHeading && niti.item.itemList &&
                                            <>
                                                <Text style={{ color: '#000', fontSize: 14, fontFamily: "FiraSans-SemiBold", marginTop: 10 }}>{niti.item.itemHeading}</Text>
                                                <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{niti.item.itemList}</Text>
                                            </>
                                        }
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('OfferingMenu')} style={{ backgroundColor: '#341551', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, position: 'absolute', right: 10, bottom: 10 }}>
                                        <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Offer Now</Text>
                                    </TouchableOpacity>
                                    {/* <Image source={require('../../assets/image/mandal.png')} style={{ width: 140, height: 140, position: 'absolute', right: -50, top: -60 }} /> */}
                                </View>
                            )
                        }}
                    />
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
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B7100',
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
    smallCell1: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
})