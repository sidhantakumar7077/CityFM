import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ThroughTheAges = () => {

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
                <ImageBackground source={require("../../assets/image/through_the_ages.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
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
                    <Text style={styles.title}>Legendary Origin</Text>

                    <Text style={styles.paragraph}>
                        The legendary origin of Puri and the shrine of <Text style={styles.highlight}>Purushottama</Text> is vividly described in the <Text style={styles.highlight}>Brahma Purana</Text>, <Text style={styles.highlight}>Narada Purana</Text>, and <Text style={styles.highlight}>Utkal Khanda</Text> (Purushottama Mahatmya) of the <Text style={styles.highlight}>Skanda Purana</Text>, with the latter being the most detailed.
                    </Text>

                    <Text style={styles.paragraph}>
                        According to the <Text style={styles.highlight}>Skanda Purana</Text>, during the <Text style={styles.highlight}>Satya Yuga</Text>, King Indradyumna ruled Malava and was a great devotee of Lord Vishnu. Upon learning from priests and pilgrims about a divine site on the shores of the South Sea where a sapphire image of <Text style={styles.highlight}>Vasudeva</Text> was worshipped by the <Text style={styles.highlight}>Sabaras</Text> (tribal people), he sent <Text style={styles.highlight}>Vidyapati</Text> to locate the site.
                    </Text>

                    <Text style={styles.paragraph}>
                        Vidyapati met <Text style={styles.highlight}>Viswabasu</Text>, the Sabara chief, who initially hesitated but later—remembering a prophecy—led him to the deity <Text style={styles.highlight}>Nilamadhava</Text>. There, Vidyapati had divine darshan and also witnessed <Text style={styles.highlight}>Rohini Kunda</Text> and the sacred <Text style={styles.highlight}>Kalpabata</Text> (divine banyan tree).
                    </Text>

                    <Text style={styles.paragraph}>
                        Hearing this, the King visited the site with his entourage. <Text style={styles.highlight}>Narada</Text>, sent by <Text style={styles.highlight}>Brahman</Text>, joined them. It was divinely ordained that Vishnu would conceal the image of Nilamadhava and manifest as <Text style={styles.highlight}>Purushottama</Text> in a wooden form.
                    </Text>

                    <Text style={styles.paragraph}>
                        After performing <Text style={styles.highlight}>a thousand Ashwamedha Yajnas</Text>, a sacred log appeared on the seashore. Guided by <Text style={styles.highlight}>Narada</Text>, the King brought it to the <Text style={styles.highlight}>Mahavedi</Text>. Lord Vishnu, disguised as a carpenter, carved the images. These were wrapped in silk, painted in sacred colors, and enshrined near Kalpabata in a new temple built by the King.
                    </Text>

                    <Text style={styles.paragraph}>
                        Later, the King visited <Text style={styles.highlight}>Brahmaloka</Text> with Narada, while <Text style={styles.highlight}>Brahman</Text> came to consecrate the temple. The Lord’s images were installed, and the King initiated daily and festive rituals as per divine instructions.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ThroughTheAges

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