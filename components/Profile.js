import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button
} from "react-native";
import styled, { css } from "styled-components/native";
import { FlatGrid } from "react-native-super-grid";
import { firebase } from "../firebase/config";
import PixelArt from "./PixelArt";

const HeaderWrapper = styled.View`
  padding: 20px 30px 10px 5px;
  background: white;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const Avatar = styled.View`
  padding: 20px 20px 20px 20px;
  background: white;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  padding-top: 10px;
`;
const EditProfile = styled.Text`
  font-size: 15px;
  font-weight: 400;
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

const NumberWrapper = styled.View`
  background: white;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`;

const Number = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const Tag = styled.Text`
  font-size: 12px;
  font-weight: 500;
`;

const InfosWrapper = styled.View`
  flex: 1;
  background: white;
  justify-content: center;
`;

const ButtonsRow = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background: white;
  padding-bottom: 10px;
`;
const IconButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 30px;
  border-bottom-width: ${({ active }) => (active ? "1px" : "0px")};
  width: 180px;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
`;

const examples = [
  { name: "TURQUOISE", code: "#1abc9c" },
  { name: "EMERALD", code: "#2ecc71" },
  { name: "PETER RIVER", code: "#3498db" },
  { name: "AMETHYST", code: "#9b59b6" },
  { name: "WET ASPHALT", code: "#34495e" },
  { name: "GREEN SEA", code: "#16a085" },
  { name: "NEPHRITIS", code: "#27ae60" },
  { name: "BELIZE HOLE", code: "#2980b9" },
  { name: "WISTERIA", code: "#8e44ad" },
  { name: "MIDNIGHT BLUE", code: "#2c3e50" },
  { name: "SUN FLOWER", code: "#f1c40f" },
  { name: "CARROT", code: "#e67e22" },
  { name: "ALIZARIN", code: "#e74c3c" },
  { name: "CLOUDS", code: "#ecf0f1" },
  { name: "CONCRETE", code: "#95a5a6" },
  { name: "ORANGE", code: "#f39c12" },
  { name: "PUMPKIN", code: "#d35400" },
  { name: "POMEGRANATE", code: "#c0392b" },
  { name: "SILVER", code: "#bdc3c7" },
  { name: "ASBESTOS", code: "#7f8c8d" }
];
const imagesRef = firebase.firestore().collection("images");
const draftsRef = firebase.firestore().collection("drafts");
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.extraData,
      showDrafts: false,
      published: examples,
      drafts: examples
    };
  }

  static defaultProps = {};

  componentDidMount() {
    imagesRef
      .where("userID", "==", this.state.userID)
      .orderBy("publishTime")
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          this.setState({
            published: newEntities
          });

          // setEntities(newEntities);
          console.log("GETPUBLISH!!!!");
          console.log(newEntities[0].title);
          console.log(newEntities[0].likes);
          console.log(newEntities[0].comments);
          console.log(newEntities[0].publishTime);
          console.log(newEntities[0].backGroundColor);
          console.log(newEntities[0].canvasData[0]);
          console.log(newEntities[0].userID);
          console.log("GETPUBLISh!!!!");
        },
        error => {
          console.log(error);
        }
      );
    draftsRef
      .where("userID", "==", this.state.userID)
      .orderBy("createdAt")
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          this.setState({
            drafts: newEntities
          });

          console.log("GETDRAFT!!!!");
          console.log(newEntities[0].createdAt);
          console.log(newEntities[0].backGroundColor);
          console.log(newEntities[0].canvasData[0]);
          console.log(newEntities[0].userID);
          console.log("GETDRAFT!!!!");
        },
        error => {
          console.log(error);
        }
      );
  }
  editProfile = () => {
    this.props.navigation.navigate("EditProfile");
  };
  renderItem = ({ index, item }) => (
    <View style={{ borderColor: "black", borderWidth: 1 }}>
      <PixelArt
        data={item.canvasData}
        backgroundColor={item.backGroundColor}
        size={130}
      />
    </View>
  );
  render() {
    const { route, navigation } = this.props;
    return (
      <InfosWrapper>
        <HeaderWrapper>
          <Avatar>
            <Image
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/chicken.png?alt=media&token=dc3a138d-be0d-4783-b083-5cfc2658cb77`
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40
              }}
            />

            <UserName>profile</UserName>
          </Avatar>
          <NumberWrapper>
            <Number>3</Number>
            <View>
              <Tag>Posts</Tag>
            </View>
          </NumberWrapper>
          <NumberWrapper>
            <Number>7</Number>
            <View>
              <Tag>Likes</Tag>
            </View>
          </NumberWrapper>
          <NumberWrapper>
            <Number>0</Number>
            <View>
              <Tag>Drafts</Tag>
            </View>
          </NumberWrapper>
        </HeaderWrapper>

        <EditButton onPress={() => navigation.navigate("EditProfile")}>
          <EditProfile>Edit Profile</EditProfile>
        </EditButton>
        <Text>{this.state.published.length}</Text>
        <ButtonsRow>
          <IconButton
            title="Published"
            onPress={() => this.setState({ showDrafts: false })}
            active={!this.state.showDrafts}
            icon="Picture"
            color="green"
          >
            <Text>Published</Text>
          </IconButton>
          <IconButton
            title="Drafts"
            onPress={() => this.setState({ showDrafts: true })}
            active={this.state.showDrafts}
            icon="EditPicture"
            color="yellow"
          >
            <Text>Drafts</Text>
          </IconButton>
        </ButtonsRow>
        {!this.state.showDrafts ? (
          <FlatGrid
            itemDimension={130}
            data={this.state.published}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={this.renderItem}
          />
        ) : (
          // <FlatGrid
          //   itemDimension={130}
          //   data={[1, 2, 3, 4]}
          //   renderItem={({ item }) => <Text>{item}</Text>}
          // />
          <FlatGrid
            itemDimension={130}
            data={examples}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
              <View
                style={[styles.itemContainer, { backgroundColor: item.code }]}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.code}</Text>
              </View>
            )}
          />
        )}
      </InfosWrapper>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
