import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const Index = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/image/splashScreen2.png')} />
            </View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        flex: 1,
    },
    logo: {
        height: '100%',
        width: '100%',
        // resizeMode: 'contain',
    },
})


// import React from 'react';
// import { StyleSheet, View, StatusBar } from 'react-native';
// import Video from 'react-native-video';

// const Index = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <StatusBar hidden={true}/>
//             <Video
//                 source={require('../../assets/video/splash1.mp4')} // Add your video here
//                 style={styles.backgroundVideo}
//                 resizeMode="cover" // Fullscreen cover
//                 muted={false} // No sound
//                 repeat={false} // Play only once
//                 controls={false} // Hide controls
//                 // onEnd={() => navigation.replace('Home')} // Navigate after video ends
//             />
//         </View>
//     );
// };

// export default Index;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black',
//     },
//     backgroundVideo: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
// });
