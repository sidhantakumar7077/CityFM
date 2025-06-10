import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ToastAndroid,
    Alert,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LanguageSelection = () => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const saveLanguage = async () => {
        try {
            if (!selectedLanguage) {
                ToastAndroid.show('Please select a language', ToastAndroid.SHORT);
                return;
            }
            await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
            navigation.navigate('Home_2');
        } catch (error) {
            console.error('Error saving language:', error);
            Alert.alert('Error', 'Failed to save language selection. Please try again.');
        }
    };

    // const loadLanguage = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('selectedLanguage');
    //         if (value !== null) {
    //             setSelectedLanguage(value);
    //             console.log('Selected Language from Storage:', value);
    //         } else {
    //             // If no language found, set English by default
    //             await AsyncStorage.setItem('selectedLanguage', 'English');
    //             setSelectedLanguage('English');
    //             console.log('No Language Found. Setting Default: English');
    //         }
    //     } catch (error) {
    //         console.log('Error loading language from storage:', error);
    //     }
    // };

    const loadLanguage = async () => {
    try {
        const value = await AsyncStorage.getItem('selectedLanguage');
        if (value !== null) {
            setSelectedLanguage(value);
            console.log('Selected Language from Storage:', value);
            // Navigate directly if language is already selected
            navigation.navigate('Home_2');
        } else {
            // If no language found, set English by default
            await AsyncStorage.setItem('selectedLanguage', 'English');
            setSelectedLanguage(null);
            console.log('No Language Found. Setting Default: English');
        }
    } catch (error) {
        console.log('Error loading language from storage:', error);
    }
};

    useEffect(() => {
        loadLanguage();
    }, []);

    return (
        <View style={styles.fullScreen}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ଓଡ଼ିଆ ଭାଷା ଚୟନ ହୋଇଛି' : 'English Language Selected'}</Text>
            </View>

            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/image/mainLogo.png')} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 40 }} />
            </View> */}

            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/image/mainLogo.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                </View>
                <TouchableOpacity
                    style={[
                        styles.languageButton,
                        selectedLanguage === 'English' && styles.selected,
                    ]}
                    onPress={() => setSelectedLanguage('English')}
                >
                    <Text style={styles.languageText}>Select English Language</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.languageButton,
                        selectedLanguage === 'Odia' && styles.selected,
                    ]}
                    onPress={() => setSelectedLanguage('Odia')}
                >
                    <Text style={styles.languageText}>ଓଡ଼ିଆ ଭାଷା ଚୟନ କରନ୍ତୁ</Text>
                </TouchableOpacity>

                <LinearGradient
                    colors={['#FFA726', '#F06292']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ marginTop: 20, backgroundColor: '#341551', borderRadius: 10 }}
                >
                    <TouchableOpacity
                        onPress={() => saveLanguage()}
                        style={{ alignItems: 'center', paddingVertical: 15, paddingHorizontal: 45 }}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Submit</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>
        </View>
    );
};

export default LanguageSelection;

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#f4faff',
    },
    header: {
        backgroundColor: '#341551',
        paddingTop: 60,
        paddingBottom: 30,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'FiraSans-SemiBold',
    },
    container: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    languageButton: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 12,
        width: '80%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    languageText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    selected: {
        backgroundColor: '#deceed',
        borderColor: '#341551',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#4a90e2',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
