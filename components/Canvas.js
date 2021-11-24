import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { PIXEL_COUNT, TOOLS } from "../constants";

import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import styled, { css } from "styled-components/native";
import CanvasGrid from "./CanvasGrid";
import { Background } from "@react-navigation/elements";

import Pencil from "../assets/icons/pencil.svg";
import Undo from "../assets/icons/undo.svg";
import Bucket from "../assets/icons/bucket.svg";
import Eraser from "../assets/icons/eraser.svg";
import GridIcon from "../assets/icons/grid.svg";

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
  "#0085FF"
];

let colorMap = [];
for (let i = 0; i < colors.length; i++) {
  colorMap.push({ color: colors[i] });
}

let history = [];

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

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawTab: true,
      selectedTool: "pencil",
      displayGrid: true,
      drawerShown: false,
      backgroundColor: "white",
      colorMap: colorMap,
      currentColor: "pink",
      canvasData: this.getInitialCanvasData()
    };
  }

  static defaultProps = {};

  getInitialCanvasData = () =>
    Array.from(
      {
        length: PIXEL_COUNT * PIXEL_COUNT
      },
      () => ({ color: "none" })
    );

  updateCanvas = data => {
    console.log(data);
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
    navigation.goBack();
  };

  render() {
    const { route, navigation } = this.props;
    const newColor =
      route.params === undefined
        ? this.state.currentColor
        : route.params.newColor;
    return (
      <View>
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
          />
          <IconButton
            active={!this.state.displayDrawTab}
            onPress={() =>
              this.setState({ displayDrawTab: !this.state.displayDrawTab })
            }
          />
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
        )}

        <ScrollView horizontal style={{ maxHeight: 80 }}>
          <Row>
            <ColorDrop
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
            />

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
        <Button
          title="Pick Color"
          onPress={() => {
            this.props.navigation.navigate("ColorPicker");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2
  }
});
