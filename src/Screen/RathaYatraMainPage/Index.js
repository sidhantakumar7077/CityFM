import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DrawerModal from "../../Component/DrawerModal";
import YoutubePlayer from "react-native-youtube-iframe";
import moment from "moment";
import { base_url } from "../../../App";

const Index = () => {

    const emergencyContacts = [
        { name: 'Police', odiaName: 'ପୋଲିସ', phone: '100' },
        { name: 'Ambulance', odiaName: 'ଆମ୍ବୁଲାନ୍ସ', phone: '108' },
        { name: 'Fire Service', odiaName: 'ଅଗ୍ନିଶମ ସେବା', phone: '101' },
        { name: 'Elder Person Helpline', odiaName: 'ବୟସ୍କ ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ହେଲ୍ପଲାଇନ୍', phone: '1090' },
        { name: 'Child Helpline', odiaName: 'ଶିଶୁଙ୍କ ପାଇଁ ହେଲ୍ପଲାଇନ୍', phone: '1098' },
        { name: 'Women Helpline', odiaName: 'ମହିଳାଙ୍କ ହେଲ୍ପଲାଇନ୍', phone: '1091' },
        { name: 'Life Guard', odiaName: 'ଲାଇଫ ଗାର୍ଡ', phone: '8260777771' },
        { name: 'National Highway Helpline', odiaName: 'ଜାତୀୟ ରାଜପଥ ହେଲ୍ପଲାଇନ୍', phone: '1033' },
    ];

    const doList = {
        en: [
            "Follow the Queue System for hassle free darshan of Deities.",
            "Respect ancient customs and usages while at Shree Jagannatha Temple and promote religious sentiments among co-pilgrims.",
            "Observe absolute silence inside the temple.",
            "Deposit your offerings in the Hundi and Branch Office inside the temple premises.",
            "Keep clean the premises of Shree Jagannatha Temple.",
            "Bath and wear clean clothes before you enter the shrine.",
            "Beware of Pickpocket and monkeys.",
        ],
        or: [
            "ଶ୍ରୀମନ୍ଦିରରେ ଶାନ୍ତି ଓ ସୁବ୍ୟବସ୍ଥିତ ଦର୍ଶନ ପାଇଁ ଶୃଙ୍ଖଳାବଦ୍ଧ ଭାବେ ଧାଡ଼ିରେ ଆସନ୍ତୁ।",
            "ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିରରେ ପ୍ରାଚୀନ ରୀତି ଓ ପ୍ରଥାକୁ ସମ୍ମାନ ଦିଅନ୍ତୁ ଏବଂ ସହ-ତୀର୍ଥଯାତ୍ରୀ ଭକ୍ତ ମଧ୍ୟରେ ଧାର୍ମିକ ଭାବନାକୁ ପ୍ରୋତ୍ସାହିତ କରନ୍ତୁ।",
            "ମନ୍ଦିର ଭିତରେ ପୂର୍ଣ୍ଣ ନିରବତା ପାଳନ କରନ୍ତୁ।",
            "ମନ୍ଦିର ପରିସରରେ ଥିବା ହୁଣ୍ଡି ଓ ଶାଖା କାର୍ଯ୍ୟାଳୟରେ ଆପଣଙ୍କର ଦାନ ଅର୍ପଣ କରନ୍ତୁ।",
            "ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ପରିସରକୁ ପରିଷ୍କାର ରଖନ୍ତୁ।",
            "ସ୍ନାନ ଓ  ଶୌଚ କରି ସଫା ପୋଷାକ ପିନ୍ଧି ମନ୍ଦିରରେ ପ୍ରବେଶ କରନ୍ତୁ।",
            "ପକେଟମାର ଓ ମାଙ୍କଡ଼ମାନଙ୍କଠାରୁ  ସତର୍କ ରୁହନ୍ତୁ।",
        ]
    };

    const dontList = {
        en: [
            "Do not Consume liquor or other intoxicants during Darshan of the Deities.",
            "Do not Eat non-vegetarian food.",
            "Do not Carry cooked food.",
            "Do not Encourage beggary.",
            "Do not Spit or commit nuisance.",
            "Do not Waste water.",
            "Do not Spit, urinate or defecate in the premises of temple.",
            "Do not Foot wear and leather items in and around the premises of the temple.",
            "Do not wear cap inside temple premises",
            "Do not Carry umbrella, mobile telephone, electronic gadgets, leather items etc.",
        ],
        or: [
            "ଦେବତାଙ୍କ ଦର୍ଶନ ସମୟରେ ମଦ ବା ଅନ୍ୟ କୋଣସି ମାଦକ ଦ୍ରବ୍ୟ ସେବନ କରିବା ନିଷିଦ୍ଧ।",
            "ମନ୍ଦିର ପରିସରକୁ ମାଂସାହାର କରି ଯିବା ନିଷିଦ୍ଧ।",
            "ମନ୍ଦିର ପରିସରକୁ ରନ୍ଧା ଖାଦ୍ୟ ନେଇଯିବା ନିଷିଦ୍ଧ।",
            "ମନ୍ଦିର ପରିସରରେ ଭିକ୍ଷାବୃତ୍ତି କରିବା ଅନୁଚିତ ।",
            "ଛେପ ପକାଇବା କିମ୍ବା ଅସଭ୍ୟ ଆଚରଣ କରିବା ନିଷିଦ୍ଧ।",
            "ଜଳକୁ ନଷ୍ଟ କରନ୍ତୁ ନାହିଁ ।",
            "ମନ୍ଦିର ପରିସରରେ ଛେପ ପକାଇବା, ପରିଶ୍ରା କରିବା ବା ଶୌଚ କରିବା ନିଷିଦ୍ଧ ଅଟେ।",
            "ମନ୍ଦିର ପରିସର ଭିତରେ ଏବଂ ଚାରିପାଖରେ ଜୋତା ଓ ଚମଡା ଜିନିଷ ବ୍ୟବହାର ନିଷିଦ୍ଧ ଅଟେ।",
            "ଛତା, ମୋବାଇଲ୍ ଫୋନ୍, ଇଲେକ୍ଟ୍ରୋନିକ୍ ଉପକରଣ, ଚମଡା ଜିନିଷ ଇତ୍ୟାଦି ସାଙ୍ଗରେ ନେଇଯିବାକୁ ନିଷିଦ୍ଧ ଅଟେ।",
            "ମନ୍ଦିର ପରିସର ମଧ୍ୟରେ ଟୋପି ପିନ୍ଧନ୍ତୁ ନାହିଁ।"
        ]
    };

    const EnglishNitiKanti = [
        {
            id: 1,
            name: "Debashnana Purnima",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "11-06-2025",
            day: "Wednesday",
        },
        {
            id: 2,
            name: "Nabajauban Darshan",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "26-06-2025",
            day: "Thursday",
        },
        {
            id: 3,
            name: "Ratha Jatra",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "27-06-2025",
            day: "Friday",
        },
        {

            id: 4,
            name: "Hera Panchami",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "01-07-2025",
            day: "Tuesday",
        },
        {

            id: 5,
            name: "Sandhya Darshan",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "04-07-2025",
            day: "Friday",
        },
        {
            id: 6,
            name: "Bahuda Jatra",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "05-07-2025",
            day: "Saturday",
        },
        {
            id: 7,
            name: "Suna Besha",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "06-07-2025",
            day: "Sunday",
        },
        {

            id: 8,
            name: "Adharapana Niti",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "07-07-2025",
            day: "Monday",
        },
        {

            id: 9,
            name: "Shree Niladri Bije",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "08-07-2025",
            day: "Tuesday",
        }
    ]

    const OdiaNitiKanti = [
        {
            id: 1,
            name: "ଦେବସ୍ନାନ ପୂର୍ଣ୍ଣିମା ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "11-06-2025",
            day: "ବୁଧବାର"
        },
        {
            id: 2,
            name: "ନବଯୌବନ ଦର୍ଶନ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "26-06-2025",
            day: "ଗୁରୁବାର"
        },
        {
            id: 3,
            name: "ରଥଯାତ୍ରା",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "27-06-2025",
            day: "ଶୁକ୍ରବାର"
        },
        {
            id: 4,
            name: "ହେରାପଞ୍ଚମୀ ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "01-07-2025",
            day: "ମଙ୍ଗଳବାର"
        },
        {
            id: 5,
            name: "ସନ୍ଧ୍ୟା ଦର୍ଶନ ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "04-07-2025",
            day: "ଶୁକ୍ରବାର"
        },
        {
            id: 6,
            name: "ବାହୁଡା ଯାତ୍ରା  ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "05-07-2025",
            day: "ଶନିବାର"
        },
        {
            id: 7,
            name: "ସୁନା ବେଶ ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "06-07-2025",
            day: "ରବିବାର"
        },
        {
            id: 8,
            name: "ଅଧରପଣା ନୀତି ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "07-07-2025",
            day: "ସୋମବାର"
        },
        {
            id: 9,
            name: "ଶ୍ରୀନୀଳାଦ୍ରି ବିଜେ ",
            description: "A collection of wise sayings and proverbs that guide ethical behavior and decision-making.",
            date: "08-07-2025",
            day: "ମଙ୍ଗଳବାର"
        }
    ]

    const conveniences = [
        { id: '1', odiaLabel: 'ଲାଇଫ ଗାର୍ଡଙ୍କ ଯୋଗାଯୋଗ', label: 'Life Guard    Contacts', page: 'LifeGuardBooth', image: require('../../assets/image/life432.png') },
        { id: '2', odiaLabel: 'ପାନୀୟ ଜଳ', label: 'Drinking Water', page: 'DrinkingWater', image: require('../../assets/image/drinkingWater32.png') },
        { id: '3', odiaLabel: 'ଶୌଚାଳୟ', label: 'Toilet', page: 'Toilet', image: require('../../assets/image/toilet543.png') },
        { id: '4', odiaLabel: 'ବେଳାଭୂମି', label: 'Beaches', page: 'Beaches', image: require('../../assets/image/beaches21.png') },
        { id: '5', odiaLabel: 'ଏଟିଏମ୍', label: 'ATM', page: 'Atm', image: require('../../assets/image/atm.png') },
        { id: '6', odiaLabel: 'ଯାତାୟାତ ମାର୍ଗ', label: 'Route Map', page: '', image: require('../../assets/image/routeMap.png') },
        { id: '7', odiaLabel: 'ପେଟ୍ରୋଲ ପମ୍ପ', label: 'Petrol Pump', page: 'PetrolPump', image: require('../../assets/image/petrolPump21.png') },
        { id: '8', odiaLabel: 'ବସ୍ ଷ୍ଟାଣ୍ଡ/ରେଳ ଷ୍ଟେସନ୍', label: 'Bus Stand/Railway Station', page: 'BusRailwayStop', image: require('../../assets/image/busRaily.png') },
        { id: '9', odiaLabel: 'ଚାର୍ଜିଂ ଷ୍ଟେସନ୍', label: 'Charging Station', page: 'ChargingStation', image: require('../../assets/image/charghingstation89.png') },
    ];

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = () => { setIsDrawerOpen(false); };
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [rathaYatraNiti, setRathaYatraNiti] = useState([]);

    const [physicalHanducapModalVisible, setPhysicalHanducapModalVisible] = useState(false);
    const [lostAndFoundModalVisible, setLostAndFoundModalVisible] = useState(false);
    const [doDontsModal, setDoDontsModal] = useState(false);
    const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
    const [rathayatraLiveModalVisible, setRathayatraLiveModalVisible] = useState(false);

    useEffect(() => {
        if (selectedLanguage === "Odia") {
            setRathaYatraNiti(OdiaNitiKanti);
        } else {
            setRathaYatraNiti(EnglishNitiKanti);
        }
    }, [selectedLanguage]);

    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const loadLanguage = async () => {
        try {
            const value = await AsyncStorage.getItem('selectedLanguage');
            if (value !== null) {
                setSelectedLanguage(value);
            }
        } catch (error) {
            console.log('Error loading language from storage:', error);
        }
    };

    const nitiTimings = [
        {
            id: '2',
            name: 'Chari nahak utha',
            desc: 'Chari Nahak Utha" is a significant ritual in the Jagannath Temple, Puri, Odisha, marking the ceremonial lifting of the chariot for the annual Rath Yatra. It symbolizes the commencement of the chariot construction process and is performed with great devotion and reverence by the temple priests and devotees. The event is celebrated with traditional music, dance, and offerings to Lord Jagannath, signifying the divine connection between the deities and their devotees.',
            status: 'Completed',
            time: '11th June',
            relativeTime: 'in 8 hours',
            images: [
                require('../../assets/image/charinahak3.jpeg'),
                require('../../assets/image/charinahak1.jpg'),
                require('../../assets/image/charinahak2.jpg'),
                require('../../assets/image/charinahak4.jpeg'),
                require('../../assets/image/charinahak5.jpeg'),
            ]
        },
        {
            id: '1',
            name: 'Ratha Anukula',
            desc: 'Ratha Anukula" in the context of Puri, Odisha, refers to the sacred ritual marking the beginning of chariot construction for the upcoming Rath Yatra, performed at the Jagannath Temple.',
            status: 'Completed',
            time: '30th April',
            relativeTime: 'soon',
            images: [
                require('../../assets/image/rathaanukula1.jpg'),
                require('../../assets/image/rathaanukula2.jpg'),
                require('../../assets/image/rathaanukula3.jpg'),
                require('../../assets/image/rathaanukula4.jpeg'),
                require('../../assets/image/rathaanukula5.jpeg'),
            ]
        },
    ];

    const [selectedImages, setSelectedImages] = useState(() => {
        const initialState = {};
        nitiTimings.forEach(item => {
            if (item.images && item.images.length > 0) {
                initialState[item.id] = item.images[0];
            }
        });
        return initialState;
    });

    const handleImageSelect = (itemId, imageUrl) => {
        setSelectedImages(prevState => ({
            ...prevState,
            [itemId]: imageUrl,
        }));
    };

    const [rathaYatraLiveVideoSectionVisible, setRathaYatraLiveVideoSectionVisible] = useState(false);

    const getRathaYatraLiveVideo = async () => {
        try {
            const response = await fetch(`${base_url}api/rathayatra/status`);
            if (!response.ok) {
                console.log('Network response was not ok');
                setRathaYatraLiveVideoSectionVisible(false); // fail-safe
                return;
            }

            const result = await response.json();
            if (result.status) {
                setRathaYatraLiveVideoSectionVisible(result.data.live_video === "active");
            } else {
                console.log('API responded with status false:', result.message);
                setRathaYatraLiveVideoSectionVisible(false);
            }
        } catch (error) {
            console.log('Error fetching Ratha Yatra Live Video section status:', error);
            setRathaYatraLiveVideoSectionVisible(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadLanguage();
            getRathaYatraLiveVideo();
        }
    }, [isFocused, selectedLanguage]);

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 1 * itemsPerRow; // Show 3 rows initially

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerModal visible={isDrawerOpen} navigation={navigation} onClose={closeDrawer} loadLanguageForHomePage={loadLanguage} />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/rathayatra123.jpg")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => setIsDrawerOpen(true)}>
                            <View style={{ width: 28, height: 3, backgroundColor: '#ff5733', marginVertical: 3.5 }} />
                            <View style={{ width: 28, height: 3, backgroundColor: '#ffc300', marginVertical: 3.5 }} />
                            <View style={{ width: 28, height: 3, backgroundColor: '#fff', marginVertical: 3.5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 100, width: '100%', left: 13 }}>
                        {selectedLanguage === 'Odia' ?
                            <View style={{ textAlign: 'center', marginLeft: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Bold', letterSpacing: 0.8, marginTop: 0 }}>ଶ୍ରୀଜଗନ୍ନାଥ</Text>
                                <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Bold', letterSpacing: 0.8, marginTop: -5 }}>ରଥଯାତ୍ରା ୨୦୨୫</Text>
                            </View>
                            :
                            <View style={{ textAlign: 'center', marginLeft: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8 }}>Shree Jagannatha</Text>
                                <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -5 }}>Ratha Jatra 2025</Text>
                            </View>
                        }
                    </View>
                </ImageBackground>

                {/* Current Niti Box */}
                <ScrollView style={{ padding: 8, alignSelf: 'center', marginTop: -60 }} horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} decelerationRate="fast" nestedScrollEnabled={true}>
                    <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
                        {rathaYatraNiti.map((item) => (
                            <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 5 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#6A0DAD' }}>{item.name}</Text>
                                        <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                                <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>{moment(item.date, 'DD-MM-YYYY').format('DD MMM YYYY')}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                                <Ionicons name="time-outline" size={16} color="#fa0000" />
                                                <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>{item.day}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '10%' }}>
                                        <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Niti Kanti Section */}
                <View style={{ marginTop: 5, width: '93%', alignSelf: 'center', height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 2 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View style={{ width: '20%' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>{selectedLanguage === 'Odia' ? 'ନୀତିକାନ୍ତି' : 'Niti   Kanti'}</Text>
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular', color: '#333', lineHeight: 20, textAlign: 'center' }}>{selectedLanguage === 'Odia' ? 'ଶ୍ରୀ ଗୁଣ୍ଡିଚା ଯାତ୍ରା ୨୦୨୫ର କାର୍ଯ୍ୟସୂଚୀ' : 'Time table for Shree Gundicha Jatra 2025.'}</Text>
                        </View>
                        <View style={{ width: '20%', alignItems: 'flex-end' }}>
                            <Image source={require('../../assets/image/panji765.png')} style={{ width: 40, height: 40 }} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* ରଥଯାତ୍ରା Live Section */}
                <View style={styles.liveCard}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '30%', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/ratha432.png')} style={{ width: 90, height: 50, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '30%', alignItems: 'center' }}>
                            <Text style={styles.liveTitle}>{selectedLanguage === 'Odia' ? 'ରଥଯାତ୍ରା ଲାଇଭ୍' : 'Ratha Yatra Live'}</Text>
                        </View>
                        <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setRathayatraLiveModalVisible(true)} style={{ marginTop: 5, borderRadius: 7, overflow: 'hidden' }}>
                                <LinearGradient
                                    colors={['#FFA726', '#F06292']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        width: 74,
                                        height: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 7,
                                    }}
                                >
                                    <Octicons name="zap" size={15} color="#fff" />
                                    <Text style={styles.liveSubText}>Live</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Quick Services Section */}
                <View style={{ padding: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Trafic')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/trafic654.png')} style={{ width: 70, height: 70 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? "ଟ୍ରାଫିକ" : "Traffic"}</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/parking765.png')} style={{ width: 40, height: 40 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ପାର୍କିଂ' : 'Parking'}</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => setEmergencyModalVisible(true)} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/emergencyontactremovebg.png')} style={{ width: 65, height: 65 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ' : 'Emergency Contact'}</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => setDoDontsModal(true)} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                <Image source={require('../../assets/image/dodonts.png')} style={{ width: 70, height: 70 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'କରନ୍ତୁ ଏବଂ କରନ୍ତୁ ନାହିଁ' : "Do and Don'ts"}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 15, alignSelf: 'center', height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>{selectedLanguage === 'Odia' ? 'ବସ ଓ  ଟ୍ରେନ୍' : 'Bus & Train'}</Text>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-Regular', color: '#333', lineHeight: 20 }}>{selectedLanguage === 'Odia' ? 'ରଥଯାତ୍ରା ପାଇଁ ବିଶେଷ ବସ ଓ ଟ୍ରେନ୍ ସମୟସୂଚୀ' : 'Special Bus And Train Schedule For Ratha Yatra.'}</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/image/festival21.png')} style={{ width: 60, height: 60 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity onPress={() => setLostAndFoundModalVisible(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{selectedLanguage === 'Odia' ? "ହଜିବା ଓ ଖୋଜିବା କେନ୍ଦ୍ର" : "Lost & Found"}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/lost&found21.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPhysicalHanducapModalVisible(true)} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{selectedLanguage === 'Odia' ? "ବିଶେଷ ସକ୍ଷମ ବ୍ୟକ୍ତି" : "Specially Abled Person"}</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/physical21.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* conveniences */}
                <View style={{ padding: 15 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>{selectedLanguage === 'Odia' ? 'ଯାତ୍ରୀ ତଥା ଭକ୍ତମାନଙ୍କ ଆବଶ୍ୟକତା' : 'Conveniences'}</Text>
                    <LinearGradient
                        colors={['#FFA726', '#F06292']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                        }}
                    />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>
                        {(expanded ? conveniences : conveniences.slice(0, maxVisibleItems)).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    if (item.page !== '') {
                                        navigation.navigate(item.page);
                                    } else if (item.label === 'Route Map') {
                                        Linking.openURL('https://maps.app.goo.gl/MQEvQykPJo64ghgQA');
                                    }
                                }}
                                style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}
                            >
                                <View style={{ width: 52, height: 52, borderRadius: 30, backgroundColor: item.page === 'DrinkingWater' ? "#feefec" : 'transparent', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    {/* <item.iconType name={item.icon} size={24} color="#D64C64" /> */}
                                    <Image source={item.image} style={{ width: item.page === 'DrinkingWater' ? 40 : 55, height: item.page === 'DrinkingWater' ? 40 : 55 }} resizeMode="contain" />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{selectedLanguage === 'Odia' ? item.odiaLabel : item.label}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>

                    {conveniences.length > maxVisibleItems && (
                        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 20, marginTop: 10, alignSelf: 'center' }}>
                            <AntDesign name={expanded ? 'upcircleo' : 'downcircleo'} size={30} color="#D64C64" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Ratha Yatra Timeline */}
                <View style={styles.nearbyContainer}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>{selectedLanguage === 'Odia' ? 'ରଥଯାତ୍ରା ସମୟ ସାରଣୀ ' : 'Ratha Yatra Timeline'}</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} />
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={nitiTimings}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 6 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 17, color: '#222', fontFamily: 'FiraSans-Bold', marginBottom: 10 }}>{item.name}</Text>
                                            <View>
                                                <Image
                                                    source={selectedImages[item.id]}
                                                    style={styles.mainImage}
                                                />
                                            </View>
                                            <FlatList
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={item.images}
                                                keyExtractor={(uri, index) => index.toString()}
                                                contentContainerStyle={{ marginBottom: 8, marginTop: 4 }}
                                                renderItem={({ item: thumb }) => (
                                                    <TouchableOpacity onPress={() => handleImageSelect(item.id, thumb)}>
                                                        <Image
                                                            source={thumb}
                                                            style={[
                                                                styles.thumbnail,
                                                                selectedImages[item.id] === thumb && styles.selectedThumbnail
                                                            ]}
                                                        />
                                                    </TouchableOpacity>
                                                )}
                                            />
                                            <View style={styles.infoRow}>
                                                <View style={styles.infoColumn}>
                                                    <Text style={styles.label}>Date: <Text style={styles.value}>{item.time}</Text></Text>
                                                </View>
                                                {/* <View style={styles.infoColumn}>
                                                    <Text style={styles.label}>Description: <Text style={styles.value}>{item.desc}</Text></Text>
                                                </View> */}
                                            </View>
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginTop: 20, marginBottom: 10 }} />
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Ratha Yatra Live Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={rathayatraLiveModalVisible}
                onRequestClose={() => setRathayatraLiveModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 25, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10, alignItems: 'center' }}>
                        <MaterialIcons name="live-tv" size={40} color="#D64C64" style={{ marginBottom: 10 }} />
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#341551', marginBottom: 15 }}>{selectedLanguage === 'Odia' ? 'ରଥଯାତ୍ରା ଲାଇଭ୍' : 'Ratha Yatra Live'}</Text>
                        <YoutubePlayer
                            width={'100%'}
                            height={200}
                            autoPlay={true}
                            play={true}
                            videoId={'TK8TkDG056I'}
                        />
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ marginTop: 20, backgroundColor: '#D64C64', borderRadius: 25 }}
                        >
                            <TouchableOpacity onPress={() => setRathayatraLiveModalVisible(false)} style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

            {/* Emergency Contact */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={emergencyModalVisible}
                onRequestClose={() => setEmergencyModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 25, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10, alignItems: 'center' }}>
                        <MaterialIcons name="local-phone" size={40} color="#D64C64" style={{ marginBottom: 10 }} />
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#341551', marginBottom: 15 }}>{selectedLanguage === 'Odia' ? 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ' : 'Emergency Contacts'}</Text>

                        {emergencyContacts.map((contact, index) => (
                            <TouchableOpacity key={index} onPress={() => handleCall(contact.phone)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 12, borderBottomWidth: index !== emergencyContacts.length - 1 ? 1 : 0, borderBottomColor: '#eee' }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{selectedLanguage === 'Odia' ? contact.odiaName : contact.name}</Text>
                                    <Text style={{ fontSize: 14, color: '#999' }}>{contact.phone}</Text>
                                </View>
                                <MaterialIcons name="call" size={24} color="#D64C64" />
                            </TouchableOpacity>
                        ))}

                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ marginTop: 20, backgroundColor: '#D64C64', borderRadius: 25 }}
                        >
                            <TouchableOpacity onPress={() => setEmergencyModalVisible(false)} style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

            {/* Do and don'ts Modal */}
            <Modal
                visible={doDontsModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDoDontsModal(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', maxHeight: '85%', backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16, overflow: 'hidden' }}>
                        <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
                            <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#B7070A' }}>
                                {selectedLanguage === 'Odia' ? "ଶ୍ରୀଜଗନ୍ନାଥ ଧାମ ପୁରୀରେ କରିବା ଓ ନକରିବା କାମ" : "Do’s & Dont’s at Jagannatha Dham Puri"}
                            </Text>

                            {/* ✅ DOs */}
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#008000', marginBottom: 8 }}>{selectedLanguage === 'Odia' ? 'କରନ୍ତୁ:' : 'Do’s:'}</Text>

                            {(selectedLanguage === 'Odia' ? doList.or : doList.en).map((item, index) => (
                                <Text key={index} style={{ fontSize: 14, color: '#333', marginBottom: 5, lineHeight: 20 }}>
                                    ✅ {item}
                                </Text>
                            ))}

                            {/* 🚫 DON'Ts */}
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#B7070A', marginTop: 15, marginBottom: 8 }}>{selectedLanguage === 'Odia' ? 'କରନ୍ତୁ ନାହିଁ:' : 'Dont’s:'}</Text>

                            {(selectedLanguage === 'Odia' ? dontList.or : dontList.en).map((item, index) => (
                                <Text key={index} style={{ fontSize: 14, color: '#333', marginBottom: 5, lineHeight: 20 }}>
                                    🚫 {item}
                                </Text>
                            ))}

                            {/* Close Button */}
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <LinearGradient
                                    colors={['#FFA726', '#F06292']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ backgroundColor: '#B7070A', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 }}
                                >
                                    <TouchableOpacity onPress={() => setDoDontsModal(false)}>
                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Lost & Found */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={lostAndFoundModalVisible}
                onRequestClose={() => setLostAndFoundModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <View style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        paddingVertical: 30,
                        paddingHorizontal: 25,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 20
                    }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Image source={require('../../assets/image/lost&found21.png')} style={{ width: 70, height: 70 }} resizeMode="contain" />
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#341551',
                                textAlign: 'center',
                                marginTop: 10
                            }}>
                                {selectedLanguage === 'Odia' ? 'ହଜିବା ଓ ଖୋଜିବା କେନ୍ଦ୍ର' : 'Lost & Found'}
                            </Text>
                        </View>

                        {selectedLanguage === 'Odia' ?
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                textAlign: 'justify',
                                lineHeight: 24
                            }}>
                                ଦୟାକରି ପୁରୀର ଶ୍ରୀ ମନ୍ଦିରରେ ଥିବା ସିଂହଦ୍ୱାର ସୂଚନା କେନ୍ଦ୍ର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।{'\n\n'}
                                <Text style={{ fontWeight: '600', color: '#D64C64' }}>ଫୋନ୍ : +୯୧-୬୭୫୨-୨୨୨୦୦୨</Text>
                            </Text>
                            :
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                textAlign: 'justify',
                                lineHeight: 24
                            }}>
                                Please contact Information Center at Lion's Gate, Shree Mandira, Puri.{'\n\n'}
                                <Text style={{ fontWeight: '600', color: '#D64C64' }}>Phone : +91-6752-222002</Text>
                            </Text>
                        }
                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ marginTop: 30, backgroundColor: '#D64C64', borderRadius: 30, alignSelf: 'center' }}
                        >
                            <TouchableOpacity onPress={() => setLostAndFoundModalVisible(false)} style={{ paddingVertical: 12, paddingHorizontal: 30 }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

            {/* Special Abled Person */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={physicalHanducapModalVisible}
                onRequestClose={() => setPhysicalHanducapModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <View style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        paddingVertical: 30,
                        paddingHorizontal: 25,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 20
                    }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <MaterialIcons name="accessible" size={50} color="#D64C64" />
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#341551',
                                textAlign: 'center',
                                marginTop: 10
                            }}>
                                {selectedLanguage === 'Odia' ? 'ବିଶେଷ ସକ୍ଷମ ଓ ବରିଷ୍ଠ ନାଗରିକ' : 'Special Abled Person'}
                            </Text>
                        </View>

                        {selectedLanguage === 'Odia' ?
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                textAlign: 'justify',
                                lineHeight: 24
                            }}>
                                ବରିଷ୍ଠ ନାଗରିକ ଏବଂ ଶାରୀରିକ ଅକ୍ଷମ ଲୋକଙ୍କୁ ପରିବହନ ପାଇଁ ଜଗନ୍ନାଥ ବଲ୍ଲଭ ପାର୍କିଂ ସ୍ଥାନ (ମାର୍କେଟ୍ ଛକ) ରୁ ମନ୍ଦିର ମୁଖ୍ୟ ଦ୍ୱାର / ଉତ୍ତର ଦ୍ୱାର ପର୍ଯ୍ୟନ୍ତ ମାଗଣା ବ୍ୟାଟେରୀ ଚାଳିତ ଯାନବାହାନ ସେବା ଉପଲବ୍ଧ ।
                            </Text>
                            :
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                textAlign: 'justify',
                                lineHeight: 24
                            }}>
                                Free service of battery operated vehicles is available from <Text style={{ fontWeight: '600' }}>Jagannatha Ballav Parking place (Market square)</Text> to the <Text style={{ fontWeight: '600' }}>Temple main gate / North gate</Text> for carrying senior citizens and Special Abled Person.
                            </Text>
                        }

                        {selectedLanguage === 'Odia' ?
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                textAlign: 'justify',
                                lineHeight: 24
                            }}>
                                ଉତ୍ତର ଦ୍ୱାରରେ ହୁଇଲ ଚେୟାର ଏବଂ ରାମ୍ପ ସୁବିଧା ଉପଲବ୍ଧ ଏବଂ ହୁଇଲ ଚେୟାର ପାଇବା ପାଇଁ, ମନ୍ଦିର ପର୍ଯ୍ୟବେକ୍ଷକ / ସହାୟକ ପର୍ଯ୍ୟବେକ୍ଷକଙ୍କ ସହିତ 06752 – 252527 ରେ ଯୋଗାଯୋଗ କରିପାରିବେ (ହୁଇଲ ଚେୟାର କେବଳ ଭିନ୍ନକ୍ଷମ ଭକ୍ତଙ୍କ ପାଇଁ ଉପଲବ୍ଧ)।
                            </Text>
                            :
                            <Text style={{
                                fontSize: 16,
                                color: '#444',
                                textAlign: 'justify',
                                marginTop: 15,
                                lineHeight: 24
                            }}>
                                Wheelchair and ramp facilities are available at the North gate. To avail a wheelchair, please contact <Text style={{ fontWeight: '600' }}>Temple Supervisor / Asst. Supervisor</Text> at <Text style={{ fontWeight: '600', color: '#D64C64' }}>06752 – 252527</Text> (wheelchairs are only for differently abled devotees).
                            </Text>
                        }

                        <LinearGradient
                            colors={['#FFA726', '#F06292']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ marginTop: 30, backgroundColor: '#D64C64', borderRadius: 30, alignSelf: 'center' }}
                        >
                            <TouchableOpacity onPress={() => setPhysicalHanducapModalVisible(false)} style={{ paddingVertical: 12, paddingHorizontal: 30 }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 2,
        backgroundColor: "#F8F8F8",
    },
    backgroundImage: {
        width: "100%",
        height: 350,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // borderRadius: 30,
    },
    header: {
        position: "absolute",
        top: 5,
        // left: 20,
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
    liveCard: {
        width: '93%',
        alignSelf: 'center',
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 25,
        borderRadius: 20,
        elevation: 5,
        marginTop: 15,
        marginBottom: 5,
    },
    liveTitle: {
        fontSize: 19,
        fontFamily: "FiraSans-SemiBold",
        color: "#5c5b5b",
    },
    liveSubText: {
        color: "#fff",
        fontFamily: "FiraSans-Medium",
        fontSize: 14,
        marginLeft: 5,
    },
    nearbyContainer: {
        marginVertical: 10,
        width: '93%',
        alignSelf: 'center',
    },
    propertyName: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'FiraSans-Bold',
        marginBottom: 8,
    },
    mainImage: {
        width: '100%',
        height: 166,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    view360Badge: {
        position: 'absolute',
        top: 7,
        right: 7,
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    view360Text: {
        fontSize: 12,
        color: '#f43f5e',
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    selectedThumbnail: {
        borderColor: '#7e22ce',
        borderWidth: 2
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    distanceText: {
        fontSize: 13,
        color: '#7e22ce',
        marginLeft: 5,
        fontFamily: 'FiraSans-Regular'
    },
    infoRow: {
        width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: 10
    },
    infoColumn: {
        // flex: 1,
        // paddingRight: 10
    },
    label: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'FiraSans-SemiBold'
    },
    value: {
        fontSize: 12,
        color: '#444',
        marginTop: 2,
        lineHeight: 19,
        fontFamily: 'FiraSans-Regular'
    },
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    bookNowButton: {
        backgroundColor: '#7e22ce',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    bookNowText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600'
    },
    callButton: {
        // backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#b8b8b8',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    callText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600'
    }
});

export default Index;
