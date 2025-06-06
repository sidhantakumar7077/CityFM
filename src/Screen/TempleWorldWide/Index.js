import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Linking, ScrollView, Animated, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

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

    const countries = ['India', 'Nepal', 'Thailand'];
    const templeData = {
        India: [
            { id: '1', name: 'Jagannath Temple', location: 'Puri, Odisha' },
            { id: '2', name: 'Kedarnath Temple', location: 'Uttarakhand' },
        ],
        Nepal: [
            { id: '3', name: 'Pashupatinath Temple', location: 'Kathmandu' },
        ],
        Thailand: [
            { id: '4', name: 'Wat Arun', location: 'Bangkok' },
        ],
    };

    const [selectedCountry, setSelectedCountry] = useState('India');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: isScrolled ? 1 : 0.8 }]}>
                <LinearGradient
                    colors={isScrolled ? ['#341551', '#341551'] : ['transparent', 'transparent']}
                    style={styles.gradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContent}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                        <Text style={styles.headerText}>Temple World Wide</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>

            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
            >
                {/* Header Image Section */}
                <View style={styles.headerContainer}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 40,
                        paddingHorizontal: 15
                    }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-SemiBold' }}>
                                Temples World Wide
                            </Text>
                            <Text style={{ color: '#ddd', fontSize: 13, marginTop: 6, fontFamily: 'FiraSans-Regular' }}>
                                Select a country to explore popular temples around the world.
                            </Text>

                            <TouchableOpacity
                                style={{
                                    marginTop: 12,
                                    backgroundColor: '#fff',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    borderRadius: 6,
                                    alignSelf: 'flex-start',
                                }}
                            >
                                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-SemiBold' }}>Book Online →</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '22%', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/image/mainLogo.png')}
                                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                            />
                        </View>
                    </View>
                </View>

                {/* Country Selector */}
                <View style={{
                    marginTop: 20,
                    marginHorizontal: 15,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                }}>
                    <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'FiraSans-SemiBold', color: '#341551' }}>{selectedCountry}</Text>
                        <MaterialIcons name={dropdownVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#341551" />
                    </TouchableOpacity>

                    {dropdownVisible && (
                        <View style={{ marginTop: 10 }}>
                            {/* Search Input */}
                            <View style={{
                                backgroundColor: '#f3f3f3',
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                borderRadius: 6,
                                marginBottom: 10,
                            }}>
                                <TextInput
                                    placeholder="Search Country..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    style={{
                                        fontSize: 14,
                                        color: '#333',
                                        fontFamily: 'FiraSans-Regular'
                                    }}
                                    placeholderTextColor="#aaa"
                                />
                            </View>

                            {/* Filtered Country List */}
                            {countries
                                .filter((country) => country.toLowerCase().includes(searchText.toLowerCase()))
                                .map((country) => (
                                    <TouchableOpacity
                                        key={country}
                                        onPress={() => {
                                            setSelectedCountry(country);
                                            setDropdownVisible(false);
                                            setSearchText('');
                                        }}
                                        style={{ paddingVertical: 6 }}
                                    >
                                        <Text style={{ fontSize: 14, color: '#555', fontFamily: 'FiraSans-Regular' }}>{country}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    )}

                </View>

                {/* Temples Listing */}
                <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'FiraSans-SemiBold', marginBottom: 12, color: '#341551' }}>
                        Temples in {selectedCountry}
                    </Text>

                    {templeData[selectedCountry].map((temple) => (
                        <View
                            key={temple.id}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                padding: 15,
                                marginBottom: 12,
                                elevation: 2,
                                shadowColor: '#000',
                                shadowOpacity: 0.05,
                                shadowRadius: 3,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <MaterialIcons name="temple-buddhist" size={28} color="#D64C64" style={{ marginRight: 12 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#341551' }}>{temple.name}</Text>
                                <Text style={{ fontSize: 13, color: '#777', marginTop: 2 }}>{temple.location}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Index

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
        paddingVertical: 12,
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
        fontSize: 16,
        fontFamily: 'FiraSans-Regular',
        color: 'white',
        textTransform: 'capitalize'
    },
    headerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#341551',
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
})