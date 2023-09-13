import { View, Text, Button } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { users } from "../../../../data";
import { FlatList } from "react-native-gesture-handler";
import ExerciseItem from "../../../../components/ExerciseItem";

const Exercise = () => {
  const params = useLocalSearchParams();

  const { exercise, workoutMembers, workout } = params;
  // TODO: change when you will have store
  const workoutMembersToArray = workoutMembers.split(",");

  const members = users.filter((user) =>
    workoutMembersToArray.includes(user.id.toString())
  );
  const lastExercise = (workouts) => {
    const lastWorkout = workouts.find(
      ({ workoutName }) => workoutName === workout
    );
    if (lastExercise) {
      const lastExercise = lastWorkout.exercies.find(
        ({ name }) => name === exercise
      );
      return lastExercise.data;
    }
    return null;
  };

  console.log(members);
  return (
    <View>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <ExerciseItem
            name={item.name}
            info={lastExercise(item.workoutsHistory)}
          />
        )}
      />
      <Text>Exercise,{exercise}</Text>
    </View>
  );
};

export default Exercise;
