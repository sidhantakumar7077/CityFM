import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, usePlaybackState, useProgress, Capability, Event } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { base_url } from '../../../App';

const Index = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const playbackState = usePlaybackState();
    // const progress = useProgress();
    const [spinner, setSpinner] = useState(false);
    const [allContent, setAllContent] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [volume, setVolume] = useState(0.7);

    const getPodcastData = async () => {
        try {
            setSpinner(true);
            const response = await fetch(base_url + 'api/podcasthomepage', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === 200) {
                console.log("Podcast Data: ", responseData.data.recent_podcast);
                setSpinner(false);
                // setAllContent(responseData.data.recent_podcast);
            }
        } catch (error) {
            console.log(error);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            // getPodcastData();
            setAllContent({
                id: 0,
                name: 'ଦ୍ଵାରଫିଟା ଓ ମଙ୍ଗଳ ଆଳତି',
                podcast_music: require('../../assets/audio/dwaraphita.mp3'),
            });
        }
        if (currentTrack) {
            const initializeVolume = async () => {
                await TrackPlayer.setVolume(volume); // Set default volume
            };
            initializeVolume();
        }
    }, [isFocused]);

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

    const togglePlayback = async (track) => {
        try {
            const storedPodcastData = await AsyncStorage.getItem('currentPodcast');
            if (!storedPodcastData || JSON.parse(storedPodcastData).id !== track.id) {
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
                await AsyncStorage.setItem('currentPodcast', JSON.stringify(track));
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

    return (
        <View style={styles.container}>
            {/* Header Section */}
            {/* <LinearGradient colors={['#4B7100', '#2E4D00']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>BACK</Text>
            </LinearGradient> */}

            <ImageBackground source={require('../../assets/image/ratha.jpeg')} style={styles.background}>
                {/* Gradient Overlay */}
                <LinearGradient colors={['transparent', '#FFBE00']} style={styles.gradient} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    {/* Top Header */}
                    {/* <View style={styles.menuHeader}>
                        <TouchableOpacity onPressIn={() => navigation.navigate('PreviousProgram')} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 6, borderRadius: 6 }}>
                            <MaterialCommunityIcons name="page-previous-outline" size={25} color="#f5ebd0" />
                        </TouchableOpacity>
                        <TouchableOpacity onPressIn={() => navigation.navigate('ContentList')} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 6, borderRadius: 6 }}>
                            <AntDesign name="bars" size={26} color="#f5ebd0" />
                        </TouchableOpacity>
                    </View> */}
                    <View style={{
                        position: "absolute",
                        top: 5,
                        // left: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={{
                                width: 70,
                                height: 70,
                                resizeMode: "contain",
                            }} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#c91306', padding: 7, borderRadius: 50, marginRight: 7 }}>
                            <Ionicons name="home-sharp" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ position: 'absolute', top: 113, width: '100%', left: 8 }}>
                        <View style={{ textAlign: 'center', marginLeft: 8 }}>
                            <Text style={{ color: '#341551', fontSize: 14, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginBottom: 2 }}>Welcome to</Text>
                            <Text style={{ color: '#341551', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Mandira</Text>
                            <Text style={{ color: '#341551', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Online FM</Text>
                        </View>
                    </View> */}
                    {/* <LinearGradient
                        colors={['#F06292', '#FFA726']} // orange to pink gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            position: 'absolute',
                            top: 180,
                            left: 20,
                            backgroundColor: '#FFBE00',
                            paddingHorizontal: 12,
                            paddingVertical: 7,
                            borderRadius: 7,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Octicons name="zap" size={15} color="#fff" />
                        <Text style={styles.liveText}>Live</Text>
                    </LinearGradient> */}
                    {/* Centered Image Section */}
                    {/* <View style={styles.content}>
                        <Image source={require('../../assets/image/jaga.png')} style={styles.image} />
                        <View style={styles.podcastCardContainer}>
                            <LinearGradient
                                colors={['#FFC500', '#c9170a']} // Stylish Gradient
                                style={styles.podcastCardBackground}
                            >
                                <ImageBackground source={require('../../assets/image/textBG.png')} style={styles.podcastCard}>
                                    <Text style={styles.podcastHeading}>🎙️ ଦ୍ଵାରଫିଟା ଓ ମଙ୍ଗଳ ଆଳତି</Text>
                                    <Text style={styles.podcastDescription}>Started on 5:15 AM to 6:00 AM</Text>
                                </ImageBackground>
                            </LinearGradient>
                        </View>
                    </View> */}
                    {/* Player Controls */}
                    <LinearGradient
                        colors={['#fff', '#fff']} // orange to pink gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.playerContainer}
                    >
                        {/* Live Badge */}
                        <LinearGradient
                            colors={['#F06292', '#FFA726']} // orange to pink gradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.liveBadge}
                        >
                            <Octicons name="zap" size={15} color="#fff" />
                            <Text style={styles.liveText}>Live</Text>
                        </LinearGradient>
                        {/* <Animatable.View animation="pulse" iterationCount="infinite" style={styles.liveBadge}>
                            <Text style={styles.liveText}>Live</Text>
                        </Animatable.View> */}

                        {/* Play Button */}
                        <View style={styles.playButtonContainer}>
                            <TouchableOpacity style={styles.playButton} onPress={() => togglePlayback(allContent)}>
                                <Icon name={currentTrack === allContent?.id && playbackState.state === "playing" ? 'pause' : 'play-arrow'} size={40} color="#341551" />
                            </TouchableOpacity>
                        </View>

                        {/* Volume Slider */}
                        <View style={styles.sliderContainer}>
                            <Icon name="volume-down" size={35} color="#341551" />
                            <Slider
                                style={styles.slider}
                                value={volume}
                                onValueChange={(value) => {
                                    setVolume(value);
                                    TrackPlayer.setVolume(value); // Set volume dynamically
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#341551"
                                maximumTrackTintColor="gray"
                                thumbTintColor="#341551"
                            />
                            <Icon name="volume-up" size={35} color="#341551" />
                        </View>
                        {/* <ImageBackground source={require('../../assets/image/textBG.png')} style={styles.podcastCard}> */}
                        <Text style={styles.podcastHeading}>ଦ୍ଵାରଫିଟା ଓ ମଙ୍ଗଳ ଆଳତି</Text>
                        <Text style={styles.podcastDescription}>Started on 5:15 AM to 6:00 AM</Text>
                        {/* </ImageBackground> */}
                    </LinearGradient>
                    <View style={styles.liveCard}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.liveTitle}>Shree Mandira Online FM</Text>
                                {/* <View style={{ marginTop: 5, borderRadius: 7, overflow: 'hidden' }}>
                                    <LinearGradient
                                        colors={['#FFA726', '#F06292']} // orange to pink gradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{
                                            width: 74,
                                            height: 30,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 7,
                                        }}
                                    >
                                        <Octicons name="zap" size={15} color="#fff" />
                                        <Text style={styles.liveSubText}>Live</Text>
                                    </LinearGradient>
                                </View> */}
                            </View>
                            {/* <View style={{ width: '34%' }}>
                                <Text style={{ textAlign: 'left', fontFamily: 'FiraSans-Light', color: '#000', fontSize: 13.6 }}>Listen or Watch all the live broadcasts from Shree Mandira</Text>
                            </View> */}
                            <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ContentList')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 12 }}>
                                        <Entypo name="mic" size={20} color="#F06292" />
                                        {/* <Image source={require('../../assets/image/radio214142.png')} style={{ width: 25, height: 25 }} /> */}
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#F06292' }}>PODCAST</Text>
                                </View>
                                <View style={{ backgroundColor: 'red', height: 50, width: 1.4, marginRight: 7 }} />
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Tv')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                        {/* <MaterialCommunityIcons name="youtube-tv" size={20} color="#6A0DAD" /> */}
                                        <Image source={require('../../assets/image/tv241424.png')} style={{ width: 25, height: 25 }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#456096' }}>TV</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 20,
        overflow: 'hidden',
        padding: 10,
    },
    /* Header Styles */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4B7100',
        paddingVertical: 15,
        paddingHorizontal: 15,
        elevation: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    /* Background image container */
    background: {
        flex: 1,
        borderRadius: 30,
        overflow: 'hidden',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    menuHeader: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        top: 0,
        // right: 20,
        padding: 8,
        borderRadius: 10,
    },
    content: {
        alignItems: 'center',
        position: 'absolute',
        top: '23%',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        // backgroundColor: 'rgba(59, 58, 58, 0.5)',
        // borderRadius: 150,
    },
    podcastCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
    },
    podcastCardBackground: {
        width: '90%',
        borderRadius: 15,
        padding: 4, // Creates a border effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8, // For Android shadow
    },
    podcastCard: {
        // backgroundColor: '#fff', // White Background for Contrast
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    podcastHeading: {
        fontSize: 19,
        fontWeight: '700',
        color: '#341551', // Vibrant Accent Color
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginTop: 10
    },
    podcastDescription: {
        fontSize: 13,
        color: '#341551',
        textAlign: 'center',
        fontFamily: 'FiraSans-Regular',
        marginTop: 6,
    },
    playerContainer: {
        backgroundColor: '#341551',
        paddingHorizontal: 20,
        // paddingVertical: 30,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
        position: 'absolute',
        bottom: 160,
        elevation: 5, // Shadow for depth
    },
    liveBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFBE00',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    playButtonContainer: {
        position: 'absolute',
        top: -25, // Moves button slightly out of the container
        backgroundColor: '#341551',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 6, // Shadow for floating effect
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginTop: 35,
        marginBottom: 13
    },
    slider: {
        flex: 1,
        marginHorizontal: 10,
        thumbTintColor: '#fff',
    },
    liveCard: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    liveTitle: {
        fontSize: 20,
        fontFamily: "FiraSans-SemiBold",
        color: "#341551",
    },
    liveSubText: {
        color: "#fff",
        fontFamily: "FiraSans-Medium",
        fontSize: 14,
        marginLeft: 5,
    },
});
