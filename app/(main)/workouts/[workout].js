import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams } from "expo-router";

const Workout = ({ route, navigation }) => {
  const { workout } = useLocalSearchParams();

  return (
    <View>
      <Text>Workout, {workout}</Text>
    </View>
  );
};

export default Workout;
