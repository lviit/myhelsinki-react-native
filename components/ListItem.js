import React from "react";
import { format } from "date-fns";
import { StyleSheet } from "react-native";

import {
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

const CustomListItem = ({ images = [], title, date, text, onPress, id }) => (
  <ListItem thumbnail key={id} style={styles.text} onPress={onPress}>
    <Left style={styles.left}>
      {images[0] && <Thumbnail square large source={{ uri: images[0].url }} />}
    </Left>
    <Body>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {date && <Text style={styles.date}>{format(date, "DD.MM.YYYY")}</Text>}
      <Text numberOfLines={2} style={styles.text}>
        {text}
      </Text>
    </Body>
  </ListItem>
);

export default CustomListItem;

const styles = StyleSheet.create({
  left: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc"
  },
  title: {
    fontFamily: "open-sans-extrabold",
    marginBottom: 5,
    letterSpacing: 0.5,
    fontSize: 15
  },
  date: {
    fontFamily: "open-sans-semibold",
    marginBottom: 2,
    fontSize: 14
  },
  text: {
    fontFamily: "open-sans-regular",
    letterSpacing: 0.1,
    fontSize: 12
  }
});
