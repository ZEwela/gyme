import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SetItem from "./SetItem";
import AddSet from "./AddSet";
import {
  selectSetsByExerciseId,
  setUserWorkoutSetsByExerciseId,
} from "../store/slices/userWorkoutsSlice";
import { selectUser } from "../store/slices/userSlice";

const ExerciseCard = ({ name, exerciseId }) => {
  const setsFromStore = useSelector((state) =>
    selectSetsByExerciseId(state)(exerciseId)
  );
  const user = useSelector(selectUser);
  const [sets, setSets] = useState(setsFromStore || []);

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

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{user?.displayName || user?.fullName}</Text>

      <FlatList
        data={sets}
        keyExtractor={(item) => item.set_order.toString()}
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
    width: "300px",
  },
});
