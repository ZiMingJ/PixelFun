import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import Card from "./Card";
import { PhotoGrid } from "./PhotoGrid";
import { SearchBar } from "react-native-elements";
import { firebase } from "../firebase/config";
import { FlatGrid } from "react-native-super-grid";
import PixelArt from "./PixelArt";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  AppRegistry,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Background } from "@react-navigation/elements";

const Photos = [];
for (let i = 0; i < 10; i++) {
  Photos.push({
    url: "https://picsum.photos/id/125/250/250"
  });
}
const imagesRef = firebase.firestore().collection("images");
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      index: null,
      userID: this.props.userID,
      data: Photos
    };
  }

  static defaultProps = {};

  updateSearch = search => {
    this.setState({ search });
  };

  viewDetail = item => {
    this.props.navigation.navigate("Detail", item);
  };

  componentDidMount() {
    imagesRef
      //.where("authorID", "==", userID)
      .orderBy("publishTime", "desc")
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          console.log(newEntities.length);
          // setEntities(newEntities);
          this.setState({
            data: newEntities
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  renderItem = ({ index, item }) => (
    <TouchableOpacity onPress={() => {}}>
      <PixelArt
        data={item.canvasData}
        backgroundColor={item.backGroundColor}
        size={180}
      />
    </TouchableOpacity>
  );

  render() {
    const { search } = this.state;
    return (
      <View>
        <ScrollView>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            platform="ios"
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <FlatGrid
            spacing={20}
            data={this.state.data}
            style={styles.gridView}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: "center"
  },
  inputContainer: {
    height: 30,
    backgroundColor: "#EFEFEF"
  },
  input: {
    fontSize: 16
  }
};
