import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { base_url } from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const playbackState = usePlaybackState();
  const glowAnim = useState(new Animated.Value(1))[0];

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
      checkAsyncStorage();
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
        setAllPodcasts(responseData.data);
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
          url: track.podcast_music,
          title: track.podcast_prepair.podcast_name,
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🔥 Trending Podcasts</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff3b3b" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={allPodcasts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isPlaying = currentTrack === item.id && playbackState.state === State.Playing;
            return (
              <View style={[styles.card, isPlaying ? styles.activeCard : {}]}>
                <Image source={{ uri: item.podcast_image }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.title}>{item.podcast_prepair.podcast_name}</Text>
                  <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
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
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#292929',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  headerTitle: {
    color: '#ffcc00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    borderColor: '#ff3b3b',
    borderWidth: 2,
    shadowColor: '#ff3b3b',
    shadowRadius: 10,
    elevation: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 15,
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
    color: '#bbb',
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