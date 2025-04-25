import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const RathaYatra = () => {

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
                <ImageBackground source={require("../../assets/image/rathayatra.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
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
                    <Text style={styles.title}>Ratha Yatra</Text>
                    <Text style={styles.subtitle}>The Divine Journey of the Lord on His Celestial Chariot</Text>

                    <Text style={styles.paragraph}>
                        As per the <Text style={styles.highlight}>Skanda Purana</Text>, among all the twelve Yatras of Shree Jagannatha, the <Text style={styles.highlight}>Ratha Yatra</Text> or <Text style={styles.highlight}>Shree Gundicha Yatra</Text> is regarded as the most important and celebrated.
                    </Text>

                    <Text style={styles.paragraph}>
                        According to the sacred <Text style={styles.highlight}>Bamadev Samhita</Text>, those who witness the four deities seated on the <Text style={styles.highlight}>Simhasana</Text> (sacred throne) at the Gundicha Temple for a week will attain eternal residence in <Text style={styles.highlight}>Baikuntha</Text> (Heaven), along with their ancestors.
                    </Text>

                    <Text style={styles.paragraph}>
                        Even those who merely <Text style={styles.highlight}>hear about</Text> this great festival are said to receive divine blessings. And those who <Text style={styles.highlight}>study and share the rituals</Text> with others are believed to secure a sacred place in the Lord’s eternal abode.
                    </Text>

                    <Text style={styles.paragraph}>
                        This magnificent <Text style={styles.highlight}>Ratha Yatra</Text> takes place on the <Text style={styles.highlight}>2nd day of the bright fortnight of Ashadha</Text>, marking Lord Jagannatha’s auspicious journey to the <Text style={styles.highlight}>Gundicha Temple</Text> for the welfare of all mankind.
                    </Text>

                    <Text style={styles.paragraph}>
                        The <Text style={styles.highlight}>Skanda Purana</Text> glorifies this occasion, declaring that no celebration of Mahaprabhu is as spiritually significant as this. Shree Hari, the Supreme Lord of the Universe, embarks joyfully upon His divine chariot, fulfilling His celestial vow.
                    </Text>

                    <Text style={styles.paragraph}>
                        The chariot itself is believed to be the manifestation of <Text style={styles.highlight}>Sandhini Shakti</Text> — the cosmic energy of presence. A mere <Text style={styles.highlight}>touch of the chariot</Text> grants divine grace to the devotee.
                    </Text>

                    <Text style={[styles.paragraph, { fontStyle: 'italic', textAlign: 'center', fontWeight: '600', marginVertical: 10, color: '#D64C64' }]}>
                        “Ratha tu Vāmanam dṛṣṭvā punarjanma na vidyate.”{'\n'}
                        — One who beholds the Lord on His chariot shall never be born again.
                    </Text>

                    <Text style={styles.paragraph}>
                        Ratha Yatra is not just a festival; it is a sacred moment of communion — when the divine meets the mortal, and love rolls through the streets of Puri on massive wooden wheels.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RathaYatra

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