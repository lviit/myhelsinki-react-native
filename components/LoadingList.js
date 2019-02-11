import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const LoadingList = () => (
  <LottieView
    style={styles.list}
    source={require("../assets/474-skeleton-frame-loading.json")}
    autoPlay
    loop
  />
);

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#eeeeee"
  }
});

export default LoadingList;
