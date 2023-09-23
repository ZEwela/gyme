import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Item from "../../../components/Item";
import { getWorkouts } from "../../../actions/workouts/getWorkouts";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const workouts = await getWorkouts();
        setWorkouts(workouts);
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
              pathname={`workouts/${item.workout_name}`}
            />
          )}
          keyExtractor={(item) => item.workout_name}
        />
      )}
    </>
  );
};

export default Workouts;
