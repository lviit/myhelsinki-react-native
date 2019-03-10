import React from "react";
import LoadingList from "../components/LoadingList";
import ListItem from "../components/ListItem";
import { Container, Content, List } from "native-base";

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
    fetch(`http://open-api.myhelsinki.fi/v1/events/?limit=30`)
      .then(res => res.json())
      .then(json => {
        this.setState({ results: json.data, isLoading: false });
      });
  }

  render() {
    const { isLoading, results } = this.state;

    return isLoading ? (
      <LoadingList />
    ) : (
      <Container>
        <Content>
          <List>
            {results.map(
              ({
                description: { images, intro: text },
                event_dates: { starting_day: date },
                name: { fi: title },
                id
              }) => (
                <ListItem
                  {...{ images, title, date, text, id }}
                  onPress={() =>
                    this.props.navigation.navigate("DetailsScreen", {
                      id,
                      type: "event"
                    })
                  }
                />
              )
            )}
          </List>
        </Content>
      </Container>
    );
  }
}
