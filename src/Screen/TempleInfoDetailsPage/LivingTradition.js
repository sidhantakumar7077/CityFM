import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LivingTradition = () => {

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
                <ImageBackground source={require("../../assets/image/living_tradition.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
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
                    <Text style={styles.title}>Living Tradition</Text>
                    <Text style={styles.subtitle}>The Eternal Rhythm of Rituals at Shree Jagannatha Temple</Text>

                    <Text style={styles.paragraph}>
                        The daily and periodical rituals observed and performed in His service and worship since time immemorial bear the dignity and grandeur befitting a Supreme Being. These sacred acts are not just religious customs—they are a living legacy of devotion and discipline.
                    </Text>

                    <Text style={styles.paragraph}>
                        The ritual system of the temple is vast and intricate, involving a multitude of <Text style={styles.highlight}>Sevakas (servitors)</Text>. These rituals are known as <Text style={styles.highlight}>Nitis</Text> in temple tradition and are broadly categorized into:
                    </Text>

                    <Text style={styles.bullets}>• Daily Nitis</Text>
                    <Text style={styles.bullets}>• Occasional (Periodical) Nitis</Text>
                    <Text style={styles.bullets}>• Festive Nitis</Text>

                    <Text style={styles.paragraph}>
                        The <Text style={styles.highlight}>daily Nitis</Text> are observed with clockwork precision, beginning at around <Text style={styles.highlight}>5:00 AM</Text> and continuing late into the night. Each servitor has a well-defined role and time, ensuring the ritualistic discipline is never broken.
                    </Text>

                    <Text style={styles.paragraph}>
                        From the <Text style={styles.highlight}>Mangala Aarti</Text> at dawn to the <Text style={styles.highlight}>Pahuda (retiring of the Lord)</Text> at night, the rituals reflect both the human and divine in constant harmony. These customs, rooted deeply in the scriptures, are passed down through generations of temple servitors.
                    </Text>

                    <Text style={styles.paragraph}>
                        This living tradition is not merely observed; it is experienced—a sacred choreography where faith, duty, and divine presence unite every single day within the walls of the Jagannatha Temple.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default LivingTradition

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