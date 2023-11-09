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
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import AddOthersToWorkout from "./addOthersToWorkout";
import Item from "../../../components/Item";
import AddWorkoutNote from "../../../components/workout/AddWorkoutNote";
import {
  setUserWorkoutById,
  selectWorkout,
  resetUserWorkout,
} from "../../../store/slices/userWorkoutsSlice";
import { saveWorkout as save } from "../../../actions/workouts/saveWorkout";
import { memberWorkoutSave } from "../../../actions/workouts/memberWorkoutSave";
import { deleteWorkout as deleteWorkoutInDB } from "../../../actions/workouts/deleteWorkout";
import { updateWorkout as updateWorkoutInDB } from "../../../actions/workouts/updateWorkout";
import Drawer from "../../../components/workout/Drawer";
import { useCheckedExercises } from "../../../contexts/CheckedExercisesContext";

const Workout = () => {
  const dispatch = useDispatch();
  const { workoutId } = useLocalSearchParams();

  const workout = useSelector(selectWorkout);
  const exercises = workout?.exercises_list;

  const [showAddOthers, setShowAddOthers] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [showDrawer, setShowDrower] = useState<boolean>(false);

  const { checkedExercises, setCheckedExercises } = useCheckedExercises();

  useEffect(() => {
    if (workout && workoutId === workout.workout_id) {
      return;
    } else {
      dispatch(setUserWorkoutById(workoutId));
    }
  }, [workoutId]);

  const saveWorkout = async () => {
    try {
      const workoutSaved = await save(workout);
      if (workout.workout_members && workout.workout_members.length > 0) {
        workout.workout_members.forEach(async (member) => {
          try {
            const memberWorkoutSaved = await memberWorkoutSave(member, workout);
          } catch (error) {
            console.error("Error while trying to save member workouts", error);
          }
        });
      }
      alert(workoutSaved);
      dispatch(resetUserWorkout());
      router.push("/(main)/workouts/workoutsMain");
    } catch (error) {
      alert(
        "Sorry, something went wrong while saving your workout. Please try again later."
      );
    }
  };

  const deleteWorkout = async () => {
    try {
      const workoutDeleted = await deleteWorkoutInDB(workout.workout_id);
      setCheckedExercises([]);
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
        workout.workout_members
          ? "Save it as a new workout"
          : "Are you saving your changes or adding a new workout?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
          },
          workout.workout_members
            ? null
            : { text: "Save changes", onPress: () => updateWorkout() },
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
      `${
        workout.workout_members
          ? "Remember to save workouts"
          : "Warning: Your changes will not be saved. Would you like to continue anyway?"
      }`,
      [
        {
          text: `${
            workout.workout_members
              ? "Leave without saving"
              : "Leave, there are no changes"
          }`,
          onPress: () => {
            dispatch(resetUserWorkout());
            router.replace("/(main)/workouts/workoutsMain");
          },
        },
        {
          text: `${
            workout.workout_members
              ? "I want to save workouts"
              : "I need to save changes"
          }`,
          onPress: () => {
            return;
          },
        },
      ],
      { cancelable: false }
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
          setShow={setShowAddOthers}
          setShowAddNote={setShowAddNote}
          setShowDrawer={setShowDrower}
        />
      )}
      {showAddOthers && (
        <AddOthersToWorkout
          show={showAddOthers}
          setShow={setShowAddOthers}
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
