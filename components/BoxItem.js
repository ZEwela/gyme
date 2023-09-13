import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const BoxItem = ({ reps, weight }) => {
  return (
    <Pressable style={styles.item} onPress={() => console.log("hg")}>
      <Text style={styles.text}>{reps} x</Text>
      <Text style={styles.text}>{weight}</Text>
    </Pressable>
  );
};

export default BoxItem;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#EBF8DD",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
