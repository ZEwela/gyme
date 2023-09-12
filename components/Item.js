import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Item = ({ title, pathname, params }) => {
  return (
    <Link style={styles.item} href={{ pathname: pathname, params: { params } }}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </Link>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#BACBA9",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
  },
});
