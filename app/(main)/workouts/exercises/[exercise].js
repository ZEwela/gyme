import { View, Text, Button } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

const Exercise = ({ navigation }) => {
  const { exercise } = useLocalSearchParams();
  return (
    <View>
      <Text>Exercise, {exercise}</Text>
    </View>
  );
};

export default Exercise;
