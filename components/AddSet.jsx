import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUserWorkoutSetsByExerciseId } from "../store/slices/userWorkoutsSlice";

const AddSet = ({ sets, setSets, exerciseId }) => {
  const dispatch = useDispatch();

  const handleAddingSet = () => {
    let newSet;

    if (sets?.length) {
      newSet = {
        reps: sets[sets.length - 1].reps,
        set_order: sets[sets.length - 1].set_order,
        weight: sets[sets.length - 1].weight,
        hold: sets[sets.length - 1].hold,
        note: sets[sets.length - 1].note,
        created_at: new Date().toISOString(),
      };
    } else {
      newSet = {
        reps: 0,
        set_order: 0,
        weight: 0,
        hold: 0,
        note: "",
        created_at: new Date().toISOString(),
      };
    }

    newSet.set_order += 1;
    const updatedSets = [...sets, newSet];

    setSets(updatedSets);
    dispatch(setUserWorkoutSetsByExerciseId({ exerciseId, updatedSets }));
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
