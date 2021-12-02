import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { PIXEL_COUNT, HEADER_HEIGHT, TOOLS } from "../constants";

import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import styled, { css } from "styled-components/native";
import CanvasGrid from "./CanvasGrid";
import { Background } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/Ionicons";

import { firebase } from "../firebase/config";
import { Button, Overlay } from "react-native-elements";

import Pencil from "../assets/icons/pencil.svg";
import Undo from "../assets/icons/undo.svg";
import Bucket from "../assets/icons/bucket.svg";
import Eraser from "../assets/icons/eraser.svg";
import GridIcon from "../assets/icons/grid.svg";
import Clear from "../assets/icons/clear.svg";
import { is } from "css-select";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Wrapper = styled.View`
  flex: 1;
`;

let colors = [
  "#2B2D42",
  "#FFFFFF",
  "#ED6A5A",
  "#FFB800",
  "#35CE8D",
  "#4DB3FF",
  "#0085FF",
  "#274B6D"
];

let colorMap = [];
for (let i = 0; i < colors.length; i++) {
  colorMap.push({ color: colors[i] });
}

let history = [];

const MyHeader = styled.View`
  padding-top: 50px;
  height: ${HEADER_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const MyHeaderTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${SCREEN_HEIGHT > 750 ? 25 : 15}px;
  align-items: center;
  max-height: 50px;
`;

const ColorDrop = styled.TouchableOpacity`
  height: ${({ selected }) => (selected ? 50 : 40)}px;
  width: ${({ selected }) => (selected ? 50 : 40)}px;
  background: ${({ color }) => color};
  border-width: ${({ color }) => (color === "#FFFFFF" ? 1 : 0)}px;
  border-radius: 25px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background: ${({ active }) => (active ? "skyblue" : "#fff")};
`;

const IconButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 30px;
  border-radius: 15px;
  background: ${({ active }) => (active ? "skyblue" : "#fff")};
  width: 150px;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
`;

const CustomizeButton = styled.TouchableOpacity`
  alignItems: center;
  backgroundColor: #DDDDDD;
  padding: 10px;
  margin: 20px 100px 20px 100px;
