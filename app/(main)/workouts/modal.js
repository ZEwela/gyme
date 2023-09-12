import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { users } from "../../../data";
import FriendItem from "../../../components/FriendItem";

const Modal = ({
  setShow,
  friends,
  workout,
  setWorkoutMembers,
  workoutMembers,
}) => {
  const [friendsData, setFriendsData] = useState([]);

  const [newMembers, setNewMembers] = useState([...workoutMembers]);

  useEffect(() => {
    if (friends.length) {
      const fetchFriendsData = [];
      friends.forEach((friend) =>
        fetchFriendsData.push(users.find(({ id }) => id === friend))
      );
      setFriendsData(fetchFriendsData);
    }
  }, [friends]);

  const addFriendToWorkout = (friendId) => {
    const prepareNewMembers = [...newMembers, friendId];
    setNewMembers(prepareNewMembers);
    // TO DO: how to create workout for you, and other users
  };

  const handleClosing = () => {
    setWorkoutMembers([...newMembers]);
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Add friends</Text>
        <Pressable onPress={handleClosing}>
          <AntDesign name="closecircleo" size={24} color="black" />
        </Pressable>
      </View>
      <View styles={styles.body}>
        {friendsData?.length ? (
          <FlatList
            data={friendsData}
            renderItem={({ item }) => (
              <FriendItem
                title={item.name}
                userId={item.id}
                pathname={`/users/${item.name}`}
                params={{ user: item.id }}
                addFriendToWorkout={addFriendToWorkout}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E1F4CB",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
  },
});
