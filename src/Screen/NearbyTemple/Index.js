import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { State, usePlaybackState, useProgress, Capability, Event } from 'react-native-track-player';

const { width } = Dimensions.get('window');

const images = [
    'https://www.drishtiias.com/images/uploads/1618820610_image6.jpg',
    'https://images.hindustantimes.com/img/2022/04/04/550x309/04843c2a-b455-11ec-a4f3-fc37f02059fa_1649103982597.jpg',
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

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const playbackState = usePlaybackState();
    const [allContent, setAllContent] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    const togglePlayback = async (track) => {
        try {
            // const storedPodcastData = await AsyncStorage.getItem('currentPodcast');
            if (currentTrack !== track.id) {
                // console.log("Current Track ID:", currentTrack, "Selected Track ID:", track.id.toString());
                await TrackPlayer.reset();
                await TrackPlayer.add({
                    id: track.id.toString(),
                    url: track.podcast_music,
                    title: track.name,
                    artist: 'Unknown Artist',
                });
                // setCurrentMusic(track);
                setCurrentTrack(track.id);
                await TrackPlayer.play();
                // await AsyncStorage.setItem('currentPodcast', JSON.stringify(track));
            } else {
                // console.log("playbackState", playbackState, State.Playing);
                if (playbackState.state === State.Playing) {
                    await TrackPlayer.pause();
                } else {
                    await TrackPlayer.play();
                }
            }
        } catch (error) {
            console.error('Error during playback toggle:', error);
        }
    };

    useEffect(() => {
        const setup = async () => {
            try {
                await TrackPlayer.setupPlayer();
                await TrackPlayer.updateOptions({
                    stopWithApp: false,
                    capabilities: [
                        Capability.Play,
                        Capability.Pause,
                        // Capability.SkipToNext,
                        // Capability.SkipToPrevious,
                        // Capability.Stop,
                    ],
                    compactCapabilities: [
                        Capability.Play,
                        Capability.Pause,
                        // Capability.SkipToNext,
                        // Capability.SkipToPrevious,
                        // Capability.Stop,
                    ],
                    notificationCapabilities: [
                        Capability.Play,
                        Capability.Pause,
                        // Capability.SkipToNext,
                        // Capability.SkipToPrevious,
                        // Capability.Stop,
                    ],
                });
            } catch (error) {
                console.log('Error setting up TrackPlayer:', error);
            }
        };

        setup();
    }, []);

    useEffect(() => {
        setAllContent({
            id: 0,
            name: 'ଦ୍ଵାରଫିଟା ଓ ମଙ୍ଗଳ ଆଳତି',
            podcast_music: require('../../assets/audio/adi_nrusingha.mp3'),
        });
    }, []);

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
                        <Text style={styles.headerText}>Nearby Temple</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Adi Nrusingha Temple</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>This Temple Is Dedicated To Jangya Nrusingha</Text>
                            <TouchableOpacity onPress={() => togglePlayback(allContent)} style={{ marginTop: 10, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#fff', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 10, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name={currentTrack === allContent?.id && playbackState.state === "playing" ? 'pause' : 'play-arrow'} size={25} color="#fff" />
                                <Text style={{ color: '#fff', fontFamily: 'FiraSans-Regular' }}>Listen</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, marginTop: 20 }}>
                    {/* Title Row */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-Bold', color: '#431373' }}>Lingaraj Temple</Text>
                        <View style={{ }}>
                            <Text style={{ color: '#f43f5e', fontSize: 11, fontFamily: 'FiraSans-SemiBold' }}>360°</Text>
                            <MaterialIcons name="360" size={20} color="#f43f5e" style={{ marginTop: -8 }} />
                        </View>
                    </View>

                    {/* Main Image */}
                    <View style={{ borderRadius: 12, overflow: 'hidden', marginTop: 6 }}>
                        <Swiper
                            style={{ height: 200 }}
                            showsPagination={false}
                            autoplay={true}
                            autoplayTimeout={5}
                        >
                            {images.map((image, index) => (
                                <Image key={index} source={{ uri: image }} style={{ width: '100%', height: 200 }} />
                            ))}
                        </Swiper>
                    </View>

                    {/* Location & Direction Row */}
                    <View style={{ backgroundColor: '#f0f0f0', borderRadius: 12, padding: 10, marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 13, color: '#474747', fontFamily: 'FiraSans-Regular', marginLeft: 2 }}>Bhubaneswar, Odisha</Text>
                            <Text style={{ fontSize: 13, color: '#474747', fontFamily: 'FiraSans-Regular', marginLeft: 2, marginTop: 5 }}>Location Address</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => openMap('https://maps.app.goo.gl/vH465ENw5tS48ZB49')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Entypo name="location-pin" size={17} color="#474747" />
                                <Text style={{ fontSize: 13, color: '#474747', fontFamily: 'FiraSans-Regular', marginLeft: 2 }}>Direction</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                                <Ionicons name="call" size={14} color="#474747" />
                                <Text style={{ fontSize: 13, color: '#474747', fontFamily: 'FiraSans-Regular', marginLeft: 2 }}>123456789</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* History Section */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-SemiBold', color: '#1f2937', marginBottom: 6 }}>
                            History of the Temple
                        </Text>
                        <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20, fontFamily: 'FiraSans-Regular' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                        </Text>
                    </View>

                    {/* Highlights Section */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-SemiBold', color: '#1f2937', marginBottom: 6 }}>
                            Key Highlights
                        </Text>
                        <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20, fontFamily: 'FiraSans-Regular' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in lectus pretium ultricies...
                        </Text>
                    </View>
                </View>
                <View style={{ height: 200 }}></View>
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
    // main content
    bhaktanibasbox: {
        backgroundColor: '#fff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
        padding: 8
    },
    bhaktanibasImage: {
        height: 200,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
})