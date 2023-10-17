import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { users } from "../../../data";
import AddOthersToWorkout from "./addOthersToWorkout";
import Item from "../../../components/Item";
import AddWorkoutNote from "../../../components/AddWorkoutNote";
import {
  setUserWorkoutById,
  selectWorkout,
  resetUserWorkout,
} from "../../../store/slices/userWorkoutsSlice";
import { saveWorkout as save } from "../../../actions/workouts/saveWorkout";
import { deleteWorkout as deleteWorkoutInDB } from "../../../actions/workouts/deleteWorkout";
import { updateWorkout as updateWorkoutInDB } from "../../../actions/workouts/updateWorkout";
import Drawer from "../../../components/Drawer";

const Workout = () => {
  // TO CHANGE WHEN THE AUTHORIZATION WILL BE ADDED:

  const user = users.find(({ id }) => id === 0);
  const { workoutId } = useLocalSearchParams();

  const dispatch = useDispatch();

  const [show, setShow] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [showDrawer, setShowDrower] = useState<boolean>(false);

  // it needts to be change while friends will be fetched from db
  const [friends, setFriends] = useState([]);
  const [workoutMembers, setWorkoutMembers] = useState<number[]>([user.id]);

  const workout = useSelector(selectWorkout);
  const exercises = workout?.exercises_list;

  useEffect(() => {
    if (workout && workoutId === workout.workout_id) {
      return;
    } else {
      dispatch(setUserWorkoutById(workoutId));
    }

    // this will be fetched from db
    const addFriends = users.find(({ id }) => user.id === id).friends;
    setFriends(addFriends);
  }, [workoutId]);

  const saveWorkout = async () => {
    try {
      const workoutSaved = await save(workout);
      alert(workoutSaved);
      dispatch(resetUserWorkout());
      router.replace("/(main)/workouts/workoutsMain");
    } catch (error) {
      alert(
        "Sorry, something went wrong while saving your workout. Please try again later."
      );
    }
  };

  const deleteWorkout = async () => {
    try {
      const workoutDeleted = await deleteWorkoutInDB(workout.workout_id);
      alert(workoutDeleted);
      dispatch(resetUserWorkout());
      router.replace("/(main)/workouts/workoutsMain");
    } catch (error) {
      alert(
        "Sorry, something went wrong while deleting your workout. Please try again later."
      );
    }
  };

  const updateWorkout = async () => {
    try {
      const workoutUpdated = await updateWorkoutInDB(workout);
      alert(workoutUpdated);
      dispatch(resetUserWorkout());
      router.replace("/(main)/workouts/workoutsMain");
    } catch (error) {
      alert(
        "Sorry, something went wrong while updating your workout. Please try again later."
      );
    }
  };

  const handleSaving = () => {
    if (workout.workout_id === workout.workout_name) {
      saveWorkout();
    } else {
      Alert.alert(
        null,
        "Are you saving your changes or adding a new workout?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
          },
          { text: "Save changes", onPress: () => updateWorkout() },
          { text: "Save as a new workout", onPress: () => saveWorkout() },
        ]
      );
    }
  };
  const handleDeleteingWorkout = () => {
    Alert.alert(
      null,
      "Warning: You are about to permanently delete this workout. Please, confirm, would you like to delete this record?",
      [
        { text: "Delete", onPress: () => deleteWorkout() },
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    Alert.alert(
      // title
      null,
      // body
      "Warning: Your changes will not be saved. Would you like to continue anyway?",
      [
        {
          text: "Continue, without saving",
          onPress: () => {
            dispatch(resetUserWorkout());
            router.back();
          },
        },
        {
          text: "No",
          onPress: () => {
            return;
          },
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  if (!workout) {
    return <ActivityIndicator color={"green"} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${
            workout.workout_name.length > 15
              ? workout.workout_name.toUpperCase().slice(0, 15).trim() + "..."
              : workout.workout_name.toUpperCase()
          }`,
          headerLeft: () => (
            <Pressable style={{ marginRight: 10 }} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.row}>
              <Pressable onPress={handleSaving}>
                <Text style={styles.doneBtn}>SAVE</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowDrower(!showDrawer);
                }}
              >
                {showDrawer ? (
                  <Ionicons name="close" size={32} color="white" />
                ) : (
                  <Ionicons name="menu-outline" size={32} color="white" />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      {showDrawer && (
        <Drawer
          handleDeleteingWorkout={handleDeleteingWorkout}
          setShow={setShow}
          setShowAddNote={setShowAddNote}
          setShowDrawer={setShowDrower}
        />
      )}
      {show && (
        <AddOthersToWorkout
          show={show}
          setShow={setShow}
          membersIds={friends}
          workoutName={workout.workout_name}
          setWorkoutMembers={setWorkoutMembers}
          workoutMembers={workoutMembers}
          setShowDrawer={setShowDrower}
        />
      )}
      {showAddNote && (
        <AddWorkoutNote
          setShow={setShowAddNote}
          show={showAddNote}
          setShowDrawer={setShowDrower}
        />
      )}
      {exercises?.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <Item
              title={item.exercise_name}
              pathname={`/(main)/workouts/exercises/${item.exercise_name}`}
              params={{
                exerciseName: item.exercise_name,
                exerciseId: item.exercise_id,
                // with state it should be deal diffrently
                workoutMembers: workoutMembers.toString(),
                workout: workout.workout_id,
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
