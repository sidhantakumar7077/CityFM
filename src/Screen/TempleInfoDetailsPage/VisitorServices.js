import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const VisitorServices = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/devotee.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#c91306', padding: 7, borderRadius: 50 }}>
                            <Ionicons name="home-sharp" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 100, width: '100%', left: 13 }}>
                        <View style={{ textAlign: 'center', marginLeft: 8 }}>
                            <Text style={{ color: '#d9dbdb', fontSize: 14, fontFamily: 'FiraSans-Regular', letterSpacing: 0.8 }}>Welcome to</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Jagannatha</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Temple Puri</Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Main Content */}
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <Text style={styles.title}>Temple Management</Text>
                    <Text style={styles.subtitle}>Darshan Timings & Devotee Flow</Text>

                    <Text style={styles.paragraph}>
                        The divine <Text style={styles.highlight}>Darshan of Shree Jagannatha Mahaprabhu</Text> is available almost throughout the day—from early morning until late night, with a few brief intervals during rituals and special occasions.
                    </Text>

                    <Text style={styles.heading}>🕰️ Daily Darshan Schedule</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>5:30 AM</Text> – Temple opens. After the <Text style={styles.highlight}>Mangal Arati</Text>, darshan is allowed from <Text style={styles.highlight}>Jagamohan (Bhitar Kaatha)</Text> till about <Text style={styles.highlight}>7:30 – 8:00 AM</Text>.</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>8:00 – 9:15 AM</Text> – Darshan paused for <Text style={styles.highlight}>Gopal Ballava Puja</Text>.</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>9:15 – 11:00 AM</Text> – Darshan from <Text style={styles.highlight}>Naatamandir (Baahaar Kaatha)</Text> until end of <Text style={styles.highlight}>Sakala Dhupa Puja</Text>.</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>11:00 AM – 1:00 PM</Text> – Darshan resumes up to <Text style={styles.highlight}>Jagamohan</Text> until completion of <Text style={styles.highlight}>Bhoga Mandap Puja</Text>.</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>2:00 – 5:30 PM</Text> – Darshan continues after <Text style={styles.highlight}>Madhyanha Dhupa</Text> up to <Text style={styles.highlight}>Sandhya Aalati</Text>.</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>8:00 – 9:00 PM</Text> – Final darshan window after <Text style={styles.highlight}>Sandhya Dhupa</Text> till <Text style={styles.highlight}>Chandan Laagi</Text>.</Text>

                    <Text style={styles.heading}>🚪 Entry & Exit Management</Text>

                    <Text style={styles.paragraph}>
                        To ensure a smooth and sacred experience, crowd control measures are in place:
                    </Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>Barricades</Text> are installed at the <Text style={styles.highlight}>Lion’s Gate</Text> (main entrance) and <Text style={styles.highlight}>Kirtan Chakadaa</Text> (inner courtyard).</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>Lion’s Gate</Text> is the sole entry point for devotees.</Text>

                    <Text style={styles.bullets}>• The <Text style={styles.highlight}>other three gates</Text> serve as exits.</Text>

                    <Text style={styles.bullets}>• <Text style={styles.highlight}>Officials, Sevaks, and Puri locals</Text> may enter through any gate upon showing valid ID proof.</Text>

                    <Text style={styles.paragraph}>
                        This management system ensures an organized and spiritually fulfilling experience for all pilgrims visiting the sacred abode of Mahaprabhu.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default VisitorServices

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    backgroundImage: {
        width: "100%",
        height: 300,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        position: "absolute",
        top: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        resizeMode: "contain",
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#341551',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#D64C64',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 15,
        textAlign: 'justify',
    },
    heading: {
        fontSize: 18,
        fontWeight: '700',
        color: '#341551',
        marginTop: 15,
        marginBottom: 8,
    },
    bullets: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
        marginBottom: 5,
    },
    highlight: {
        fontWeight: '600',
        color: '#8B0000',
    },
})