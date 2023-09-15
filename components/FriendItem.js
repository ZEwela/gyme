import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

const FriendItem = ({
  item,
  title,
  pathname,
  params,
  userId,
  toggleFriendToWorkout,
  isInMembers,
}) => {
  const [pressed, setPressed] = useState(isInMembers(userId));

  const handleAddingFriendToWorkout = () => {
    setPressed(!pressed);
    toggleFriendToWorkout(userId);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.actions}>
        <Link href={{ pathname: pathname, params: params }}>
          {/* TO CHANGE: is will be avatar */}
          <Feather name="user" size={30} color="black" />
        </Link>
        <Pressable
          testID={`member-${userId}`}
          onPress={() => handleAddingFriendToWorkout()}
        >
          {pressed ? (
            <AntDesign name="checkcircle" size={30} color="green" />
          ) : (
            <Ionicons name="md-add-circle-outline" size={30} color="black" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    padding: 24,
    justifyContent: "space-between",
    backgroundColor: "#BACBA9",
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
});
