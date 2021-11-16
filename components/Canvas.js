import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, View, TextInput, Image, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import CanvasGrid from "./CanvasGrid";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  render() {
    const { route, navigation } = this.props;
    const { newColor } = route.params == null ? "white" : route.params;
    return (
      <View>
        <CanvasGrid currentColor={newColor}></CanvasGrid>
        <Button
          title="Pick Color"
          onPress={() => {
            this.props.navigation.navigate("ColorPicker");
          }}
        />

        <Text>color:{JSON.stringify(newColor)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
