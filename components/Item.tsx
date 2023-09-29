import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Item = ({ title, pathname, params }) => {
  return (
    <View style={styles.itemContainer}>
      <Link style={styles.item} href={{ pathname: pathname, params: params }}>
        <Text style={styles.text}>{title}</Text>
      </Link>
    </View>
  );
};

export default React.memo(Item);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BACBA9",
    marginVertical: 2,
    marginHorizontal: 10,
  },
  item: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
