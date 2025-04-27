import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity, Alert, Image, Pressable, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DrawerModal = ({ visible, onClose, loadLanguageForHomePage }) => {

    const navigation = useNavigation()
    const [languageModalVisible, setLanguageModalVisible] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                setSelectedLanguage(value);
                console.log("Selected Language:", value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

    const saveLanguage = async (language) => {
        try {
            await AsyncStorage.setItem('selectedLanguage', language);
            setSelectedLanguage(language);
            setLanguageModalVisible(false);
            loadLanguageForHomePage(); // Reload the language after saving
        } catch (error) {
            console.log('Error saving language to storage:', error);
        }
    };

    return (
        <View>
            <Modal
                visible={visible}
                animationType="none"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={styles.variantModalContainer}>
                            <View style={{ width: '100%', height: 80, backgroundColor: '#341551' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, height: '100%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Image style={{ height: 70, width: 60, borderRadius: 50 }} source={require('../assets/image/SJDlogo.png')} resizeMode='contain' />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, color: '#fff', marginLeft: 5, fontFamily: 'FiraSans-SemiBold' }}>Shree Jagannatha</Text>
                                            <Text style={{ fontSize: 18, color: '#fff', marginLeft: 5, fontFamily: 'FiraSans-SemiBold' }}>Dham</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.drawerCell} onPress={() => { navigation.navigate('Privacy_policy'), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="user-lock" size={22} color="#341551" />
                                </View>
                                <Text style={styles.drawerLable}>Privacy & Policy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0.5 }]} onPress={() => { setLanguageModalVisible(true), onClose() }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="language" size={22} color="#341551" />
                                </View>
                                <Text style={styles.drawerLable}>Language</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0.5 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Language Select Modal */}
            <Modal
                visible={languageModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setLanguageModalVisible(false)}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}>
                        <TouchableWithoutFeedback>
                            <View style={{
                                width: '100%',
                                maxWidth: 360,
                                backgroundColor: '#fff',
                                borderRadius: 16,
                                padding: 25,
                                paddingTop: 40,
                                shadowColor: '#000',
                                shadowOpacity: 0.2,
                                shadowRadius: 10,
                                shadowOffset: { width: 0, height: 5 },
                                elevation: 10,
                                position: 'relative',
                            }}>

                                {/* Close Button */}
                                <TouchableOpacity
                                    onPress={() => setLanguageModalVisible(false)}
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        backgroundColor: '#f2f2f2',
                                        borderRadius: 20,
                                        padding: 6,
                                        elevation: 4,
                                    }}
                                >
                                    <Ionicons name="close" size={22} color="#333" />
                                </TouchableOpacity>

                                {/* Modal Title */}
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: '700',
                                    color: '#222',
                                    textAlign: 'center',
                                    marginBottom: 20,
                                }}>
                                    Select Language
                                </Text>

                                {/* English Language Option */}
                                <TouchableOpacity
                                    onPress={() => saveLanguage('English')}
                                    style={{
                                        backgroundColor: selectedLanguage === 'English' ? '#F06292' : '#f2f2f2',
                                        paddingVertical: 14,
                                        borderRadius: 10,
                                        marginBottom: 15,
                                        alignItems: 'center',
                                    }}
                                    activeOpacity={0.85}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        color: selectedLanguage === 'English' ? '#fff' : '#000',
                                        fontWeight: '600',
                                    }}>
                                        English
                                    </Text>
                                </TouchableOpacity>

                                {/* Odia Language Option */}
                                <TouchableOpacity
                                    onPress={() => saveLanguage('Odia')}
                                    style={{
                                        backgroundColor: selectedLanguage === 'Odia' ? '#F06292' : '#f2f2f2',
                                        paddingVertical: 14,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                    }}
                                    activeOpacity={0.85}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        color: selectedLanguage === 'Odia' ? '#fff' : '#000',
                                        fontWeight: '600',
                                    }}>
                                        ଓଡ଼ିଆ
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    )
}

export default DrawerModal

const styles = StyleSheet.create({
    variantModalContainer: {
        width: '70%',
        height: '75%',
        left: 0,
        top: 0,
        backgroundColor: '#341551',
        // bottom: 0,
        position: 'absolute',
        alignSelf: 'center',
    },
    drawerCell: {
        width: '100%',
        height: 58,
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        marginTop: 0.6,
    },
    drawerLable: {
        color: '#000',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.6,
        marginLeft: 15
    }
})