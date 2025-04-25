import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'http://temple.mandirparikrama.com/puri-website/privacy-policy' }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
