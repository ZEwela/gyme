import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AddMoreBoxFooter = ({ sets, setSets }) => {
  return (
    <View style={styles.item}>
      <Pressable onPress={() => console.log("not yet")}>
        <Ionicons name="md-add" size={40} color="black" />
      </Pressable>
    </View>
  );
};

export default AddMoreBoxFooter;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    marginTop: 35,
    justifyContent: "center",
    backgroundColor: "#EBF8DD",
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 50,
  },
});
