import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { users } from "../../../../data";
import { FlatList } from "react-native-gesture-handler";
import ExerciseCard from "../../../../components/ExerciseCard";

const Exercise = () => {
  const params = useLocalSearchParams();

  const { exerciseId, workoutMembers, workout } = params;

  // TODO: change when you will have store
  const workoutMembersToArray = workoutMembers?.split(",") || [];

  const members = users.filter((user) =>
    workoutMembersToArray.includes(user.id.toString())
  );

  return (
    <View>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <ExerciseCard name={item.name} exerciseId={exerciseId} />
        )}
      />
    </View>
  );
};

export default Exercise;
