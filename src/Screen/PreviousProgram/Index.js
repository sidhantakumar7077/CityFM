import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { base_url } from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const progress = useProgress();
    const [loading, setLoading] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const playbackState = usePlaybackState();
    const glowAnim = useState(new Animated.Value(1))[0];
    const [allPodcasts, setAllPodcasts] = useState([
        {
            id: 1,
            name: 'ଶ୍ରୀ ଜଗନ୍ନାଥ ଅଷ୍ଟକମ୍',
            image: require('../../assets/image/asthakam.jpg'),
            audio: require('../../assets/audio/shri_Jagannath_astakam.mp3'),
            time: '5:00 AM to 5:15 AM'
        },
        {
            id: 2,
            name: 'ଦ୍ଵାରଫିଟା ଓ ଦୈନିକ ମଙ୍ଗଳ ଆଳତି',
            image: require('../../assets/image/mangala_alati.jpg'),
            audio: require('../../assets/audio/dwaraphita.mp3'),
            time: '5:15 AM to 6:00 AM'
        },
        {
            id: 3,
            name: 'ଶ୍ରିତକମଳା କୁଚମଣ୍ଡଳ',
            image: require('../../assets/image/srita_Kamala_Kucha_Mandala.jpg'),
            audio: require('../../assets/audio/srita_Kamala_Kucha_Mandala.mp3'),
            time: '6:00 AM to 6:30 AM'
        },
        {
            id: 4,
            name: 'ମଇଲମ ଓ ଅବକାଶ',
            image: require('../../assets/image/mailama.jpeg'),
            audio: require('../../assets/audio/mailama.mp3'),
            time: '6:30 AM to 8:00 AM'
        },
        {
            id: 5,
            name: 'ଦଶାବତାର ସ୍ତୋତ୍ରମ୍',
            image: require('../../assets/image/dasavatara.jpg'),
            audio: require('../../assets/audio/dasavatara.mp3'),
            time: '8:00 AM to 8:30 AM'
        },
        {
            id: 6,
            name: 'ସାହାଣମେଳା ବା ସର୍ବସାଧାରଣ ଦର୍ଶନ',
            image: require('../../assets/image/shahanna_mela.jpg'),
            audio: require('../../assets/audio/shahanna_mela.mp3'),
            time: '8:30 AM to 10:30 AM'
        },
        {
            id: 7,
            name: 'ମହାପ୍ରଭୁ ଜଗନ୍ନାଥ କିଏ ?',
            image: require('../../assets/image/jagannath_kia.jpg'),
            audio: require('../../assets/audio/jagannath_kia.mp3'),
            time: '10:30 AM to 11:00 AM'
        },
        {
            id: 8,
            name: 'ମଧ୍ୟାହ୍ନ ଧୂପ',
            image: require('../../assets/image/madhayandhupa.jpg'),
            audio: require('../../assets/audio/madhyanha_dhupa.mp3'),
            time: '11:00 AM to 1:00 PM'
        },
        {
            id: 9,
            name: 'ଯମଶିଳାର ମହତ୍ତ୍ଵ କଣ ?',
            image: require('../../assets/image/jamaSilara_mahatwa.jpg'),
            audio: require('../../assets/audio/jamaSilara_mahatwa.mp3'),
            time: '1:00 PM to 2:00 PM'
        },
        {
            id: 10,
            name: 'ମୋ ଜାତିର ନାଁ ଜଗନ୍ନାଥ',
            image: require('../../assets/image/mojatiranna_jagannatha.jpeg'),
            audio: require('../../assets/audio/mojatiranna_jagannatha.mp3'),
            time: '2:00 PM to 5:00 PM'
        },
        {
            id: 11,
            name: 'ପତାକା ଲାଗି',
            image: require('../../assets/image/patakalagi.jpg'),
            audio: require('../../assets/audio/pataka_lagi.mp3'),
            time: '5:00 PM to 6:00 PM'
        },
        {
            id: 12,
            name: 'ସନ୍ଧ୍ୟାଧୂପ',
            image: require('../../assets/image/sandhyaalati.png'),
            audio: require('../../assets/audio/chandan_charchita.mp3'),
            time: '6:00 PM to 7:00 PM'
        },
        {
            id: 13,
            name: 'ଭାଗବତ କଥା ଓ ଭଜନ ମହାପ୍ରସାର',
            image: require('../../assets/image/bhagabata_kathha.jpg'),
            audio: require('../../assets/audio/bhagabata_kathha.mp3'),
            time: '7:00 PM to 9:30 PM'
        },
        {
            id: 14,
            name: 'ବଡ ସିଂହାର ବେଶ ଓ ପହୁଡ',
            image: require('../../assets/image/bada_singhar.jpg'),
            audio: require('../../assets/audio/bada_singhar.mp3'),
            time: '9:30 PM to 11:30 PM'
        },
        {
            id: 15,
            name: 'ଭଜନ',
            image: require('../../assets/image/bhajana.jpg'),
            audio: require('../../assets/audio/bhajana.mp3'),
            time: '11:30 PM to 5:00 AM'
        }
    ]);

    useEffect(() => {
        if (isFocused) {
            getPodcastList();
            setupPlayer();
            const checkAsyncStorage = async () => {
                const storedPodcastData = await AsyncStorage.getItem('currentPodcast');
                if (storedPodcastData) {
                    setCurrentTrack(JSON.parse(storedPodcastData).id);
                }
            };
            // checkAsyncStorage();
        }
    }, [isFocused]);

    useEffect(() => {
        if (playbackState.state === State.Playing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1.2,
                        duration: 600,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 600,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [currentTrack, playbackState]);

    const getPodcastList = async () => {
        try {
            setLoading(true);
            const response = await fetch(base_url + 'api/podcasts', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.status === 200) {
                // setAllPodcasts(responseData.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                stopWithApp: false,
                capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
                compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
            });
        } catch (error) {
            console.log('Error setting up TrackPlayer:', error);
        }
    };

    const togglePlayback = async (track) => {
        try {
            if (currentTrack !== track.id) {
                await TrackPlayer.reset();
                await TrackPlayer.add({
                    id: track.id.toString(),
                    url: track.audio,
                    title: track.name,
                    artist: 'Unknown Artist',
                });
                setCurrentTrack(track.id);
                await TrackPlayer.play();
                await AsyncStorage.setItem('currentPodcast', JSON.stringify(track));
            } else {
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
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor="#c9170a" barStyle="light-content" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome5 name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟକର୍ମ</Text>
                <View style={{ width: 60 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#ff3b3b" style={{ marginTop: 50 }} />
            ) : (
                <View style={{ width: '94%', alignSelf: 'center', flex: 1 }}>
                    {currentTrack ? (
                        <LinearGradient colors={['#FFC500', '#c9170a']} style={styles.podcastCardBackground}>
                            <ImageBackground source={require('../../assets/image/textBG.png')} style={styles.activePodcast}>
                                <Text style={{ color: '#ff3b3b', fontSize: 16, fontWeight: 'bold' }}>ବର୍ତ୍ତମାନ ଚାଲୁଅଛି</Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
                                    {allPodcasts.find((podcast) => podcast.id === currentTrack).name}
                                </Text>
                                <Slider
                                    style={{ width: '80%', height: 6, marginTop: 20, marginBottom: 10, alignSelf: 'center' }}
                                    value={progress.position}
                                    minimumValue={0}
                                    maximumValue={progress.duration}
                                    thumbTintColor="red"
                                    minimumTrackTintColor="#ed0716"
                                    maximumTrackTintColor="#ffb700"
                                    onSlidingComplete={async (value) => {
                                        await TrackPlayer.seekTo(value);
                                    }}
                                />
                                <View style={styles.controls}>
                                    <TouchableOpacity onPress={handleBackward} style={styles.controlButton}>
                                        <Ionicons name="play-back" size={20} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => togglePlayback(allPodcasts.find((podcast) => podcast.id === currentTrack))} style={styles.playPauseButton}>
                                        <Ionicons name={playbackState.state === State.Playing ? "pause" : "play"} size={30} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
                                        <Ionicons name="play-forward" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </LinearGradient>
                    ) : null}
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={allPodcasts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const isPlaying = currentTrack === item.id && playbackState.state === State.Playing;
                                return (
                                    <View style={[styles.card, isPlaying ? styles.activeCard : {}]}>
                                        <Image source={item.image} style={styles.image} />
                                        <View style={styles.details}>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <Text style={styles.description} numberOfLines={2}>{item.time}</Text>
                                            <Animated.View style={isPlaying ? { transform: [{ scale: glowAnim }] } : {}}>
                                                <TouchableOpacity onPress={() => togglePlayback(item)} style={styles.playButton}>
                                                    <Ionicons
                                                        name={isPlaying ? 'pause' : 'play'}
                                                        size={22}  // Smaller icon size
                                                        color="#fff"
                                                    />
                                                </TouchableOpacity>
                                            </Animated.View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC500',
        // paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 10,
        elevation: 10,
    },
    backButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
    },
    headerTitle: {
        color: '#c9170a',
        fontSize: 20,
        fontWeight: 'bold',
    },
    podcastCardBackground: {
        borderRadius: 15,
        padding: 4, // Creates a border effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8, // For Android shadow
    },
    activePodcast: {
        height: 180,
        resizeMode: 'cover',
        // backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ff3b3b',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center',
        marginTop: 10,
    },
    controlButton: {
        padding: 10,
        backgroundColor: '#ff3b3b',
        borderRadius: 50,
        shadowColor: '#ff6b6b',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
    playPauseButton: {
        width: 60,
        height: 60,
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
    card: {
        flexDirection: 'row',
        backgroundColor: 'red',
        borderRadius: 15,
        marginVertical: 8,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
    activeCard: {
        borderColor: '#fff',
        borderWidth: 4,
        shadowColor: '#ff3b3b',
        shadowRadius: 10,
        elevation: 15,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    description: {
        color: '#e0e0de',
        fontSize: 13,
        marginTop: 4,
    },
    playButton: {
        backgroundColor: '#ff3b3b',
        width: 40,  // Smaller button size
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff3b3b',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
});