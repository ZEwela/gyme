import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { removeFriend } from "../actions/users/removeFriend";
import { removeUserFriend } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

const FriendListItem = ({ friend, pressed, handleToggleFriend }) => {
  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(pressed);
  handleToggle = () => {
    Alert.alert(
      null,
      "Are you sure that you want to remove it from your friends list?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
        },
        {
          text: "Yes, delete",
          onPress: () => {
            console.log("removing", friend.email);
            dispatch(removeUserFriend(friend.email));
            removeFriend(friend);
          },
        },
      ]
    );
  };
  return (
    <View style={styles.friendContainer}>
      <View style={styles.friendItem}>
        <Text style={styles.text}>{friend.displayName}</Text>
        <Text style={styles.text}>{friend.email}</Text>
      </View>
      <Pressable onPress={handleToggle}>
        {isPressed ? (
          <AntDesign name="checkcircle" size={30} color="green" />
        ) : (
          <Ionicons name="md-add-circle-outline" size={30} color="black" />
        )}
      </Pressable>
    </View>
  );
};

export default FriendListItem;
const styles = StyleSheet.create({
  textTitle: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 20 },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E5E4E2",
    padding: 10,
  },
});
