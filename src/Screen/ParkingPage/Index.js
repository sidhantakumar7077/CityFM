import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const parkingList = [
    {
        id: '1',
        parking_name: 'Gadadhar High School',
        parking_address: 'Gadadhar High School, Puri, Odisha 752001',
        image: 'https://m.media-amazon.com/images/I/61fkw6pmIvL._AC_UF1000,1000_QL80_.jpg',
        map_url: 'https://maps.app.goo.gl/HFmFrzQHVSNBAzhp6'
    },
    {
        id: '2',
        parking_name: 'Barabati Kalyani Mandap',
        parking_address: 'Barabati Kalyani Mandap, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://m.media-amazon.com/images/I/61fkw6pmIvL._AC_UF1000,1000_QL80_.jpg',
        map_url: 'https://maps.app.goo.gl/vH465ENw5tS48ZB49'
    },
    {
        id: '3',
        parking_name: 'Loknath Temple Parking',
        parking_address: 'Temple Parking, Jibaramjee Palli, Loknath Temple Rd, Puri, Odisha 752001',
        image: 'https://m.media-amazon.com/images/I/61fkw6pmIvL._AC_UF1000,1000_QL80_.jpg',
        map_url: 'https://maps.app.goo.gl/HUVPZtz6bXJAH2Fb6'
    }
];

const ParkingList = () => {
    
    const navigation = useNavigation();

    const openMap = (url) => {
        Linking.openURL(url);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.parking_name}</Text>
                <Text style={styles.address}>{item.parking_address}</Text>
            </View>
            <TouchableOpacity style={styles.directionButton} onPress={() => openMap(item.map_url)}>
                <FontAwesome5 name="directions" size={22} color="white" />
                <Text style={styles.directionText}>Go</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Gradient Header Section */}
            <LinearGradient colors={['#4B7100', '#2E4D00']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Parking Area</Text>
            </LinearGradient>

            {/* Parking List */}
            <FlatList
                data={parkingList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default ParkingList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    /* Header Styles */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        elevation: 8,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    /* List Styles */
    listContainer: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 12,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
    directionButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
    },
    directionText: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
    },
});
