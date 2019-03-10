import React from "react";
import { format } from "date-fns";
import { StyleSheet } from "react-native";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { stripTags } from "../helpers";

const CustomListItem = ({
  description: { images, intro, body },
  name: { fi: title },
  event_dates,
  onPress
}) => (
  <ListItem thumbnail style={styles.text} onPress={onPress}>
    <Left style={styles.left}>
      {images && images[0] && (
        <Thumbnail square large source={{ uri: images[0].url }} />
      )}
    </Left>
    <Body>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {event_dates && (
        <Text style={styles.date}>
          {format(event_dates.starting_day, "DD.MM.YYYY")}
        </Text>
      )}
      <Text numberOfLines={2} style={styles.text}>
        {intro || stripTags(body)}
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
    fontFamily: "ibm-plex-sans-condensed-semibold",
    //fontFamily: "source-sans-pro-bold",
    marginBottom: 5,
    //letterSpacing: 0.5,
    fontSize: 16,
    textTransform: "uppercase"
  },
  date: {
    fontFamily: "lato-semibold",
    marginBottom: 2,
    fontSize: 14
  },
  text: {
    fontFamily: "ibm-plex-sans-regular",
    //fontFamily: "source-sans-pro-regular",
    letterSpacing: 0.1,
    fontSize: 13
  }
});
