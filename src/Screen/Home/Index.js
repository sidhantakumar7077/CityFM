import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Animated } from 'react-native';

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

    return (
        <SafeAreaView style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { backgroundColor: isScrolled ? '#4B7100' : 'transparent' }]}>
                <Image source={require('../../assets/image/demoLogo.png')} style={styles.logo} />
                <Text style={styles.headerText}>PRATIHARI NIJOGA</Text>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
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
                        <Text style={styles.arrow}>&rarr;</Text>
                    </TouchableOpacity>
                </View>

                {/* Extra content to enable scrolling */}
                <View style={{ height: 800 }} />
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
        fontWeight: 'bold',
        color: '#333',
    },
    subText: {
        fontSize: 14,
        color: '#777',
    },
    time: {
        fontSize: 14,
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
        paddingTop: 10,
    },
    viewText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D49100',
    },
    arrow: {
        fontSize: 18,
        color: '#D49100',
    },
});
