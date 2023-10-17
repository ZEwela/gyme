import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import WorkoutListItem from "../../../components/WorkoutListItem";
import { getWorkoutsByUser } from "../../../actions/workouts/getWorkoutsByUser";
import { setUserWorkouts } from "../../../store/slices/userWorkoutsSlice";
import { Workout } from "../../../types";
import AddButton from "../../../components/AddButton";

interface WorkoutsProps {}

const Workouts: React.FC<WorkoutsProps> = () => {
  const dispatch = useDispatch();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const workouts = await getWorkoutsByUser();

        const workoutsWithDatesAsStrings = workouts.map((workout: Workout) => {
          /*
          Convert timestamps, coming from database, to strings before adding it to redux store 
          to avoid a non-serializable value error 
          */
          if (workout.updated_at) {
            if (
              typeof workout.created_at === "string" &&
              typeof workout.updated_at === "string"
            ) {
              return workout;
            } else {
              const created_at =
                typeof workout.created_at === "string"
                  ? workout.created_at
                  : workout.created_at.toDate().toISOString();

              const updated_at =
                typeof workout.updated_at === "string"
                  ? workout.updated_at
                  : workout.updated_at.toDate().toISOString();

              return {
                ...workout,
                created_at,
                updated_at,
              };
            }
          } else {
            if (typeof workout.created_at === "string") {
              return workout;
            } else {
              const created_at =
                typeof workout.created_at === "string"
                  ? workout.created_at
                  : workout.created_at.toDate().toISOString();

              return {
                ...workout,
                created_at,
              };
            }
          }
        });

        setWorkouts(workoutsWithDatesAsStrings);
        dispatch(setUserWorkouts(workoutsWithDatesAsStrings));

        setLoading(false);
      } catch (error) {
        alert(
          "Sorry something went wrong while trying to display list of workouts, please try again later"
        );
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator color={"green"} />;
  }

  return (
    <>
      <View style={styles.createWorkoutBtn}>
        <AddButton
          pathname={"workouts/createWorkout"}
          title={"Start a new workout"}
          params={{}}
        />
      </View>
      {workouts?.length > 0 && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.textFirst}> or </Text>
            <Text style={styles.textSecond}> redo one ? </Text>
          </View>
          <FlatList
            data={workouts}
            renderItem={({ item, index }) => (
              <WorkoutListItem
                title={`${item.workout_name} / ${
                  typeof item.created_at === "string"
                    ? item.created_at.slice(0, 10)
                    : null
                }`}
                pathname={`workouts/${item.workout_id}`}
                params={{
                  workoutName: item.workout_name,
                  workoutId: item.workout_id,
                }}
              />
            )}
            keyExtractor={(item) => item.workout_id}
          />
        </>
      )}
    </>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  createWorkoutBtn: {
    marginTop: 50,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 20,
  },
  textFirst: {
    fontSize: 20,
  },
  textSecond: {
    fontSize: 25,
    color: "#8CAB73",
    fontWeight: "bold",
  },
});
