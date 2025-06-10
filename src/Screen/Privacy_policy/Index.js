// import { StyleSheet, SafeAreaView } from 'react-native';
// import React from 'react';
// import { WebView } from 'react-native-webview';

// const Index = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//         source={{ uri: 'http://temple.mandirparikrama.com/puri-website/privacy-policy' }}
//         startInLoadingState={true}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//       />
//     </SafeAreaView>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });


import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Index = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#341551',
        elevation: 4,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#fff',
          marginLeft: 12
        }}>
          Privacy Policy
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={{ paddingHorizontal: 20, paddingTop: 16 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{
          fontSize: 20,
          fontWeight: '800',
          color: '#dd4c2f',
          marginBottom: 25,
          textAlign: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#feae35',
          paddingBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Our Commitment to Your Privacy
        </Text>

        {[
          {
            title: '1. Information We Collect',
            body: 'We do not collect any personal information.'
          },
          {
            title: '2. How We Use Your Data',
            body: '• To improve our app experience and customer support.\n• To comply with legal requirements and prevent fraud.'
          },
          {
            title: '3. Data Protection Measures',
            body: 'We implement industry-standard security measures to protect your data from unauthorized access, loss, or misuse.'
          },
          {
            title: '4. Sharing of Information',
            body: 'We do not sell or trade your personal information.'
          },
          {
            title: '5. Your Rights',
            body: 'You have the right to request access, modification, or deletion of your personal data.'
          },
          {
            title: '6. Updates to Privacy Policy',
            body: 'We may update this policy periodically. Any changes will be communicated through our app.'
          },
          {
            title: 'For Queries',
            body: 'If you have any questions or concerns about your privacy, contact us at:\nPurim.hud@nic.in'
          }
        ].map((section, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 15,
              fontWeight: '600',
              color: '#feae35',
              marginBottom: 6
            }}>
              {section.title}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#444',
              lineHeight: 22
            }}>
              {section.body}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;