import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, View, TextInput, Image } from "react-native";
// import Tabbar from "@mindinventory/react-native-tab-bar-interaction";

import HomeIcon from "../assets/icons/home";
import ProfileIcon from "../assets/icons/profile";
import AddIcon from "../assets/icons/add";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home";
import Search from "../components/Search";
import Profile from "../components/Profile";
import Canvas from "../components/Canvas";

import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default class MyTabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  handleTabChange = active => {
    this.props.navigation.navigate(active);
  };

  render() {
    const { route, navigation } = this.props;

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      // <View style={styles.container}>
      //   <Text>tabb</Text>
      //   <Tabbar
      //     tabs={tabs}
      //     tabBarContainerBackground="white"
      //     tabBarBackground="grey"
      //     activeTabBackground="white"
      //     labelStyle={{ color: "#414954", fontWeight: "600", fontSize: 11 }}
      //     onTabChange={evt => this.handleTabChange(evt.name)}
      //   />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
