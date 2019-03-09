import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.text} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-regular",
    letterSpacing: 0.1,
    fontSize: 16
  }
});
