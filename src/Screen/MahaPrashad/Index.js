import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';

const nitiTimings = [
    { name: 'Sakala Dhoopa', status: 'Completed', time: '10:00 AM', relativeTime: 'soon' },
    { name: 'Madhyana Dhoopa', status: 'Completed', time: '12:30 PM', relativeTime: 'in 8 hours' },
    { name: 'Sandhya Dhoopa', status: 'Running', time: '7:00 PM', relativeTime: '3 hours ago' },
    { name: 'Bada Singhara Dhoopa', status: 'Upcoming', time: '11:15 PM', relativeTime: '1 hour ago' },
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

    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    };

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
                        <Text style={styles.headerText}>Maha Prashad</Text>
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
                    {/* <ImageBackground source={require('../../assets/image/mangala_alati.jpg')} style={styles.headerImage} /> */}
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Maha Prasad Bhoga Timing</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>Know The Bhoga Being Offered To Mahaprabhu & Mahaprasad Availability at Ananda Bazar</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Set Alert →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/mahaPrasad.png')} style={{ width: 120, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>

                {/* Prashad List */}
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={nitiTimings}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => {
                            const isLast = index === nitiTimings.length - 1;
                            const isCompleted = item.status === 'Completed';
                            const isRunning = item.status === 'Running';
                            const isUpcoming = item.status === 'Upcoming';

                            const getIcon = () => {
                                if (isCompleted) {
                                    return <Feather name="check-circle" size={20} color="#999" />;
                                }
                                if (isRunning) {
                                    return (
                                        <View style={{ backgroundColor: '#dce8e0', padding: 6, borderRadius: 100 }}>
                                            <MaterialCommunityIcons name="timer-outline" size={30} color="#059629" />
                                        </View>
                                    );
                                }
                                return (
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name="bell-outline" size={22} color="#999" />
                                    </TouchableOpacity>
                                );
                            };

                            const getColor = () => {
                                if (isCompleted) return '#341551'; // purple
                                if (isRunning) return '#059629'; // green
                                return '#C5C5C5'; // grey
                            };

                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 15 }}>
                                    {/* Left Indicator */}
                                    <View style={{ alignItems: 'center', width: 40 }}>
                                        {/* Line above */}
                                        {/* {index !== 0 && <View style={{ height: 12, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />} */}

                                        {/* Number Circle */}
                                        <View
                                            style={{
                                                height: 24,
                                                width: 24,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: getColor(),
                                                backgroundColor:
                                                    isCompleted ? '#341551' :
                                                        isRunning ? '#059629' :
                                                            '#C5C5C5',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {isCompleted ? (
                                                <MaterialIcons name="check" size={14} color="white" />
                                            ) : (
                                                <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>
                                                    {index + 1}
                                                </Text>
                                            )}
                                        </View>

                                        {/* Line below */}
                                        {!isLast && <View style={{ flex: 1, width: 2, backgroundColor: isCompleted ? getColor() : '#DADADA' }} />}
                                    </View>

                                    {/* Right Content */}
                                    <View style={{ flex: 1, paddingBottom: 30, marginLeft: 7 }}>
                                        <Text style={{ fontSize: 15, color: '#222', fontFamily: 'FiraSans-SemiBold' }}>{item.name}</Text>
                                        {isCompleted ?
                                            <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>Completed {item.time}</Text>
                                            :
                                            isRunning ?
                                                <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>Started at {item.time}</Text>
                                                :
                                            <Text style={{ fontSize: 13, color: '#333', fontFamily: 'FiraSans-Regular' }}>Will be Started {item.time}</Text>
                                        }

                                        {isRunning && (
                                            <>
                                                <Text style={{ fontSize: 13, color: '#059629', fontFamily: 'FiraSans-Regular' }}>
                                                    Running Now
                                                </Text>
                                            </>
                                        )}
                                    </View>

                                    {/* Right-side icon */}
                                    <View style={{ marginTop: 5 }}>
                                        {getIcon()}
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={{ height: 400 }} />
            </ScrollView>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={closeModal}
                animationIn="zoomIn"
                animationOut="slideOutUp"
                animationInTiming={400}
                animationOutTiming={400}
            >
                <View style={styles.modalContainer}>
                    <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 21, textAlign: 'center' }}>ଦ୍ଵାରଫିଟା ଓ ଦୈନିକ ମଙ୍ଗଳ ଆଳତି</Text>
                        <Image source={require('../../assets/image/headLine.png')} style={{ width: '80%', height: 20, marginTop: 8 }} />
                        <Text style={{ color: '#000', fontSize: 18, fontWeight: '500', marginTop: 20 }}><Text style={{ fontSize: 18, fontWeight: '600' }}>ସମୟ : </Text>ଭୋର ୫ଘଟିକା ବା ତତପୂର୍ବରୁ |</Text>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 20, width: '90%', letterSpacing: 0.6, lineHeight: 19 }}>ଉପରୋକ୍ତ ନୀତି ପ୍ରତ୍ୟହ ଉଷାକାଳ ଅର୍ଥାତ ଭୋର ୫ଘଟିକା ବା ତତପୂର୍ବରୁ ହେବାର ନିୟମ | କେବଳ ଦଶହରା ପର ଏକାଦଶୀ ଠାରୁ କାର୍ତ୍ତିକ ପୂର୍ଣିମା ପର୍ୟଂତ , ଧନୁ ସଂକ୍ରାନ୍ତି ଠାରୁ ମକର ସଂକ୍ରାନ୍ତି ପର୍ୟଂତ ଓ ବିଶେଷ ନୀତି ଦିନମାନଙ୍କରେ ରାତ୍ର ପ୍ରହର ଥାଉ ହେବାର ନିୟମ |</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', fontSize: 18, marginTop: 20 }}>ନୀତି ସକାଶେ ଆବଶ୍ୟକ ଉପକରଣମାନ</Text>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, width: '90%', letterSpacing: 0.6 }}>(କ) କର୍ପୂର , (ଖ) ପିଠଉ , (ଗ) ବଳିତା , (ଘ) ଘିଅ , (ଓଁ) ଆଳତି ବଇଠା , (ଚ) ପାଣିଝରି , (ଛ) ତେଲ , ଓ (ଜ) ମଶାଲ</Text>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', fontSize: 18, marginTop: 20 }}>ନିମ୍ନଲିଖିତ ସେବକମାନଙ୍କଦ୍ଵାରା ଏହି ନୀତି ସମ୍ପନ୍ନ ହୁଏ</Text>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 10, width: '90%', letterSpacing: 0.6, marginBottom: 10 }}>(୧) ରାଜା ସୁପରିଟେଣ୍ଡଙ୍କ ତରଫରୁ ମନ୍ଦିର କର୍ମଚାରୀ , (୨) ପ୍ରତିହାରୀ , (୩) ଭିତରଛୁ ମହାପାତ୍ର , (୪) ମୁଦୁଲି , (୫) ଅଖଣ୍ଡ ମେକାପ , (୬) ପାଳିଆ ମେକାପ , (୭) ଖଟଶେଯ ମେକାପ , (୮) ପାଳିଆ ସୁଆରବଡୁ , (୯) ଖୁଣ୍ଟିଆ , (୧୦) ଗରାବଡୁ , (୧୧) ବଳିତଦେବା ଲୋକ , (୧୨) ପୁଷ୍ପାଳକ |</Text>
                    </View>
                </View>
            </Modal>
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
    /* List Item Styles */
    nitiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statusIndicator: {
        width: 5,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    nitiDetails: {
        flex: 1,
    },
    nitiName: {
        fontSize: 14,
        fontFamily: 'FiraSans-Regular',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    nitiTime: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'FiraSans-Regular'
    },
    nitiStatus: {
        fontWeight: 'bold',
        color: '#333',
    },
    modalContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        minHeight: 330,
    },
});
