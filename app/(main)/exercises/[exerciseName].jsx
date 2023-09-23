import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { getExerciseByName } from "../../../actions/getExerciseByName";

const Exercise = () => {
  const { exerciseName, workoutName } = useLocalSearchParams();
  const [exercise, setExercise] = useState();

  console.log("From exercise: ", exercise);
  useEffect(() => {
    const fetchExercise = getExerciseByName(exerciseName);
    setExercise(fetchExercise);
  }, [exerciseName]);

  const handleAddingExerciseToWorkout = () => {
    if (workoutName.length > 0) {
      // add exercise to this workoutId push to that workout
      router.push({
        pathname: "(main)/workouts/[workoutName]",
        params: {
          workoutName: workoutName,
          exerciseId: exercise.id,
          exerciseName: exerciseName,
        },
      });
    } else {
      console.log("hhhheeeleklel");
      router.push({
        pathname: "(main)/workouts/createWorkout",
        params: { exerciseId: exercise.id, exerciseName: exerciseName },
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
        {exercise?.info.technique_url && (
          <>
            <Text style={styles.text}>Exercise technique:</Text>
            <Link href={exercise.info.technique_url}>
              <Feather name="external-link" size={24} color="black" />
            </Link>
          </>
        )}
        <Text style={styles.text}>
          Description: {exercise?.info.description}
        </Text>
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
