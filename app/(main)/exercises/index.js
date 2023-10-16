import { ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getExercisesRealtime } from "../../../actions/getExercises";
import {
  selectExercises,
  setExercises as setExercisesInStore,
} from "../../../store/slices/exercisesSlice";
import AddButton from "../../../components/AddButton";
import ExerciseListItem from "../../../components/ExerciseListItem";

const Exercises = () => {
  const dispatch = useDispatch();
  const exercisesFromStore = useSelector(selectExercises);
  const [exercises, setExercises] = useState(exercisesFromStore || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates and provide a callback to handle changes.
    const unsubscribe = getExercisesRealtime(
      (updatedExercises) => {
        // Update the Redux store with the updated exercises.
        dispatch(setExercisesInStore(updatedExercises));

        // Set the local state with the updated exercises.
        setExercises(updatedExercises);

        setLoading(false);
      },
      (error) => {
        setLoading(false);
        alert(
          "Something went wrong while trying to display a list of exercises, please try again later"
        );
      }
    );

    // Clean up the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator color={"green"} />;
  }

  return (
    <>
      <AddButton
        pathname={"exercises/createExercise"}
        title={"Create New Exercise"}
      />
      {exercises.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <ExerciseListItem
              title={item.exercise_name}
              pathname={`exercises/${item.exercise_name}`}
              params={{ exerciseName: item.exercise_name }}
            />
          )}
        />
      )}
    </>
  );
};

export default Exercises;
