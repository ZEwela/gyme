import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import Item from "../../../components/Item";
import { getWorkoutsByUser } from "../../../actions/workouts/getWorkoutsByUser";
import { useDispatch } from "react-redux";
import { setUserWorkouts } from "../../../store/slices/userWorkoutsSlice";
import { router } from "expo-router";

const Workouts = () => {
  const dispatch = useDispatch();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const workouts = await getWorkoutsByUser();
        setWorkouts(workouts);
        const userWorkouts = workouts.map((workout) => {
          return {
            ...workout,
            created_at: workout.created_at.toDate().toISOString(),
          };
        });
        dispatch(setUserWorkouts(userWorkouts));
        setLoading(false);
      } catch (error) {
        alert(
          "Sorry something went wrong while trying to display list of workouts, please try again later"
        );
        console.error("Error fetching workouts:", error);
      }
    }

    fetchData();
  }, []);

  console.log("Workouts: ", workouts);
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Item pathname={"workouts/createWorkout"} title={"Create workout"} />

      {workouts?.length > 0 && (
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <Item
              title={item.workout_name}
              pathname={`workouts/${item.workout_id}`}
              params={{ workoutName: item.workout_name }}
            />
          )}
          keyExtractor={(item) => item.workout_id}
        />
      )}
    </>
  );
};

export default Workouts;
