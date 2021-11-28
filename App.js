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

import "react-native-gesture-handler";
//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";

import { firebase } from "./firebase/config";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./screens";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <SafeAreaProvider>
      {/* <Canvas /> */}
      <View style={styles.container}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              {user ? (
                <>
                  {/* <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen> */}
                  {/* <Tabbar /> */}
                  {/* <Stack.Screen name="Login" component={Tabbar} /> */}
                  <Stack.Screen
                    name="HomeTab"
                    component={Tabbar}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ColorPicker"
                    component={ColorPicker}
                    options={{ title: "ColorPicker" }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                  />
                </>
              )}
            </Stack.Navigator>
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
    backgroundColor: "#ecf0f1",
  },
});
