// import React, { useEffect } from "react";
// import { View, Text, Button, PermissionsAndroid, StyleSheet } from "react-native";
// import { RNCamera } from "react-native-camera";

// const CameraScreen = () => {
//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Camera Permission",
//           message: "App needs access to your camera",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("Camera permission granted");
//       } else {
//         console.log("Camera permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.camera}>
//         <RNCamera
//           style={{ flex: 1 }}
//           type={RNCamera.Constants.Type.back}
//           autoFocus={RNCamera.Constants.AutoFocus.on}
//           flashMode={RNCamera.Constants.FlashMode.off}
//         />
//       </View>
//       <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
//         <Button title="Capture" onPress={() => capturePhoto()} />
//       </View>
//     </View>
//   );
// };

// export default CameraScreen;

// const styles = StyleSheet.create({
//   camera: {
//     width: "80%",
//     height: "50%"
//   }
// });



import React, { useEffect, useState } from "react";
import { View, Text, Button, PermissionsAndroid, StyleSheet, TouchableOpacity } from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import { RNCamera } from "react-native-camera";

const CameraScreen = () => {
  const [cameraType, setCameraType] = useState("back"); // 'back' for RNCamera, 'back' and 'front' for ExpoCamera
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      setHasPermission(status === "granted");
    } catch (err) {
      console.warn(err);
    }
  };

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType === "back" ? "front" : "back"));
  };

  const capturePhoto = () => {
    // Add logic for capturing photo based on the camera library being used
    // For example, use RNCamera's logic or ExpoCamera's logic
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission ? (
        <>
          {/** For RNCamera */}
          <View style={styles.camera}>
            <RNCamera
              style={{ flex: 1 }}
              type={RNCamera.Constants.Type[cameraType]}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.off}
            />
          </View>

          {/** For ExpoCamera */}
          {/* <ExpoCamera
            style={styles.camera}
            type={cameraType === "back" ? ExpoCamera.Constants.Type.back : ExpoCamera.Constants.Type.front}
          /> */}

          <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
            <Button title="Capture" onPress={capturePhoto} />
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
              <Text style={styles.flipText}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No camera permission granted</Text>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  flipButton: {
    flex: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: 16,
  },
  flipText: {
    fontSize: 18,
    color: "white",
  },
});
