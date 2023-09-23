import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Item from "../../../components/Item";
import { useLocalSearchParams } from "expo-router";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase";

const Exercises = () => {
  const { workoutId } = useLocalSearchParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const exercisesRef = ref(db, "exercises");
    onValue(exercisesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataInArray = Object.values(data);
        setExercises([...dataInArray]);
      }
    });
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
