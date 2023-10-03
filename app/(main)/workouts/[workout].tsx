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

const Workout = () => {
  // TO CHANGE WHEN THE AUTHORIZATION WILL BE ADDED:

  const user = users.find(({ id }) => id === 0);
  const { workoutId } = useLocalSearchParams();

  const dispatch = useDispatch();

  const [show, setShow] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);

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
      router.replace("/(main)/workouts");
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
      router.replace("/(main)/workouts");
    } catch (error) {
      alert(
        "Sorry, something went wrong while deleting your workout. Please try again later."
      );
    }
  };

  const updateWorkout = async () => {
    console.log(workout);
    try {
      const workoutUpdated = await updateWorkoutInDB(workout);
      alert(workoutUpdated);
      dispatch(resetUserWorkout());
      router.replace("/(main)/workouts");
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
        "Would you like to create a new workout record or edit existing workout record?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
          },
          { text: "Edit", onPress: () => updateWorkout() },
          { text: "Create", onPress: () => saveWorkout() },
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
            router.replace("/(main)/workouts");
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
          headerTitle: `${workout.workout_name.toUpperCase()}`,
          headerLeft: () => (
            <Pressable style={{ marginRight: 31 }} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.row}>
              {workout.workout_id !== workout.workout_name && (
                <Pressable onPress={handleDeleteingWorkout}>
                  <Ionicons name="trash-outline" size={32} color="white" />
                </Pressable>
              )}

              <Pressable onPress={() => setShowAddNote(true)}>
                <SimpleLineIcons name="note" size={28} color="white" />
              </Pressable>
              <Link replace href="/(main)/exercises/">
                <MaterialIcons name="fitness-center" size={30} color="white" />
              </Link>
              <Pressable onPress={() => setShow(true)}>
                <Ionicons name="person-add-outline" size={30} color="white" />
              </Pressable>

              <Pressable onPress={handleSaving}>
                <Text style={styles.doneBtn}>SAVE</Text>
              </Pressable>
            </View>
          ),
        }}
      />
      {show && (
        <AddOthersToWorkout
          show={show}
          setShow={setShow}
          membersIds={friends}
          workoutName={workout.workout_name}
          setWorkoutMembers={setWorkoutMembers}
          workoutMembers={workoutMembers}
        />
      )}
      {showAddNote && (
        <AddWorkoutNote setShow={setShowAddNote} show={showAddNote} />
      )}
      {exercises?.length && (
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
