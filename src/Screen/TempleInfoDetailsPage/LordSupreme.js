import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LordSupreme = () => {

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
                <ImageBackground source={require("../../assets/image/lord_supreme.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
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

                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <Text style={styles.title}>Shree Kshetra</Text>
                    <Text style={styles.subtitle}>The Sacred Heart of Puri, Where Divinity Embraces the Earth</Text>

                    <Text style={styles.paragraph}>
                        Nestled along the sun-kissed shores of Odisha’s Bay of Bengal lies Puri—revered as Shreekshetra, the holiest of holy lands.
                        This ancient pilgrimage site isn’t just a destination; it’s the eternal abode of Lord Jagannath, the Supreme Divine, whose presence
                        transforms Puri into a living embodiment of sacredness.
                    </Text>

                    <Text style={styles.paragraph}>
                        Known in scriptures as <Text style={styles.highlight}>Purushottama-kshetra</Text> (Land of the Supreme Being), Puri derives its name
                        from Lord Jagannath Himself, referred to as Purushottama in texts like the <Text style={styles.highlight}>Skanda Purana</Text> and
                        <Text style={styles.highlight}> Brahma Purana</Text>. These ancient scriptures declare Puri to be the Lord’s own “body” (Bapuh), a
                        divine manifestation where He dwells in a tangible, awe-inspiring form.
                    </Text>

                    <Text style={styles.heading}>A Pilgrimage Beyond Compare</Text>
                    <Text style={styles.paragraph}>
                        Puri shines as one of India’s four sacred <Text style={styles.highlight}>Dhams</Text> established by Adi Shankaracharya. Yet, it holds a unique distinction:
                        his foremost disciple <Text style={styles.highlight}>Padmapada</Text> was installed here to lead the Shree Goverdhan Peeth.
                    </Text>

                    <Text style={styles.heading}>A Universe of Sacred Geography</Text>
                    <Text style={styles.paragraph}>
                        The <Text style={styles.highlight}>Brahma Purana</Text> describes Purushottama-kshetra as a 90-mile-long, 10-mile-wide land guarded by divine sentinels:
                    </Text>
                    <Text style={styles.bullets}>• Ashta-Shivas (eight forms of Shiva)</Text>
                    <Text style={styles.bullets}>• Ashta-Shakti (eight forms of the Goddess)</Text>
                    <Text style={styles.bullets}>• Ashta-Mahaveer (eight forms of Hanuman)</Text>

                    <Text style={styles.paragraph}>
                        Sacred sites include five holy waters, rishi ashrams, and monastic legacies of great acharyas like Adi Shankaracharya and Ramanujacharya.
                    </Text>

                    <Text style={styles.heading}>Names That Echo Divinity</Text>
                    <Text style={styles.bullets}>• Shankha-kshetra – shaped like a conch</Text>
                    <Text style={styles.bullets}>• Neelachala – the “Blue Mountain”</Text>
                    <Text style={styles.bullets}>• Martya-Vaikuntha – Heaven on Earth</Text>

                    <Text style={styles.heading}>A Living Testament to Unity</Text>
                    <Text style={styles.paragraph}>
                        The <Text style={styles.highlight}>Skanda Purana</Text> proclaims: “Though the Lord is omnipresent, here He resides in a visible Form.”
                    </Text>
                    <Text style={[styles.paragraph, { marginBottom: 20 }]}>
                        From Vedic roots to timeless rituals, Shreekshetra remains a beacon of Sanatana Dharma, where the Lord of the Universe welcomes all into His eternal embrace.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LordSupreme;

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
});
