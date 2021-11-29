import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import LikeIcon from "../assets/like";
import CommentIcon from "../assets/comment";
import MoreIcon from "../assets/more";
import Card from "./Card";
import { PhotoGrid } from "./PhotoGrid";
import { SearchBar } from "react-native-elements";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  AppRegistry,
  ScrollView
} from "react-native";
import { Background } from "@react-navigation/elements";

const Photos = [];
for (let i = 0; i < 10; i++) {
  Photos.push({
    url: "https://picsum.photos/id/125/250/250"
  });
}
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  static defaultProps = {};

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <ScrollView>
          <PhotoGrid PhotosList={Photos} borderRadius={10} />
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
