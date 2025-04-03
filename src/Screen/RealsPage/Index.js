import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const reelsData = [
  {
    id: '1',
    video: require('../../assets/video/splash1.mp4'),
    title: 'A beautiful morning in Puri 🌊',
    music: 'Original Audio',
    user: 'puridairies',
    profile: require('../../assets/image/parking765.png'),
  },
  {
    id: '2',
    video: require('../../assets/video/splash3.mp4'),
    title: 'Jagannath Mandir Vibes',
    music: 'Mahaprabhu Remix',
    user: 'jagannath_sevak',
    profile: require('../../assets/image/parking765.png'),
  },
    {
    id: '3',
    video: require('../../assets/video/splash3.mp4'),
    title: 'Evening at Puri Beach 🌅',
    music: 'Chill Vibes',
    user: 'puri_explorer',
    profile: require('../../assets/image/parking765.png'),
  },
    {
    id: '4',
    video: require('../../assets/video/splash3.mp4'),
    title: 'Street Food Adventures 🍽️',
    music: 'Foodie Beats',
    user: 'puri_foodie',
    profile: require('../../assets/image/parking765.png'),
    },
];

const CARD_WIDTH = width * 0.88;
const CARD_HEIGHT = height * 0.68;

const Index = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        horizontal
        snapToInterval={CARD_WIDTH + 24}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
        renderItem={({ item, index }) => (
          <View style={styles.cardWrapper}>
            <View style={styles.reelCard}>
              <Video
                source={item.video}
                ref={videoRef}
                resizeMode="cover"
                repeat
                paused={currentIndex !== index}
                style={styles.video}
              />
              <View style={styles.overlay}>
                <View style={styles.infoTopRow}>
                  <Text style={styles.reelsTag}>Reels</Text>
                  <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
                </View>

                <View style={styles.rightSection}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="heart-outline" size={26} color="#fff" />
                    <Text style={styles.iconText}>1.2k</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="chatbubble-outline" size={26} color="#fff" />
                    <Text style={styles.iconText}>300</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="paper-plane-outline" size={26} color="#fff" />
                    <Text style={styles.iconText}>Share</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottomSection}>
                  <View style={styles.profileRow}>
                    <Image source={item.profile} style={styles.profileImage} />
                    <Text style={styles.username}>@{item.user}</Text>
                    <TouchableOpacity style={styles.followBtn}>
                      <Text style={{ color: '#fff', fontSize: 12 }}>Follow</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.caption}>{item.title}</Text>
                  <View style={styles.musicRow}>
                    <Ionicons name="musical-notes" size={14} color="#fff" />
                    <Text style={styles.musicText}>{item.music}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 24,
    backgroundColor: '#1c1c1e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  reelCard: {
    flex: 1,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  infoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reelsTag: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightSection: {
    position: 'absolute',
    right: 10,
    bottom: 130,
    alignItems: 'center',
    gap: 18,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  bottomSection: {
    width: '100%',
    paddingBottom: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  followBtn: {
    backgroundColor: '#e91e63',
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  musicText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 13,
  },
});