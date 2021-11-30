import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";
import PixelArt from "./PixelArt";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  AppRegistry,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

const Title = styled.Text`
  font-size: 20px;
  font-weight: 400;
`;

const Wrapper = styled.View`
  justify-content: center;
  height: 50px;
  align-items: center;
  flex-direction: row;
`;
const PublishButton = styled.TouchableOpacity`
  alignItems: center;
  backgroundColor: #DDDDDD;
  padding: 10px;
  margin: 20px 100px 20px 100px;
>`;
export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      loading: false
    };
  }

  static defaultProps = {};

  render() {
    const { route, navigation } = this.props;
    const { backgroundColor, canvasData, onPublishPress } = route.params;
    return (
      <View>
        <PixelArt
          data={canvasData}
          backgroundColor={backgroundColor}
          size={Dimensions.get("window").width}
        />
        <Wrapper>
          <Icon
            name="pencil"
            style={{
              fontSize: 22,
              height: 22,
              paddingRight: 10,
              color: "tomato"
            }}
          ></Icon>

          <Title>Name Your Work</Title>
        </Wrapper>

        <Input
          placeholder="balabala"
          onChangeText={value =>
            this.setState({
              title: value
            })
          }
        />
        <PublishButton
          onPress={() => {
            this.setState({
              loading: true
            });
            onPublishPress(this.state.title);
          }}
        >
          {this.state.loading ? (
            <ActivityIndicator size="small" color="grey" />
          ) : (
            <Text>Publish</Text>
          )}
        </PublishButton>
      </View>
    );
  }
}

const styles = {};
