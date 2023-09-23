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
import { create } from "../../../actions/workouts/createWorkout";

const createWorkout = () => {
  const { exerciseId, exerciseName } = useLocalSearchParams();
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const containsExercise = exercises.some(
      (exercise) => exercise.exerciseName === exerciseName
    );
    if (exerciseName && !containsExercise) {
      setExercises([...exercises, { exerciseId, exerciseName }]);
    }
  }, [exerciseName]);

  const createWorkout = () => {
    create(workoutName, exercises);
    router.replace({
      pathname: "workouts",
    });
  };

  console.log(exercises);

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
              title={item.exerciseName}
              pathname={`exercises/${item.exerciseName}`}
            />
          )}
          keyExtractor={(item) => item.exerciseId}
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