>`;

const imagesRef = firebase.firestore().collection("images");
const draftsRef = firebase.firestore().collection("drafts");
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawTab: true,
      selectedTool: "pencil",
      displayGrid: true,
      drawerShown: false,
      backgroundColor:
        this.props.route.params.backgroundColor === undefined
          ? "white"
          : this.props.route.params.backgroundColor,
      colorMap: colorMap,
      currentColor: colorMap[0].color,
      canvasData:
        this.props.route.params.initialData === undefined
          ? this.getInitialCanvasData()
          : this.props.route.params.initialData,
      userID:
        this.props.route.params.uid === undefined
          ? 0
          : this.props.route.params.uid,
      itemId:
        this.props.route.params.itemId === undefined
          ? 0
          : this.props.route.params.itemId,
      isVisible: false
    };
  }

  static defaultProps = {};

  onPublishPress = title => {
    if (this.state.itemId != 0) {
      this.deleteDraft(this.state.itemId);
    }
    console.log(title);
    //if (entityText && entityText.length > 0) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      userID: this.state.userID,
      backGroundColor: this.state.backgroundColor,
      canvasData: this.state.canvasData,
      publishTime: timestamp,
      title: title,
      likes: 0,
      comments: 0
    };
    imagesRef
      .add(data)
      .then(_doc => {
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        alert(error);
      });
    //}
  };

  deleteDraft = itemId => {
    draftsRef.doc(itemId).delete();
  };

  onDraftPress = () => {
    //if (entityText && entityText.length > 0) {
    if (this.state.itemId != 0) {
      draftsRef.doc(this.state.itemId).update({
        backGroundColor: this.state.backgroundColor,
        canvasData: this.state.canvasData
      });
      this.props.navigation.navigate("Profile");
    } else {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        userID: this.state.userID,
        backGroundColor: this.state.backgroundColor,
        canvasData: this.state.canvasData,
        createdAt: timestamp
      };
      draftsRef
        .add(data)
        .then(_doc => {
          this.props.navigation.navigate("Profile");
          // setEntityText("");
          // Keyboard.dismiss();
        })
        .catch(error => {
          alert(error);
        });
    }

    //}
  };

  getInitialCanvasData = () =>
    Array.from(
      {
        length: PIXEL_COUNT * PIXEL_COUNT
      },
      () => ({ color: "none" })
    );

  updateCanvas = data => {
    history.push(this.state.canvasData);
    if (history.length > 10) {
      history.shift();
    }
    this.setState({
      canvasData: data
    });
  };

  goBack = () => {
    this.setState({
      backgroundColor: "white",
      canvasData: this.getInitialCanvasData()
    });
    this.props.navigation.goBack();
  };

  updateColorMap = newColor => {
    let colorMap = this.state.colorMap;
    for (let i = 0; i < colorMap.length; i++) {
      if (colorMap[i].color === this.state.currentColor) {
        colorMap[i].color = newColor;
      }
    }
    this.setState({
      colorMap,
      currentColor: newColor
    });
  };

  render() {
    const { route, navigation } = this.props;
    const newColor =
      route.params === undefined
        ? this.state.currentColor
        : route.params.newColor;
    this.state.userID = route.params === undefined ? 0 : route.params.uid;
    const nonEmpty = this.state.canvasData.some(item => item.color !== "none");

    return (
      <View style>
        <MyHeader>
          <Icon
            name="md-backspace"
            style={styles.actionButtonIcon}
            onPress={() => {
              if (nonEmpty) {
                Alert.alert(
                  "Save your work?",
                  "You can edit it later from your profile page.",
                  [
                    {
                      text: "No thanks",
                      onPress: () => {
                        this.goBack();
                      },
                      style: "destructive"
                    },
                    {
                      text: "Sure!",
                      onPress: () => {
                        this.onDraftPress();
                        this.goBack();
                      }
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                this.goBack();
              }
            }}
          ></Icon>
          <MyHeaderTitle>Canvas</MyHeaderTitle>
          <Icon
            name="md-save"
            style={styles.actionButtonIcon}
            onPress={() => {
              if (nonEmpty) {
                navigation.navigate("Publish", {
                  canvasData: this.state.canvasData,
                  backgroundColor: this.state.backgroundColor,
                  onPublishPress: this.onPublishPress
                });
              } else {
                Alert.alert("Oh no!", "You cannot submit an empty canvas!");
              }
            }}
          ></Icon>
        </MyHeader>
        <CanvasGrid
          currentColor={this.state.currentColor}
          backgroundColor={this.state.backgroundColor}
          selectedTool={this.state.selectedTool}
          displayGrid={this.state.displayGrid}
          data={this.state.canvasData}
          updateData={this.updateCanvas}
        ></CanvasGrid>
        <Row>
          <IconButton
            active={this.state.displayDrawTab}
            onPress={() =>
              this.setState({ displayDrawTab: !this.state.displayDrawTab })
            }
          >
            <Text>Draw</Text>
          </IconButton>
          <IconButton
            active={!this.state.displayDrawTab}
            onPress={() =>
              this.setState({ displayDrawTab: !this.state.displayDrawTab })
            }
          >
            <Text>Background</Text>
          </IconButton>
        </Row>

        {this.state.displayDrawTab ? (
          <Row style={{ justifyContent: "space-around" }}>
            <IconWrapper
              active={this.state.selectedTool === TOOLS.PENCIL}
              onPress={() =>
                this.setState({
                  selectedTool: TOOLS.PENCIL
                })
              }
            >
              <Pencil width={33} height={33} />
            </IconWrapper>
            <IconWrapper
              active={this.state.selectedTool === TOOLS.BUCKET}
              onPress={() =>
                this.setState({
                  selectedTool: TOOLS.BUCKET
                })
              }
            >
              <Bucket width={33} height={33} />
            </IconWrapper>
            <IconWrapper
              active={this.state.selectedTool === TOOLS.ERASER}
              onPress={() =>
                this.setState({
                  selectedTool: TOOLS.ERASER
                })
              }
            >
              <Eraser width={33} height={33} />
            </IconWrapper>
            <IconWrapper
              active={false}
              onPress={() => {
                this.updateCanvas(this.getInitialCanvasData());
              }}
            >
              <Clear width={30} height={30} />
            </IconWrapper>
            <IconWrapper
              active={false}
              disabled={history.length <= 1}
              onPress={() => {
                if (history.length > 1) {
                  this.setState({
                    canvasData: history[history.length - 2]
                  });
                  history.pop();
                }
              }}
            >
              <Undo width={30} height={30} />
            </IconWrapper>
          </Row>
        ) : (
          <Row>
            <IconWrapper
              active={this.state.displayGrid}
              onPress={() =>
                this.setState({
                  displayGrid: !this.state.displayGrid
                })
              }
            >
              <GridIcon width={33} height={33} />
            </IconWrapper>
          </Row>
        )}

        <ScrollView horizontal style={{ maxHeight: 80 }}>
          <Row>
            {/* <ColorDrop
              color={newColor}
              selected={
                this.state.selectedTool !== TOOLS.ERASER &&
                this.state.displayDrawTab
                  ? newColor === this.state.currentColor
                  : newColor === this.state.backgroundColor
              }
              onPress={() => {
                if (this.state.displayDrawTab) {
                  this.setState({
                    currentColor: newColor
                  });
                  if (this.state.selectedTool === TOOLS.ERASER) {
                    this.setState({
                      selectedTool: TOOLS.ERASER
                    });
                  }
                } else {
                  this.setState({
                    backgroundColor: newColor
                  });
                }
              }}
            /> */}

            {this.state.colorMap.map((item, index) => (
              <ColorDrop
                key={index}
                color={item.color}
                selected={
                  this.state.selectedTool !== TOOLS.ERASER &&
                  this.state.displayDrawTab
                    ? item.color === this.state.currentColor
                    : item.color === this.state.backgroundColor
                }
                onPress={() => {
                  if (this.state.displayDrawTab) {
                    this.setState({
                      currentColor: item.color
                    });
                    if (this.state.selectedTool === TOOLS.ERASER) {
                      this.setState({
                        selectedTool: TOOLS.ERASER
                      });
                    }
                  } else {
                    this.setState({
                      backgroundColor: item.color
                    });
                  }
                }}
              />
            ))}
          </Row>
        </ScrollView>
        <CustomizeButton
          onPress={() => {
            this.props.navigation.navigate("ColorPicker", {
              updateColorMap: this.updateColorMap,
              currentColor: this.state.currentColor
            });
          }}
        >
          <Text>Customize</Text>
        </CustomizeButton>
        {/* <Button title="Publish" onPress={this.onPublishPress} />
        <Button title="Draft" onPress={this.onDraftPress} />
        <Button
          title="Open Overlay"
          onPress={() =>
            this.setState({
              isVisible: !this.state.isVisible
            })
          }
        />

        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() =>
            this.setState({
              isVisible: !this.state.isVisible
            })
          }
        >
          <Text>Hello from Overlay!</Text>
        </Overlay> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2
  },

  actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: "skyblue",
    marginHorizontal: 20
  }
});
