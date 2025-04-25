import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Festivals = () => {

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
                <ImageBackground source={require("../../assets/image/festival.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
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
                    <Text style={styles.title}>Festivals</Text>
                    <Text style={styles.subtitle}>The Dvādaśa Yātras of Shree Jagannatha</Text>

                    <Text style={styles.paragraph}>
                        Ancient Sanskrit scriptures like the <Text style={styles.highlight}>Brahma Purana</Text> and <Text style={styles.highlight}>Skanda Purana</Text> describe twelve principal festivals observed annually at the sacred Shree Jagannatha Temple. These are known as the <Text style={styles.highlight}>Dvādaśa Yātras</Text>—"Twelve Great Celebrations."
                    </Text>

                    <Text style={styles.heading}>The Twelve Festivals:</Text>
                    <Text style={styles.bullets}>1. <Text style={styles.highlight}>Snana Yatra</Text> – The ceremonial bathing of the deities.</Text>
                    <Text style={styles.bullets}>2. <Text style={styles.highlight}>Ratha Yatra</Text> – The grand chariot procession.</Text>
                    <Text style={styles.bullets}>3. <Text style={styles.highlight}>Sayana Yatra</Text> – The divine sleeping ceremony.</Text>
                    <Text style={styles.bullets}>4. <Text style={styles.highlight}>Uttarayana</Text> – The journey toward the northern solstice.</Text>
                    <Text style={styles.bullets}>5. <Text style={styles.highlight}>Dakshinayana</Text> – The journey toward the southern solstice.</Text>
                    <Text style={styles.bullets}>6. <Text style={styles.highlight}>Parsva Parivartana</Text> – Changing the Lord’s divine posture.</Text>
                    <Text style={styles.bullets}>7. <Text style={styles.highlight}>Utthapana</Text> – Awakening from divine slumber.</Text>
                    <Text style={styles.bullets}>8. <Text style={styles.highlight}>Pravarana</Text> – Wrapping the Lord with sacred coverings.</Text>
                    <Text style={styles.bullets}>9. <Text style={styles.highlight}>Pushyabhiseka</Text> – The royal coronation ceremony.</Text>
                    <Text style={styles.bullets}>10. <Text style={styles.highlight}>Dola Yatra</Text> – The divine swing festival.</Text>
                    <Text style={styles.bullets}>11. <Text style={styles.highlight}>Damanaka Bhanjana</Text> – Breaking the sacred Damanaka plant.</Text>
                    <Text style={styles.bullets}>12. <Text style={styles.highlight}>Akshaya Tritiya</Text> – The start of Chandan Yatra.</Text>

                    <Text style={styles.paragraph}>
                        In addition to these, there is a significant festival known as <Text style={styles.highlight}>Neeladri Mahodaya</Text>, regarded as the <Text style={styles.highlight}>"trayodasha yatra"</Text> (13th festival). It beautifully affirms the popular saying:
                    </Text>

                    <Text style={[styles.paragraph, { fontStyle: 'italic', textAlign: 'center', fontWeight: '600', marginVertical: 10, color: '#D64C64' }]}>
                        “Thirteen festivals are there in twelve months.”
                    </Text>

                    <Text style={styles.paragraph}>
                        These festivals not only mark seasonal shifts and cosmological transitions but also symbolize the dynamic presence of the Lord in devotees’ lives throughout the year.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Festivals

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