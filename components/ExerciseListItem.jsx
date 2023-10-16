import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";

import { selectExerciseByExerciseName } from "../store/slices/exercisesSlice";
import {
  addExerciseToUserWorkout,
  removeExerciseFromUserWorkout,
  selectWorkout,
} from "../store/slices/userWorkoutsSlice";
import { useCheckedExercises } from "../contexts/CheckedExercisesContext";

const ExerciseListItem = ({ params, title, pathname }) => {
  const dispatch = useDispatch();
  const { checkedExercises, setCheckedExercises } = useCheckedExercises();
  const workout = useSelector(selectWorkout);
  const exercise = useSelector((state) =>
    selectExerciseByExerciseName(state)(title)
  );

  const [isChecked, setChecked] = useState(
    false ||
      checkedExercises.find(({ exercise_name }) => exercise_name === title) ||
      workout?.exercises_list?.find(
        ({ exercise_name }) => exercise_name === title
      )
  );

  const handleToggleChecked = () => {
    setChecked(!isChecked);

    if (workout) {
      // add or remove exercise from workout
      if (!isChecked) {
        dispatch(
          addExerciseToUserWorkout({
            exercise_id: exercise.exercise_id,
            exercise_name: exercise.exercise_name,
          })
        );
      } else {
        Alert.alert(
          null,
          "Are you sure that you want to remove this exercise from your workout? ",
          [
            {
              text: "Cancel",
              onPress: () => {
                setChecked(true);
                return;
              },
            },
            {
              text: "Yes",
              onPress: () =>
                dispatch(removeExerciseFromUserWorkout(exercise.exercise_id)),
            },
          ]
        );
      }
      // add or remove exercise to checkedExercises context
    } else {
      if (!isChecked) {
        setCheckedExercises([
          ...checkedExercises,
          {
            exercise_id: exercise.exercise_id,
            exercise_name: exercise.exercise_name,
          },
        ]);
      } else {
        const filteredCheckedExercises = checkedExercises.filter(
          ({ exercise_id }) => exercise_id !== exercise.exercise_id
        );
        setCheckedExercises(filteredCheckedExercises);
      }
    }
  };
  return (
    <View style={styles.itemContainer}>
      <Link style={styles.item} href={{ pathname: pathname, params: params }}>
        <Text style={styles.text}>
          {title.length < 35 ? title : title.slice(0, 33) + "..."}
        </Text>
      </Link>
      <View style={styles.actions}>
        <Link href={{ pathname: pathname, params: params }}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </Link>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={handleToggleChecked}
          color={isChecked ? "green" : undefined}
        />
      </View>
    </View>
  );
};

export default React.memo(ExerciseListItem);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5FCEE",
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  item: {
    paddingHorizontal: 30,
    paddingVertical: 5,

    width: "min-content",

    // backgroundColor: "pink",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  checkbox: {
    margin: 8,
    borderRadius: 25,
    paddingLeft: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
