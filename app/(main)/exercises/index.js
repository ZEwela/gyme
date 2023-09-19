import { View, Text, FlatList } from "react-native";
import React from "react";
import Item from "../../../components/Item";
import { exercises } from "../../../data";
import { useLocalSearchParams } from "expo-router";

const Exercises = () => {
  const { workoutId } = useLocalSearchParams();

  return (
    <>
      <Item pathname={"exercises/createExercise"} title={"Create Exercise"} />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            pathname={`exercises/${item.name}`}
            params={{ workoutId: workoutId }}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};

export default Exercises;
