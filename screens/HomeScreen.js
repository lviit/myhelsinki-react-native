import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebBrowser } from "expo";
import { iOSUIKit } from "react-native-typography";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/helsinki-logo.png")}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text
              style={[iOSUIKit.title3Emphasized, styles.developmentModeText]}
            >
              React Native app using the MyHelsinki Open API. Check out the{" "}
              <Text
                onPress={this._handleMyHelsinkiLink}
                style={styles.helpLinkText}
              >
                official MyHelsinki website
              </Text>{" "}
              or have a closer look at this project on{" "}
              <Text
                onPress={this._handleGitHubLink}
                style={styles.helpLinkText}
              >
                Github.
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleGitHubLink = () => {
    WebBrowser.openBrowserAsync(
      "https://github.com/lviit/myhelsinki-react-native"
    );
  };

  _handleMyHelsinkiLink = () => {
    WebBrowser.openBrowserAsync("https://www.myhelsinki.fi/");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  developmentModeText: {
    marginBottom: 20,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center"
  },
  welcomeImage: {
    width: 150,
    height: 80,
    resizeMode: "contain"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    color: "#2e78b7"
  }
});
