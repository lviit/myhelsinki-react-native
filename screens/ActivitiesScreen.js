import React from "react";
import { format } from "date-fns";

import {
  Container,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Spinner
} from "native-base";
import { iOSUIKit } from "react-native-typography";

export default class ActivitiesScreen extends React.Component {
  state = {
    isLoading: false,
    results: []
  };

  static navigationOptions = {
    title: "Activities"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ isLoading: true });
    fetch(`http://open-api.myhelsinki.fi/v1/activities/?limit=30`)
      .then(res => res.json())
      .then(json => {
        this.setState({ results: json.data, isLoading: false });
      });
  }

  render() {
    const { isLoading, results } = this.state;

    return (
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <List>
            {results.map(
              ({ description: { images, body }, name: { fi: nameFi }, id }) => (
                <ListItem thumbnail key={id}>
                  <Left />
                  <Body>
                    <Text style={iOSUIKit.title3Emphasized}>{nameFi}</Text>
                    <Text note numberOfLines={1}>
                      {body}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() =>
                        this.props.navigation.navigate("EventScreen", { id })
                      }
                    >
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              )
            )}
          </List>
        )}
      </Container>
    );
  }
}
