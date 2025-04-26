import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity, Alert, Image, Pressable, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const DrawerModal = ({ visible, onClose }) => {

    const navigation = useNavigation()

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
                            <TouchableOpacity style={[styles.drawerCell, { marginTop: 0 }]}>
                            </TouchableOpacity>
                        </View>
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