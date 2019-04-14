import React from "react";
import { StyleSheet } from "react-native";

import LoadingList from "../components/LoadingList";
import ListItem from "../components/ListItem";
import Filters from "../components/Filters";
import "url-search-params-polyfill";

import {
  RefreshControl,
  FlatList,
  View,
  ActivityIndicator
} from "react-native";
import { Container, Drawer, Button, Text } from "native-base";

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
    isLoadingMore: false,
    results: [],
    tags: {},
    selectedTags: [],
    page: 0
  };

  componentDidMount() {
    this.loadInitialData();
  }

  async fetchData() {
    const type = getTypePlural(this.props.type);
    const { selectedTags, page } = this.state;
    const params = new URLSearchParams({
      limit: 20,
      start: page * 20
    });

    selectedTags.length > 0 &&
      params.append("tags_search", selectedTags.join(","));

    const res = await fetch(
      `http://open-api.myhelsinki.fi/v1/${type}/?${params.toString()}`
    );
    return await res.json();
  }

  async loadInitialData() {
    this.setState({ isLoading: true });
    const { data, tags } = await this.fetchData();
    this.setState({ results: data, tags, isLoading: false });
  }

  async loadMore() {
    const { isLoadingMore, page } = this.state;
    if (!isLoadingMore) {
      await this.setState({ page: page + 1, isLoadingMore: true });
      const { data, tags } = await this.fetchData();

      this.setState({
        results: [...this.state.results, ...data],
        tags: { ...this.state.tags, ...tags },
        isLoadingMore: false
      });
    }
  }

  selectTag = selectedId => {
    const { selectedTags } = this.state;
    this.setState({
      selectedTags: selectedTags.find(id => id === selectedId)
        ? selectedTags.filter(id => id === !selectedId)
        : [...selectedTags, selectedId]
    });
  };

  closeDrawer = () => {
    this.drawer._root.close();
    this.loadInitialData();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const {
      isLoading,
      isLoadingMore,
      results,
      tags,
      selectedTags
    } = this.state;
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
          <View style={styles.listContainer}>
            <FlatList
              data={results}
              renderItem={({ item: { id, ...rest } }) => (
                <ListItem
                  {...rest}
                  onPress={() =>
                    navigation.navigate("DetailsScreen", {
                      id,
                      type
                    })
                  }
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.loadInitialData()}
                />
              }
              onEndReachedThreshold={0.4}
              onEndReached={() => this.loadMore()}
              ListFooterComponent={
                <LoadMoreIndicator isLoadingMore={isLoadingMore} />
              }
            />
          </View>
          <Button style={styles.button} onPress={() => this.openDrawer()}>
            <Text style={styles.buttonText}>Filter results</Text>
          </Button>
        </Drawer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: 50
  },
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
  },
  loadMoreIndicator: {
    marginVertical: 20
  }
});

const LoadMoreIndicator = isLoadingMore =>
  isLoadingMore && (
    <ActivityIndicator size="large" style={styles.loadMoreIndicator} />
  );
