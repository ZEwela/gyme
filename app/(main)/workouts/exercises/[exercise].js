import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { users } from "../../../../data";
import { FlatList } from "react-native-gesture-handler";
import ExerciseCard from "../../../../components/ExerciseCard";

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
    if (lastWorkout) {
      const lastExercise = lastWorkout.exercies.find(
        ({ name }) => name === exercise
      );
      return lastExercise.data;
    }
    return [];
  };

  return (
    <View>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <ExerciseCard
            name={item.name}
            info={lastExercise(item.workoutsHistory)}
          />
        )}
      />
    </View>
  );
};

export default Exercise;
