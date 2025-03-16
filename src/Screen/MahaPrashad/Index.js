import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';

const nitiTimings = [
    { name: 'ABHIJIT MUHURTA', status: 'Completed', time: '12:14 PM', relativeTime: 'soon' },
    { name: 'AMRIT KALA', status: 'Completed', time: '09:00 PM', relativeTime: 'in 8 hours' },
    { name: 'YAMAGANDA KALA', status: 'Running', time: '08:15 AM', relativeTime: '3 hours ago' },
    { name: 'GULIKA KALA', status: 'Upcoming', time: '11:10 AM', relativeTime: '1 hour ago' },
    { name: 'RAHU KALA', status: 'Upcoming', time: '02:05 PM', relativeTime: 'in 1 hour' },
];

// Function to determine the color based on status
const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return '#4B7100';
        case 'Running': return '#E99C00';
        case 'Upcoming': return '#999';
        default: return '#999';
    }
};

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
                    colors={isScrolled ? ['#ba62f5', '#ba62f5'] : ['transparent', 'transparent']}
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
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', }}>Pitch-perfect Travel Offers</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5 }}>Save up to ₹5000 on Flights to any cricket match venue</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontWeight: 'bold' }}>Book Now →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {/* Niti List */}
                <FlatList
                    data={nitiTimings}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => {
                        const statusColor = getStatusColor(item.status);
                        return (
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.nitiItem}>
                                {/* Status Indicator */}
                                <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />

                                {/* Niti Details */}
                                <View style={styles.nitiDetails}>
                                    <Text style={[styles.nitiName, { color: statusColor }]}>{item.name}</Text>
                                    <Text style={styles.nitiTime}>
                                        <Text style={styles.nitiStatus}>{item.status} </Text>
                                        {item.relativeTime} at {item.time}
                                    </Text>
                                </View>

                                {/* Bell Icon for Upcoming Niti Only */}
                                {item.status === 'Upcoming' && (
                                    <MaterialIcons name="notifications-none" size={20} color="#999" />
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
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
        fontFamily: 'Lora-Bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#ba62f5',
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
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    nitiTime: {
        fontSize: 13,
        color: '#666',
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
