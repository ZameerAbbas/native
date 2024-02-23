// HomeScreen.js
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';





const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToCameraScreen = () => {

    navigation.navigate("CameraScreen"); // Use the name of the screen from the stack navigator
  };

  // // Assuming your model file is named 'model.h5'
  // const model = tf.loadLayersModel('assets/DTreaty.h5');

  // console.log(model)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DTreaty</Text>
      <Text style={styles.subheading}>Empowering Farmers with AI</Text>
      <Text style={styles.description}>
        Detect crop diseases with our advanced computer vision techniques and
        receive treatment suggestions
      </Text>
      <TouchableOpacity style={styles.button} onPress={navigateToCameraScreen}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "black",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
