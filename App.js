import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        //require("./assets/474-skeleton-frame-loading.json"),
        //require("./assets/27-loading.json"),
        //require("./assets/images/helsinki-logo.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        //...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app,
        "ibm-plex-sans-condensed-bold": require("./assets/fonts/IBMPlexSansCondensed-Bold.ttf"),
        "ibm-plex-sans-condensed-semibold": require("./assets/fonts/IBMPlexSansCondensed-SemiBold.ttf"),
        "ibm-plex-sans-condensed-medium": require("./assets/fonts/IBMPlexSansCondensed-Medium.ttf"),
        "ibm-plex-sans-semibold": require("./assets/fonts/IBMPlexSans-SemiBold.ttf"),
        "ibm-plex-sans-regular": require("./assets/fonts/IBMPlexSans-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
