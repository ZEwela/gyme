import { View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { users } from "../../../../data";
import { FlatList } from "react-native-gesture-handler";
import ExerciseCard from "../../../../components/ExerciseCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSetsByExerciseId,
  selectWorkout,
} from "../../../../store/slices/userWorkoutsSlice";

const Exercise = () => {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const { exerciseId, workoutMembers, workout } = params;

  const sets = useSelector((state) =>
    selectSetsByExerciseId(state, exerciseId)
  );
  console.log("FROM Exercise, sets: ", sets, exerciseId);

  // TODO: change when you will have store
  const workoutMembersToArray = workoutMembers?.split(",") || [];

  const members = users.filter((user) =>
    workoutMembersToArray.includes(user.id.toString())
  );

  const lastExercise = (workouts) => {
    // const lastWorkout = workouts.find(
    //   ({ workoutName }) => workoutName === workout
    // );
    // if (lastWorkout) {
    //   const lastExercise = lastWorkout.exercies.find(
    //     ({ name }) => name === exercise
    //   );
    //   return lastExercise.data;
    // }
    return [];
  };
  useEffect(() => {}, []);

  return (
    <View>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <ExerciseCard name={item.name} info={sets} exerciseId={exerciseId} />
        )}
      />
    </View>
  );
};

export default Exercise;
