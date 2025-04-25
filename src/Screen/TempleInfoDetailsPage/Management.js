import { StyleSheet, SafeAreaView, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Management = () => {

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
                <ImageBackground source={require("../../assets/image/management.jpg")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
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
                    <Text style={styles.subtitle}>A Sacred Chronicle of Stewardship</Text>

                    <Text style={styles.paragraph}>
                        The affairs of Shree Jagannatha Temple have been guided with deep devotion across centuries, beginning with the Hindu dynasties of Odisha who venerated Mahaprabhu as their <Text style={styles.highlight}>State Deity</Text>.
                    </Text>

                    <Text style={styles.heading}>🏰 Ganga Dynasty (12th Century)</Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.highlight}>Chodaganga Deva</Text>, the great monarch, constructed the present-day temple and laid the foundation of a strong administration. His successor, <Text style={styles.highlight}>Anangabhima Deva III</Text>, introduced the <Text style={styles.highlight}>Chhatisa Nijog</Text> (36 temple servitor groups) and instituted many rituals and festivals. These acts were recorded in the sacred chronicle <Text style={styles.highlight}>Madala Panji</Text>.
                    </Text>

                    <Text style={styles.heading}>🌞 Suryavamsi Rule</Text>
                    <Text style={styles.paragraph}>
                        The Suryavamsi kings were devout patrons who donated lavishly to the temple and ensured that the <Text style={styles.highlight}>nitis (rituals)</Text> were observed strictly and on time.
                    </Text>

                    <Text style={styles.heading}>⚔️ Decline of Hindu Power & Afghan Invasion (1568 A.D.)</Text>
                    <Text style={styles.paragraph}>
                        After the fall of King <Text style={styles.highlight}>Mukunda Deva</Text>, Odisha came under Afghan control. The infamous Kalapahad desecrated the temple. A dark phase in temple history.
                    </Text>

                    <Text style={styles.heading}>🛡️ Bhoi Dynasty Revival</Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.highlight}>Rama Chandra Deva I</Text> revived the sanctity by recovering the <Text style={styles.highlight}>Brahma Padartha</Text> and reinstalled the deities in 1575 A.D. He performed the <Text style={styles.highlight}>Nabakalebara</Text> and resumed sacred rituals. Under Mughal rule, he was officially declared temple Superintendent.
                    </Text>

                    <Text style={styles.heading}>🕉️ Maratha Rule (1751 A.D. onward)</Text>
                    <Text style={styles.paragraph}>
                        The Marathas took direct control, appointing <Text style={styles.highlight}>Parichas</Text> for day-to-day management. Though the Rajas of Khurda retained symbolic authority, the temple came under full Maratha supervision.
                    </Text>

                    <Text style={styles.heading}>🇬🇧 British Era (1803 Onward)</Text>
                    <Text style={styles.paragraph}>
                        The British respected temple sanctity and reinstated the <Text style={styles.highlight}>Raja of Khurda</Text> as manager. Despite their Christian faith, they carefully maintained the traditions and granted annual funds (~Rs. 53,000) for temple upkeep. Special attention was given to property management and pilgrim tax utilization.
                    </Text>

                    <Text style={styles.heading}>👑 Queen Suryamani’s Stewardship (1860–1897)</Text>
                    <Text style={styles.paragraph}>
                        Queen <Text style={styles.highlight}>Suryamani</Text> managed Shreemandira for over 33 years (excluding 1875–78), maintaining rituals, financial integrity, and legacy—leaving a lasting impact on the temple’s heritage.
                    </Text>

                    <Text style={styles.paragraph}>
                        By 1889, under colonial administration, a <Text style={styles.highlight}>Deputy Magistrate</Text> was appointed as Temple Manager, further institutionalizing the temple's administration until 1926.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Management

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