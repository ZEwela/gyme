import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";

import AddButton from "../../../components/AddButton";
import { addUserWorkoutToWorkouts } from "../../../store/slices/userWorkoutsSlice";
import { useCheckedExercises } from "../../../contexts/CheckedExercisesContext";
import ExerciseListItem from "../../../components/ExerciseListItem";

const createWorkout = () => {
  const dispatch = useDispatch();

  const [workoutName, setWorkoutName] = useState("");

  const { checkedExercises, setCheckedExercises } = useCheckedExercises();

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
      exercises_list: checkedExercises,
      created_at: new Date().toISOString(),
      user_id: auth.currentUser.uid,
    };

    // add new workout to workouts list in redux store
    dispatch(addUserWorkoutToWorkouts(workoutData));

    setCheckedExercises([]);
    // take user to workout page
    router.replace({
      pathname: "workouts/[workout]",
      params: {
        workout: workoutData.workout_id,
        workoutId: workoutData.workout_id,
      },
    });
  };

  const handleGoBack = () => {
    if (!workoutName.length && !checkedExercises.length) {
      router.back();
    } else {
      Alert.alert(
        // title
        null,
        // body
        "Warning: Your changes will not be saved. Would you like to continue anyway?",
        [
          {
            text: "Continue, without saving",
            onPress: () => {
              setCheckedExercises([]);
              router.back();
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable style={{ marginRight: 10 }} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={createWorkout}>
              <Text style={styles.doneBtn}>Continue</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Name your workout: </Text>
        <TextInput
          style={styles.input}
          value={workoutName}
          placeholder="workout name"
          onChangeText={setWorkoutName}
          maxLength={35}
        />
      </View>

      <AddButton
        pathname={"/(main)/exercises/exercisesMain"}
        title={"Add Exercises"}
      />

      {checkedExercises.length > 0 && (
        <FlatList
          data={checkedExercises}
          renderItem={({ item }) => (
            <ExerciseListItem
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
    fontSize: 18,
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
