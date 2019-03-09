import React from "react";
import LoadingList from "../components/LoadingList";
import ListItem from "../components/ListItem";
import { Container, Content, List } from "native-base";

export default class PlacesListScreen extends React.Component {
  state = {
    isLoading: false,
    results: []
  };

  static navigationOptions = {
    title: "Places"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ isLoading: true });
    fetch(`http://open-api.myhelsinki.fi/v1/places/?limit=30`)
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
                description: { images = [], body: text },
                name: { fi: title },
                id
              }) => (
                <ListItem
                  images={images || []}
                  {...{ title, text, id }}
                  onPress={() =>
                    this.props.navigation.navigate("EventScreen", { id })
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
