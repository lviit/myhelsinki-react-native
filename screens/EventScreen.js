import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Text, Content, Button } from "native-base";
import { format } from "date-fns";
import Loading from "../components/Loading";
import HTML from "react-native-render-html";

export default class EventScreen extends React.Component {
  static navigationOptions = {
    title: "Event"
  };

  state = {
    eventData: {
      description: { images: [{}], body: "" },
      event_dates: { starting_day: "" },
      name: { fi: "" },
      location: { address: {} }
    },
    isLoading: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ isLoading: true });
    const id = this.props.navigation.getParam("id");

    fetch(`http://open-api.myhelsinki.fi/v1/event/${id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ eventData: json, isLoading: false });
      });
  }

  render() {
    const { isLoading, eventData } = this.state;
    const {
      description: { images, body },
      event_dates: { starting_day },
      name: { fi: nameFi },
      location: {
        address: { locality, postal_code, street_address },
        lat,
        lon
      }
    } = eventData;

    return isLoading ? (
      <Loading />
    ) : (
      <Container>
        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
          <Text>Back</Text>
        </Button>
        {images[0] && (
          <Image
            source={{ uri: images[0].url }}
            style={{ height: 200, alignSelf: "stretch" }}
          />
        )}
        <Content padder>
          <Text style={styles.title}>{nameFi}</Text>
          <Text style={styles.date}>{format(starting_day, "DD.MM.YYYY")}</Text>
          <Text style={styles.location}>
            {`${street_address}, ${postal_code}, ${locality}`}
            {" - "}
            <Text
              style={[styles.location, styles.link]}
              onPress={() =>
                this.props.navigation.navigate("MapScreen", {
                  location: { lat, lon }
                })
              }
            >
              Show on map
            </Text>
          </Text>
          <HTML
            html={body}
            tagsStyles={{
              p: styles.p,
              span: styles.span,
              strong: styles.strong
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-extrabold",
    marginVertical: 5,
    fontSize: 32,
    lineHeight: 35
  },
  date: {
    fontFamily: "open-sans-bold",
    marginBottom: 2,
    fontSize: 15
  },
  location: {
    fontFamily: "open-sans-bold",
    marginBottom: 10,
    fontSize: 15
  },
  link: { color: "#519FF2" },
  p: {
    fontFamily: "open-sans-regular",
    letterSpacing: 0.1,
    fontSize: 15,
    marginVertical: 7
  },
  span: {
    fontFamily: "open-sans-regular",
    letterSpacing: 0.1,
    fontSize: 15
  },
  strong: {
    fontFamily: "open-sans-regular",
    letterSpacing: 0.1,
    fontSize: 15,
    fontFamily: "open-sans-semibold"
  }
});
