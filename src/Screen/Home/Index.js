import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Animated, FlatList, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useIsFocused } from '@react-navigation/native'

// Sample Data for Menu Items (Grouped into Rows)
const menuItems = [
    { id: '1', title: 'About Temple', image: require('../../assets/image/demoLogo.png') },
    { id: '2', title: 'Shree Khetra', image: require('../../assets/image/demoLogo.png') },
    { id: '3', title: 'Matha & Ashram', image: require('../../assets/image/demoLogo.png') },
    { id: '4', title: 'Festivals', image: require('../../assets/image/demoLogo.png') },
    { id: '5', title: '36 Nijoga', image: require('../../assets/image/demoLogo.png') },
    { id: '6', title: 'Besha', image: require('../../assets/image/demoLogo.png') },
    { id: '7', title: 'Darshan Facility', image: require('../../assets/image/demoLogo.png') },
    { id: '8', title: 'Maha Prasad', image: require('../../assets/image/demoLogo.png') },
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

const data = [
    { id: '1', icon: 'hotel', label: 'Accomodation', color: '#4CAF50' },
    { id: '2', icon: 'gittip', label: 'Donation', color: '#F44336' },
    { id: '3', icon: 'gift', label: 'Offering', color: '#9C27B0' },
    { id: '4', icon: 'credit-card', label: 'Darshan Booking', color: '#FF9800' },
];

const features = [
    { id: '1', icon: 'car', label: 'Parking' },
    { id: '2', icon: 'shoe-prints', label: 'Locker & Shoes Stand' },
    { id: '3', icon: 'tint', label: 'Drinking Water' },
    { id: '4', icon: 'map-marked-alt', label: 'Root Map' },
    { id: '5', icon: 'utensils', label: 'Free Food' },
    { id: '6', icon: 'search', label: 'Lost & Found' },
    { id: '8', icon: 'street-view', label: 'Ratha Yatra Mela' },
    { id: '9', icon: 'toilet', label: 'Toilet' },
    { id: '10', icon: 'umbrella-beach', label: 'Beaches' },
    { id: '11', icon: 'life-ring', label: 'Life Guard Booth' },
    { id: '12', icon: 'phone-alt', label: 'Emergency Contact' },
    { id: '13', icon: 'charging-station', label: 'Charging Station' },
    { id: '14', icon: 'gas-pump', label: 'Petrol Pump' },
    { id: '15', icon: 'hotel', label: 'Hotel/Dharmashala' },
    { id: '16', icon: 'utensils', label: 'Restaurant' },
    { id: '17', icon: 'bus', label: 'Bus Stand/Railway Station' },
    { id: '7', icon: 'wheelchair', label: 'Physical Handicap & Senior Citizen' },
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

    const [selectedDate, setSelectedDate] = useState('');

    // Group items into 2 rows
    const groupedMenuItems = groupItemsIntoRows(menuItems, 4); // 4 items per row

    return (
        <SafeAreaView style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#4B7100', '#2E4D00'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <View style={styles.headerContent}>
                        <Image source={require('../../assets/image/demoLogo.png')} style={styles.logo} />
                        <Text style={styles.headerText}>Shree Jagannatha Dham</Text>
                    </View>
                    <Fontisto name="player-settings" size={20} color="#fff" />
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
                    <ImageBackground
                        source={require('../../assets/image/mangala_alati.jpg')}
                        style={styles.headerImage}
                    />
                </View>

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
                    <TouchableOpacity onPress={() => navigation.navigate('AllNitePage')} style={styles.viewButton}>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} key={item.id} style={styles.menuItem}>
                                        <Image source={item.image} style={styles.menuImage} />
                                        <Text style={styles.menuText}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* FM Block-1 */}
                <View style={styles.panchangaBox}>
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="radio-fm" color={'#000'} size={25} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('LivePage')} style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>Online FM </Text>
                                <View style={styles.nowBadge}>
                                    <Text style={styles.nowText}>NEW</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>Shree Jagannatha FM Channel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '97%', height: 1, marginBottom: 5, backgroundColor: '#EAEAEA' }} />
                    <View style={styles.row}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="tv-outline" color={'#000'} size={25} />
                        </View>
                        <TouchableOpacity style={styles.textContainer}>
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>Shree Jagannatha TV</Text>
                                <View style={styles.nowBadge}>
                                    <Text style={styles.nowText}>NEW</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>Live Telecast From Shree Mandira</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FM Block-2 */}
                <View style={{ marginTop: 10, width: '95%', alignSelf: 'center', backgroundColor: 'white', borderRadius: 10, padding: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '49%', alignItems: 'center' }}>
                        <View style={[styles.iconCircle, { marginRight: 0 }]}>
                            <MaterialCommunityIcons name="radio-fm" color={'#000'} size={25} />
                        </View>
                        <View style={styles.titleRow}>
                            <Text style={{ fontSize: 11, fontFamily: 'Lora-Bold', color: '#333', }}>Online</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#EAEAEA', width: 1, height: 50 }} />
                    <View style={{ width: '49%', alignItems: 'center' }}>
                        <View style={[styles.iconCircle, { marginRight: 0 }]}>
                            <Ionicons name="tv-outline" color={'#000'} size={25} />
                        </View>
                        <View style={styles.titleRow}>
                            <Text style={{ fontSize: 11, fontFamily: 'Lora-Bold', color: '#333', }}>Live</Text>
                        </View>
                    </View>
                </View>

                {/* Online Part */}
                <View style={styles.onlineContainer}>
                    {data.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.onlineCard}>
                            <View style={[styles.onlineIconCircle, { backgroundColor: item.color }]}>
                                <FontAwesome name={item.icon} size={22} color="#fff" />
                            </View>
                            <Text style={styles.onlineLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* All Menu For RAtha Yatra */}
                <View style={styles.menuContainer}>
                    {features.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuCard}>
                            <View style={styles.menuIconCircle}>
                                <FontAwesome5 name={item.icon} size={20} color="#4B7100" />
                            </View>
                            <Text style={{ fontSize: 12, color: '#333', textAlign: 'center', fontFamily: 'Lora-Bold', }}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* <View style={{ width: '96%', alignSelf: 'center', marginTop: 15 }}>
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
                </View> */}

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

            <View style={{ padding: 0, height: 56, borderRadius: 0, backgroundColor: '#f7faf0', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin: 0 }}>
                    <View style={{ padding: 0, width: '36%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#f7faf0', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <FontAwesome name="home" color={'#000'} size={23} />
                                <Text style={{ color: '#000', fontSize: 11, fontFamily: 'Lora-BoldItalic', marginTop: 4, height: 17 }}>HOME</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ padding: 0, width: '23%' }}>
                        <View style={{ backgroundColor: '#f7faf0', padding: 8, height: 90, flexDirection: 'column', alignItems: 'center', bottom: 25, borderRadius: 100 }}>
                            <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#c9170a', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 60 }}>
                                <MaterialCommunityIcons style={{}} name="podcast" color={'#fff'} size={40} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ padding: 0, width: '36%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#f7faf0', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialIcons name="work-history" color={'#000'} size={21} />
                                <Text style={{ color: '#000', fontSize: 11, fontFamily: 'Lora-BoldItalic', marginTop: 4, height: 17 }}>CITY</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
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
        zIndex: 10,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
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
        fontSize: 18,
        fontFamily: 'Lora-Bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    headerContainer: {
        width: '100%', // Match with `panchangaBox`
        height: 200,
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
        marginRight: 20,
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
        marginTop: 15,
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
    onlineContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    onlineCard: {
        width: '24%', // Four items per row
        aspectRatio: 1, // Ensures a square shape
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 5
    },
    onlineIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    onlineLabel: {
        fontSize: 11,
        fontFamily: 'Lora-Bold',
        color: '#333',
        textAlign: 'center',
    },
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingBottom: 70
    },
    menuCard: {
        width: '22%', // 4 items per row
        aspectRatio: 1, // Ensures a square shape
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    menuIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    }
});
