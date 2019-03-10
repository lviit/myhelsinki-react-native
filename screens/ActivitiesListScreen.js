import React from "react";
import LoadingList from "../components/LoadingList";
import { stripTags } from "../helpers";
import { Container, Content, List } from "native-base";
import ListItem from "../components/ListItem";

export default class ActivitiesListScreen extends React.Component {
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

    return isLoading ? (
      <LoadingList />
    ) : (
      <Container>
        <Content>
          <List>
            {results.map(
              ({ description: { images, body }, name: { fi: title }, id }) => (
                <ListItem
                  {...{ images, title, text: stripTags(body), id }}
                  onPress={() =>
                    this.props.navigation.navigate("DetailsScreen", {
                      id,
                      type: "activity"
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
