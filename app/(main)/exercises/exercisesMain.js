import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { getExercisesRealtime } from "../../../actions/getExercises";
import {
  selectExercises,
  setExercises as setExercisesInStore,
} from "../../../store/slices/exercisesSlice";
import AddButton from "../../../components/AddButton";
import ExerciseListItem from "../../../components/ExerciseListItem";
import { Stack, router } from "expo-router";
import { useCheckedExercises } from "../../../contexts/CheckedExercisesContext";
import { selectWorkout } from "../../../store/slices/userWorkoutsSlice";

const Exercises = () => {
  const dispatch = useDispatch();
  const exercisesFromStore = useSelector(selectExercises);
  const [exercises, setExercises] = useState(exercisesFromStore || []);
  const [loading, setLoading] = useState(true);
  const { checkedExercises, setCheckedExercises } = useCheckedExercises();
  const workout = useSelector(selectWorkout);

  useEffect(() => {
    // Subscribe to real-time updates and provide a callback to handle changes.
    const unsubscribe = getExercisesRealtime(
      (updatedExercises) => {
        // Update the Redux store with the updated exercises.
        dispatch(setExercisesInStore(updatedExercises));

        // Set the local state with the updated exercises.
        setExercises(updatedExercises);

        setLoading(false);
      },
      (error) => {
        setLoading(false);
        alert(
          "Something went wrong while trying to display a list of exercises, please try again later"
        );
      }
    );

    // Clean up the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);

  const handleGoBack = () => {
    if (
      checkedExercises.length > 0 ||
      (checkedExercises.length === 0 && workout === null)
    ) {
      router.push("(main)/workouts/createWorkout");
    } else {
      router.push({
        pathname: "(main)/workouts/[workout]",
        params: { workout: workout.workout_id, workoutId: workout.workout_id },
      });
    }
  };

  if (loading) {
    return <ActivityIndicator color={"green"} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable style={{ marginRight: 10 }} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
        }}
      />
      <AddButton
        pathname={"exercises/createExercise"}
        title={"Create New Exercise"}
      />
      {exercises.length > 0 && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.textFirst}> or </Text>
            <Text style={styles.textSecond}> choose from the list </Text>
          </View>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseListItem
                title={item.exercise_name}
                pathname={`exercises/${item.exercise_name}`}
                params={{ exerciseName: item.exercise_name }}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 20,
  },
  textFirst: {
    fontSize: 20,
  },
  textSecond: {
    fontSize: 25,
    color: "#8CAB73",
    fontWeight: "bold",
  },
});
