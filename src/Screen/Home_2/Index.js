import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, Linking, Modal } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native'
import LinearGradient from "react-native-linear-gradient";
// import { Calendar } from 'react-native-calendars';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from 'react-native-swiper';
import { base_url } from "../../../App";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Index = () => {

    const bannerData = [
        {
            image: require('../../assets/image/temple123.png'),
            title: 'Jagannatha Temples Worldwide',
            subtitle: 'Find All Jagannatha Temples.',
        },
        {
            image: require('../../assets/image/SplashLogo.png'),
            title: 'Exclusive Offers',
            subtitle: 'Don’t miss out on discounts.',
        },
    ];

    const TempleBanner = [
        {
            image: require('../../assets/image/temple546.png'),
            title: 'Shree Jagannatha',
            subtitle: 'All Information about Temple.',
            pageName: 'TempleInformationPage',
        },
        {
            image: require('../../assets/image/ratha_yatra123.png'),
            title: 'Ratha Yatra Updates',
            subtitle: 'All types of information',
            pageName: 'RathaYatraMainPage',
        },
    ];

    const nearByPlaces = [
        {
            id: 1,
            type: 'temple',
            title: 'Nrusingha Temple',
            mapImage: require('../../assets/image/nearbytemple/narasimhaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/narasimhaTemple.jpg'),
            images: [
                require('../../assets/image/nearbytemple/narasimhaTempleInnerImage1.jpg'),
                require('../../assets/image/nearbytemple/narasimhaTempleInnerImage2.jpg'),
            ],
            address: 'SHAWMILL LANE, Sarbodaya Nagar, Puri',
            mapUrl: 'https://maps.app.goo.gl/NrLPYSHg2FzSzxR7A',
            distanceFromJagannathTemple: '3 km',
            description: 'Narasimha Temple  is situated in Puri, Odisha, India, to the western side of Gundicha Temple and to the east of the Indradyumna tank.',
            history: "As depicted in the Skanda Purana once King Indradyumna stayed near Nilakantheswar temple to make arrangements to perform Ashwamedha Yajna for one thousand years. On the advice of Sage Narada, King Indradyumna made a Nrusimha image out of black stone and placed the image under black sandal wood tree and worshipped Him. It is believed that in front of this temple the Ashwamedha Yajna took place and hence He is known as 'Yajna Narasimha'.",
        },
        {
            id: 2,
            type: 'temple',
            title: 'Gundicha Temple',
            mapImage: require('../../assets/image/nearbytemple/gundichaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/gundichaMandira2.jpg'),
            images: [
                require('../../assets/image/nearbytemple/gundichaMandira2.jpg'),
                require('../../assets/image/nearbytemple/gundichaMandira1.jpg'),
            ],
            address: 'Gundicha Temple,   Puri, 752002',
            mapUrl: 'https://maps.app.goo.gl/1XxnwZ7mjQzpd5jf6',
            distanceFromJagannathTemple: '2.5 km',
            description: 'Gundicha Temple (Odia: ଗୁଣ୍ଡିଚା ମନ୍ଦିର), is a Hindu temple, situated in the temple town of Puri in the state of Odisha, India. It is significant for being the destination of the celebrated annual Rath Yatra of Puri.[1] While it remains vacant most of the year, the temple is occupied by images of the deities of Jagannath, his brother Balabhadra and sister Subhadra for seven complete days (total 9 days including the start and concluding day of Ratha Yatra) every year during the annual Rath Yatra festival.',
            history: "A legend links the temple to Gundicha, the queen of Indradyumna (the legendary builder of the main temple) - after whom the Gundicha Temple is named. Gundicha had a peep at the divine image of Jagannath being created by the celestial architect Vishwakarma. Impressed by the image, she insisted on her husband building the temple for the deity and starting the Ratha Yatra. Another variant suggests that Jagannath was pleased with her temple and promised to visit her house, now the Gundicha Temple.",
        },
        {
            id: 3,
            type: 'temple',
            title: 'Lokanatha Temple',
            mapImage: require('../../assets/image/nearbytemple/lokanathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/lokanathaTemple2.jpg'),
            images: [
                require('../../assets/image/nearbytemple/lokanathaTemple2.jpg'),
                require('../../assets/image/nearbytemple/lokanathaTemple1.jpg'),
            ],
            address: 'Puri, Odisha 752001',
            mapUrl: 'https://maps.app.goo.gl/ywSrzPLof9GdmFEz8',
            distanceFromJagannathTemple: '2 km',
            description: "Lokanatha Temple is a Hindu temple in the town of Puri, Odisha, India. It is dedicated to the god Shiva as Lokanatha. It is dedicated to the god Shiva as Lokanatha. As per legend, linga, the symbol of Shiva was established as the central icon by the god Rama. The unique feature is that the linga is always under water which substantiates the legend that the Ganges river flows through the top of the linga as a stream.",
            history: "The legend says that Lord Rama on his way to Sri Lanka for searching Sita reached Puri and sat with a vow to see Siva here. At that time there was a village (koown as Sabarapalli in local language) nearby. Sabaras (native of that village) presented him a Lau or Lauka (Pumpkin, one type of vegetable) looking like a Siva Linga, Lord Rama installed that as the replica of Siva Linga at that place and prayed Siva to fulfill his desire. From that day this Siva Linga was called ‘Laukanatha’. It is believed that the word Lokanatha is a later innovation from the original word ‘Laukanatha’.",
        },
        {
            id: 4,
            type: 'temple',
            title: 'Alarnatha Temple',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/alarnathaTemple.jpg'),
            images: [
                require('../../assets/image/nearbytemple/alarnathaTemple2.jpg'),
                require('../../assets/image/nearbytemple/alarnathaTemple1.jpg'),
            ],
            address: 'Alarapur, Brahmagiri, Naragariamatha',
            mapUrl: 'https://maps.app.goo.gl/98JMyXaj96TFjik88',
            distanceFromJagannathTemple: '23 km',
            description: "Alarnatha Mandira or Alvarnaatha Mandira  is a Hindu temple dedicated to Vishnu and located in Brahmagiri, Odisha, near Puri. It becomes crowded during the krishnapaksha of Ashadha, after the Snana Yatra when devotees are not allowed to see the central icon of Jagannath (a form of Vishnu) in his Puri temple. During this period, popularly known as Anasara or 'Anavasara' (literally meaning no opportunity to see the lord of Puri), instead of having darshan in the Puri temple, devotees believe that Jagannath during this time manifests as Alarnath Dev, at the Alarnath Mandira.",
            history: "The temple is associated with the visit of the saint Ramanujacharya to Odisha.  Chaitanya Mahaprabhu during his stay in Puri used to see the deity form of Jagannath daily. During Anavasara when Jagannath and his sibling deities were taken to the secret chamber for 15 days, he was unable to see the Lord. So as per legend, Jagannath directed him to go to Brahmagiri and visit the Alarnath temple.",
        },
        {
            id: 5,
            type: 'matha',
            title: 'Bada Chhata Matha',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/badachatamatha.jpeg'),
            images: [
                require('../../assets/image/nearbytemple/badachatamatha1.jpeg'),
                require('../../assets/image/nearbytemple/badachatamatha.jpeg'),
            ],
            address: 'Near Singhadwara (Lion Gate), Grand Road, Puri',
            mapUrl: 'https://maps.app.goo.gl/LeWbQUDeLMpaSyJb8',
            distanceFromJagannathTemple: 'near Singhadwara',
            description: "Serves as the main Matha of the Atibadi Sampradaya. Plays an important role in Jagannath Temple rituals, especially during Ratha Yatra. Monks from this matha are often involved in temple discussions, religious discourses, and bhajans.It is known for preserving rare manuscripts, scriptures, and age-old traditions.",
            history: "Bada Chhata Matha is one of the oldest and most important mathas (monastic establishments) associated with the Jagannath Temple. It was established by Atibadi Jagannath Das, a saint-poet and proponent of Utkaliya Vaishnavism, and the author of the Odia Bhagavata. This matha played a pivotal role in promoting Odia language and Bhakti movement in Odisha.",
        },
        {
            id: 6,
            type: 'matha',
            title: 'Emar Matha',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/emarmatha1.jpeg'),
            images: [
                require('../../assets/image/nearbytemple/emarmatha.jpeg'),
                require('../../assets/image/nearbytemple/emarmatha1.jpeg'),
            ],
            address: 'Near Singhadwara (Lion Gate), Grand Road, Puri',
            mapUrl: 'https://maps.app.goo.gl/BJETnN48Qcn3xqzd6',
            distanceFromJagannathTemple: 'near Singhadwara',
            description: "Emar Matha is one of the oldest and most significant monasteries in Puri, Odisha, located near the Jagannath Temple. It has a rich history, deep religious importance, and a strong connection with the Sri Jagannath Temple and its rituals.",
            history: "Founded in the 14th century by Sri Ramanujacharya, the great philosopher and proponent of the Sri Vaishnavism tradition. Linked to the Jagannath Temple, playing a crucial role in its daily rituals and festivals. The Matha has been a center for Vedantic studies and Vaishnavite teachings, promoting the doctrines of Sri Ramanuja.",
        },
        {
            id: 7,
            type: 'matha',
            title: 'Bada Odia Matha',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/badaodiamatha.jpeg'),
            images: [
                require('../../assets/image/nearbytemple/badaodiamatha1.jpeg'),
                require('../../assets/image/nearbytemple/badaodiamatha2.jpeg'),
            ],
            address: 'Near Singhadwara (Lion Gate), Grand Road, Puri',
            mapUrl: 'https://maps.app.goo.gl/oEq9aGzKM3VVpnCY6',
            distanceFromJagannathTemple: 'near Singhadwara',
            description: "Bada Odia Matha is one of the most important monasteries (Mathas) in Puri, Odisha, located near the Jagannath Temple. It has been a key center for spiritual activities, temple services, and religious traditions associated with Lord Jagannath.",
            history: "Founded by Guru Ram Das: The Matha is believed to have been established by Guru Ram Das, a prominent saint and follower of the Ramanandi sect of Vaishnavism. Connection to Lord Jagannath: The Matha has historically played a major role in the Rath Yatra and other temple rituals. Influence of Sikhism: Some legends associate the Matha with Guru Nanak Dev Ji, the founder of Sikhism, who is believed to have visited Puri in the 16th century. The Matha maintains a connection with Sikh devotees and has preserved Guru Granth Sahib, the holy scripture of Sikhism.",
        },
        {
            id: 8,
            type: 'matha',
            title: 'Raghaba Das Matha',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/ratha.jpeg'),
            images: [
                require('../../assets/image/mangala_alati.jpg'),
                require('../../assets/image/rathayatra123.jpg'),
            ],
            address: 'Near Singhadwara (Lion Gate), Grand Road, Puri',
            mapUrl: 'https://maps.app.goo.gl/pyzWjebVs59on6VM8',
            distanceFromJagannathTemple: '100 m',
            description: "Raghaba Das Matha is a significant monastery situated near the southern gate of the Jagannath Temple in Puri, Odisha. This Matha plays a crucial role in the rituals of the temple, supplying 'tahia' (decorative headgear) for four major festivals: Snana Purnima, Ratha Yatra, Return Ratha Yatra, and Niladri Bije. Additionally, it provides parts of the Hati Besha (elephant attire), 'tuli' for 'pahandi' (ceremonial procession), and sandalwood for 'Sarbanga' rituals on Khalilagi Ekadasi. The Matha also offers flower garlands for 'Nabanka Bedha' and contributes 'Adharapana bhoga' and 'Panti bhoga' on specific festive days.",
            history: "Raghaba Das Matha is believed to have been established by Sri Raghunandan Das, a great saint and devotee of Lord Jagannath. The Matha follows the Gaudiya Vaishnavism tradition, which was propagated by Sri Chaitanya Mahaprabhu in the 16th century. The Matha is dedicated to the worship of Lord Rama and Lord Jagannath and has contributed significantly to the religious life of Puri.",
        },
        {
            id: 9,
            type: 'ritualsite',
            title: 'Markandeshwara Pond',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/markandeshwaraPond1.webp'),
            images: [
                require('../../assets/image/nearbytemple/markandeshwaraPond2.jpg'),
                require('../../assets/image/nearbytemple/markandeshwaraPond3.webp'),
            ],
            address: 'Near Markandeshwara Temple',
            mapUrl: 'https://maps.app.goo.gl/ghLhpDsNZt1t8nWj8',
            distanceFromJagannathTemple: '500 m',
            description: "Markandeshwara Pond (ମାର୍କଣ୍ଡେଶ୍ୱର ପୋଖରୀ) is a sacred water tank located in Puri, Odisha, closely linked with Lord Shiva and the spiritual traditions of the Jagannath Temple.",
            history: "Adjacent to the Markandeshwar Temple, near the northern gate (Uttara Dwara) of Jagannath Temple, Puri. A peaceful area, slightly away from the main Grand Road hustle.",
        },
        {
            id: 10,
            type: 'ritualsite',
            title: 'Narendra Pushkarinee',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/narendraPushkarinee.jpg'),
            images: [
                require('../../assets/image/nearbytemple/narendraPushkarinee1.jpg'),
                require('../../assets/image/nearbytemple/narendraPushkarinee2.jpg'),
            ],
            address: 'Situated in Mali Sahi, Puri',
            mapUrl: 'https://maps.app.goo.gl/mBmpZXjLfsfKczjH6',
            distanceFromJagannathTemple: '2 km',
            description: "Narendra Pushkarinee (ନରେନ୍ଦ୍ର ପୁଷ୍କରିଣୀ) is one of the most sacred and historic temple tanks in Puri, Odisha, deeply associated with Lord Jagannath and the rituals of the Jagannath Temple.",
            history: "Believed to be constructed during the reign of Gajapati King Narendra Dev in the 15th century. Hence the name Narendra Pushkarinee. The tank is surrounded by several temples and shrines, including the famous Narendra Sarovara Temple. It is believed that taking a dip in the tank during auspicious occasions brings blessings and purification.",
        },
        {
            id: 11,
            type: 'ritualsite',
            title: 'Mahodadhi Aarti',
            mapImage: require('../../assets/image/nearbytemple/alarnathaTempleMap.png'),
            coverImage: require('../../assets/image/nearbytemple/mahodadhi1.jpg'),
            images: [
                require('../../assets/image/nearbytemple/mahodadhi1.jpg'),
                require('../../assets/image/nearbytemple/mahodadhi12.jpg'),
            ],
            address: 'Puri Sea Beach, near Swargadwar',
            mapUrl: 'https://maps.app.goo.gl/Hdf66iVDkS8vjBeq9',
            distanceFromJagannathTemple: '3 km',
            description: "Mahodadhi Aarti is a spiritual and cultural ritual performed at the seashore of Puri, Odisha, in honor of Lord Jagannath and the Mahodadhi (Bay of Bengal). It draws inspiration from the iconic Ganga Aarti of Varanasi, offering a serene and divine atmosphere for pilgrims and visitors.",
            history: "Priests dressed in traditional attire perform synchronized aarti with large lamps (deepams), incense sticks, and conch blowing, Mantras and devotional chants fill the air, accompanied by rhythmic ghanta naad (bell sounds), Devotees light floating diyas and set them adrift in the sea and Often accompanied by bhajans and kirtans praising Lord Jagannath.",
        },
    ];

    const conveniences = [
        { id: '1', label: 'Physical Handicap & Sr Citizen', page: '', image: require('../../assets/image/physical21.png') },
        { id: '2', label: 'Emergency Contact', page: '', image: require('../../assets/image/emergencyontact.png') },
        { id: '3', label: 'Life Guard    Contacts', page: 'LifeGuardBooth', image: require('../../assets/image/life432.png') },
        { id: '4', label: 'Lost & Found', page: '', image: require('../../assets/image/lost&found21.png') },
        { id: '5', label: 'Drinking Water', page: 'DrinkingWater', image: require('../../assets/image/drinkingWater32.png') },
        { id: '6', label: 'Toilet', page: 'Toilet', image: require('../../assets/image/toilet543.png') },
        { id: '7', label: 'Hotel', page: 'Hotel', image: require('../../assets/image/hotel89.png') },
        { id: '8', label: 'Restaurant', page: 'Restaurant', image: require('../../assets/image/restaurant87.png') },
        { id: '9', label: 'Beaches', page: 'Beaches', image: require('../../assets/image/beaches21.png') },
        { id: '10', label: 'Dharmashala', page: 'Dharmashala', image: require('../../assets/image/dharamasala67.png') },
        { id: '11', label: 'ATM', page: 'Atm', image: require('../../assets/image/atm.png') },
        { id: '12', label: 'Route Map', page: '', image: require('../../assets/image/routeMap.png') },
        { id: '13', label: 'Petrol Pump', page: 'PetrolPump', image: require('../../assets/image/petrolPump21.png') },
        { id: '14', label: 'Bus Stand/Railway Station', page: 'BusRailwayStop', image: require('../../assets/image/busRaily.png') },
        { id: '15', label: 'Charging Station', page: 'ChargingStation', image: require('../../assets/image/charghingstation89.png') },
    ];

    const emergencyContacts = [
        { name: 'Police', phone: '100' },
        { name: 'Ambulance', phone: '108' },
        { name: 'Fire Service', phone: '101' },
        { name: 'Elder Person Helpline', phone: '1090' },
        { name: 'Child Helpline', phone: '1098' },
        { name: 'Women Helpline', phone: '1091' },
        { name: 'Life Guard', phone: '8260777771' },
        { name: 'National Highway Helpline', phone: '1033' },
    ];

    const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const templeInfo = [
        { id: '1', image: require('../../assets/image/shreemandira.png'), label: 'Shree Mandira' },
        { id: '2', image: require('../../assets/image/shreekhetra.png'), label: 'Shree Khetra' },
        { id: '3', image: require('../../assets/image/tradition.png'), label: 'Tradition' },
        { id: '12', image: require('../../assets/image/rathaYatra.png'), label: 'Ratha yatra' },
        // { id: '13', image: require('../../assets/image/nabakalebala.png'), label: 'Nabakalebala' },
        { id: '4', image: require('../../assets/image/matha22.png'), label: 'Matha & Ashram' },
        { id: '5', image: require('../../assets/image/festival.png'), label: 'Festivals' },
        { id: '6', image: require('../../assets/image/36nijog.png'), label: '36 Nijoga' },
        { id: '7', image: require('../../assets/image/besha.png'), label: 'Besha' },
        { id: '8', image: require('../../assets/image/people.png'), label: 'Management' },
    ];

    const eventTypes = [
        { icon: '☀️', name: 'Sankranti' },
        { icon: '🌑', name: 'Amavasya' },
        { icon: '🌕', name: 'Pournami' },
        { icon: '🪔', name: 'Festival' },
        { icon: '🌘', name: 'Eclipse' },
        { icon: '🔥', name: 'Pradosha' },
        { icon: '🙏', name: 'Sankashti Chaturthi' },
        { icon: '🕉️', name: 'Shasti' },
        { icon: '〰️', name: 'Ekadashi' }
    ];

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [active, setActive] = useState('World Wide');
    const [selectedTab, setSelectedTab] = useState('Temples');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [expanded, setExpanded] = useState(false);
    const itemsPerRow = 3;
    const maxVisibleItems = 3 * itemsPerRow; // Show 2 rows initially

    const [nitiList, setNitiList] = useState([]);
    const [banners, setBanners] = useState([]);
    const [nearbyTemples, setNearbyTemples] = useState([]);
    const [previousAmount, setPreviousAmount] = useState(0);

    const getData = async () => {
        try {
            const response = await fetch(`${base_url}api/get-home-section`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Get Home Page Data:', result);

            if (result.status) {
                const { niti_master, banners, nearby_temples, totalPreviousAmount } = result.data;

                setNitiList(niti_master || []);
                setBanners(banners || []);
                setNearbyTemples(nearby_temples || []);
                setPreviousAmount(totalPreviousAmount || 0);
            } else {
                console.warn('API responded with status false:', result.message);
            }

        } catch (error) {
            console.error('Error fetching home section data:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    useEffect(() => {
        if (selectedTab === 'Temples') {
            setFilteredPlaces(nearByPlaces.filter(place => place.type === 'temple'));
        } else if (selectedTab === 'Mathas') {
            setFilteredPlaces(nearByPlaces.filter(place => place.type === 'matha'));
        } else if (selectedTab === 'RitualSites') {
            setFilteredPlaces(nearByPlaces.filter(place => place.type === 'ritualsite'));
        }
    }, [selectedTab]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                bounces={false} // Prevents bounce effect on iOS
                overScrollMode="never" // Prevents overscroll glow on Android
            >
                {/* Background Image with Overlay */}
                <ImageBackground source={require("../../assets/image/templeImage1.png")} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, resizeMode: 'cover' }} style={styles.backgroundImage}>
                    <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.overlay} />
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../../assets/image/SJDlogo.png")} style={styles.logo} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('RealsPage')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <SimpleLineIcons name="settings" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', top: 110, width: '100%', left: 13 }}>
                        <View style={{ textAlign: 'center', marginLeft: 8 }}>
                            <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'FiraSans-Regular', letterSpacing: 0.8, marginBottom: 2 }}>Welcome to</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -8 }}>Shree Jagannatha</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'FiraSans-Medium', letterSpacing: 0.8, marginTop: -10 }}>Dham</Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Current Niti Box */}
                <ScrollView style={{ padding: 8, alignSelf: 'center', marginTop: -50 }} horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} decelerationRate="fast" nestedScrollEnabled={true}>
                    <View style={{ flexDirection: 'row', paddingLeft: 3 }}>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>Dwara Phita & Mangala Alati</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th April</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>5 AM or earlier</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 330, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>Mailam</Text>
                                    <View style={{ backgroundColor: '#fa0000', width: 80, height: 1.5, marginVertical: 8 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Ionicons name="calendar-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>4th April</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 20 }}>
                                            <Ionicons name="time-outline" size={16} color="#fa0000" />
                                            <Text style={{ color: '#979998', fontFamily: 'FiraSans-Medium', marginLeft: 5 }}>6 AM</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25, borderRadius: 20, justifyContent: 'center', marginRight: 10, width: 200, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AllNitePage')} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Light', color: '#341551' }}>View All Niti</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Ionicons name="chevron-forward" size={24} color="#fa0000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Ratha Yatra Banner */}
                <View style={{ height: 150, marginVertical: 10 }}>
                    <Swiper
                        // autoplay
                        // autoplayTimeout={4}
                        showsPagination={true}
                        paginationStyle={{ bottom: -7 }}
                        dotColor="#999"
                        activeDotColor="#341551"
                        containerStyle={{ borderRadius: 10 }}
                    >
                        {TempleBanner.map((item, index) => (
                            <LinearGradient
                                colors={['#F06292', '#FFA726']} // orange to pink gradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                key={index}
                                style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {/* <View key={index} style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate(item.pageName)} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>View</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                    <Image source={item.image} style={{ width: 110, height: 100 }} resizeMode="contain" />
                                </View>
                                {/* </View> */}
                            </LinearGradient>
                        ))}
                    </Swiper>
                </View>

                {/* Live Broadcast Section */}
                <View style={styles.liveCard}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '26%' }}>
                            <Text style={styles.liveTitle}>Shree Mandira</Text>
                            <View style={{ marginTop: 5, borderRadius: 7, overflow: 'hidden' }}>
                                <LinearGradient
                                    colors={['#FFA726', '#F06292']} // orange to pink gradient
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
                            </View>
                        </View>
                        <View style={{ width: '34%' }}>
                            <Text style={{ textAlign: 'left', fontFamily: 'FiraSans-Light', color: '#000', fontSize: 13.6 }}>Listen or Watch all the live broadcasts from Shree Mandira</Text>
                        </View>
                        <View style={{ width: '36%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('LivePage')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                    {/* <FontAwesome6 name="radio" size={18} color="#6A0DAD" /> */}
                                    <Image source={require('../../assets/image/radio214142.png')} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#dd4c2f' }}>Radio</Text>
                            </View>
                            <View style={{ backgroundColor: 'red', height: 50, width: 1.4 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Tv')} style={{ backgroundColor: '#f8edfc', borderRadius: 100, padding: 10 }}>
                                    {/* <MaterialCommunityIcons name="youtube-tv" size={20} color="#6A0DAD" /> */}
                                    <Image source={require('../../assets/image/tv43.png')} style={{ width: 27, height: 27 }} />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'FiraSans-Medium', fontSize: 16, color: '#dd4c2f' }}>TV</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Services Section */}
                <View style={{ padding: 15 }}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Quick Services</Text>
                    {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} /> */}
                    <LinearGradient
                        colors={['#FFA726', '#F06292']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Darshan')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'calendar-check'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/darshan34.png')} style={{ width: 45, height: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Darshan</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MahaPrashad')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'food-apple'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/prasad879.png')} style={{ width: 55, height: 55 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>MahaPrashad</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Panji')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'calendar-month'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/panji765.png')} style={{ width: 35, height: 35 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Panji</Text>
                        </View>
                        <View style={{ alignItems: "center", width: "23%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Offering')} style={{ width: 75, height: 78, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#fff' }}>
                                {/* <MaterialCommunityIcons name={'gift'} size={33} color="white" /> */}
                                <Image source={require('../../assets/image/offerinh546.png')} style={{ width: 45, height: 45 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 12, color: '#333', marginTop: 5, textAlign: 'center', fontFamily: 'FiraSans-Regular' }}>Offering</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, height: 90, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 5 }, elevation: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('BhaktaNibas')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 14, fontFamily: 'FiraSans-SemiBold', color: '#333', lineHeight: 20 }}>Bhakta Nibas</Text>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 13, fontFamily: 'FiraSans-Regular', color: '#474747', lineHeight: 20 }}>Temple owned properties for pligrims to stay Comfortably</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <Image source={require('../../assets/image/bhaktanibash54.png')} style={{ width: 50, height: 50 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ParkingPage')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Parking</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>2, 3, 4 Wheelers</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                {/* <FontAwesome5 name="parking" size={30} color="#D64C64" /> */}
                                <Image source={require('../../assets/image/parking765.png')} style={{ width: 38, height: 38, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Locker_shoes')} style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Locker & Shoes</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Free Stand</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/locker675.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Online Donation</Text>
                                <Text style={{ fontSize: 12, color: '#777', marginTop: 2 }}>Donate Now</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                <Image source={require('../../assets/image/donation435.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: '48%', height: 80, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 15, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 }}>
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Hundi Collection</Text>
                                <Text style={{ fontSize: 12, color: '#fc2003', fontFamily: 'FiraSans-Medium', marginTop: 2 }}>₹5,30,000/-</Text>
                            </View>
                            <View style={{ width: '40%', alignItems: 'center' }}>
                                {/* <FontAwesome5 name="rupee-sign" size={27} color="#D64C64" /> */}
                                <Image source={require('../../assets/image/hundiColection654.png')} style={{ width: 33, height: 33 }} />
                            </View>
                        </View>
                    </View>

                </View>

                {/* Nearby Temples */}
                <View style={styles.nearbyContainer}>
                    {/* Title Section */}
                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Nearby Religious Places</Text>
                    {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4 }} /> */}
                    <LinearGradient
                        colors={['#FFA726', '#F06292']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                        }}
                    />

                    <View style={{ flexDirection: 'row', backgroundColor: '#F5EEF8', borderRadius: 10, marginVertical: 15, padding: 5 }}>
                        {/* Temples Tab */}
                        <LinearGradient
                            colors={selectedTab === 'Temples' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setSelectedTab('Temples')}
                                style={{
                                    flex: 1,
                                    // backgroundColor: selectedTab === 'Temples' ? '#D64C64' : 'transparent',
                                    borderRadius: 10,
                                    paddingVertical: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: selectedTab === 'Temples' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                    Temples
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        {/* Mathas Tab */}
                        <LinearGradient
                            colors={selectedTab === 'Mathas' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setSelectedTab('Mathas')}
                                style={{
                                    flex: 1,
                                    // backgroundColor: selectedTab === 'Mathas' ? '#D64C64' : 'transparent',
                                    borderRadius: 10,
                                    paddingVertical: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: selectedTab === 'Mathas' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                    Mathas
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        {/* Ritual Sites Tab */}
                        <LinearGradient
                            colors={selectedTab === 'RitualSites' ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                flex: 1,
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setSelectedTab('RitualSites')}
                                style={{
                                    flex: 1,
                                    // backgroundColor: selectedTab === 'RitualSites' ? '#D64C64' : 'transparent',
                                    borderRadius: 10,
                                    paddingVertical: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: selectedTab === 'RitualSites' ? '#fff' : '#000', fontFamily: 'FiraSans-Regular' }}>
                                    Ritual Sites
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={filteredPlaces}
                        horizontal
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={(content) => {
                            return (
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('NearbyTemple', content.item)} style={styles.sliderCard}>
                                        <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={content.item.coverImage} />
                                    </TouchableOpacity>
                                    <Text style={{ width: 140, fontSize: 14, fontFamily: 'FiraSans-Medium', color: '#333', marginTop: 7, textAlign: 'center' }}>{content.item.title}</Text>
                                </View>
                            )
                        }}
                    />
                </View>

                {/* conveniences */}
                <View style={{ padding: 15 }}>
                    {/* Title */}
                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Conveniences</Text>
                    {/* <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} /> */}
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
                                    } else if (item.label === 'Emergency Contact') {
                                        setEmergencyModalVisible(true);
                                    }
                                }}
                                style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}
                            >
                                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: item.page === 'DrinkingWater' ? "#feefec" : 'transparent', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    {/* <item.iconType name={item.icon} size={24} color="#D64C64" /> */}
                                    <Image source={item.image} style={{ width: item.page === 'DrinkingWater' ? 40 : 55, height: item.page === 'DrinkingWater' ? 40 : 55 }} resizeMode="contain" />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>

                    {conveniences.length > maxVisibleItems && (
                        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 20, marginTop: 10, alignSelf: 'center' }}>
                            <AntDesign name={expanded ? 'upcircleo' : 'downcircleo'} size={30} color="#D64C64" />
                        </TouchableOpacity>
                    )}
                </View>

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
                            <Text style={{ fontSize: 20, fontWeight: '700', color: '#341551', marginBottom: 15 }}>Emergency Contacts</Text>

                            {emergencyContacts.map((contact, index) => (
                                <TouchableOpacity key={index} onPress={() => handleCall(contact.phone)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 12, borderBottomWidth: index !== emergencyContacts.length - 1 ? 1 : 0, borderBottomColor: '#eee' }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{contact.name}</Text>
                                        <Text style={{ fontSize: 14, color: '#999' }}>{contact.phone}</Text>
                                    </View>
                                    <MaterialIcons name="call" size={24} color="#D64C64" />
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity onPress={() => setEmergencyModalVisible(false)} style={{ marginTop: 20, backgroundColor: '#D64C64', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 25 }}>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Banner Section */}
                {/* <View style={{ height: 150, marginTop: 10, marginBottom: 0 }}>
                    <Swiper
                        // autoplay
                        // autoplayTimeout={4}
                        showsPagination={true}
                        paginationStyle={{ bottom: -7 }}
                        dotColor="#999"
                        activeDotColor="#341551"
                        containerStyle={{ borderRadius: 10 }}
                    >
                        {bannerData.map((item, index) => (
                            <View key={index} style={{ width: width * 0.93, alignSelf: 'center', backgroundColor: '#341551', padding: 15, borderRadius: 10, height: 130, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: '80%' }}>
                                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'FiraSans-Medium' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'FiraSans-Regular' }}>{item.subtitle}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('TempleInformationPage')} style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5, marginTop: 10, width: 90, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#341551', fontFamily: 'FiraSans-SemiBold' }}>Know More</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-start' }}>
                                    <Image source={item.image} style={{ width: 85, height: 85 }} resizeMode="contain" />
                                </View>
                            </View>
                        ))}
                    </Swiper>
                </View> */}

                {/* Calendar Section */}
                {/* <View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Panji & Calendar</Text>
                        <View style={{ backgroundColor: 'red', width: 40, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    </View>
                    <ImageBackground source={require('../../assets/image/calendarBG.jpg')} style={styles.calendarContainer} imageStyle={{ resizeMode: 'cover', }}>
                        <Calendar
                            style={{ width: '90%', alignSelf: 'center', borderRadius: 10 }}
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: '#4B7100' },
                            }}
                            theme={{
                                backgroundColor: '#FBF5F5',
                                calendarBackground: '#fff',
                                textSectionTitleColor: '#4B7100',
                                selectedDayBackgroundColor: '#4B7100',
                                selectedDayTextColor: '#fff',
                                todayTextColor: '#D49100',
                                dayTextColor: '#333',
                                textDisabledColor: '#d9e1e8',
                                arrowColor: '#4B7100',
                                monthTextColor: '#4B7100',
                                textDayFontFamily: 'Lora-Bold',
                                textMonthFontFamily: 'Lora-Bold',
                                textDayHeaderFontFamily: 'Lora-Bold',
                                textDayFontSize: 16,
                                textMonthFontSize: 18,
                                textDayHeaderFontSize: 14,
                            }}
                        />
                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>Event's</Text>
                            <FlatList
                                data={eventTypes}
                                scrollEnabled={false}
                                numColumns={3}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => (
                                    <View style={styles.eventItem}>
                                        <Text style={styles.eventIcon}>{item.icon}</Text>
                                        <Text style={styles.eventText}>{item.name}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </ImageBackground>
                </View> */}

                {/* About Temple */}
                {/* <View style={{ padding: 15, marginTop: 10 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Temple Information</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 6 }}>
                        {templeInfo.map((item) => (
                            <View key={item.id} style={{ width: '30%', alignItems: 'center', marginBottom: 20 }}>
                                <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1ebf5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                                    <Image source={item.image} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4F4F4F', textAlign: 'center', fontWeight: '500' }}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View> */}

                {/* Temples Worldwide */}
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 20, fontFamily: 'FiraSans-Regular', color: '#341551', textAlign: 'center' }}>Jagannatha Temples Worldwide</Text>
                    <LinearGradient
                        colors={['#FFA726', '#F06292']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            width: 50, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 0, alignSelf: 'center'
                        }}
                    />
                    <View style={{ width: 270, alignSelf: 'center', backgroundColor: '#f2f0f0', padding: 5, borderRadius: 10, marginTop: 20 }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {['World Wide', 'India', 'Odisha'].map((location) => (
                                <LinearGradient
                                    key={location}
                                    colors={active === location ? ['#FFA726', '#F06292'] : ['transparent', 'transparent']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        flex: 1,
                                        borderRadius: 10,
                                        width: '32%',
                                        padding: 5,
                                        alignItems: 'center',
                                        borderRadius: 5,
                                    }}
                                >
                                    <TouchableOpacity onPress={() => setActive(location)}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: active === location ? '#fff' : '#333',
                                            fontFamily: 'FiraSans-Regular',
                                            fontWeight: active === location ? 'bold' : 'normal'
                                        }}>
                                            {location}
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            ))}
                        </View>
                    </View>
                    {active === 'World Wide' && (
                        <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                            <Image source={require('../../assets/image/world1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                    {active === 'India' && (
                        <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                            <Image source={require('../../assets/image/india1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                    {active === 'Odisha' && (
                        <TouchableOpacity onPress={() => navigation.navigate('TempleWorldWide')}>
                            <Image source={require('../../assets/image/odisha1.png')} style={{ width: width * 0.9, height: 220, borderRadius: 12, padding: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Extra Section */}
                {/* <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 22, fontFamily: 'FiraSans-Regular', color: '#341551' }}>Extra</Text>
                    <View style={{ backgroundColor: 'red', width: 45, height: 2, marginTop: 8, marginLeft: 4, marginBottom: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, backgroundColor: '#fff', padding: 10, borderRadius: 15 }}>
                        {serviceData.map((item, index) => (
                            <View key={index} style={{ alignItems: "center", width: "23%" }}>
                                <TouchableOpacity style={{
                                    backgroundColor: item.color,
                                    width: 75,
                                    height: 75,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 3,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                }}>
                                    <MaterialCommunityIcons name={item.icon} size={37} color="white" />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#333',
                                    marginTop: 5,
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}>{item.title}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{
                            width: '47%', height: 200, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                            shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{extraItems[0].title}</Text>
                            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{extraItems[0].description}</Text>
                            <Image source={{ uri: extraItems[0].image }} style={{ width: 70, height: 80, position: 'absolute', right: 0, bottom: 0 }} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'space-between' }}>
                            {extraItems.slice(1).map((item) => (
                                <View key={item.id} style={{
                                    height: 95, backgroundColor: '#fff', borderRadius: 12, padding: 15,
                                    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, marginBottom: 10
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{item.description}</Text>
                                    <Image source={{ uri: item.image }} style={{ width: 40, height: 40, position: 'absolute', right: 0, bottom: 0 }} />
                                </View>
                            ))}
                        </View>
                    </View>
                </View> */}
            </ScrollView>
            {/* Ratha Yatra Button */}
            {/* <View style={{ width: 70, height: 70, position: 'absolute', bottom: 20, right: 20, borderRadius: 100, overflow: 'hidden', elevation: 5 }}>
                <TouchableOpacity style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <Image source={require('../../assets/image/ratha1.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View> */}
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
        elevation: 1,
        marginTop: 10,
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
    sliderCard: {
        width: 150,
        height: 210,
        backgroundColor: '#E8F5E9',
        marginRight: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    calendarContainer: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 20,
    },
    eventContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'black',
        opacity: 0.5,
        borderRadius: 10,
        padding: 15,
        marginVertical: 15,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Lora-Bold',
        color: '#fff',
        marginBottom: 10,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '33%',
        marginBottom: 8,
    },
    eventIcon: {
        fontSize: 18,
        marginRight: 5,
    },
    eventText: {
        fontSize: 14,
        fontFamily: 'Lora-Regular',
        color: '#fff',
    },
});

export default Index;
