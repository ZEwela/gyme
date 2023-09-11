import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Item = ({ title }) => {
  return (
    <Link
      style={styles.item}
      href={{ pathname: `/workouts/${title}`, params: { workout: title } }}
    >
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
