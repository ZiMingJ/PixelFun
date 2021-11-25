import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import LikeIcon from "../assets/icons/like";
import CommentIcon from "../assets/icons/comment";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList
} from "react-native";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0 6px 0;
  align-items: center;
`;

const Wrapper = styled.Pressable`
  border-radius: 8px;
  padding: 5px 20px 5px 20px;
  margin-bottom: 10px;
  align-items: flex-start;
  justify-content: space-around;
`;

const IconLabel = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  font-weight: 600;
  margin-right: 10px;
`;

const UserName = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 400;
`;

const Desc = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 14px;
  font-weight: 400;
`;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    likesCount: 2,
    commentsCount: 4,
    backgroundColor: "#EC9560",
    report: "babalabala",
    author: "Jerromy"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    likesCount: 2,
    commentsCount: 4,
    backgroundColor: "#4BBED0",
    report: "babalabala",
    author: "Jerromy"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    likesCount: 2,
    commentsCount: 4,
    backgroundColor: "#414954",
    report: "babalabala",
    author: "Jerromy"
  }
];

const Item = ({
  title,
  id,
  likesCount,
  commentsCount,
  backgroundColor,
  report,
  author
}) => {
  return (
    <Wrapper style={styles.item}>
      <Row>
        <Image
          source={{
            uri: `https://picsum.photos/id/125/250/250`
          }}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            borderStyle: "solid"
          }}
        />
        <UserName>{author}</UserName>
      </Row>

      <Image
        source={{
          uri: `https://picsum.photos/id/125/250/250`
        }}
        style={{
          width: 340,
          height: 340
        }}
      />
      <Row>
        <LikeIcon width={23} height={23} />
        <IconLabel>{likesCount} likes</IconLabel>
        <CommentIcon width={23} height={23} />
        <IconLabel>{commentsCount} comments</IconLabel>
      </Row>
    </Wrapper>
  );
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  render() {
    const renderItem = ({ item }) => (
      <Item
        title={item.title}
        id={item.id}
        likesCount={item.likesCount}
        commentsCount={item.commentsCount}
        backgroundColor={item.backgroundColor}
        report={item.report}
        author={item.author}
      />
    );

    return (
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
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
