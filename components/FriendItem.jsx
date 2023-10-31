import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

const FriendItem = ({ friend, toggleFriendToWorkout, isInMembers }) => {
  const [pressed, setPressed] = useState(isInMembers(friend._id));

  const handleAddingFriendToWorkout = () => {
    setPressed(!pressed);
    toggleFriendToWorkout(friend._id);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{friend.displayName}</Text>
      <View style={styles.actions}>
        {/* <Link href={{ pathname: pathname, params: params }}>
          <Feather name="user" size={30} color="black" />
        </Link> */}
        <Pressable
          testID={`member-${friend._id}`}
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
