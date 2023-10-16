import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const AddButton = ({ title, pathname, params }) => {
  const handlePress = () => {
    router.push({
      pathname: pathname,
      params: params,
    });
  };
  return (
    <Pressable onPress={handlePress} style={styles.itemContainer}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default React.memo(AddButton);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#D7F3B9",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  item: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
