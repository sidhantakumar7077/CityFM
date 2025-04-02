import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";

const Index = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/image/ratha.jpeg')} style={styles.background}>
                {/* Gradient Overlay */}
                <LinearGradient colors={['transparent', '#FFBE00']} style={styles.gradient} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    {/* Top Header */}
                    <View style={{
                        position: "absolute",
                        top: 5,
                        // left: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={{
                                width: 70,
                                height: 70,
                                resizeMode: "contain",
                            }} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#c91306', padding: 7, borderRadius: 50, marginRight: 7 }}>
                            <Ionicons name="home-sharp" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 120, left: 10, right: 0, bottom: 0, width: '50%' }}>
                        <Text style={{ color: '#341551', fontSize: 14, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginBottom: -2 }}>Welcome to</Text>
                        <Text style={styles.liveTitle}>Shree Mandira Channel</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 280, width: '90%', alignItems: 'center', borderRadius: 10 }}>
                        <YoutubePlayer
                            width={'100%'}
                            height={200}
                            autoPlay={true}
                            play={true}
                            videoId={'TK8TkDG056I'}
                        />
                    </View>
                    <View style={styles.liveCard}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ width: '49%' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ContentList')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 12 }}>
                                        <Entypo name="mic" size={20} color="#FFA726" />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#FFA726' }}>Podcast</Text>
                                </View>
                            </View>
                            <LinearGradient
                                colors={['#FFA726', '#F06292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ backgroundColor: 'red', height: 49, width: 1.4, marginRight: 7 }}
                            />
                            <View style={{ width: '50%' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('LivePage')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                        {/* <Icon name="live-tv" size={24} color="#F06292" /> */}
                                        <Image source={require('../../assets/image/radio214142.png')} style={{ width: 25, height: 25 }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#F06292' }}>Radio</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 20,
        overflow: 'hidden',
        padding: 10,
    },
    /* Header Styles */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4B7100',
        paddingVertical: 15,
        paddingHorizontal: 15,
        elevation: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    /* Background image container */
    background: {
        flex: 1,
        borderRadius: 30,
        overflow: 'hidden',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    menuHeader: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        top: 0,
        // right: 20,
        padding: 8,
        borderRadius: 10,
    },
    content: {
        alignItems: 'center',
        position: 'absolute',
        top: '23%',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        // backgroundColor: 'rgba(59, 58, 58, 0.5)',
        // borderRadius: 150,
    },
    podcastCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
    },
    podcastCardBackground: {
        width: '90%',
        borderRadius: 15,
        padding: 4, // Creates a border effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8, // For Android shadow
    },
    podcastCard: {
        // backgroundColor: '#fff', // White Background for Contrast
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    podcastHeading: {
        fontSize: 19,
        fontWeight: '700',
        color: '#341551', // Vibrant Accent Color
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginTop: 10
    },
    podcastDescription: {
        fontSize: 13,
        color: '#341551',
        textAlign: 'center',
        fontFamily: 'FiraSans-Regular',
        marginTop: 6,
    },
    playerContainer: {
        backgroundColor: '#341551',
        paddingHorizontal: 20,
        // paddingVertical: 30,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
        position: 'absolute',
        bottom: 160,
        elevation: 5, // Shadow for depth
    },
    liveBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFBE00',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    liveCard: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    liveTitle: {
        fontSize: 20,
        fontFamily: "FiraSans-SemiBold",
        color: "#341551",
    },
});
