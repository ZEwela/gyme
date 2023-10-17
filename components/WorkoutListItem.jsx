import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const WorkoutListItem = ({ title, pathname, params }) => {
  return (
    // <View style={styles.itemContainer}>
    <Link
      style={styles.itemContainer}
      href={{ pathname: pathname, params: params }}
      asChild
    >
      <Text style={styles.text}>
        {title.length > 35
          ? title.slice(0, 19) + "..." + title.slice(-13)
          : title}
      </Text>
    </Link>
    // </View>
  );
};

export default React.memo(WorkoutListItem);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    paddingVertical: 20,
    textAlign: "center",
    backgroundColor: "#8CAB73",
    marginVertical: 5,
    marginHorizontal: 10,
    opacity: 0.75,
    borderRadius: 10,
    elevation: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
