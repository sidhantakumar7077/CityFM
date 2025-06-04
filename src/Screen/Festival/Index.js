import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated, Easing, Image, ImageBackground, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import moment from 'moment';

const Index = () => {

  const festival = [
    {
      id: 1,
      name: "Mahabisuba Sankranti, Hanuman Jayanti, Rabanabadha Prastaba",
      date: "14/04/2025",
      day: 'Monday',
      odiaName: "ମହାବିଷୁବ ସଂକ୍ରାନ୍ତି, ହନୁମାନ ଜୟନ୍ତୀ, ରାବଣବଧ ପ୍ରସ୍ତାବ",
      odiaDate: "୧୪/୦୪/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 2,
      name: "Shree Mandira re Ramabhiseka",
      date: "22/04/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରାମାଭିଷେକ",
      odiaDate: "୨୨/୦୪/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 3,
      name: "Shree Mandira re Rukmani Amavasya",
      date: "27/04/2025",
      day: 'Sunday',
      odiaName: "ରୁକ୍ମଣୀ ଅମାବାସ୍ୟା",
      odiaDate: "୨୭/୪/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 4,
      name: "Shree Mandira re AkhyaTrutiya, Chandan Yatra Arambha",
      date: "30/4/2025",
      day: 'Wednesday',
      odiaName: "ଅକ୍ଷୟତୃତୀୟା, ଚନ୍ଦନଯାତ୍ରା ଆରମ୍ଭ",
      odiaDate: "୩୦/୦୪/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 5,
      name: "Shree Mandira re Niladri Mahodyastami",
      date: "05/05/2025",
      day: 'Monday',
      odiaName: "ନୀଳାଦ୍ରୀ ମହୋଦୟାଷ୍ଟମୀ",
      odiaDate: "୦୫/୦୫/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 6,
      name: "Shree Mandira re Mohini Ekadashi",
      date: "08/05/2025",
      day: 'Thursday',
      odiaName: "ମୋହିନୀ ଏକାଦଶୀ",
      odiaDate: "୦୮/୦୫/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 7,
      name: "Shree Mandira re Nursingha Janma",
      date: "11/05/2025",
      day: 'Sunday',
      odiaName: "ନୃସିଂହ ଜନ୍ମ",
      odiaDate: "୧୧/୦୫/୨୦୨୫",
      odiaDay: "ରବିବାର",

    },
    {
      id: 8,
      name: "Shree Mandira re Bhaunri",
      date: "19/05/2025",
      day: 'Monday',
      odiaName: "",
      odiaDate: "ଭଉଁରୀ",
      odiaDay: "୧୯/୦୫/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 9,
      name: "Shree Mandira re Jalakrida Ekadashi",
      date: "23/05/2025",
      day: 'Friday',
      odiaName: "ଜଳକ୍ରୀଡା ଏକାଦଶୀ",
      odiaDate: "୨୩/୦୫/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 10,
      name: "Shree Mandira Sabitri Amavasya, Jalakrida & Sagar Bije",
      date: "27/05/2025",
      day: 'Tuesday',
      odiaName: "ସାବିତ୍ରୀ ଅମାବାସ୍ୟା, ଜଳକ୍ରୀଡା ଓ ସାଗର ବିଜେ",
      odiaDate: "୨୭/୦୫/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 11,
      name: "Siva Bibaha",
      date: "31/05/2025",
      day: 'Saturday',
      odiaName: "ଶିବ ବିବାହ",
      odiaDate: "୩୧/୦୫/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 12,
      name: "Shree Mandira re Sitala Sasthi, Jalakrida",
      date: "01/06/2025",
      day: 'Sunday',
      odiaName: "ଶୀତଳଷଷ୍ଠୀ, ଜଳକ୍ରୀଡା",
      odiaDate: "୦୧/୦୬/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 13,
      name: "Rajendrabhiseka & Sudasa Brata  in Shreemandira",
      date: "05/06/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରାଜେନ୍ଦ୍ରାଭିଷେକ ଓ ସୁଦଶା ବ୍ରତ",
      odiaDate: "୦୫/୦୬/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 14,
      name: "Rukminiharan Ekadashi, Jalakrida & Vivah Mahotsava  in Shreemandira",
      date: "06/06/2025",
      day: 'Friday ',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରୁକ୍ମିଣୀ ହରଣ ଏକାଦଶୀ ଓ ବିବାହ ମହୋତ୍ସବ ଓ ଜଳକ୍ରୀଡା",
      odiaDate: "୦୬/୦୬/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 15,
      name: "Champaka Dwadashi in Shreemandira",
      date: "07/06/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଚମ୍ପକ ଦ୍ଵାଦଶୀ",
      odiaDate: "୦୭/୦୬/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 16,
      name: "Daitapati Prabesha in Shreemandira",
      date: "09/06/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦଇତାପତି ପ୍ରବେଶ",
      odiaDate: "୦୯/୦୬/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 17,
      name: "Shree Jeunka ra Chaturthi Homa, Senapata Lagi in Shreemandira",
      date: "10/06/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କର ଚତୁର୍ଥୀ ହୋମ, ସେନାପଟା ଲାଗି",
      odiaDate: "୧୦/୦୬/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 18,
      name: "Snanajatra, Gajanana Besha & Anabasara begins in Shreemandira",
      date: "11/06/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସ୍ନାନଯାତ୍ରା, ଗଜାନନ ବେଶ ଓ ଅନବସର ଆରମ୍ଭ",
      odiaDate: "୧୧/୦୬/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 19,
      name: "Raja Sankranti",
      date: "15/06/2025",
      day: 'Sunday',
      odiaName: "ରଜ ସଂକ୍ରାନ୍ତି",
      odiaDate: "୧୫/୦୬/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 20,
      name: "Anabasara Chaka Bije in Shreemandira",
      date: "20/06/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅନବସର ଚକା ବିଜେ",
      odiaDate: "୨୦/୦୬/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 21,
      name: "Khalilagi & Anabasara Ekadashi in Shreemandira",
      date: "21/06/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅନବସର ଏକାଦଶୀ ଓ ଖଳିଲାଗି",
      odiaDate: "୨୧/୦୬/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 22,
      name: "Rajaprasada Bije & Anabasara Dwadashi in Shreemandira",
      date: "22/06/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅନବସର ଦ୍ବାଦଶୀ ଓ ରାଜପ୍ରସାଦ ବିଜେ",
      odiaDate: "୨୨/୦୬/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 23,
      name: "Ghanalagi & Anabasara Trayodashi in Shreemandira",
      date: "23/06/2025",
      day: 'Monday',
      odiaName: " ଶ୍ରୀମନ୍ଦିରରେ ଅନବସର ତ୍ରୟୋଦଶୀ ଓ ଘଣାଲାଗି",
      odiaDate: "୨୩/୦୬/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 24,
      name: "Amavasya, Shree Jeu nka Banakalagi",
      date: "25/06/2025",
      day: 'Wednesday',
      odiaName: "ଅମାବାସ୍ୟା , ଶ୍ରୀଜୀଉଙ୍କ ବନକଲାଗି",
      odiaDate: "୨୫/୦୬/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 25,
      name: "Netrotsav, Nabajaubana Darshan & Ratha Agyanmala Bije in Shreemandira",
      date: "26/06/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ନେତ୍ରୋଉତ୍ସବ, ନବଯୌବନ ଦର୍ଶନ ଓ ରଥ ଆଜ୍ଞାମାଳ ବିଜେ",
      odiaDate: "୨୬/୦୬/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 26,
      name: "Shree Gundicha Jatra",
      date: "27/06/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀଗୁଣ୍ଡିଚା ଯାତ୍ରା",
      odiaDate: "୨୭/୦୬/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 27,
      name: "Herapanchami",
      date: "01/07/2025",
      day: 'Tuesday',
      odiaName: "ହେରାପଞ୍ଚମୀ",
      odiaDate: "୦୧/୦୭/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 28,
      name: "Shree Jeu nka Sandhya Darshana",
      date: "04/07/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କ ସନ୍ଧ୍ୟା ଦର୍ଶନ",
      odiaDate: "୦୪/୦୭/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 29,
      name: "Shree Jeu nka Bahudajatra",
      date: "05/07/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କ ବାହୁଡା ଯାତ୍ରା",
      odiaDate: "୦୫/୦୭/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 30,
      name: "Shree Jeu nka Harisayan Ekadashi & Badatadhau Besha(Sunabesha)",
      date: "06/07/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କ ହରିଶୟନ ଏକାଦଶୀ ଓ ବଡତଢାଉ ବେଶ(ସୁନା ବେଶ)",
      odiaDate: "୦୬/୦୭/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 31,
      name: "Ratha upare Shree Jeu nka Adhara Pana & Shree Garuda Sayan ",
      date: "07/07/2025",
      day: 'Monday',
      odiaName: "ରଥ ଉପରେ ଶ୍ରୀଜୀଉଙ୍କ ଅଧର ପଣା ଓ ଶ୍ରୀଗରୁଡ ଶୟନ",
      odiaDate: "୦୭/୦୭/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 32,
      name: "Shree Jeu nka Niladri Bije",
      date: "08/07/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କ ନୀଳାଦ୍ରି ବିଜେ",
      odiaDate: "୦୮/୦୭/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 33,
      name: "Dakhinayan Sankranti",
      date: "16/07/2025",
      day: 'Wednesday',
      odiaName: "ଦକ୍ଷିଣାୟନ ସଂକ୍ରାନ୍ତି",
      odiaDate: "୧୬/୦୭/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 34,
      name: "Kamada Or Chakrabula Ekadashi in Shreemandira",
      date: "21/07/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କାମଦା ବା ଚକ୍ରବୁଲା ଏକାଦଶୀ",
      odiaDate: "୨୧/୦୭/୨୦୨୫",
      odiaDay: "ସୋମବର",
    },
    {
      id: 35,
      name: "Chitalagi Amabasya in Shreemandira",
      date: "24/07/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଚିତାଲାଗି ଅମାବାସ୍ୟା",
      odiaDate: "୨୪/୦୭/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 36,
      name: "Badi Nursingha Bije in Shreemandira",
      date: "03/08/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବାଡି ନୃସିଂହ ବିଜେ",
      odiaDate: "୦୩/୦୮/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 37,
      name: "Jhulanajatra begins in Shreemandira",
      date: "04/08/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଝୁଲଣ ଯାତ୍ରା ଆରମ୍ଭ",
      odiaDate: "୦୪/୦୮/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 38,
      name: "Putrada Ekadashi in Shreemandira",
      date: "05/08/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପୁତ୍ରଦା ଏକାଦଶୀ",
      odiaDate: "୦୫/୦୮/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 39,
      name: "Balabhadra Janma & Rakshilagi in Shreemandira",
      date: "09/08/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବଳଭଦ୍ର ଜନ୍ମ ଓ ରାକ୍ଷୀଲାଗି",
      odiaDate: "୦୯/୦୮/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 40,
      name: "Jhulanajatra ends in Shreemandira ",
      date: "10/08/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଝୁଲଣ ଯାତ୍ରା ଶେଷ",
      odiaDate: "୧୦/୦୮/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 41,
      name: "Rahurekha Lagi in Shreemandira",
      date: "13/08/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରାହୁରେଖା ଲାଗି",
      odiaDate: "୧୩/୦୮/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 42,
      name: "Garbhaudaka Bandapana (Jeuta Bhoga) in Shreemandira",
      date: "14/08/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଗର୍ଭଉଦକ ବନ୍ଦାପନା(ଜେଉଟ ଲାଗି)",
      odiaDate: "୧୪/୦୮/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 43,
      name: "Janmastami in Shreemandira",
      date: "15/08/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଜନ୍ମାଷ୍ଟମୀ",
      odiaDate: "୧୫/୦୮/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 44,
      name: "Nandotsava in Shreemandira",
      date: "16/08/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ନନ୍ଦୋତ୍ସବ",
      odiaDate: "୧୬/୦୮/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 45,
      name: "Banabhoji Besha, Kolibika, Bakasura Badha & Arghasura Badha Prastaba in Shreemandira",
      date: "18/08/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବଣଭୋଜିବେଶ, କୋଳିବିକା ଓ ବକାସୁରବଧ ପ୍ରସ୍ତାବ ଓ ଅର୍ଘାସୁରବଧ ପ୍ରସ୍ତାବ",
      odiaDate: "୧୮/୦୮/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 46,
      name: "Kaliyadalan Ekadashi, Kaliyadalan Besha & Dhenukasura Badha Prastaba in Shreemandira",
      date: "19/08/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କାଳୀୟଦଳନ ଏକାଦଶୀ, କାଳୀୟଦଳନ ବେଶ ଓ ଧେନୁକାସୁର ବଧ ପ୍ରସ୍ତାବ",
      odiaDate: "୧୯/୦୮/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 47,
      name: "Pralambasura Badha Besha in Shreemandira",
      date: "20/08/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପ୍ରଳମ୍ବାସୁର ବଧ ବେଶ",
      odiaDate: "୨୦/୦୮/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 48,
      name: "Krushnabalaram Besha, Annapratha Prastaba in Shreemandira",
      date: "21/08/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କୃଷ୍ଣବଳରାମ ବେଶ, ଅର୍ଣ୍ଣପ୍ରଥା ପ୍ରସ୍ତାବ",
      odiaDate: "୨୧/୦୮/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 49,
      name: "Satapuri Tada Bije in Shreemandira",
      date: "22/08/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସାତପୁରୀ ତାଡ ବିଜେ",
      odiaDate: "୨୨/୦୮/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 50,
      name: "Satapuri Amabasya & Bastraharan Leela in Shreemandira",
      date: "23/08/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସାତପୁରୀ ଅମାବାସ୍ୟା ଓ ବସ୍ତ୍ରହରଣ ଲୀଳା",
      odiaDate: "୨୩/୦୮/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 51,
      name: "Dabagni Leela in Shreemandira",
      date: "24/08/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦାବାଗ୍ନି  ଲୀଳା",
      odiaDate: "୨୪/୦୮/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 52,
      name: "Nikunja Leela in Shreemandira",
      date: "25/08/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ନିକୁଞ୍ଜଲୀଳା",
      odiaDate: "୨୫/୦୮/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 53,
      name: "Balitrutiya & Andha Leela Prastaba in Shreemandira",
      date: "26/08/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅନ୍ଧଲୀଳା ପ୍ରସ୍ତାବ ଓ ବାଲିତୃତୀୟା",
      odiaDate: "୨୬/୦୮/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 54,
      name: "Shree Ganesha Chaturthi in Shreemandira",
      date: "27/08/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଗଣେଶ ଚତୁର୍ଥୀ",
      odiaDate: "୨୭/୦୮/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 55,
      name: "Rushipanchami & Daha Leela in Shreemandira",
      date: "28/08/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଋଷିପଞ୍ଚମୀ ଓ ଦାହଲୀଳା",
      odiaDate: "୨୮/୦୮/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 56,
      name: "Bimbasura Badha Prastaba in Shreemandira",
      date: "29/08/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବିମ୍ବାସୁର ବଧ ପ୍ରସ୍ତାବ",
      odiaDate: "୨୯/୦୮/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 57,
      name: "Lalita Saptami, Kekesi Badha Leela & Kukutibrata in Shreemandira",
      date: "30/08/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଲଳିତା ସପ୍ତମୀ, କେକେଶି ବଧ ଲୀଳା ଓ କୁକୁଟୀବ୍ରତ",
      odiaDate: "୩୦/୦୮/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 58,
      name: "Radhastami, Sri Sudarsan Dev Ashrama Bije, Durgasayana in Shreemandira",
      date: "31/08/2025",
      day: 'Sunday',
      odiaName: "ରାଧାଷ୍ଟମୀ, ଶ୍ରୀସୁଦର୍ଶନ ଦେବଙ୍କ ଆଶ୍ରମ ବିଜେ, ଦୁର୍ଗାଶୟନ",
      odiaDate: "୩୧/୦୮/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 59,
      name: "Kansabadha Prastaba, Labanikhia & Mathurahata Jura in Shreemandira",
      date: "02/09/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କଂସବଧ ପ୍ରସ୍ତାବ, ଲବଣୀଖିଆ ଏବଂ ମଥୁରାହାଟ ଜୁର",
      odiaDate: "୦୨/୦୯/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 60,
      name: "Parswa Parivartana Ekadashi in Shreemandira",
      date: "03/09/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପାର୍ଶ୍ଵ ପରିବର୍ତ୍ତନ ଏକାଦଶୀ",
      odiaDate: "୦୩/୦୯/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 61,
      name: "Bamana Janma & Sunia, Indradhwaja Puja & Garuda Parswa Parivartana in Shreemandira",
      date: "04/09/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବାମନ ଜନ୍ମ ଓ ସୁନିଆଁ, ଇନ୍ଦ୍ରଧ୍ଵଜ ଓ ଗରୁଡ ପାର୍ଶ୍ଵ ପରିବର୍ତ୍ତନ",
      odiaDate: "୦୪/୦୯/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 62,
      name: "Balibamana Besha in Shreemandira",
      date: "05/09/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବଳିବାମନ ବେଶ",
      odiaDate: "୦୫/୦୯/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 63,
      name: "Ananta Brata in Shreemandira",
      date: "06/09/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅନନ୍ତ ବ୍ରତ",
      odiaDate: "୦୬/୦୯/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 64,
      name: "Indra Gobinda Bandapana, Indrahati Prastaba in Shreemandira",
      date: "07/09/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଇନ୍ଦ୍ର ଗୋବିନ୍ଦ ବନ୍ଦାପନା, ଇନ୍ଦ୍ରହାତୀ ପ୍ରସ୍ତାବ",
      odiaDate: "୦୭/୦୯/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 65,
      name: "Sahasrakumbhabhiseka, Devi Utthapana, Sodasadinatmaka Puja begins in Shreemandira",
      date: "14/09/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସହସ୍ରାକୁମ୍ଭାଭିଷେକ, ଦେବୀ ଉତ୍ଥାପନ, ଷୋଡଶଦିନାତ୍ମକ ପୂଜା ଆରମ୍ଭ",
      odiaDate: "୧୪/୦୯/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 66,
      name: "Indira Ekadashi in Shreemandira",
      date: "17/09/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଇନ୍ଦିରା ଏକାଦଶୀ",
      odiaDate: "୧୭/୦୯/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 67,
      name: "Mahalaya Amabasya & Sagara Bije in Shreemandira",
      date: "21/09/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ମହାଳୟା ଅମାବାସ୍ୟା ଓ ସାଗର ବିଜେ",
      odiaDate: "୨୧/୦୯/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 68,
      name: "Durga Madhaba Bahara Bije in Shreemandira",
      date: "22/09/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦୁର୍ଗାମାଧବଙ୍କ ବାହାର ବିଜେ",
      odiaDate: "୨୨/୦୯/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 69,
      name: "Maha Saptami in Shreemandira",
      date: "28/09/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ମହାସପ୍ତମୀ",
      odiaDate: "୨୮/୦୯/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 70,
      name: "Maha Astami in Shreemandira",
      date: "29/09/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ମହାଷ୍ଟମୀ",
      odiaDate: "୨୯/୦୯/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 71,
      name: "Maha Navami in Shreemandira",
      date: "30/09/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ମହାନବମୀ",
      odiaDate: "୩୦/୦୯/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 72,
      name: "Dashahara & Aayudha Puja, Sudasa Brata in Shreemandira",
      date: "02/10/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦଶହରା ଓ ଆୟୁଧ ପୂଜା, ସୁଦଶା ବ୍ରତ",
      odiaDate: "୦୨/୧୦/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 73,
      name: "Shreejeu nkara Radhadamodara Besha & Baladhupa begins in Shreemandira",
      date: "03/10/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କ ରାଧାଦାମୋଦର ବେଶ ଓ ବାଳଧୂପ ଆରମ୍ଭ",
      odiaDate: "୦୩/୧୦/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 74,
      name: "Kumar Purnima, Shree Sudarsan Deba nka Ashram Bije in Shreemandira",
      date: "07/10/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କୁମାର ପୂର୍ଣ୍ଣିମା, ଶ୍ରୀସୁଦର୍ଶନ ଦେବଙ୍କ ଆଶ୍ରମ ବିଜେ",
      odiaDate: "୦୭/୧୦/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 75,
      name: "Rama Ekadashi & Garbhana Sankranti in Shreemandira",
      date: "17/10/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରମା ଏକାଦଶୀ ଓ ଗର୍ଭଣା ସଂକ୍ରାନ୍ତି",
      odiaDate: "୧୭/୧୦/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 76,
      name: "Amavasya & Sagarbije in Shreemandira",
      date: "21/10/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅମାବାସ୍ୟା ଓ ସାଗର ବିଜେ",
      odiaDate: "୨୧/୧୦/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 77,
      name: "Anala Nabami in Shreemandira",
      date: "31/10/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଅଁଳାନବମୀ",
      odiaDate: "୩୧/୧୦/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 78,
      name: "Laxminarayana Besha & Hari Utthapana Niti in Shreemandira",
      date: "02/11/2025",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଲକ୍ଷ୍ମୀନାରାୟଣ ବେଶ ଓ ହରି ଉତ୍ଥାପନ ନୀତି",
      odiaDate: "୦୨/୧୧/୨୦୨୫",
      odiaDay: "ରବିବାର",
    },
    {
      id: 79,
      name: "Shree Jeu nka Dalakia Or Tribikrama Besha – Garuda Utthapana in Shreemandira",
      date: "03/11/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀଜୀଉଙ୍କ ଡାଳିକିଆ ବା ତ୍ରିବିକ୍ରମ ବେଶ – ଗରୁଡ ଉତ୍ଥାପନ",
      odiaDate: "୦୩/୧୧/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 80,
      name: "Shree Jeu nka Laxmi Nrusingha Besha in Shreemandira",
      date: "04/11/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କ ଲକ୍ଷ୍ମୀ ନୃସିଂହ ବେଶ",
      odiaDate: "୦୪/୧୧/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 81,
      name: "Kartika Purnima & Shree Jeu nka Rajadhiraja Besha in Shreemandira",
      date: "05/11/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କାର୍ତ୍ତିକ ପୂର୍ଣ୍ଣିମା ଓ ଶ୍ରୀଜୀଉଙ୍କ ରାଜାଧିରାଜ ବେଶ",
      odiaDate: "୦୫/୧୧/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 82,
      name: "Prathamastami in Shreemandira",
      date: "12/11/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପ୍ରଥମାଷ୍ଟମୀ",
      odiaDate: "୧୨/୧୧/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 83,
      name: "Utapana Ekadashi in Shreemandira",
      date: "15/11/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଉତ୍ପନା ଏକାଦଶୀ",
      odiaDate: "୧୫/୧୧/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 84,
      name: "Deva Deepavali begins in Shreemandira",
      date: "19/11/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦେବ ଦୀପାବଳୀ ଆରମ୍ଭ",
      odiaDate: "୧୯/୧୧/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 85,
      name: "Madhya Deva Deepavali & Amabasya in Shreemandira",
      date: "20/11/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦେବ ଦୀପାବଳୀ (ମଧ୍ୟ) ଓ ଅମାବାସ୍ୟା",
      odiaDate: "୨୦/୧୧/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 86,
      name: "Deva Deepavali ends in Shreemandira",
      date: "21/11/2025",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦେବ ଦୀପାବଳୀ ଶେଷ",
      odiaDate: "୨୧/୧୧/୨୦୨୫",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 87,
      name: "Prabarana / Odhanasasthi in Shreemandira",
      date: "26/11/2025",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପ୍ରାବରଣ ବା ଓଢଣ ଷଷ୍ଠୀ",
      odiaDate: "୨୬/୧୧/୨୦୨୫",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 88,
      name: "Gomati Ekadashi in Shreemandira",
      date: "01/12/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଗୋମତୀ ଏକାଦଶୀ",
      odiaDate: "୦୧/୧୨/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 89,
      name: "Pandu Nrusingha Bije in Shreemandira",
      date: "04/12/2025",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପଣ୍ଡୁ ନୃସିଂହ ବିଜେ",
      odiaDate: "୦୪/୧୨/୨୦୨୫",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 90,
      name: "Saphala Ekadashi in Shreemandira",
      date: "15/12/2025",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସଫଳା ଏକାଦଶୀ",
      odiaDate: "୧୫/୧୨/୨୦୨୫",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 91,
      name: "Dhanu Sankranti & Pahilibhoga begins in Shreemandira",
      date: "16/12/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଧନୁ ସଂକ୍ରାନ୍ତି ଓ ପହିଲି ଭୋଗ ଆରମ୍ଭ",
      odiaDate: "୧୬/୧୨/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 92,
      name: "Bakula Amabasya & Sagara Bije in Shreemandira",
      date: "20/12/2025",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବକୁଳ ଅମାବାସ୍ୟା ଓ ସାଗର ବିଜେ",
      odiaDate: "୨୦/୧୨/୨୦୨୫",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 93,
      name: "Sambadasami, Putrada Ekadashi in Shreemandira",
      date: "30/12/2025",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶାମ୍ବ ଦଶମୀ, ପୁତ୍ରଦା ଏକାଦଶୀ",
      odiaDate: "୩୦/୧୨/୨୦୨୫",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 94,
      name: "Devabhiseka & Pusyabhiseka Purnima in Shreemandira",
      date: "03/01/2026",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦେବାଭିଷେକ ଓ ପୁଷ୍ୟାଭିଷେକ ପୂର୍ଣ୍ଣିମା",
      odiaDate: "୦୩/୦୧/୨୦୨୬",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 95,
      name: "Dudha Melana in Shreemandira",
      date: "12/01/2026",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦୁଧ ମେଲାଣ",
      odiaDate: "୧୨/୦୧/୨୦୨୬",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 96,
      name: "Nabanka Besha in Shreemandira",
      date: "13/01/2026",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ନବାଙ୍କବେଶ",
      odiaDate: "୧୩/୦୧/୨୦୨୬",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 97,
      name: "Makara Sankranti & Sattila Ekadashi in Shreemandira",
      date: "14/01/2026",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ମକର ସଂକ୍ରାନ୍ତି ଓ ଷଟତିଳା  ଏକାଦଶୀ",
      odiaDate: "୧୪/୦୧/୨୦୨୬",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 98,
      name: "Padmabesha in Shreemandira",
      date: "21/01/2026",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କ ପଦ୍ମ ବେଶ",
      odiaDate: "୨୧/୦୧/୨୦୨୬",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 99,
      name: "Basanta Panchami & Ratha Katha Anukula Puja in Shreemandira",
      date: "23/01/2026",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବସନ୍ତ ପଞ୍ଚମୀ ଓ ରଥକାଠ ଅନୁକୂଳ ପୂଜା",
      odiaDate: "୨୩/୦୧/୨୦୨୬",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 100,
      name: "Bhaimi Ekadashi in Shreemandira",
      date: "29/01/2026",
      day: 'Thursday',
      odiaName: "ଭୈମୀ ଏକାଦଶୀ",
      odiaDate: "୨୯/୦୧/୨୦୨୬",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 101,
      name: "Gaja Uddharana Besha in Shreemandira",
      date: "01/02/2026",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କ ଗଜ ଉଦ୍ଧାରଣ ବେଶ",
      odiaDate: "୦୧/୦୨/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
    {
      id: 102,
      name: "Kumbha Sankranti & Pankoddhara Ekadashi in Shreemandira",
      date: "13/02/2026",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କୁମ୍ଭ ସଂକ୍ରାନ୍ତି ଓ ପଙ୍କୋଦ୍ଧାର ଏକାଦଶୀ",
      odiaDate: "୧୩/୦୨/୨୦୨୬",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 103,
      name: "Mahasivaratri",
      date: "15/02/2026",
      day: 'Sunday',
      odiaName: "ମହାଶିବରାତ୍ରୀ",
      odiaDate: "୧୫/୦୨/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
    {
      id: 104,
      name: "Phagudasami, Chacheri Besha, Sudasabrata & Dolajatra begins in Shreemandira",
      date: "26/02/2026",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀଜୀଉଙ୍କ ଫଗୁ ଦଶମୀ – ଚାଚେରୀବେଶ, ସୁଦଶା ବ୍ରତ ଓ ଦୋଳଯାତ୍ରା ଆରମ୍ଭ",
      odiaDate: "୨୬/୦୨/୨୦୨୬",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 105,
      name: "Papanasini Ekadashi in Shreemandira",
      date: "27/02/2026",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପାପନାଶିନୀ ଏକାଦଶୀ",
      odiaDate: "୨୭/୦୨/୨୦୨୬",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 106,
      name: "Mendhapodi in Shreemandira",
      date: "02/03/2026",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ମେଣ୍ଢାପୋଡି",
      odiaDate: "୦୨/୦୩/୨୦୨୬",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 107,
      name: "Dola Purnima & Rajadhiraj Besha in Shreemandira",
      date: "03/03/2026",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦୋଳ ପୂର୍ଣ୍ଣିମା ଓ ରାଜାଧିରାଜ ବେଶ",
      odiaDate: "୦୩/୦୩/୨୦୨୬",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 108,
      name: "Holi & Chandan Anukula in Shreemandira",
      date: "04/03/2026",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ହୋଲି ଉତ୍ସବ, ଚନ୍ଦନ ଅନୁକୂଳ",
      odiaDate: "୦୪/୦୩/୨୦୨୬",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 109,
      name: "Papamochani Ekadashi & Mina Sankranti in Shreemandira",
      date: "15/03/2026",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ପାପ ମୋଚନୀ ଏକାଦଶୀ ଓ ମୀନ ସଂକ୍ରାନ୍ତି",
      odiaDate: "୧୫/୦୩/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
    {
      id: 110,
      name: "Badinrushingha Bije in Shreemandira",
      date: "22/03/2026",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ବାଡିନୃସିଂହ ବିଜେ",
      odiaDate: "୨୨/୦୩/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
    {
      id: 111,
      name: "Jeuta Bhoga & Ashokastami in Shreemandira",
      date: "26/03/2026",
      day: 'Thursday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଜେଉଟ ଭୋଗ ଓ ଅଶୋକାଷ୍ଟମୀ",
      odiaDate: "୨୬/୦୩/୨୦୨୬",
      odiaDay: "ଗୁରୁବାର",
    },
    {
      id: 112,
      name: "Shree Ramnavami in Shreemandira",
      date: "27/03/2026",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଶ୍ରୀରାମନବମୀ",
      odiaDate: "୨୭/୦୩/୨୦୨୬",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 113,
      name: "Jagyanraksha in Shreemandira",
      date: "28/03/2026",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଯଜ୍ଞରକ୍ଷା",
      odiaDate: "୨୮/୦୩/୨୦୨୬",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 114,
      name: "Sita Vivah & Kamada Ekadashi in Shreemandira",
      date: "29/03/2026",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସୀତା ବିବାହ ଓ କାମଦା ଏକାଦଶୀ",
      odiaDate: "୨୯/୦୩/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
    {
      id: 115,
      name: "Kandarpa Adhibas, Banabasa in Shreemandira",
      date: "30/03/2026",
      day: 'Monday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ କନ୍ଦର୍ପ ଅଧିବାସ, ବନବାସ",
      odiaDate: "୩୦/୦୩/୨୦୨୬",
      odiaDay: "ସୋମବାର",
    },
    {
      id: 116,
      name: "Dayanachori & Ananga Thrayodashi in Shreemandira",
      date: "31/03/2026",
      day: 'Tuesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦୟଣାଚୋରି ଓ ଅନଙ୍ଗ ତ୍ରୟୋଦଶୀ",
      odiaDate: "୩୧/୦୩/୨୦୨୬",
      odiaDay: "ମଙ୍ଗଳବାର",
    },
    {
      id: 117,
      name: "Damanak Chaturdashi, Dayana Bedha, Mayamruga & Sitachori in Shreemandira",
      date: "01/04/2026",
      day: 'Wednesday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଦମନକ ଚତୁର୍ଦ୍ଦଶୀ, ଦୟଣା ବେଢା, ମାୟାମୃଗ ଓ ସୀତା ଚୋରି",
      odiaDate: "୦୧/୦୪/୨୦୨୬",
      odiaDay: "ବୁଧବାର",
    },
    {
      id: 118,
      name: "Lanka Podi in Shreemandira",
      date: "03/04/2026",
      day: 'Friday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ଲଙ୍କା ପୋଡି",
      odiaDate: "୦୩/୦୪/୨୦୨୬",
      odiaDay: "ଶୁକ୍ରବାର",
    },
    {
      id: 119,
      name: "Setubandha in Shreemandira",
      date: "04/04/2026",
      day: 'Saturday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ସେତୁବନ୍ଧ",
      odiaDate: "୦୪/୦୪/୨୦୨୬",
      odiaDay: "ଶନିବାର",
    },
    {
      id: 120,
      name: "Rabanabadha in Shreemandira",
      date: "05/04/2026",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରାବଣ ବଧ",
      odiaDate: "୦୫/୦୪/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
    {
      id: 121,
      name: "Ramabhiseka in Shreemandira",
      date: "12/04/2026",
      day: 'Sunday',
      odiaName: "ଶ୍ରୀମନ୍ଦିରରେ ରାମାଭିଷେକ",
      odiaDate: "୧୨/୦୪/୨୦୨୬",
      odiaDay: "ରବିବାର",
    },
  ]

  const today = moment().startOf('day');

  const upcomingFestivals = festival.filter(item =>
    moment(item.date, 'DD/MM/YYYY').isSameOrAfter(today)
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

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

  useEffect(() => {
    loadLanguage();
    console.log("Selected Language:", selectedLanguage);
  }, [isFocused, selectedLanguage]);

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
            <Text style={styles.headerText}>{selectedLanguage === 'Odia' ? 'ପର୍ବପର୍ବାଣି' : 'Festivals'}</Text>
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
              <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ପର୍ବପର୍ବାଣି ସମୟ' : 'Festival Timing'}</Text>
              <Text style={{ color: '#ddd', fontSize: 12, marginTop: 5, fontFamily: 'FiraSans-Regular' }}>{selectedLanguage === 'Odia' ? 'ପୁରୀ ମନ୍ଦିରର ସମସ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପର୍ବପର୍ବାଣି।' : 'All important festivals in Puri Temple.'}</Text>
              {/* <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' }}>
                <Text style={{ color: '#4B0082', fontFamily: 'FiraSans-Regular' }}>Set Alert →</Text>
              </TouchableOpacity> */}
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
            data={upcomingFestivals}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              const isEven = index % 2 === 0;
              const CardWrapper = isEven ? LinearGradient : View;
              const cardProps = isEven
                ? {
                  colors: ['#F06292', '#FFA726'],
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 0 },
                  style: styles.festivalCard,
                }
                : { style: styles.festivalCard };

              return (
                <CardWrapper {...cardProps}>
                  <View style={styles.innerCard}>
                    <View style={styles.cardHeader}>
                      <Text style={[styles.cardTitle, { color: isEven ? "#fff" : "#000" }]}>{selectedLanguage === 'Odia' ? item.odiaName : item.name}</Text>
                    </View>
                    <View style={styles.cardDetails}>
                      <MaterialIcons name="event" size={18} color={isEven ? "#fff" : "#000"} />
                      {selectedLanguage === 'Odia' ?
                        <Text style={[styles.cardDate, { color: isEven ? "#fff" : "#000" }]}>
                          {item.odiaDate} ({item.odiaDay})
                        </Text>
                        :
                        <Text style={[styles.cardDate, { color: isEven ? "#fff" : "#000" }]}>
                          {moment(item.date, 'DD/MM/YYYY').format('DD MMM YYYY')} ({item.day})
                        </Text>
                      }
                    </View>
                  </View>
                </CardWrapper>
              );
            }}
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
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden', // important for gradient and border radius!
  },

  innerCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'transparent', // so gradient shows if it's even item
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff', // white for better contrast on gradient
    fontFamily: 'FiraSans-Medium',
  },

  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  cardDate: {
    fontSize: 15,
    color: '#eeeeee', // lighter text on gradient
    marginLeft: 8,
    fontFamily: 'FiraSans-Regular',
  },
})