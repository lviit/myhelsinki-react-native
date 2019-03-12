import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import BackButton from "../components/BackButton";

export default class EventScreen extends React.Component {
  static navigationOptions = {
    title: "Map"
  };

  render() {
    const { lat, lon } = this.props.navigation.getParam("location");

    return (
      <Container>
        <BackButton handleBack={() => this.props.navigation.goBack(null)} />
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
            //title={nameFi}
            //description={intro}
          />
        </MapView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: { flex: 1 }
});
