import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Components/HomeScreen";
import CameraScreen from "./Components/CameraScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
