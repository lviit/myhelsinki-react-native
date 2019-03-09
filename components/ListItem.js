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
  <ListItem thumbnail key={id} style={styles.text} onPress={() => onPress}>
    <Left>
      {images[0] && <Thumbnail square large source={{ uri: images[0].url }} />}
    </Left>
    <Body>
      <Text style={styles.title}>{title}</Text>
      {date && <Text style={styles.date}>{format(date, "DD.MM.YYYY")}</Text>}
      <Text numberOfLines={2} style={styles.text}>
        {text}
      </Text>
    </Body>
  </ListItem>
);

export default CustomListItem;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    letterSpacing: 0.1,
    fontSize: 17
  },
  date: {
    fontFamily: "open-sans-semibold",
    marginVertical: 2,
    fontSize: 15
  },
  text: {
    fontFamily: "open-sans-regular",
    letterSpacing: 0.1,
    fontSize: 13
  }
});
