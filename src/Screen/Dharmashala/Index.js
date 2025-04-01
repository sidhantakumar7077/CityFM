import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [dharmashalaList, setDharmashalaList] = useState([]);

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

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const [selectedImages, setSelectedImages] = useState({});

    const handleImageSelect = (nibasId, imageUri) => {
        setSelectedImages(prev => ({
            ...prev,
            [nibasId]: imageUri
        }));
    };

    const getDharmashala = async () => {
        try {
            setSpinner(true);
            const response = await fetch(base_url + 'api/get-accomodation', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                const dharamasalaOnly = responseData.data.filter(item => item.accomodation_type === 'dharamasala');
                setDharmashalaList(dharamasalaOnly);

                const initialImageSelection = {};
                dharamasalaOnly.forEach(item => {
                    if (item.images && item.images.length > 0) {
                        initialImageSelection[item.id] = item.images[0];
                    }
                });
                setSelectedImages(initialImageSelection);
            }
            setSpinner(false);
        } catch (error) {
            console.log('Error fetching Bhakta Nibas:', error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getDharmashala();
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
                        <Text style={styles.headerText}>Dharmashala</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Temple Owned Stay For Pilgrims</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>All The Properties Below Are Owned By Shree Jagannatha Temple Administration</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Now →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/hotel.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {/* Dharmashala List */}
                {spinner === true ?
                    <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#341551" />
                        <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={dharmashalaList}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15, marginTop: 10 }}
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    {/* Property Name */}
                                    <Text style={styles.propertyName}>{item.name}</Text>

                                    {/* Main Large Image */}
                                    <View>
                                        {selectedImages[item.id] ? (
                                            <Image source={{ uri: selectedImages[item.id] }} style={styles.mainImage} />
                                        ) : (
                                            <View style={[styles.mainImage, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
                                                <Text style={{ color: '#999' }}>No Image</Text>
                                            </View>
                                        )}
                                        <TouchableOpacity style={styles.view360Badge}>
                                            <Text style={styles.view360Text}>360°</Text>
                                            <MaterialIcons name="360" size={20} color="#f43f5e" style={{ marginTop: -8 }} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Thumbnail Scroll Section */}
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={item.images}
                                        keyExtractor={(uri, index) => index.toString()}
                                        contentContainerStyle={{ marginBottom: 8, marginTop: 4 }}
                                        renderItem={({ item: thumb }) => (
                                            <TouchableOpacity onPress={() => handleImageSelect(item.id, thumb)}>
                                                <Image
                                                    source={{ uri: thumb }}
                                                    style={[
                                                        styles.thumbnail,
                                                        selectedImages[item.id] === thumb && styles.selectedThumbnail
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    />

                                    {/* Distance Row */}
                                    <View style={styles.distanceRow}>
                                        <MaterialIcons name="location-on" size={16} color="#7e22ce" />
                                        <Text style={styles.distanceText}>{item.description}</Text>
                                    </View>

                                    {/* Offers & Address */}
                                    <View style={styles.infoRow}>
                                        <View style={styles.infoColumn}>
                                            <Text style={styles.label}>Property Offers:</Text>
                                            <Text style={styles.value}>Breakfast/Lunch/Dinner{"\n"}AC Rooms</Text>
                                        </View>
                                        <View style={styles.infoColumn}>
                                            <Text style={styles.label}>Location Address:</Text>
                                            <Text style={styles.value}>{item.landmark}{"\n"}{item.district}, {item.state}, {item.pincode}</Text>
                                        </View>
                                    </View>

                                    {/* Buttons */}
                                    <View style={styles.buttonRow}>
                                        <TouchableOpacity style={styles.bookNowButton}>
                                            <Text style={styles.bookNowText}>Book Now</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.callButton}>
                                            <Text style={styles.callText}>📞 {item.contact_no}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {index !== dharmashalaList.length - 1 && <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginVertical: 20 }} />}
                                </View>
                            )
                        }}
                    />
                }
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
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B7100',
    },
    /* List Styles */
    propertyName: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'FiraSans-Bold',
        marginBottom: 8,
    },
    mainImage: {
        width: '100%',
        height: 166,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    view360Badge: {
        position: 'absolute',
        top: 7,
        right: 7,
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    view360Text: {
        fontSize: 12,
        color: '#f43f5e',
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    selectedThumbnail: {
        borderColor: '#7e22ce',
        borderWidth: 2
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    distanceText: {
        fontSize: 13,
        color: '#7e22ce',
        marginLeft: 5,
        fontFamily: 'FiraSans-Regular'
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    infoColumn: {
        // flex: 1,
        // paddingRight: 10
    },
    label: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'FiraSans-SemiBold'
    },
    value: {
        fontSize: 12,
        color: '#444',
        marginTop: 2,
        lineHeight: 19,
        fontFamily: 'FiraSans-Regular'
    },
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    bookNowButton: {
        backgroundColor: '#7e22ce',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    bookNowText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600'
    },
    callButton: {
        // backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#b8b8b8',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    callText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600'
    }
});
