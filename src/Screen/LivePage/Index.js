import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, usePlaybackState, useProgress, Capability, Event } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { base_url } from '../../../App';
import * as Animatable from 'react-native-animatable';

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
                setAllContent(responseData.data.recent_podcast);
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
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            {/* Background Image */}
            <ImageBackground source={require('../../assets/image/ratha.jpeg')} style={styles.background}>
                {/* Gradient Overlay */}
                <LinearGradient colors={['transparent', '#FFBE00']} style={styles.gradient} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    {/* Top Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPressIn={() => navigation.navigate('PreviousProgram')} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 6, borderRadius: 6 }}>
                            <MaterialCommunityIcons name="page-previous-outline" size={25} color="#f5ebd0" />
                        </TouchableOpacity>
                        <TouchableOpacity onPressIn={() => navigation.navigate('ContentList')} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 6, borderRadius: 6 }}>
                            <AntDesign name="bars" size={26} color="#f5ebd0" />
                        </TouchableOpacity>
                    </View>

                    {/* Centered Image Section */}
                    <View style={styles.content}>
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
                    </View>

                    {/* Player Controls */}
                    <View style={styles.playerContainer}>
                        {/* Live Badge */}
                        <Animatable.View animation="pulse" iterationCount="infinite" style={styles.liveBadge}>
                            <Text style={styles.liveText}>Live</Text>
                        </Animatable.View>

                        {/* Play Button */}
                        <View style={styles.playButtonContainer}>
                            <TouchableOpacity style={styles.playButton} onPress={() => togglePlayback(allContent)}>
                                <Icon name={currentTrack === allContent?.id && playbackState.state === "playing" ? 'pause' : 'play-arrow'} size={40} color="#c9170a" />
                            </TouchableOpacity>
                        </View>

                        {/* Volume Slider */}
                        <View style={styles.sliderContainer}>
                            <Icon name="volume-down" size={18} color="#fff" />
                            <Slider
                                style={styles.slider}
                                value={volume}
                                onValueChange={(value) => {
                                    setVolume(value);
                                    TrackPlayer.setVolume(value); // Set volume dynamically
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#fff"
                                maximumTrackTintColor="gray"
                                thumbTintColor="#fff"
                            />
                            <Icon name="volume-up" size={18} color="#fff" />
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
    },
    background: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    header: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '92%',
        alignSelf: 'center',
        top: 30,
        // right: 20,
        padding: 8,
        borderRadius: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
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
    textContainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        marginTop: 10
    },
    playerContainer: {
        backgroundColor: '#c9170a',
        padding: 20,
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
        position: 'absolute',
        bottom: 30,
        elevation: 5, // Shadow for depth
    },

    liveBadge: {
        position: 'absolute',
        top: 10,
        left: 15,
        backgroundColor: '#FFBE00',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },

    liveText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },

    playButtonContainer: {
        position: 'absolute',
        top: -25, // Moves button slightly out of the container
        backgroundColor: '#c9170a',
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
        marginTop: 40,
    },

    slider: {
        flex: 1,
        marginHorizontal: 10,
        thumbTintColor: '#fff',
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
        fontSize: 16,
        fontWeight: '700',
        color: '#FF512F', // Vibrant Accent Color
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    podcastTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 5,
        textAlign: 'center',
    },
    divider: {
        width: '80%',
        height: 2,
        backgroundColor: '#FF512F',
        marginVertical: 8,
    },
    podcastDescription: {
        fontSize: 13,
        color: '#555',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 6,
    },
});
