import React from "react";
import LoadingList from "../components/LoadingList";
import ListItem from "../components/ListItem";

import { RefreshControl } from "react-native";
import { Container, Content, List } from "native-base";

const getTypePlural = type => {
  const mapTypeToPlural = {
    event: "events",
    place: "places",
    activity: "activities"
  };
  return mapTypeToPlural[type];
};
export default class EventListScreen extends React.Component {
  state = {
    isLoading: false,
    results: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const type = getTypePlural(this.props.type);
    this.setState({ isLoading: true });
    fetch(`http://open-api.myhelsinki.fi/v1/${type}/?limit=30`)
      .then(res => res.json())
      .then(json => {
        this.setState({ results: json.data, isLoading: false });
      });
  }

  render() {
    const { isLoading, results } = this.state;
    const { type, navigation } = this.props;

    return isLoading ? (
      <LoadingList />
    ) : (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this.fetchData()}
            />
          }
        >
          <List>
            {results.map(({ id, ...rest }) => (
              <ListItem
                {...rest}
                key={id}
                onPress={() =>
                  navigation.navigate("DetailsScreen", {
                    id,
                    type
                  })
                }
              />
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}
