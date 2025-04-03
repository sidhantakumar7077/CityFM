import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get('window');

const reelsData = [
    {
        id: '1',
        video: require('../../assets/video/chakeiDas.mp4'),
        title: 'A beautiful morning in Puri 🌊',
        music: 'Original Audio',
        user: 'puridairies',
        profile: require('../../assets/image/parking765.png'),
    },
    {
        id: '2',
        video: require('../../assets/video/adharaPana.mp4'),
        title: 'Jagannath Mandir Vibes',
        music: 'Mahaprabhu Remix',
        user: 'jagannath_sevak',
        profile: require('../../assets/image/parking765.png'),
    },
    {
        id: '7',
        video: require('../../assets/video/rathaStory.mp4'),
        title: 'A beautiful morning in Puri 🌊',
        music: 'Original Audio',
        user: 'puri_foodie',
        profile: require('../../assets/image/parking765.png'),
    },
    {
        id: '3',
        video: require('../../assets/video/splash1.mp4'),
        title: 'A beautiful morning in Puri 🌊',
        music: 'Original Audio',
        user: 'puridairies',
        profile: require('../../assets/image/parking765.png'),
    },
    {
        id: '4',
        video: require('../../assets/video/nirjalaEkadshi.mp4'),
        title: 'Jagannath Mandir Vibes',
        music: 'Mahaprabhu Remix',
        user: 'jagannath_sevak',
        profile: require('../../assets/image/parking765.png'),
    },
    {
        id: '5',
        video: require('../../assets/video/rathaFabric.mp4'),
        title: 'Evening at Puri Beach 🌅',
        music: 'Chill Vibes',
        user: 'puri_explorer',
        profile: require('../../assets/image/parking765.png'),
    },
    {
        id: '6',
        video: require('../../assets/video/rathaKhala.mp4'),
        title: 'Street Food Adventures 🍽️',
        music: 'Foodie Beats',
        user: 'puri_foodie',
        profile: require('../../assets/image/parking765.png'),
    },
];

const CARD_WIDTH = width * 0.80;
const CARD_HEIGHT = height * 0.68;

const Index = () => {

    const videoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

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

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>Video Content</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>
            <View style={styles.headerContainer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 15 }}>
                    <View style={{ width: '75%' }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Regular' }}>Shree Mandira Reels</Text>
                        <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>Explore the beauty of Jagannatha Dham</Text>
                    </View>
                    <View style={{ width: '22%', alignItems: 'center' }}>
                        <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                    </View>
                </View>
            </View>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
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
        height: 180,
        backgroundColor: '#341551',
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
    },
    cardWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 10,
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