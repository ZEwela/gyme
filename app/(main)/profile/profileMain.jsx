import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const ProfileMain = ({ name }) => {
  return (
    <View>
      <Text>User, {name}</Text>
      <Button title="go back" onPress={() => router.back()} />
    </View>
  );
};

export default ProfileMain;
