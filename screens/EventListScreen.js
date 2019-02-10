import React from "react";
import { format } from "date-fns";

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

export default class EventListScreen extends React.Component {
  state = {
    isLoading: false,
    results: []
  };

  static navigationOptions = {
    title: "Events"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ isLoading: true });
    fetch(`http://open-api.myhelsinki.fi/v1/events/?limit=10`)
      .then(res => res.json())
      .then(json => {
        this.setState({ results: json.data, isLoading: false });
      });
  }

  render() {
    const { isLoading, results } = this.state;

    return (
      <Container>
        <Header />
        <Content>
          {isLoading ? (
            <Text>Fetching data</Text>
          ) : (
            <List>
              {results.map(
                ({
                  description: { images, intro },
                  event_dates: { starting_day },
                  name: { fi: nameFi },
                  id
                }) => (
                  <ListItem thumbnail key={id}>
                    <Left>
                      <Thumbnail square source={{ uri: images[0].url }} />
                    </Left>
                    <Body>
                      <Text>{nameFi}</Text>
                      <Text note>{format(starting_day, "DD.MM.YYYY")}</Text>
                      <Text note numberOfLines={1}>
                        {intro}
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
        </Content>
      </Container>
    );
  }
}
