import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import { selectExercises } from "../../../store/slices/exercisesSlice";
import {
  addExerciseToUserWorkout,
  selectWorkout,
} from "../../../store/slices/userWorkoutsSlice";

const Exercise = () => {
  const dispatch = useDispatch();
  const { exerciseName } = useLocalSearchParams();

  const exercises = useSelector(selectExercises);
  const workout = useSelector(selectWorkout);

  const [exercise, setExercise] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // find exercise in redux store exercises to display details
    const fetchExercise = exercises.find(
      ({ exercise_name }) => exercise_name === exerciseName
    );
    setExercise(fetchExercise);
    setLoading(false);
  }, [exerciseName]);

  const handleAddingExerciseToWorkout = () => {
    if (workout) {
      if (
        workout.exercises_list.find(
          ({ exercise_id }) => exercise_id === exercise.exercise_id
        )
      ) {
        alert(`${exercise.exercise_name} is already in workout list`);
        return;
      }
      // add exercise to redux store workout.exercises_list
      dispatch(
        addExerciseToUserWorkout({
          exercise_id: exercise.exercise_id,
          exercise_name: exercise.exercise_name,
        })
      );
      router.push({
        pathname: "(main)/workouts/[workout]",
        params: {
          workout: workout.workout_id,
          workoutName: workout.workout_name,
          workoutId: workout.workout_id,
          // exerciseId: exercise.id,
          // exerciseName: exercise.exercise_name,
        },
      });
    } else {
      router.push({
        pathname: "(main)/workouts/createWorkout",
        params: {
          exerciseId: exercise.exercise_id,
          exerciseName: exercise.exercise_name,
        },
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="green" />;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <Pressable onPress={handleAddingExerciseToWorkout}>
              <Text style={styles.doneBtn}>Add to Workout</Text>
            </Pressable>
          ),
        }}
      />
      <Text style={styles.header}>{exerciseName} </Text>

      <View style={styles.body}>
        {exercise?.technique_url && (
          <>
            <Text style={styles.text}>Exercise technique:</Text>
            <Link href={exercise.technique_url}>
              <Feather name="external-link" size={24} color="black" />
            </Link>
          </>
        )}
        <Text style={styles.text}>Description: {exercise?.description}</Text>
      </View>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    margin: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    gap: 10,
  },
  text: {
    fontSize: 20,
  },
  doneBtn: {
    color: "white",
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    padding: 5,
  },
});
