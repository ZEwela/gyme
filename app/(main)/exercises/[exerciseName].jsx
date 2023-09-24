import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { selectExercises } from "../../../store/slices/exercisesSlice";
import { useSelector } from "react-redux";

const Exercise = () => {
  const { exerciseName, workoutName } = useLocalSearchParams();
  const [exercise, setExercise] = useState();
  const [loading, setLoading] = useState(true);
  const exercises = useSelector(selectExercises);

  useEffect(() => {
    const fetchExercise = exercises.find(
      ({ exercise_name }) => exercise_name === exerciseName
    );
    setExercise(fetchExercise);
    setLoading(false);
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
