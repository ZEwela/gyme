import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { users, workouts } from "../../../data";
import AddOthersToWorkout from "./addOthersToWorkout";
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import Item from "../../../components/Item";
import AddWorkoutNote from "../../../components/AddWorkoutNote";
import {
  setUserWorkoutByName,
  selectWorkoutExercisesList,
  selectWorkout,
} from "../../../store/slices/userWorkoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveWorkout as save } from "../../../actions/workouts/saveWorkout";

const Workout = () => {
  // TO CHANGE WHEN THE AUTHORIZATION WILL BE ADDED:

  const user = users.find(({ id }) => id === 0);
  const dispatch = useDispatch();

  const { workoutName } = useLocalSearchParams();

  // list of friends to choose to do workout with
  const [friends, setFriends] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [workoutMembers, setWorkoutMembers] = useState([user.id]);

  const exercises = useSelector(selectWorkoutExercisesList);
  const workout = useSelector(selectWorkout);

  useEffect(() => {
    console.log("FRom workout, workout: from useEffect: ", workout);
    if (workout) {
      return;
    } else {
      dispatch(setUserWorkoutByName(workoutName));
    }
    const addFriends = users.find(({ id }) => user.id === id).friends;
    setFriends(addFriends);
  }, []);
  console.log("exercises from workoutName", exercises);
  const saveWorkout = async () => {
    console.log("trying to save");
    try {
      const workoutSaved = await save(workout);
      alert(workoutSaved);
      router.replace({
        pathname: "workouts",
      });
    } catch (error) {
      alert(
        "Sorry, something went wrong while saving your workout. Please try again later."
      );
      console.log(error);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${workoutName.toUpperCase()}`,
          headerRight: () => (
            <View style={styles.row}>
              <Pressable onPress={() => setShowAddNote(true)}>
                <SimpleLineIcons name="note" size={28} color="white" />
              </Pressable>
              <Link
                href={{
                  pathname: "(main)/exercises",
                  params: { workoutName: workoutName },
                }}
              >
                <MaterialIcons name="fitness-center" size={30} color="white" />
              </Link>
              <Pressable onPress={() => setShow(true)}>
                <Ionicons name="person-add-outline" size={30} color="white" />
              </Pressable>
              <Pressable onPress={saveWorkout}>
                <Text style={styles.doneBtn}>SAVE</Text>
              </Pressable>
            </View>
          ),
        }}
      />
      {show && (
        <AddOthersToWorkout
          setShow={setShow}
          membersIds={friends}
          workoutName={workoutName}
          setWorkoutMembers={setWorkoutMembers}
          workoutMembers={workoutMembers}
        />
      )}
      {showAddNote && (
        <AddWorkoutNote
          workout={workoutName}
          user={user}
          setShow={setShowAddNote}
          show={showAddNote}
        />
      )}
      {exercises?.length && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Item
              title={item.exercise_name}
              pathname={`workouts/exercises/${item.exercise_name}`}
              params={{
                exerciseName: item.exercise_name,
                exerciseId: item.exercise_id,
                // with state it should be deal diffrently
                workoutMembers: workoutMembers.toString(),
                workout: workoutName,
              }}
            />
          )}
          keyExtractor={(item) => item.exercise_id}
        />
      )}
    </>
  );
};

export default Workout;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  doneBtn: {
    color: "white",
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    padding: 5,
  },
});
