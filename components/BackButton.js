import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "native-base";

const BackButton = ({ handleBack }) => (
  <Button style={styles.button} onPress={handleBack}>
    <Text style={styles.buttonText}>{"< Back"}</Text>
  </Button>
);

export default BackButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    backgroundColor: "#ddd",
    alignSelf: "stretch"
  },
  buttonText: {
    color: "#3f3f3f",
    fontFamily: "ibm-plex-sans-condensed-bold",
    textTransform: "uppercase",
    fontSize: 12
  }
});
