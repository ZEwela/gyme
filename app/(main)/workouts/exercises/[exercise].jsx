import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { users } from "../../../../data";
import { FlatList } from "react-native-gesture-handler";
import ExerciseCard from "../../../../components/ExerciseCard";
import { getAuth } from "firebase/auth";

const Exercise = () => {
  const params = useLocalSearchParams();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
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
