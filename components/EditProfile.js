import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  AppRegistry,
  ScrollView,
} from "react-native";

const Avatar = styled.View`
  padding: 20px 20px 20px 20px;
  background: white;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`;

const EditButton = styled.TouchableOpacity`
  background: white;
  justify-content: center;
  padding: 5px;
  align-items: center;
  border-width: 1px;
  border-color: gray;
  margin: 0px 10px 0px 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0 0 0;
  align-items: center;
  flex: 1;
`;
const RowBox = styled.View`
  margin-left: 50px;
`;
const EDitText = styled.TextInput`
  margin-left: 50px;
`;
const RowText = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  render() {
    const {} = this.props;
    return (
      <View>
        <Text>EditProfile</Text>
        {/* <Avatar>
          <Image
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/chicken.png?alt=media&token=dc3a138d-be0d-4783-b083-5cfc2658cb77`,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
        </Avatar>
        <EditButton onPress={() => console.log("eidt avator")}>
          <EditProfile>Edit Profile Photo</EditProfile>
        </EditButton>

        <Row>
          <RowBox>
            <RowText>Name</RowText>
          </RowBox>
          <RowBox>
            {/* <RowText>{this.props.Name}</RowText> */}
            <RowText>Name</RowText>
          </RowBox>
        </Row> */}
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: "center",
  },
  inputContainer: {
    height: 30,
    backgroundColor: "#EFEFEF",
  },
  input: {
    fontSize: 16,
  },
};
