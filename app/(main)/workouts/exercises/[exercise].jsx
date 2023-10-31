import { View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import ExerciseCard from "../../../../components/ExerciseCard";
import { useSelector } from "react-redux";
import { selectWorkout } from "../../../../store/slices/userWorkoutsSlice";
import MemberExerciseCard from "../../../../components/MemberExerciseCard";

const Exercise = () => {
  const params = useLocalSearchParams();
  const { exerciseId } = params;
  const workout = useSelector(selectWorkout);

  const members = workout.workout_members || null;

  return (
    <View>
      <ExerciseCard exerciseId={exerciseId} />
      {members?.length > 0 && (
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <MemberExerciseCard memberId={item} exerciseId={exerciseId} />
          )}
        />
      )}
    </View>
  );
};

export default Exercise;
