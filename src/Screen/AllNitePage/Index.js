import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

const nitiTimings = [
    { name: 'ABHIJIT MUHURTA', status: 'Completed', time: '12:14 PM', relativeTime: 'soon' },
    { name: 'AMRIT KALA', status: 'Completed', time: '09:00 PM', relativeTime: 'in 8 hours' },
    { name: 'YAMAGANDA KALA', status: 'Running', time: '08:15 AM', relativeTime: '3 hours ago' },
    { name: 'GULIKA KALA', status: 'Upcoming', time: '11:10 AM', relativeTime: '1 hour ago' },
    { name: 'RAHU KALA', status: 'Upcoming', time: '02:05 PM', relativeTime: 'in 1 hour' },
];

// Function to determine the color based on status
const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return '#4B7100';
        case 'Running': return '#E99C00';
        case 'Upcoming': return '#999';
        default: return '#999';
    }
};

const Index = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <LinearGradient colors={['#4B7100', '#2E4D00']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Niti Timings</Text>
            </LinearGradient>

            {/* Niti List */}
            <FlatList
                data={nitiTimings}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                    const statusColor = getStatusColor(item.status);
                    return (
                        <View style={styles.nitiItem}>
                            {/* Status Indicator */}
                            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />

                            {/* Niti Details */}
                            <View style={styles.nitiDetails}>
                                <Text style={[styles.nitiName, { color: statusColor }]}>{item.name}</Text>
                                <Text style={styles.nitiTime}>
                                    <Text style={styles.nitiStatus}>{item.status} </Text>
                                    {item.relativeTime} at {item.time}
                                </Text>
                            </View>

                            {/* Bell Icon for Upcoming Niti Only */}
                            {item.status === 'Upcoming' && (
                                <MaterialIcons name="notifications-none" size={20} color="#999" />
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
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
    /* List Item Styles */
    nitiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statusIndicator: {
        width: 5,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    nitiDetails: {
        flex: 1,
    },
    nitiName: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    nitiTime: {
        fontSize: 13,
        color: '#666',
    },
    nitiStatus: {
        fontWeight: 'bold',
        color: '#333',
    },
});
