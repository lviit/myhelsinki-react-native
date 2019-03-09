import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
//import Text from "../components/Text";
import { MonoText } from "../components/StyledText";
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
            <MonoText style={styles.developmentModeText}>
              React Native app using the MyHelsinki Open API. Check out the{" "}
              <MonoText
                onPress={this._handleMyHelsinkiLink}
                style={styles.helpLinkText}
              >
                official MyHelsinki website
              </MonoText>{" "}
              or have a closer look at this project on{" "}
              <MonoText
                onPress={this._handleGitHubLink}
                style={styles.helpLinkText}
              >
                Github.
              </MonoText>
            </MonoText>
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
