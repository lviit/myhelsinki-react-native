import React from "react";
import { Image } from "react-native";
import { Container, Text, H1 } from "native-base";
import { format } from "date-fns";

const stripTags = str => str.replace(/(<([^>]+)>)/gi, "");

export default class EventScreen extends React.Component {
  static navigationOptions = {
    title: "Event"
  };

  state = {
    eventData: {
      description: { images: [{}], body: "" },
      event_dates: { starting_day: "" },
      name: { fi: "" }
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
      name: { fi: nameFi }
    } = eventData;

    return isLoading ? (
      <Text>Fetching data</Text>
    ) : (
      <Container>
        <Image
          source={{ uri: images[0].url }}
          style={{ height: 200, alignSelf: "stretch" }}
        />
        <H1>{nameFi}</H1>
        <Text note>{format(starting_day, "DD.MM.YYYY")}</Text>
        <Text>{stripTags(body)}</Text>
      </Container>
    );
  }
}
