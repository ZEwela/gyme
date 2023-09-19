import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Item = ({ title, pathname, params }) => {
  return (
    <View style={styles.itemContainer}>
      <Link style={styles.item} href={{ pathname: pathname, params: params }}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
      </Link>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BACBA9",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
  },
});
