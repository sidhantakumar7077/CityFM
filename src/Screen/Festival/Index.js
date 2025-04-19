import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Easing, Image, ImageBackground, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment';

const Index = () => {

  const festival = [
    {
      id: 1,
      name: "Mahabishuba Sankranti, Hanuman Jayanti, RabanaBadha Prastab",
      date: "14/04/2025",
      day: 'Monday',
    },
    {
      id: 2,
      name: "Shree Mandira re Ramabhiseka",
      date: "22/04/2025",
      day: 'Tuesday',
    },
    {
      id: 3,
      name: "Shree Mandira re Rukmani Amavasya",
      date: "27/04/2025",
      day: 'Sunday',
    },
    {
      id: 4,
      name: "Shree Mandira re AkhyaTrutiya, Chandan Yatra Arambha",
      date: "30/4/2025",
      day: 'Wednesday',
    },
    {
      id: 5,
      name: "Shree Mandira re Niladri Mahodyastami",
      date: "05/05/2025",
      day: 'Monday',
    },
    {
      id: 6,
      name: "Shree Mandira re Mohini Ekadashi",
      date: "08/05/2025",
      day: 'Thursday',
    },
    {
      id: 7,
      name: "Shree Mandira re Nursingha Janma",
      date: "11/05/2025",
      day: 'Sunday',
    },
    {
      id: 8,
      name: "Shree Mandira re Bhaunri",
      date: "19/05/2025",
      day: 'Monday',
    },
    {
      id: 9,
      name: "Shree Mandira re Jalakrida Ekadashi",
      date: "23/05/2025",
      day: 'Friday',
    },
    {
      id: 10,
      name: "Shree Mandira Sabitri Amavasya, Jalakrida & Sagar Bije",
      date: "27/05/2025",
      day: 'Tuesday',
    },
    {
      id: 11,
      name: "Siva Bibaha",
      date: "31/05/2025",
      day: 'Saturday',
    },
    {
      id: 12,
      name: "Shree Mandira re Sitala Sasthi, Jalakrida",
      date: "01/06/2025",
      day: 'Sunday',
    },
    {
      id: 13,
      name: "Shree Mandira re Rajendrabhiseka & Sudasha Brata",
      date: "05/06/2025",
      day: 'Thursday',
    },
    {
      id: 14,
      name: "Shree Mandira re Rukmaniharan Ekadashi, Bibaha Mahosttaba & Jalakrida",
      date: "06/06/2025",
      day: 'Friday ',
    },
    {
      id: 15,
      name: "Shree Mandira re Champaka Dwadashi",
      date: "07/06/2025",
      day: 'Saturday',
    },
    {
      id: 16,
      name: "Shree Mandira re Daitapati Prabesa",
      date: "09/06/2025",
      day: 'Monday',
    },
    {
      id: 17,
      name: "Shree Mandira re Shree Jeunka ra Chaturthi Homo, Senapata Lagi",
      date: "10/06/2025",
      day: 'Tuesday',
    },
    {
      id: 18,
      name: "Shree Mandira re Snana Yatra, Gajanana Besha & Anabasara Arambha",
      date: "11/06/2025",
      day: 'Wednesday',
    },
    {
      id: 19,
      name: "Raja Sankranti",
      date: "15/06/2025",
      day: 'Thursday',
    },
    {
      id: 20,
      name: "Shree Mandira re Anabasra Chakabije",
      date: "20/06/2025",
      day: 'Friday',
    },
    {
      id: 21,
      name: "Shree Mandira re Anabasara Ekadashi & Khalilagi",
      date: "21/06/2025",
      day: 'Saturday',
    },
    {
      id: 22,
      name: "Shree Mandira re Anabasara Dwadashi & Rajaprasad Bije",
      date: "22/06/2025",
      day: 'Sunday',
    },
    {
      id: 23,
      name: "Shree Mandira re Anabasara Trayodashi & Ghanalagi",
      date: "23/06/2025",
      day: 'Monday',
    },
    {
      id: 24,
      name: "Banakalagi",
      date: "24/06/2025",
      day: 'Tuesday',
    },
    {
      id: 25,
      name: "Amavasya, Shree Jeu nka Banakalagi",
      date: "25/06/2025",
      day: 'Wednesday',
    },
    {
      id: 26,
      name: "Shree Mandira re Netroutsab, Nabajouban Darsan & Ratha Angyamala Bije",
      date: "26/06/2025",
      day: 'Thursday',
    },
    {
      id: 27,
      name: "Shree Gundicha Yatra",
      date: "27/06/2025",
      day: 'Friday',
    },
    {
      id: 28,
      name: "Herapanchami",
      date: "01/07/2025",
      day: 'Tuesday',
    },
    {
      id: 29,
      name: "Shree Jeu nka Sandhya Darsan",
      date: "04/07/2025",
      day: 'Friday',
    },
    {
      id: 30,
      name: "Shree Jeu nka Bahuda Yatra",
      date: "05/07/2025",
      day: 'Saturday',
    },
    {
      id: 31,
      name: "Shree Jeu nka Harisayan Ekadashi & BadaTadau Besha(Sunabesha)",
      date: "06/07/2025",
      day: 'Sunday',
    },
    {
      id: 32,
      name: "Ratha upare Shree Jeu nka Adhara Pana & Shree Garuda Sayan ",
      date: "07/07/2025",
      day: 'Monday',
    },
    {
      id: 33,
      name: "Shree Jeu nka Niladri Bije",
      date: "08/07/2025",
      day: 'Tuesday',
    },
    {
      id: 34,
      name: "Dakhinayan Sankranti",
      date: "16/07/2025",
      day: 'Wednesday',
    },
    {
      id: 35,
      name: "Shree Mandira re Kamada Or Chakrabula Ekadashi",
      date: "21/07/2025",
      day: 'Monday',
    },
    {
      id: 36,
      name: "Shree Mandira re Chitalagi Amavasya",
      date: "24/07/2025",
      day: 'Thursday',
    },
    {
      id: 37,
      name: "Shree Mandira re Badi Nursingha Bije",
      date: "03/08/2025",
      day: 'Sunday',
    },
    {
      id: 38,
      name: "Shree Mandira re Jhulana Yatra Arambha",
      date: "04/08/2025",
      day: 'Monday',
    },
    {
      id: 39,
      name: "Shree Mandira re Putrada Ekadashi",
      date: "05/08/2025",
      day: 'Tuesday',
    },
    {
      id: 40,
      name: "Shree Mandira re Balabhadra Janma & Rakhilagi",
      date: "09/08/2025",
      day: 'Saturday',
    },
    {
      id: 41,
      name: "Shree Mandira re Jhulana Yatra Sesha",
      date: "10/08/2025",
      day: 'Sunday',
    },
    {
      id: 42,
      name: "Shree Mandira re Rahurekha Lagi",
      date: "13/08/2025",
      day: 'Wednesday',
    },
    {
      id: 43,
      name: "Shree Mandira re Garbhaudaka Bandapana(Jeuta Bhoga)",
      date: "14/08/2025",
      day: 'Thursday',
    },
    {
      id: 44,
      name: "Shree Mandira re Janmastami",
      date: "15/08/2025",
      day: 'Friday',
    },
    {
      id: 45,
      name: "Shree Mandira re Nandoutsaba",
      date: "16/08/2025",
      day: 'Saturday',
    },
    {
      id: 46,
      name: "Shree Mandira re Banabhoji Besha, Kolibika & Bakasurabadha Prasatab & Arghasurabadha Prastab",
      date: "18/08/2025",
      day: 'Monday',
    },
    {
      id: 47,
      name: "Shree Mandira re Kaliyadalan Ekadashi, Kaliyadalan Besha & Dhenukasura Badha Prastab",
      date: "19/08/2025",
      day: 'Tuesday',
    },
    {
      id: 48,
      name: "Shree Mandira re Pralambasura Badha Besha",
      date: "20/08/2025",
      day: 'Wednesday',
    },
    {
      id: 49,
      name: "Shree Mandira re Krushnabalarama Besha, Arnnapratha Prastab",
      date: "21/08/2025",
      day: 'Thursday',
    },
    {
      id: 50,
      name: "Shree Mandira re Satapuri Tada Bije",
      date: "22/08/2025",
      day: 'Friday',
    },
    {
      id: 51,
      name: "Shree Mandira re Satapuri Amavasya & Bastraharana Lila",
      date: "23/08/2025",
      day: 'Saturday',
    },
    {
      id: 52,
      name: "Shree Mandira re Dabagni Lila",
      date: "24/08/2025",
      day: 'Sunday',
    },
    {
      id: 53,
      name: "Shree Mandira re Nikunjalila",
      date: "25/08/2025",
      day: 'Monday',
    },
    {
      id: 54,
      name: "Shree Mandira re Andhalila Prastab & Balitrutiya",
      date: "26/08/2025",
      day: 'Tuesday',
    },
    {
      id: 55,
      name: "Shree Mandira re Shree Ganesha Chaturthi",
      date: "27/08/2025",
      day: 'Wednesday',
    },
    {
      id: 56,
      name: "Shree Mandira re Rushipanchami & Dahalila",
      date: "28/08/2025",
      day: 'Thursday',
    },
    {
      id: 57,
      name: "Shree Mandira re Bimbasura Badha Prastab",
      date: "29/08/2025",
      day: 'Friday',
    },
    {
      id: 58,
      name: "Shree Mandira re Lalita Saptami, Kekesi Badha Lila & Kukutibrata",
      date: "30/08/2025",
      day: 'Saturday',
    },
    {
      id: 59,
      name: "Shree Mandira re Radhastami, Shree Sudarsan Debanka Ashram Bije, Durga Sayan",
      date: "31/08/2025",
      day: 'Sunday',
    },
    {
      id: 60,
      name: "Shree Mandira re Kansa badha Prastab, Labanikhia & Mathurahat Jur",
      date: "02/09/2025",
      day: 'Tuesday',
    },
    {
      id: 61,
      name: "Shree Mandira re Parshwa Paribarttan Ekadashi",
      date: "03/09/2025",
      day: 'Wednesday',
    },
    {
      id: 62,
      name: "Shree Mandira re Baman Janma & Suniaan, Indradhwaja Pooja & Garuda Parshwa Paribarttan",
      date: "04/09/2025",
      day: 'Thursday',
    },
    {
      id: 63,
      name: "Shree Mandira re Bimbasura Badha Prastab",
      date: "05/09/2025",
      day: 'Friday',
    },
    {
      id: 64,
      name: "Shree Mandira re Ananta Brat",
      date: "06/09/2025",
      day: 'Saturday',
    },
    {
      id: 65,
      name: "Shree Mandira re Indra Gobinda Bandapana, Indrahati Prastab",
      date: "07/09/2025",
      day: 'Sunday',
    },
    {
      id: 66,
      name: "Shree Mandira re Sahasrakumbhabhiseka, Debi Utthapana, Sodashadinamtaka Puja Arambha",
      date: "14/09/2025",
      day: 'Sunday',
    },
    {
      id: 67,
      name: "Shree Mandira re Indira Ekadashi",
      date: "17/09/2025",
      day: 'Wednesday',
    },
    {
      id: 68,
      name: "Shree Mandira re Mahalaya Amavasya & Sagar Bije",
      date: "21/09/2025",
      day: 'Sunday',
    },
    {
      id: 69,
      name: "Shree Mandira re Durgamadhabanka Bahar Bije",
      date: "22/09/2025",
      day: 'Monday',
    },
    {
      id: 70,
      name: "Shree Mandira re Mahasaptami",
      date: "28/09/2025",
      day: 'Sunday',
    },
    {
      id: 71,
      name: "Shree Mandira re Mahastami",
      date: "29/09/2025",
      day: 'Monday',
    },
    {
      id: 72,
      name: "Shree Mandira re Mahanabami",
      date: "30/09/2025",
      day: 'Tuesday',
    },
    {
      id: 73,
      name: "Shree Mandira re Dussehra & Ayudha Puja, Sudasha Brata",
      date: "02/10/2025",
      day: 'Thursday',
    },
    {
      id: 74,
      name: "Shree Mandira re Radhadamodara Besha & Baladhupa Arambha",
      date: "03/10/2025",
      day: 'Friday',
    },
    {
      id: 75,
      name: "Shree Mandira re Kumar Purnima, Shree Sudarsan Deba nka Ashram Bije",
      date: "07/10/2025",
      day: 'Tuesday',
    },
    {
      id: 76,
      name: "Shree Mandira re Rama Ekadashi & Garbhana Sankranti",
      date: "17/10/2025",
      day: 'Friday',
    },
    {
      id: 77,
      name: "Shree Mandira re Amavasya & Sagarbije",
      date: "21/10/2025",
      day: 'Tuesday',
    },
    {
      id: 78,
      name: "Shree Mandira re Anala Nabami",
      date: "31/10/2025",
      day: 'Friday',
    },
    {
      id: 79,
      name: "Shree Mandira re Laxminarayana Besha & Hari Utthapana Niti",
      date: "02/11/2025",
      day: 'Sunday',
    },
    {
      id: 80,
      name: "Shree Mandira re Shree Jeu nka Dalakia Or Tribikrama Besha – Garuda Utthapana",
      date: "03/11/2025",
      day: 'Monday',
    },
    {
      id: 81,
      name: "Shree Mandira re Shree Jeu nka Laxmi Nrusingha Besha",
      date: "04/11/2025",
      day: 'Tuesday',
    },
    {
      id: 82,
      name: "Shree Mandira re Karttika Purnima & Shree Jeu nka Rajadhiraja Besha",
      date: "05/11/2025",
      day: 'Wednesday',
    },
    {
      id: 83,
      name: "Shree Mandira re Prathamistami",
      date: "12/11/2025",
      day: 'Wednesday',
    },
    {
      id: 84,
      name: "Shree Mandira re Uthhapana Ekadashi",
      date: "15/11/2025",
      day: 'Saturday',
    },
    {
      id: 85,
      name: "Shree Mandira re Deba Deepabali Arambha",
      date: "19/11/2025",
      day: 'Wednesday',
    },
    {
      id: 86,
      name: "Shree Mandira re Deba Deepabali & Amavasya",
      date: "20/11/2025",
      day: 'Thursday',
    },
    {
      id: 87,
      name: "Shree Mandira re Deba Deepabali Sesha",
      date: "21/11/2025",
      day: 'Friday',
    },
    {
      id: 88,
      name: "Shree Mandira re Prabrana Or Odhani Sasthi",
      date: "26/11/2025",
      day: 'Wednesday',
    },
    {
      id: 89,
      name: "Shree Mandira re Gomati Ekadashi",
      date: "01/12/2025",
      day: 'Monday',
    },
    {
      id: 90,
      name: "Shree Mandira re Pandu Nrusingha Bije",
      date: "04/12/2025",
      day: 'Thursday',
    },
    {
      id: 91,
      name: "Shree Mandira re Saphala Ekadashi",
      date: "15/12/2025",
      day: 'Monday',
    },
    {
      id: 92,
      name: "Shree Mandira re Dhanu Sankranti & Pahali Bhoga Arambha",
      date: "16/12/2025",
      day: 'Tuesday',
    },
    {
      id: 93,
      name: "Shree Mandira re Bakula Amavasya & Sagar Bije",
      date: "20/12/2025",
      day: 'Saturday',
    },
    {
      id: 94,
      name: "Shree Mandira re Sambha Dashami, Putrada Ekadashi",
      date: "30/12/2025",
      day: 'Tuesday',
    },
    {
      id: 95,
      name: "Shree Mandira re Debabhiseka & Pushyabhiseka Purnima",
      date: "03/01/2026",
      day: 'Saturday',
    },
    {
      id: 96,
      name: "Shree Mandira re Dudha Melana",
      date: "12/01/2026",
      day: 'Monday',
    },
    {
      id: 97,
      name: "Shree Mandira re Nabanka Besha",
      date: "13/01/2026",
      day: 'Tuesday',
    },
    {
      id: 98,
      name: "Shree Mandira re Makar Sankranti & Satatila Ekadashi",
      date: "14/01/2026",
      day: 'Wednesday',
    },
    {
      id: 99,
      name: "Shree Mandira re Shree Jeu nka Padma Besha",
      date: "21/01/2026",
      day: 'Wednesday',
    },
    {
      id: 100,
      name: "Shree Mandira re Basant Panchami & Rathakatha Anukula Puja",
      date: "23/01/2026",
      day: 'Friday',
    },
    {
      id: 101,
      name: "Shree Mandira re Bhoumi Ekadashi",
      date: "29/01/2026",
      day: 'Thursday',
    },
    {
      id: 102,
      name: "Shree Mandira re Shree Jeu nja Gaja Udhharan Besha",
      date: "01/02/2026",
      day: 'Sunday',
    },
    {
      id: 103,
      name: "Shree Mandira re Kumbha Sankranti & Pankouddhara Ekadashi",
      date: "13/02/2026",
      day: 'Friday',
    },
    {
      id: 104,
      name: "Mahasibaratri",
      date: "15/02/2026",
      day: 'Sunday',
    },
    {
      id: 105,
      name: "Shree Mandira re Shree Jeu nka Phagu Dashami, Chacheri Besha, Sudasha Brat & Dola Yatra Arambha",
      date: "26/02/2026",
      day: 'Thursday',
    },
    {
      id: 106,
      name: "Shree Mandira re Papanasini Ekadashi",
      date: "27/02/2026",
      day: 'Friday',
    },
    {
      id: 107,
      name: "Shree Mandira re Rajagnyutsaba Or Mendhapodi",
      date: "02/03/2026",
      day: 'Monday',
    },
    {
      id: 108,
      name: "Shree Mandira re Dola Purnima & Rajadhiraj Besha",
      date: "03/03/2026",
      day: 'Tuesday',
    },
    {
      id: 109,
      name: "Shree Mandira re Holi Utsab, Chandan Anukula",
      date: "04/03/2026",
      day: 'Wednesday',
    },
    {
      id: 110,
      name: "Shree Mandira re Pap Mochini Ekadashi & Mina Sankranti",
      date: "15/03/2026",
      day: 'Sunday',
    },
    {
      id: 111,
      name: "Shree Mandira re Badi Nrusingha Bije",
      date: "22/03/2026",
      day: 'Sunday',
    },
    {
      id: 112,
      name: "Shree Mandira re Jeuta Bhoga & Ashokastami",
      date: "26/03/2026",
      day: 'Thursday',
    },
    {
      id: 113,
      name: "Shree Mandira re Jeuta Bhoga & Ashokastami",
      date: "26/03/2026",
      day: 'Thursday',
    },
    {
      id: 114,
      name: "Shree Mandira re Shree Ramanabami",
      date: "27/03/2026",
      day: 'Friday',
    },
    {
      id: 115,
      name: "Shree Mandira re Jangyarakhya",
      date: "28/03/2026",
      day: 'Saturday',
    },
    {
      id: 116,
      name: "Shree Mandira re Sita Bibaha & Kamada Ekadashi",
      date: "29/03/2026",
      day: 'Sunday',
    },
    {
      id: 117,
      name: "Shree Mandira re Kandarp Adhibasa, Banabasa",
      date: "30/03/2026",
      day: 'Monday',
    },
    {
      id: 118,
      name: "Shree Mandira re Dayanachori & Ananga Troyadashi",
      date: "31/03/2026",
      day: 'Tuesday',
    },
    {
      id: 119,
      name: "Shree Mandira re Damanaka Chaturdashi, Dayana Bedha, Mayamruga & Sita Chori",
      date: "01/04/2026",
      day: 'Wednesday',
    },
    {
      id: 120,
      name: "Shree Mandira re Lanka Podi",
      date: "03/04/2026",
      day: 'Friday',
    },
    {
      id: 121,
      name: "Shree Mandira re Setu Bandha",
      date: "04/04/2026",
      day: 'Saturday',
    },
    {
      id: 122,
      name: "Shree Mandira re Rabana Badha",
      date: "05/04/2026",
      day: 'Sunday',
    },
    {
      id: 123,
      name: "Shree Mandira re Ramabhiseka",
      date: "12/04/2026",
      day: 'Sunday',
    },
  ]

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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
            <Text style={styles.headerText}>Festivals</Text>
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
          {/* <ImageBackground source={require('../../assets/image/mangala_alati.jpg')} style={styles.headerImage} /> */}
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 15 }}>
            <View style={{ width: '75%' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>Festival Timing</Text>
              <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>Know The Bhoga Being Offered To Mahaprabhu & Mahaprasad Availability at Ananda Bazar</Text>
              <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Set Alert →</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '22%', alignItems: 'center', marginTop: 40 }}>
              <Image source={require('../../assets/image/festival21.png')} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
            </View>
          </View>
        </View>

        {/* Festival List */}
        {isLoading ? (
          <View style={{ flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#341551" />
            <Text style={{ marginTop: 10, color: '#341551', fontFamily: 'FiraSans-Regular' }}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={festival}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.festivalCard}>
                <LinearGradient colors={['#fbe6f2', '#fff']} style={styles.gradientCard}>
                  <View style={styles.cardHeader}>
                    <MaterialCommunityIcons name="party-popper" size={24} color="#B7070A" />
                    <Text style={styles.cardTitle}>{item.name}</Text>
                  </View>
                  <View style={styles.cardDetails}>
                    <MaterialIcons name="event" size={18} color="#555" />
                    <Text style={styles.cardDate}>
                      {moment(item.date, 'DD/MM/YYYY').format('DD MMM YYYY')} ({item.day})
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            )}
          />
        )}
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
  // Main content styles
  festivalCard: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  gradientCard: {
    padding: 16,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
    color: '#341551',
    fontFamily: 'FiraSans-Regular',
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardDate: {
    fontSize: 15,
    color: '#555',
    marginLeft: 6,
    fontFamily: 'FiraSans-Regular',
  },
})