import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body
} from "native-base";

const Filters = ({ tags, selectedTags, selectTag }) => (
  <Container>
    <Content>
      <ListItem itemHeader first>
        <Text style={styles.title}>Filter by tags</Text>
      </ListItem>
      {Object.keys(tags).map(id => (
        <ListItem key={id} onPress={() => selectTag(id)}>
          <CheckBox
            color="#3f3f3f"
            checked={selectedTags.some(tag => tag === id)}
          />
          <Body>
            <Text style={styles.text}>{tags[id]}</Text>
          </Body>
        </ListItem>
      ))}
    </Content>
  </Container>
);

export default Filters;

const styles = StyleSheet.create({
  title: {
    fontFamily: "ibm-plex-sans-condensed-semibold",
    marginBottom: 5,
    marginTop: 10,
    fontSize: 20,
    textTransform: "uppercase"
  },
  text: {
    fontFamily: "ibm-plex-sans-condensed-medium",
    letterSpacing: 0.1,
    fontSize: 16
  }
});
