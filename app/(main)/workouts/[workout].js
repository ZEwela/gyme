import { View, Text, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import Item from "../../../components/Item";
import { users, workouts } from "../../../data";
import Modal from "./modal";

const Workout = () => {
  // TO CHANGE WHEN THE AUTHORIZATION WILL BE ADDED:
  const user = users.find(({ id }) => id === 0);

  const { workout } = useLocalSearchParams();
  const exercises = workouts.find(({ name }) => name === workout).exercises;
  // list of friends to choose to do workout with
  const [friends, setFriends] = useState([]);
  const [show, setShow] = useState(true);

  const [workoutMembers, setWorkoutMembers] = useState([user.id]);

  useEffect(() => {
    const addFriends = users.find(({ id }) => user.id === id).friends;
    setFriends(addFriends);
  }, []);

  return (
    <>
      {show && (
        <Modal
          setShow={setShow}
          friends={friends}
          workout={workout}
          setWorkoutMembers={setWorkoutMembers}
          workoutMembers={workoutMembers}
        />
      )}
      <Text>{workoutMembers?.length}</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            pathname={`/workouts/exercises/${item.name}`}
            params={{ exercise: item.name }}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};

export default Workout;
