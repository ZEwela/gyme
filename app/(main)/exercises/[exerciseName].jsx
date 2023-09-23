import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { getExerciseByName } from "../../../actions/getExerciseByName";

const Exercise = () => {
  const { exerciseName, workoutId } = useLocalSearchParams();
  const [exercise, setExercise] = useState();
  useEffect(() => {
    const fetchExercise = getExerciseByName(exerciseName);
    setExercise(fetchExercise.info);
  }, [exerciseName]);

  const details = exercise ? exercise.technique_url : null;

  const handleAddingExerciseToWorkout = () => {
    if (workoutId) {
      // add exercise to this workoutId push to that workout
      router.push({
        pathname: "(main)/workouts/[workout]",
        params: { workout: workoutId, exerciseId: exerciseName },
      });
    } else {
      router.push({
        pathname: "(main)/workouts/createWorkout",
        params: { exerciseId: exerciseName },
      });
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <Pressable onPress={handleAddingExerciseToWorkout}>
              <Text style={styles.doneBtn}>Add to Workout</Text>
              {/* <Feather name="check-square" size={30} color="white" /> */}
            </Pressable>
          ),
        }}
      />
      <Text style={styles.header}>{exerciseName} </Text>

      <View style={styles.body}>
        {details && (
          <>
            <Text style={styles.text}>Exercise technique:</Text>
            <Link href={details}>
              <Feather name="external-link" size={24} color="black" />
            </Link>
          </>
        )}
        <Text style={styles.text}>Description: {exercise?.description}</Text>
        {/* <Text style={styles.text}>Muscle Group:</Text> */}
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
