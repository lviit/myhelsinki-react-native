import React from "react";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

export default class EventScreen extends React.Component {
  static navigationOptions = {
    title: "Links"
  };

  state = {
    results: [],
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
        this.setState({ results: json.data, isLoading: false });
      });
  }

  render() {
    const { isLoading, results } = this.state;

    return isLoading ? (
      <Text>Fetching data</Text>
    ) : (
      <Container>
        <Header />
        <Content>
          <Text>foo</Text>
        </Content>
      </Container>
    );
  }
}
