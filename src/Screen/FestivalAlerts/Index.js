import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [festivalList, setFestivalList] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log("Refreshing Successful");
            fetchFestivalAlerts(); // Re-fetch the festival alerts on refresh
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

    const fetchFestivalAlerts = async () => {
        setSpinner(true);
        try {
            const response = await fetch("https://uccc.puri.wiredleap.com/api/v1/temple/festival-alerts", {
                method: 'GET',
                headers: {
                    'x-api-token': 'puri_civic_platform_2024',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setFestivalList(data);
            // console.log("Festival Alerts Data:", data);
        } catch (err) {
            console.error("Error fetching festival alerts:", err);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        fetchFestivalAlerts();
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
                        <Text style={styles.headerText}>Festival List</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Showing current queue status here</Text>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
                            <Image source={require('../../assets/image/Livequeue.png')} style={{ width: 75, height: 75, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {spinner ? (
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        contentContainerStyle={{ padding: 15 }}
                        data={festivalList}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item.festival_id + index}
                        renderItem={({ item }) => (
                            <View style={{
                                backgroundColor: '#fff',
                                marginBottom: 15,
                                borderRadius: 12,
                                padding: 15,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 3
                            }}>
                                <Text style={{ fontSize: 18, fontFamily: 'FiraSans-Bold', color: '#341551', marginBottom: 5 }}>{item.name}</Text>
                                <Text style={styles.row}><Text style={styles.label}>Start Date:</Text> {item.start_date}</Text>
                                <Text style={styles.row}><Text style={styles.label}>End Date:</Text> {item.end_date}</Text>
                                <Text style={styles.row}><Text style={styles.label}>Impact Level:</Text> {item.impact_level}</Text>
                                <Text style={styles.row}><Text style={styles.label}>Crowd Increase:</Text> {item.expected_crowd_increase}</Text>

                                <Text style={[styles.label, { marginTop: 8 }]}>Alternate Recommendations:</Text>
                                {item.alternate_recommendations.map((rec, idx) => (
                                    <Text key={idx} style={styles.bullet}>• {rec}</Text>
                                ))}

                                <Text style={[styles.label, { marginTop: 8 }]}>Special Arrangements:</Text>
                                {item.special_arrangements.map((arr, idx) => (
                                    <Text key={idx} style={styles.bullet}>• {arr}</Text>
                                ))}
                            </View>
                        )}
                    />
                )}
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
    row: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
        fontFamily: 'FiraSans-Regular'
    },
    label: {
        color: '#341551',
        fontFamily: 'FiraSans-SemiBold',
    },
    bullet: {
        fontSize: 14,
        color: '#444',
        marginLeft: 10,
        fontFamily: 'FiraSans-Regular'
    }
})