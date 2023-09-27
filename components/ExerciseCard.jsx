import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import SetItem from "./SetItem";
import AddSet from "./AddSet";
import { setUserWorkoutSetsByExerciseId } from "../store/slices/userWorkoutsSlice";
import { useDispatch } from "react-redux";

const ExerciseCard = ({ name, info, exerciseId }) => {
  console.log("exerciseid from ExerciseCard", exerciseId);
  const [sets, setSets] = useState([...info] || []);

  const dispatch = useDispatch();
  const removeSet = (setOrder) => {
    const updatedSets = sets.filter((set) => set.set_order !== setOrder);
    setSets([...updatedSets]);
    dispatch(setUserWorkoutSetsByExerciseId({ exerciseId, updatedSets }));
  };
  const updateSet = (setOrder, newWeight, newReps, newHold, newNote) => {
    const updatedSets = sets.map((set) => {
      if (set.set_order === setOrder) {
        return {
          ...set,
          weight: newWeight,
          reps: newReps,
          hold: newHold,
          note: newNote,
          created_at: new Date().toISOString(),
        };
      }
      return set;
    });
    setSets([...updatedSets]);
    dispatch(setUserWorkoutSetsByExerciseId({ exerciseId, updatedSets }));
  };

  console.log("sets from ExerciseCard: ", sets);
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{name}</Text>

      <FlatList
        data={sets}
        keyExtractor={(item) => item.set_order}
        renderItem={({ item }) => (
          <SetItem
            previousReps={item.reps}
            previousWeight={item.weight}
            previousSetOrder={item.set_order}
            previousHold={item.hold}
            previousNote={item.note}
            removeSet={removeSet}
            updateSet={updateSet}
          />
        )}
        horizontal={true}
        ListFooterComponent={
          <AddSet sets={sets} setSets={setSets} exerciseId={exerciseId} />
        }
      />
    </View>
  );
};

export default ExerciseCard;

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
    fontSize: 20,
    backgroundColor: "#8EAB73",
    margin: 5,
    padding: 10,
    width: "300",
  },
});
