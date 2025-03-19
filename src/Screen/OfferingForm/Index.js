import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        gotra: ''
    });

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

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
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
                        <Text style={styles.headerText}>Offering Booking Form</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                >
                    {/* Header Image */}
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContentWrapper}>
                            <View style={{ width: '75%' }}>
                                <Text style={styles.offerTitle}>Pitch-perfect Travel Offers</Text>
                                <Text style={styles.offerSubTitle}>Save up to ₹5000 on Flights to any cricket match venue</Text>
                                <TouchableOpacity style={styles.bookNowButton}>
                                    <Text style={styles.bookNowText}>Book Now →</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.logoContainer}>
                                <Image source={require('../../assets/image/SplashLogo.png')} style={styles.logo} />
                            </View>
                        </View>
                    </View>

                    {/* Booking Form */}
                    <View style={styles.formContainer}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Panji & Calendar</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                        {/* Name */}
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            value={form.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />

                        {/* Phone Number */}
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            value={form.phone}
                            onChangeText={(text) => handleChange('phone', text)}
                        />

                        {/* Email ID */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email ID"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={(text) => handleChange('email', text)}
                        />

                        {/* Address */}
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Address"
                            placeholderTextColor="#888"
                            multiline
                            numberOfLines={3}
                            value={form.address}
                            onChangeText={(text) => handleChange('address', text)}
                        />

                        {/* Gotra */}
                        <TextInput
                            style={styles.input}
                            placeholder="Gotra"
                            placeholderTextColor="#888"
                            value={form.gotra}
                            onChangeText={(text) => handleChange('gotra', text)}
                        />

                        {/* Submit Button */}
                        <TouchableOpacity onPress={()=> navigation.navigate('OfferingSubmitPage')} style={styles.submitButton}>
                            <LinearGradient colors={['#341551', '#9b49d7']} style={styles.submitGradient}>
                                <Text style={styles.submitText}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
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
        marginLeft: 10,
        textTransform: 'capitalize'
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
    },
    headerContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
        paddingHorizontal: 15,
    },
    offerTitle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'FiraSans-Regular'
    },
    offerSubTitle: {
        color: '#ddd',
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'FiraSans-Regular'
    },
    bookNowButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    bookNowText: {
        color: '#4B0082',
        fontFamily: 'FiraSans-Regular'
    },
    logoContainer: {
        width: '22%',
        alignItems: 'center',
    },
    logo: {
        width: 110,
        height: 120,
        resizeMode: 'contain'
    },
    formContainer: {
        padding: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333'
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 14,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    submitButton: {
        marginTop: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    submitGradient: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
