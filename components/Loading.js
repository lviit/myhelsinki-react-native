import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
const Loading = () => (
  <LottieView
    style={styles.spinner}
    source={require("../assets/27-loading.json")}
    autoPlay
    loop
  />
);

export default Loading;

const styles = StyleSheet.create({
  spinner: {
    alignSelf: "stretch",
    backgroundColor: "#eeeeee"
  }
});
