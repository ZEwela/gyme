import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AddSet = ({ sets, setSets }) => {
  const handleAddingSet = () => {
    let newSet;

    if (sets?.length) {
      newSet = {
        reps: sets[sets.length - 1].reps,
        set: sets[sets.length - 1].set,
        weight: sets[sets.length - 1].weight,
      };
    } else {
      newSet = { reps: 0, set: 0, weight: 0 };
    }

    newSet.set += 1;
    const newSets = [...sets, newSet];

    setSets(newSets);
  };

  return (
    <View style={styles.item}>
      <Pressable onPress={handleAddingSet}>
        <Ionicons name="md-add" size={40} color="black" />
      </Pressable>
    </View>
  );
};

export default AddSet;

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
