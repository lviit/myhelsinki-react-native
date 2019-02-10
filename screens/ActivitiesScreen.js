import React from "react";
import { ScrollView, Text } from "react-native";

export default class ActivitiesScreen extends React.Component {
  static navigationOptions = {
    title: "Activities"
  };

  render() {
    return (
      <ScrollView>
        <Text>Activities</Text>
      </ScrollView>
    );
  }
}
