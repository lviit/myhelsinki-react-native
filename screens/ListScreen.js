import React from "react";
import { StyleSheet } from "react-native";

import LoadingList from "../components/LoadingList";
import ListItem from "../components/ListItem";
import Filters from "../components/Filters";
import "url-search-params-polyfill";

import { RefreshControl } from "react-native";
import { Container, Content, List, Drawer, Button, Text } from "native-base";

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
    results: [],
    tags: {},
    selectedTags: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const type = getTypePlural(this.props.type);
    const params = new URLSearchParams({
      limit: 30
    });

    this.state.selectedTags.length > 0 &&
      params.append("tags_search", this.state.selectedTags.join(","));

    console.log(params.toString());

    this.setState({ isLoading: true });
    fetch(`http://open-api.myhelsinki.fi/v1/${type}/?${params.toString()}`)
      .then(res => res.json())
      .then(({ data, tags }) => {
        this.setState({ results: data, tags, isLoading: false });
      });
  }

  selectTag = selectedId => {
    const { selectedTags } = this.state;
    this.setState({
      selectedTags: selectedTags.find(id => id === selectedId)
        ? selectedTags.filter(id => id === !selectedId)
        : [...selectedTags, selectedId]
    });
    console.log(this.state.selectedTags);
  };

  closeDrawer = () => {
    this.drawer._root.close();
    this.fetchData();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const { isLoading, results, tags, selectedTags } = this.state;
    const { type, navigation } = this.props;

    return isLoading ? (
      <LoadingList />
    ) : (
      <Container>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <Filters
              tags={tags}
              selectedTags={selectedTags}
              selectTag={this.selectTag}
            />
          }
          onClose={() => this.closeDrawer()}
        >
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.fetchData()}
              />
            }
          >
            <List style={styles.container}>
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
          <Button style={styles.button} onPress={() => this.openDrawer()}>
            <Text style={styles.buttonText}>Filter results</Text>
          </Button>
        </Drawer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    backgroundColor: "#eee"
  },
  buttonText: {
    color: "#3f3f3f",
    fontFamily: "ibm-plex-sans-condensed-bold",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 12
  },
  container: {
    paddingBottom: 50
  }
});
