import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, LogBox } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { State, usePlaybackState, useProgress, Capability, Event } from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { base_url } from '../../../App';

// LogBox.ignoreLogs(['The player has already been initialized via setupPlayer.']);

const Index = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [spinner, setSpinner] = useState(false);
    const [allContent, setAllContent] = useState([]);
    // const [currentMusic, setCurrentMusic] = useState({});
    const [currentTrack, setCurrentTrack] = useState(null);

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
                // console.log("Podcast Data: ", responseData.data.recent_podcast);
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
            const checkAsyncStorage = async () => {
                const storedPodcastData = await AsyncStorage.getItem('currentPodcast');
                if (storedPodcastData) {
                    setCurrentTrack(JSON.parse(storedPodcastData).id);
                    setAllContent(JSON.parse(storedPodcastData));
                } else {
                    getPodcastData();
                }
            };
            checkAsyncStorage();
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
            if (currentTrack !== track.id) {
                // console.log("Current Track ID:", currentTrack, "Selected Track ID:", track.id.toString());
                await TrackPlayer.reset();
                await TrackPlayer.add({
                    id: track.id.toString(),
                    url: track.podcast_music,
                    title: track.podcast_prepair.podcast_name,
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

    const handleForward = async () => {
        const newPosition = progress.position + 10;
        if (newPosition < progress.duration) {
            await TrackPlayer.seekTo(newPosition);
        }
    }

    const handleBackward = async () => {
        const newPosition = progress.position - 10;
        if (newPosition > 0) {
            await TrackPlayer.seekTo(newPosition);
        } else {
            await TrackPlayer.seekTo(0);
        }
    }

    return (
        <View style={styles.background}>
            {spinner ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Loading...</Text>
                </View>
                :
                <SafeAreaView style={styles.container}>
                    <StatusBar hidden={true} />
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={{ width: 20 }} />
                        <Text style={styles.playingText}>Now Playing</Text>
                        <TouchableOpacity onPressIn={() => navigation.navigate('ContentList')} style={styles.iconButton}>
                            <AntDesign name="bars" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Album Art */}
                    <View style={styles.albumContainer}>
                        {allContent?.podcast_image ?
                            <Image
                                style={styles.albumArt}
                                source={{ uri: allContent?.podcast_image }}
                                resizeMode="cover"
                            />
                            :
                            <Image
                                style={styles.albumArt}
                                source={{ uri: 'https://play-lh.googleusercontent.com/54v1qfGwv6CsspWLRjCUEfVwg4UX248awdm_ad7eoHFst6pDwPNgWlBb4lRsAbjZhA' }}
                                resizeMode="cover"
                            />
                        }
                    </View>

                    {/* Song Info */}
                    <View style={styles.songInfo}>
                        <Text style={styles.songTitle}>{allContent?.podcast_prepair?.podcast_name}</Text>
                        <Text style={styles.radioStation}>{allContent?.description}</Text>
                        {currentTrack === allContent?.id && playbackState.state === "playing" ?
                            <Image
                                style={styles.visualizer}
                                source={require('../../assets/GIF/giphy.gif')}
                                resizeMode="cover"
                            />
                            :
                            <Image
                                style={{ width: '80%', height: 40, marginTop: 50, opacity: 0.9 }}
                                source={require('../../assets/image/track.png')}
                                resizeMode="cover"
                            />
                        }
                    </View>

                    {/* Playback Controls */}
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={handleBackward} style={styles.controlButton}>
                            <Ionicons name="play-back" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => togglePlayback(allContent)} style={styles.playPauseButton}>
                            <Ionicons name={currentTrack === allContent?.id && playbackState.state === "playing" ? "pause" : "play"} size={50} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
                            <Ionicons name="play-forward" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            }
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#0e0f1f',
        position: 'relative',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
    },
    playingText: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '500',
    },
    albumContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    albumArt: {
        width: 250,
        height: 250,
        borderRadius: 20,
        shadowColor: '#ff3b3b',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 15,
    },
    songInfo: {
        alignItems: 'center',
        marginTop: 10,
    },
    songTitle: {
        color: '#ff6b6b',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
    },
    radioStation: {
        width: '70%',
        alignSelf: 'center',
        color: '#e8e8e8',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 4,
    },
    visualizer: {
        width: '80%',
        height: 60,
        marginTop: 30,
        opacity: 0.9,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center',
        marginTop: 60,
    },
    controlButton: {
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 50,
        shadowColor: '#ff6b6b',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    playPauseButton: {
        width: 90,
        height: 90,
        backgroundColor: '#ff3b3b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        shadowColor: '#ff3b3b',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 20,
    },
});