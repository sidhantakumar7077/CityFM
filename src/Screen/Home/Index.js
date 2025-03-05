import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Animated, FlatList } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';

// Sample Data for Menu Items (Grouped into Rows)
const menuItems = [
    { id: '1', title: 'Prarthana', image: require('../../assets/image/demoLogo.png') },
    { id: '2', title: 'Daily Prediction', image: require('../../assets/image/demoLogo.png') },
    { id: '3', title: 'Fix your Muhurta', image: require('../../assets/image/demoLogo.png') },
    { id: '4', title: 'Janma Kundali', image: require('../../assets/image/demoLogo.png') },
    { id: '5', title: 'Panchanga', image: require('../../assets/image/demoLogo.png') },
    { id: '6', title: 'Festivals', image: require('../../assets/image/demoLogo.png') },
    { id: '7', title: 'Pooja', image: require('../../assets/image/demoLogo.png') },
    { id: '8', title: 'Kundali Matching', image: require('../../assets/image/demoLogo.png') },
];

const prarthanaData = [
    { id: '1', name: 'Shiva', count: '17 Prarthana', image: require('../../assets/image/demoLogo.png') },
    { id: '2', name: 'Krishna', count: '8 Prarthana', image: require('../../assets/image/demoLogo.png') },
    { id: '3', name: 'Ganesha', count: '37 Prarthana', image: require('../../assets/image/demoLogo.png') },
    { id: '4', name: 'Hanuman', count: '8 Prarthana', image: require('../../assets/image/demoLogo.png') },
    { id: '5', name: 'Durga', count: '8 Prarthana', image: require('../../assets/image/demoLogo.png') },
    { id: '6', name: 'Rama', count: '7 Prarthana', image: require('../../assets/image/demoLogo.png') },
];

const eventTypes = [
    { icon: '☀️', name: 'Sankranti' },
    { icon: '🌑', name: 'Amavasya' },
    { icon: '🌕', name: 'Pournami' },
    { icon: '🪔', name: 'Festival' },
    { icon: '🌘', name: 'Eclipse' },
    { icon: '🔥', name: 'Pradosha' },
    { icon: '🙏', name: 'Sankashti Chaturthi' },
    { icon: '🕉️', name: 'Shasti' },
    { icon: '〰️', name: 'Ekadashi' }
];

// Function to group items into rows
const groupItemsIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
};

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);

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

    const [selectedDate, setSelectedDate] = useState('');

    // Group items into 2 rows
    const groupedMenuItems = groupItemsIntoRows(menuItems, 4); // 4 items per row

    return (
        <SafeAreaView style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { backgroundColor: isScrolled ? '#4B7100' : 'transparent' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../assets/image/demoLogo.png')} style={styles.logo} />
                    <Text style={styles.headerText}>PRATIHARI NIJOGA</Text>
                </View>
                <Fontisto name="player-settings" size={20} color="#fff" />
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
                <ImageBackground source={require('../../assets/image/mangala_alati.jpg')} style={styles.headerImage} />

                {/* Panchanga Box */}
                <View style={styles.panchangaBox}>
                    {/* Panchami */}
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.iconText}>5</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>Panchami <Text style={styles.subText}>Shukla Paksha</Text></Text>
                                <View style={styles.nowBadge}>
                                    <Text style={styles.nowText}>NOW</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>upto 03:17 pm on 4th</Text>
                        </View>
                    </View>

                    {/* View Panchanga Button */}
                    <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.viewText}>VIEW ALL NITI</Text>
                        <MaterialCommunityIcons name="hand-pointing-right" size={30} color="#D49100" />
                    </TouchableOpacity>
                </View>

                {/* New Horizontal Scrolling Menu Section */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScrollView}>
                    <View>
                        {/* Render Two Rows */}
                        {groupedMenuItems.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.rowContainer}>
                                {row.map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.menuItem}>
                                        <Image source={item.image} style={styles.menuImage} />
                                        <Text style={styles.menuText}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.panchangaBox}>
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.iconText}>5</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>Panchami <Text style={styles.subText}>Shukla Paksha</Text></Text>
                                <View style={styles.nowBadge}>
                                    <Text style={styles.nowText}>NOW</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>upto 03:17 pm on 4th</Text>
                        </View>
                    </View>
                    <View style={{ width: '97%', height: 1, marginBottom: 5, backgroundColor: '#EAEAEA' }} />
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.iconText}>5</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>Panchami <Text style={styles.subText}>Shukla Paksha</Text></Text>
                                <View style={styles.nowBadge}>
                                    <Text style={styles.nowText}>NOW</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>upto 03:17 pm on 4th</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '96%', alignSelf: 'center', marginTop: 15 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={prarthanaData}
                        scrollEnabled={false}
                        numColumns={2}
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={(content) => {
                            return (
                                <TouchableOpacity style={styles.mostPPlrItem}>
                                    <View style={{ width: '100%', height: 110, borderRadius: 10 }}>
                                        <Image source={content.item.image} style={styles.mostPPImage} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                {/* Calendar Section */}
                <View style={styles.calendarContainer}>
                    <Calendar
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
                {/* Event Legend Section */}
                <View style={styles.eventContainer}>
                    <Text style={styles.eventTitle}>Event's</Text>
                    <FlatList
                        data={eventTypes}
                        scrollEnabled={false}
                        numColumns={3}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={styles.eventItem}>
                                <Text style={styles.eventIcon}>{item.icon}</Text>
                                <Text style={styles.eventText}>{item.name}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
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
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        zIndex: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
    headerText: {
        color: 'white',
        fontFamily: 'PlayfairDisplay-SemiBold',
        fontSize: 20,
        marginLeft: 10,
    },
    headerImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#4B7100',
    },
    panchangaBox: {
        marginTop: 10,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconCircle: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Lora-Bold',
        color: '#333',
    },
    subText: {
        fontSize: 14,
        color: '#777',
    },
    time: {
        fontSize: 14,
        fontFamily: 'Lora-Bold',
        color: '#777',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nowBadge: {
        backgroundColor: '#3FA96D',
        borderRadius: 5,
        paddingHorizontal: 5,
        marginLeft: 5,
    },
    nowText: {
        fontSize: 12,
        color: 'white',
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        paddingTop: 5,
    },
    viewText: {
        fontSize: 16,
        fontFamily: 'Lora-Bold',
        color: '#D49100',
    },
    menuScrollView: {
        marginTop: 15,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    menuItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        width: 80
    },
    menuImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    menuText: {
        fontSize: 12,
        fontFamily: 'Lora-Bold',
        textAlign: 'center',
        marginTop: 5,
        color: '#777'
    },
    card: {
        backgroundColor: '#0E4B42',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        marginBottom: 5,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    count: {
        color: '#EEE',
        fontSize: 14,
        marginTop: 4,
    },
    mostPPlrItem: {
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: '1.3%'
    },
    mostPPImage: {
        height: '100%',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'contain'
    },
    calendarContainer: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    eventContainer: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Lora-Bold',
        color: '#4B7100',
        marginBottom: 10,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '33%',
        marginBottom: 8,
    },
    eventIcon: {
        fontSize: 18,
        marginRight: 5,
    },
    eventText: {
        fontSize: 14,
        fontFamily: 'Lora-Regular',
        color: '#333',
    },

});
