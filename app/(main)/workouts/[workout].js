import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Item from "../../../components/Item";
import { users, workouts } from "../../../data";
import AddOthersToWorkout from "./addOthersToWorkout";
import { Ionicons } from "@expo/vector-icons";

const Workout = () => {
  // TO CHANGE WHEN THE AUTHORIZATION WILL BE ADDED:
  const user = users.find(({ id }) => id === 0);

  const { workout } = useLocalSearchParams();
  const exercises = workouts.find(({ name }) => name === workout).exercises;
  // list of friends to choose to do workout with
  const [friends, setFriends] = useState([]);
  const [show, setShow] = useState(false);

  const [workoutMembers, setWorkoutMembers] = useState([user.id]);

  useEffect(() => {
    const addFriends = users.find(({ id }) => user.id === id).friends;
    setFriends(addFriends);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setShow(true)}>
              <Ionicons name="person-add-outline" size={30} color="white" />
            </Pressable>
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

      <Text>{workoutMembers.length}</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            pathname={`/workouts/exercises/${item.name}`}
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
