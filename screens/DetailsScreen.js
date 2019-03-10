import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Text, Content, Button } from "native-base";
import { format } from "date-fns";
import Loading from "../components/Loading";
import HTML from "react-native-render-html";

const formatDate = (start, end) =>
  `${format(start, "DD.MM.YYYY HH:mm")}${
    end ? " - " + format(end, "DD.MM.YYYY HH:mm") : ""
  }`;

const formatOpeningHours = hours =>
  hours
    .map(({ weekday_id, opens, closes, open24h }) => {
      const weekdays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
      const hours =
        opens && closes
          ? `${opens.slice(0, opens.length - 3)} - ${closes.slice(
              0,
              closes.length - 3
            )}`
          : "closed";
      return open24h
        ? "Open 24 hours"
        : `${weekdays[weekday_id - 1]}: ${hours}`;
    })
    .join(", ");

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
            <>
              <Text style={styles.info}>
                Opening hours: {formatOpeningHours(opening_hours.hours)}
              </Text>
            </>
          )}
          <Text style={styles.location}>
            Location: {`${street_address}, ${postal_code}, ${locality}`}
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
