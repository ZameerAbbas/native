// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  // const navigation = useNavigation();

  // const navigateToCameraScreen = () => {
  //   navigation.navigate('./CameraScreen.js'); // Use the name of the screen from the stack navigator
  // };

  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      {/* <Button title="Go to Camera Screen" onPress={navigateToCameraScreen} /> */}
    </View>
  );
}

export default HomeScreen;
