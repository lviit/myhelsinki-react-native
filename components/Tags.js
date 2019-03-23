import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Text } from "native-base";
import { getTagColor } from "../helpers";

const Tags = ({ tags }) => (
  <View>
    <FlatList
      horizontal={true}
      data={tags}
      renderItem={({ item }) => (
        <Text style={[styles.tag, { backgroundColor: getTagColor(item.name) }]}>
          {item.name.toLowerCase()}
        </Text>
      )}
    />
  </View>
);

export default Tags;

const styles = StyleSheet.create({
  tag: {
    color: "#fff",
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginRight: 3,
    fontFamily: "ibm-plex-sans-condensed-semibold"
    //borderRadius: 7,
    //overflow: "hidden",
  }
});
