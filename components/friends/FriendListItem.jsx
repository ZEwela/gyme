import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { removeFriend } from "../../actions/users/removeFriend";
import { removeUserFriend } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import Action from "./Action";

const FriendListItem = ({ friend }) => {
  const dispatch = useDispatch();
  const handleRemoveFriend = () => {
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
          text: "Yes, remove",
          onPress: () => {
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
      <Action handler={handleRemoveFriend} text={"Remove"} textStyle={"red"} />
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
