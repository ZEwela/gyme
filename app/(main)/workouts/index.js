import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { workouts } from "../../../data";
import Item from "../../../components/Item";

const Workouts = () => {
  return (
    <FlatList
      data={workouts}
      renderItem={({ item }) => (
        <Item
          // onPress={() => }
          title={item.name}
          pathname={`/workouts/${item.name}`}
          params={{ workout: item.name }}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

export default Workouts;
