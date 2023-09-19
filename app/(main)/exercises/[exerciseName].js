import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { exercises } from "../../../data";
import { Feather } from "@expo/vector-icons";

const Exercise = () => {
  const { exerciseName, workoutId } = useLocalSearchParams();
  const details = exercises.find(
    (exercise) => exercise.name === exerciseName
  ).ref;

  const handleAddingExerciseToWorkout = () => {
    router.push({
      pathname: "(main)/workouts/createWorkout",
      params: { exerciseId: exerciseName },
    });
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <Pressable onPress={handleAddingExerciseToWorkout}>
              <Feather name="check-square" size={30} color="white" />
            </Pressable>
          ),
        }}
      />
      <Text style={styles.header}>{exerciseName} </Text>

      <View style={styles.body}>
        <Link href={details}>
          <Feather name="external-link" size={24} color="black" />
        </Link>
        <Text style={styles.text}>Description:</Text>
        <Text style={styles.text}>Muscle Group:</Text>
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
});
