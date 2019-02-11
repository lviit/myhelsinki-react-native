import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Text, Spinner, Content } from "native-base";
import { format } from "date-fns";
import { iOSUIKit } from "react-native-typography";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Loading from "../components/Loading";

const stripTags = str => str.replace(/(<([^>]+)>)/gi, "");

export default class EventScreen extends React.Component {
  static navigationOptions = {
    title: "Event"
  };

  state = {
    eventData: {
      description: { images: [{}], body: "" },
      event_dates: { starting_day: "" },
      name: { fi: "" },
      location: {}
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
      description: { images, body, intro },
      event_dates: { starting_day },
      name: { fi: nameFi },
      location: { lat, lon }
    } = eventData;

    return isLoading ? (
      <Loading />
    ) : (
      <Container>
        {images[0] && (
          <Image
            source={{ uri: images[0].url }}
            style={{ height: 200, alignSelf: "stretch" }}
          />
        )}
        <Content padder>
          <Text style={iOSUIKit.largeTitleEmphasized}>{nameFi}</Text>
          <Text note style={[iOSUIKit.bodyEmphasized, styles.date]}>
            {format(starting_day, "DD.MM.YYYY")}
          </Text>
          <Text style={iOSUIKit.body}>{stripTags(body)}</Text>
          <MapView
            style={styles.map}
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{ latitude: lat, longitude: lon }}
              title={nameFi}
              description={intro}
            />
          </MapView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    marginBottom: 10,
    marginTop: 10
  },
  map: { alignSelf: "stretch", height: 300, marginTop: 30 }
});
