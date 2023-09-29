import React, { useEffect, useState } from "react";
import Item from "../../../components/Item";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import { addUserWorkoutToWorkouts } from "../../../store/slices/userWorkoutsSlice";

const createWorkout = () => {
  const dispatch = useDispatch();

  // when user comes from /(main)/exercises/[exerciseName]
  const { exerciseId, exerciseName } = useLocalSearchParams();

  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // check if choosen exercise is not already in exercises list
    const containsExercise = exercises.some(
      (exercise) => exercise.exerciseName === exerciseName
    );

    // add exercise to exercises when is not already in it
    if (exerciseName && !containsExercise) {
      setExercises([
        ...exercises,
        { exercise_id: exerciseId, exercise_name: exerciseName },
      ]);
    }
  }, [exerciseName]);

  const createWorkout = () => {
    // check if user provided workout name
    if (!workoutName) {
      alert("Name your workout");
      return;
    }

    // prepare workout data (created_at and workout_id will be change while adding to db)
    const workoutData = {
      workout_id: workoutName.toLowerCase(),
      workout_name: workoutName.toLowerCase(),
      exercises_list: exercises,
      created_at: new Date().toISOString(),
      user_id: auth.currentUser.uid,
    };

    // add new workout to workouts list in redux store
    dispatch(addUserWorkoutToWorkouts(workoutData));

    // take user to workout page
    router.replace({
      pathname: "workouts/[workout]",
      params: {
        workout: workoutData.workout_id,
        workoutId: workoutData.workout_id,
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={createWorkout}>
              <Text style={styles.doneBtn}>Done</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Workout name: </Text>
        <TextInput
          style={styles.input}
          value={workoutName}
          placeholder="workout name"
          onChangeText={setWorkoutName}
        />
      </View>

      <Item pathname={"/(main)/exercises"} title={"Add Exercise"} />

      {exercises.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Item
              title={item.exercise_name}
              pathname={`/(main)/exercises/${item.exercise_name}`}
            />
          )}
          keyExtractor={(item) => item.exercise_id}
        />
      )}
    </>
  );
};

export default createWorkout;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    margin: 10,
  },
  text: {
    fontSize: 15,
  },
  input: {
    padding: 5,
    fontSize: 25,
    fontWeight: "bold",
    borderWidth: StyleSheet.hairlineWidth,
  },
  doneBtn: {
    color: "white",
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    padding: 5,
  },
});
