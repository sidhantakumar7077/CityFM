import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const parkingList = [
    {
        id: '1',
        parking_name: 'Purushottam Bhakta Nivas',
        parking_address: 'Near Old Jail , Puri',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/11_1668840715.jpg',
        map_url: 'https://maps.app.goo.gl/HFmFrzQHVSNBAzhp6'
    },
    {
        id: '2',
        parking_name: 'Neeladri Bhakta Nivas',
        parking_address: 'Near Town Police Station, Grand Road, Puri',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/bhsl1_1668837595.jpg',
        map_url: 'https://maps.app.goo.gl/vH465ENw5tS48ZB49'
    },
    {
        id: '3',
        parking_name: 'Nilachala Bhakta And Yatri Nivas',
        parking_address: 'In front of Town Police Station, Grand Road, Puri',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/22_1668840168.jpg',
        map_url: 'https://maps.app.goo.gl/HUVPZtz6bXJAH2Fb6'
    },
    {
        id: '4',
        parking_name: 'Shree Gundicha Bhakta Nivas',
        parking_address: 'Near Shree Gundicha Temple, Grand Road, Puri',
        image: 'https://admin.stayatpurijagannatha.in/images/hotels/nsl1_1668836524.jpg',
        map_url: 'https://maps.app.goo.gl/vH465ENw5tS48ZB49'
    },
];

const Index = () => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const navigation = useNavigation();

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsScrolled(offsetY > 50); // Change header color after 50px scroll
            }
        }
    );

    const openMap = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#4B7100', '#2E4D00'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>Back</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Header Image */}
                <View style={styles.headerContainer}>
                    <ImageBackground source={require('../../assets/image/mangala_alati.jpg')} style={styles.headerImage} />
                </View>
                {/* Parking List */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={parkingList}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    keyExtractor={(key) => {
                        return key.id
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => openMap(item.map_url)} style={styles.bhaktanibasbox}>
                                {/* Image Section */}
                                <Image source={{ uri: item.image }} style={styles.bhaktanibasImage} />

                                {/* Details Section */}
                                <View style={{ padding: 10 }}>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>{item.parking_name}</Text>

                                    {/* Address */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <MaterialIcons name="location-on" size={18} color="#555" />
                                        <Text style={{ color: '#555', fontSize: 13, marginLeft: 5 }}>{item.parking_address}</Text>
                                    </View>

                                    {/* Email */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <MaterialIcons name="email" size={16} color="#555" />
                                        <Text style={{ color: '#555', fontSize: 13, marginLeft: 5 }}>Demo@gmail.com</Text>
                                    </View>

                                    {/* Phone */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <FontAwesome name="phone" size={16} color="#555" />
                                        <Text style={{ color: '#555', fontSize: 13, marginLeft: 5 }}>+91 9876543210</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF5F5',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Lora-Bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    headerContainer: {
        width: '100%', // Match with `panchangaBox`
        height: 200,
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden', // Ensures the image does not bleed outside the rounded corners
    },
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4B7100',
    },
    /* List Styles */
    bhaktanibasbox: {
        backgroundColor: '#fff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
        padding: 10
    },
    bhaktanibasImage: {
        height: 140,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
});
