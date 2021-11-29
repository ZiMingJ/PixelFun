import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import LikeIcon from "../assets/like";
import CommentIcon from "../assets/comment";
import MoreIcon from "../assets/more";
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
  margin: 5px 0 0 0;
  align-items: center;
  flex: 1;
`;

const Wrapper = styled.Pressable`
  border-radius: 8px;
  padding: 5px 20px 5px 20px;
  margin-bottom: 10px;
  align-items: flex-start;
  justify-content: space-around;
`;

const TopRow = styled.View`
  flex-direction: row;
  margin: 0px 0 0 0;
  align-items: center;
  justify-content: center;
`;
const IconLabel = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  font-weight: 500;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;

const UserName = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const TimeLabel = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #707070;
`;

const Item = ({
  title,
  id,
  likesCount,
  commentsCount,
  backgroundColor,
  report,
  author
}) => {};

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // title: this.props.title,
      // id: this.props.id,
      // likesCount: this.props.likesCount,
      // commentsCount: this.props.commentsCount,
      // backgroundColor: this.props.backgroundColor,
      // report: this.props.report,
      // author: this.props.author
    };
  }

  static defaultProps = {};

  render() {
    return (
      <Wrapper style={styles.item}>
        <TopRow>
          <Row>
            <Image
              source={{
                uri: `https://picsum.photos/id/125/250/250`
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13
              }}
            />
            <UserName>{this.props.author}</UserName>
          </Row>
          <MoreIcon width={25} height={25} />
        </TopRow>

        <Row>
          <Image
            source={{
              uri: `https://picsum.photos/id/125/250/250`
            }}
            style={{
              width: 340,
              height: 340
            }}
          />
        </Row>

        <Row>
          <LikeIcon width={23} height={23} />
          <IconLabel>{this.props.likesCount} likes</IconLabel>
          <CommentIcon width={23} height={23} />
          <IconLabel>{this.props.commentsCount} comments</IconLabel>
        </Row>
        <Row>
          <Title>{this.props.title}</Title>
        </Row>
        <Row>
          <TimeLabel>6 hours ago</TimeLabel>
        </Row>
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
