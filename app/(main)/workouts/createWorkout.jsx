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
import { setUserWorkout } from "../../../store/slices/userWorkoutsSlice";

const createWorkout = () => {
  const dispatch = useDispatch();
  const { exerciseId, exerciseName } = useLocalSearchParams();

  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const containsExercise = exercises.some(
      (exercise) => exercise.exerciseName === exerciseName
    );
    if (exerciseName && !containsExercise) {
      setExercises([
        ...exercises,
        { exercise_id: exerciseId, exercise_name: exerciseName },
      ]);
    }
  }, [exerciseName]);

  const createWorkout = () => {
    const workoutData = {
      workout_id: new Date().toISOString(),
      workout_name: workoutName.toLowerCase(),
      exercises_list: exercises,
      created_at: new Date().toISOString(),
      user_id: auth.currentUser.uid,
    };
    dispatch(setUserWorkout(workoutData));

    router.replace({
      pathname: "workouts/[workout]",
      params: { workoutName: workoutName },
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

      <Item
        pathname={"(main)/exercises"}
        title={"Add Exercise"}
        params={{ workoutName: workoutName }}
      />
      {exercises.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Item
              title={item.exercise_name}
              pathname={`exercises/${item.exercise_name}`}
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
