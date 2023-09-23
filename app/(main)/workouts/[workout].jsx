import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { users, workouts } from "../../../data";
import AddOthersToWorkout from "./addOthersToWorkout";
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import Item from "../../../components/Item";
import AddWorkoutNote from "../../../components/AddWorkoutNote";

const Workout = () => {
  // TO CHANGE WHEN THE AUTHORIZATION WILL BE ADDED:

  const user = users.find(({ id }) => id === 0);

  const { workout } = useLocalSearchParams();
  const exercises = workouts.find(({ name }) => name === workout).exercises;
  // list of friends to choose to do workout with
  const [friends, setFriends] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [workoutMembers, setWorkoutMembers] = useState([user.id]);

  useEffect(() => {
    const addFriends = users.find(({ id }) => user.id === id).friends;
    setFriends(addFriends);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${workout.toUpperCase()}`,
          headerRight: () => (
            <View style={styles.row}>
              <Pressable onPress={() => setShowAddNote(true)}>
                <SimpleLineIcons name="note" size={28} color="white" />
              </Pressable>
              <Link
                href={{
                  pathname: "(main)/exercises",
                  params: { workoutId: workout },
                }}
              >
                <MaterialIcons name="fitness-center" size={30} color="white" />
              </Link>
              <Pressable onPress={() => setShow(true)}>
                <Ionicons name="person-add-outline" size={30} color="white" />
              </Pressable>
            </View>
          ),
        }}
      />
      {show && (
        <AddOthersToWorkout
          setShow={setShow}
          membersIds={friends}
          workout={workout}
          setWorkoutMembers={setWorkoutMembers}
          workoutMembers={workoutMembers}
        />
      )}
      {showAddNote && (
        <AddWorkoutNote
          workoutId={workout}
          user={user}
          setShow={setShowAddNote}
          show={showAddNote}
        />
      )}
      {showAddExercise && (
        <AddWorkoutNote
          workoutId={workout}
          user={user}
          setShow={setShowAddExercise}
          show={showAddExercise}
        />
      )}

      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            pathname={`workouts/exercises/${item.name}`}
            params={{
              exercise: item.name,
              // with state it should be deal diffrently
              workoutMembers: workoutMembers.toString(),
              workout: workout,
            }}
          />
        )}
        keyExtractor={(item) => item.name}
      />
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
});
