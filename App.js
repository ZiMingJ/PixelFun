import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Tabbar from "./components/Tabbar";
import { Card } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      {/* <Canvas /> */}
      <View style={styles.container}>
        <View style={styles.container}>
          <NavigationContainer>
            <Tabbar />
            {/* <Stack.Navigator name="HomeComponent">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "Home" }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ title: "Profile" }}
              />
              <Stack.Screen
                name="Canvas"
                component={Canvas}
                options={{ title: "canvas" }}
              />
              <Stack.Screen
                name="ColorPicker"
                component={ColorPicker}
                options={{ title: "ColorPicker" }}
              />
            </Stack.Navigator> */}
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
