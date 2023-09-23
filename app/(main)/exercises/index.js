import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Item from "../../../components/Item";
import { getExercises } from "../../../actions/getExercises";

const Exercises = () => {
  const { workoutId } = useLocalSearchParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const data = getExercises();
    setExercises([...data]);
  }, []);

  return (
    <>
      <Item pathname={"exercises/createExercise"} title={"Create Exercise"} />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Item
            title={item.exercise_name}
            pathname={`exercises/${item.exercise_name}`}
            params={{ workoutId: workoutId }}
          />
        )}
        keyExtractor={(item) => item.exercise_name}
      />
    </>
  );
};

export default Exercises;
