import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';

const images = [
    require('../../assets/image/besha_luga/cloth1.jpeg'),
    require('../../assets/image/besha_luga/cloth2.jpeg'),
    require('../../assets/image/besha_luga/cloth3.jpeg'),
    require('../../assets/image/besha_luga/cloth4.jpeg'),
    require('../../assets/image/besha_luga/cloth5.jpeg'),
    require('../../assets/image/besha_luga/cloth6.webp'),
    require('../../assets/image/besha_luga/cloth7.webp'),
    require('../../assets/image/besha_luga/cloth8.jpeg'),
    require('../../assets/image/besha_luga/cloth9.jpeg'),
    require('../../assets/image/besha_luga/cloth10.jpeg'),
    require('../../assets/image/besha_luga/cloth11.webp'),
];

const neededItem = [
    { id: 1, name: 'Tadapa', qty: 4 },
    { id: 2, name: 'Uttariya', qty: 2 },
    { id: 3, name: 'Khandua', qty: 1 },
]

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
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const [isChecked, setIsChecked] = useState(false);

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
                        <Text style={styles.headerText}>Offering Booking</Text>
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
                            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Pitch-perfect Travel Offers</Text>
                            <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>Save up to ₹5000 on Flights to any cricket match venue</Text>
                            <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Book Now →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/SplashLogo.png')} style={{ width: 110, height: 120, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </View>
                {/* Main Content */}
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Confirm Your Booking</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    </View>
                    <View style={styles.smallCell1}>
                        <View style={{ width: '70%' }}>
                            <Text style={{ color: '#000', fontSize: 16, fontFamily: "FiraSans-SemiBold", }}><Text style={{ fontSize: 15 }}>Niti Name: </Text>Mailama</Text>
                            <Text style={{ color: '#000', fontSize: 14, fontFamily: "FiraSans-SemiBold", }}>Niti Time : 6 AM</Text>
                            <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>ଏହି ନୀତିର ନିର୍ଦ୍ଧାରିତ ସମୟ ପୂର୍ବାହ୍ନ ୬ ଘଟିକା | କିନ୍ତୁ ଯେଉଁଦିନ ମଙ୍ଗଳ ଆଳତି ଯେତେଶୀଘ୍ର ସାରିବ ତେତେ ଶୀଘ୍ର ମଇଲମ ହେବ |</Text>
                            {/* <Text style={{ color: '#000', fontSize: 14, fontFamily: "FiraSans-SemiBold", marginTop: 10 }}>Items Needed</Text> */}
                            {/* <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>(୧)୪ ଖଣ୍ଡ ତଡପ, (୨) ୨ ଖଣ୍ଡ ଉତ୍ତରୀୟ, (୩)୧ ଖଣ୍ଡ ଖଣ୍ଡୁଆ </Text> */}
                        </View>
                    </View>
                    <View style={styles.smallCell1}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ color: '#000', fontSize: 14, fontFamily: "FiraSans-SemiBold", marginBottom: 8 }}>Items Needed</Text>
                            {neededItem.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <View style={{ height: 20, width: 20, borderRadius: 12, borderWidth: 2, borderColor: '#341551', backgroundColor: '#341551', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>{index + 1}</Text>
                                    </View>
                                    <Text style={{ color: '#000', fontSize: 14, fontFamily: "FiraSans-Regular", }}>{item.qty} pcs {item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 17, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Items To Be Submited At Temple Office</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 10 }} />
                    </View>
                    <View style={styles.nitiItem}>
                        <View style={styles.statusIndicator} />
                        <View style={styles.nitiDetails}>
                            <Text style={styles.nitiName}>Color Of The Bastra.</Text>
                            <Text style={styles.nitiTime}>
                                <Text style={styles.nitiStatus}>Thusday: </Text>
                                Yellow Color
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {Array(3)
                            .fill()
                            .map((_, rowIndex) => (
                                <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                    {images.slice(rowIndex * 3, rowIndex * 3 + 3).map((image, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => openModal(image)}
                                            style={{
                                                width: '32%',
                                                backgroundColor: '#fff',
                                                borderRadius: 10,
                                                alignItems: 'center',
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 5,
                                                elevation: 5,
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Image source={image} style={{ width: '100%', height: 120, aspectRatio: 1, resizeMode: 'cover' }} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            tintColors={{ true: '#007AFF', false: '#ccc' }}
                        />
                        <Text style={{ marginLeft: 8 }}>I agree to the <Text style={{ color: '#007AFF' }}>terms and conditions</Text>.</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('OfferingForm')} style={[styles.confirmBtm, isChecked && styles.activeConfirmBtm]} disabled={isChecked ? false : true}>
                        <Text style={{ color: isChecked ? '#fff' : '#000', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Confirm My Offerings</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={modalVisible} onBackdropPress={closeModal} animationIn="zoomIn" animationOut="slideOutUp" animationInTiming={400} animationOutTiming={400}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                        <View style={{ alignSelf: 'flex-end', position: 'absolute', alignSelf: 'center', top: -55 }}>
                            <TouchableOpacity onPress={closeModal} style={{ backgroundColor: '#f0eded', padding: 10, borderRadius: 40 }}>
                                <Fontisto name={'close-a'} size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                        {selectedImage && <Image source={selectedImage} style={{ width: '97%', height: 320, alignSelf: 'center' }} />}
                    </View>
                </Modal>
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
    smallCell1: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },
    nitiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statusIndicator: {
        backgroundColor: '#4B7100',
        width: 5,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    nitiDetails: {
        flex: 1,
    },
    nitiName: {
        color: '#4B7100',
        fontSize: 14,
        fontFamily: 'FiraSans-Regular',
        textTransform: 'capitalize',
        marginBottom: 2,
    },
    nitiTime: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'FiraSans-Regular'
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
    checkBoxContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    confirmBtm: {
        backgroundColor: '#c9c9c7',
        width: '100%',
        height: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
    },
    activeConfirmBtm: {
        backgroundColor: '#341551'
    }
})