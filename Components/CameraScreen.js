
// import { Camera, CameraType } from 'expo-camera';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CameraScreen() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//       <View></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 40,
//     justifyContent: 'start',
//     // backgroundColor: 'red'
//   },
//   camera: {
//     flex: 0.7,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 0,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   // btncontainer:{
//   //   flex:0.9,
//   //   backgroundColor: 'red',
//   // },
// });

import React, { useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";



export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading

    return <View style={styles.container} />;

    return <View />;

  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>

        <View style={styles.cameraContainer}>
          <Text>Lets Diagnose</Text>
          <Camera style={styles.camera} type={type} />
        </View>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Ionicons name="ios-camera" size={32} color="white" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
      <Text style ={styles.headingText}>Lets Diagnose</Text>
        <Camera style={styles.camera} type={type}>
          {/* <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
            <Ionicons name="ios-reverse-camera" size={32} color="white" />
          </TouchableOpacity> */}
        </Camera>
      </View>
      <TouchableOpacity style={styles.captureButton} onPress={toggleCameraType}>
        <Ionicons name="ios-camera" size={68} color="white" />
      </TouchableOpacity>
      <Text style={styles.precautiontext}>
        AI can make mistakes, so be careful.
      </Text>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    marginTop: 23,
  },
  camera: {
    flex: 0.7,
  },
  flipButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  permissionButton: {
    position: "absolute",
    bottom: 20,
    width: 64,
    height: 64,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  captureButton: {
    position: "absolute",
    bottom: 80,
    width: 90,
    height: 90,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 46,
  },
  precautiontext: {
    fontSize: 17,
    fontWeight: "bold",
    bottom: 23,
  },
  headingText:{
    marginTop: 32,
    marginBottom: 24,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'

  }
});
