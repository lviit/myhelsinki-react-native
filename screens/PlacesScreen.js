import React from "react";
import { ScrollView, Text } from "react-native";

export default class PlacesScreen extends React.Component {
  static navigationOptions = {
    title: "Places"
  };

  render() {
    return (
      <ScrollView>
        <Text>Places</Text>
      </ScrollView>
    );
  }
}
