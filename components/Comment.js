import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  Pressable
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const LoadingAvatar = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

const LoadingUserName = styled.View`
  height: 16px;
  width: 100px;
  border-radius: 8px;
`;

const UserName = styled.Text`
  margin-left: 10px;
  font-weight: 600;
  font-size: 15px;
`;

const Wrapper = styled.View`
  padding: 15px;
  margin: 15px 15px 0 15px;
  border-radius: 8px;
  border-bottom-width: 1px;
  border-color: #ebebeb;
`;

const DateText = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  font-weight: 300;
  margin-left: 10px;
`;
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  static defaultProps = {};

  render() {
    const { key, text, id, user, time, userId } = this.props;
    return (
      <Wrapper>
        {this.state.loading ? (
          <Row>
            <LoadingAvatar />
            <LoadingUserName />
          </Row>
        ) : (
          <Row>
            <Image
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/chicken.png?alt=media&token=dc3a138d-be0d-4783-b083-5cfc2658cb77`
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20
              }}
            />
            <View>
              <UserName>{user === undefined ? "Unknown" : user}</UserName>
              <DateText>{time.toString()}</DateText>
            </View>
          </Row>
        )}
        <Text>{text}</Text>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
