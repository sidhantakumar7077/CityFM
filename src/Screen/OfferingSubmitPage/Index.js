import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SuccessPage = () => {
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const lottieRef = useRef(null); // Reference for LottieView

    useEffect(() => {
        // Start animation effects
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Play animation every 5 seconds
        const interval = setInterval(() => {
            if (lottieRef.current) {
                lottieRef.current.play(); // Restart animation
            }
        }, 2000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#ba62f5', '#8f3be6']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                    <Text style={styles.headerText}>Success</Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Lottie Animation */}
            <View style={styles.animationContainer}>
                <LottieView
                    ref={lottieRef}
                    source={require('../../assets/GIF/success.json')}
                    autoPlay
                    loop={false} // We manually loop it every 5 seconds
                    style={styles.lottie}
                />
            </View>

            <Animated.View style={[styles.successBox, { opacity: opacityAnim }]}>
                <Text style={styles.successText}>🎉 Booking Successful!</Text>
                <Text style={styles.subText}>Thank You For Your Offering.</Text>
                <Text style={styles.subText}>Please Submit The Items 5 day's Before The Offering Date.</Text>
            </Animated.View>

            <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.navigate('Home_2')}
                activeOpacity={0.9}
            >
                <Text style={styles.goBackText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SuccessPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        justifyContent: 'center',
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
        textTransform: 'capitalize',
    },
    animationContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 200,
        height: 200,
    },
    successBox: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 20,
    },
    successText: {
        fontSize: 22,
        fontFamily: 'FiraSans-Regular',
        color: '#4B0082',
        marginTop: 10,
    },
    subText: {
        fontSize: 15,
        fontFamily: 'FiraSans-Regular',
        color: '#555',
        textAlign: 'center',
        marginTop: 5,
    },
    goBackButton: {
        marginTop: 40,
        backgroundColor: '#ba62f5',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    goBackText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
