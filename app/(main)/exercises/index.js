import { ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Item from "../../../components/Item";
import { getExercises } from "../../../actions/getExercises";
import { useDispatch } from "react-redux";
import { setExercises as setExercisesInStore } from "../../../store/slices/exercisesSlice";

const Exercises = () => {
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getting exercises from db
    const fetchData = async () => {
      try {
        const data = await getExercises();
        setExercises([...data]);
        // setting exercises in redux store
        dispatch(setExercisesInStore(data));
        setLoading(false);
      } catch (error) {
        alert(
          "Sorry something went wrong while trying to display list of exercises, please try again later"
        );
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator color={"green"} />;
  }

  return (
    <>
      <Item pathname={"exercises/createExercise"} title={"Create Exercise"} />
      {exercises.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Item
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
