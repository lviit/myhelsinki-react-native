import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Text, Content } from "native-base";
import Loading from "../components/Loading";
import HTML from "react-native-render-html";
import { formatDate, formatOpeningHours, joinAndFilterEmpty } from "../helpers";
import BackButton from "../components/BackButton";

export default class EventScreen extends React.Component {
  static navigationOptions = {
    title: "Event"
  };

  state = {
    eventData: {
      description: { images: [{}], body: "" },
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
    const type = this.props.navigation.getParam("type");

    fetch(`http://open-api.myhelsinki.fi/v1/${type}/${id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ eventData: json, isLoading: false });
      });
  }

  render() {
    const { isLoading, eventData } = this.state;
    const {
      description: { images, body },
      name: { fi: nameFi },
      location: {
        address: { locality, postal_code, street_address },
        lat,
        lon
      },
      where_when_duration,
      event_dates,
      opening_hours
    } = eventData;

    return isLoading ? (
      <Loading />
    ) : (
      <Container>
        <Content>
          <BackButton handleBack={() => this.props.navigation.goBack(null)} />
          {images[0] && (
            <Image source={{ uri: images[0].url }} style={styles.image} />
          )}
          <Container style={styles.container}>
            <Text style={styles.title}>{nameFi}</Text>
            {event_dates && (
              <Text style={styles.info}>
                {formatDate(event_dates.starting_day, event_dates.ending_day)}
              </Text>
            )}
            {where_when_duration && (
              <>
                <Text style={styles.info}>
                  Where and when: {where_when_duration.where_and_when}
                </Text>
                <Text style={styles.info}>
                  Duration: {where_when_duration.duration}
                </Text>
              </>
            )}
            {opening_hours && (
              <Text style={styles.info}>
                Opening hours: {formatOpeningHours(opening_hours.hours)}
              </Text>
            )}
            <Text style={styles.location}>
              Location:{" "}
              {joinAndFilterEmpty(street_address, postal_code, locality)}
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
          </Container>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    alignSelf: "stretch",
    backgroundColor: "#ccc"
  },
  container: {
    padding: 15
  },
  title: {
    fontFamily: "ibm-plex-sans-condensed-bold",
    //fontFamily: "source-sans-pro-bold",
    marginBottom: 5,
    letterSpacing: 0.5,
    marginVertical: 5,
    fontSize: 34,
    lineHeight: 36,
    textTransform: "uppercase"
  },
  info: {
    fontFamily: "ibm-plex-sans-condensed-medium",
    marginBottom: 2,
    fontSize: 15
  },
  location: {
    fontFamily: "ibm-plex-sans-condensed-medium",
    marginBottom: 10,
    fontSize: 15
  },
  link: { color: "#519FF2" },
  p: {
    fontFamily: "ibm-plex-sans-regular",
    letterSpacing: 0.1,
    fontSize: 15,
    marginVertical: 7
  },
  span: {
    fontFamily: "ibm-plex-sans-regular",
    letterSpacing: 0.1,
    fontSize: 15
  },
  strong: {
    letterSpacing: 0.1,
    fontSize: 15,
    fontFamily: "ibm-plex-sans-regular"
  }
});
