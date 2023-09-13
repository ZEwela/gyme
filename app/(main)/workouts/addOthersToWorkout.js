import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { users } from "../../../data";
import FriendItem from "../../../components/FriendItem";

const AddOthersToWorkout = ({
  show,
  setShow,
  friendsIds,
  workout,
  setWorkoutMembers,
  workoutMembers,
}) => {
  const [friendsData, setFriendsData] = useState([]);

  const [newMembers, setNewMembers] = useState([...workoutMembers]);
  const [isActive, setIsActive] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (friendsIds.length) {
      const fetchFriendsData = [];
      friendsIds.forEach((friend) =>
        fetchFriendsData.push(users.find(({ id }) => id === friend))
      );
      setFriendsData(fetchFriendsData);
    }
  }, [friendsIds]);

  const toggleFriendToWorkout = (friendId) => {
    const isInMewMembers = newMembers[friendId];
    let updatedNewMembers;
    if (isInMewMembers) {
      const prepareNewMembers = newMembers.filter(
        (member) => member !== friendId
      );
      updatedNewMembers = [...prepareNewMembers];
    } else {
      updatedNewMembers = [...newMembers, friendId];
    }

    setNewMembers(updatedNewMembers);
    // TO DO: how to create workout for you, and other users
  };

  const handleClosing = () => {
    setWorkoutMembers([...newMembers]);
    setShow(false);
  };
  const isInMembers = (id) => {
    return newMembers[id];
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={show}>
        <View style={styles.container}>
          <Text>{newMembers.length}</Text>
          <View style={styles.header}>
            <Pressable onPress={handleClosing}>
              {newMembers.length > 1 ? (
                <View style={styles.headerAddClose}>
                  <AntDesign name="closecircleo" size={24} color="black" />
                  <Text style={styles.button}>Add</Text>
                </View>
              ) : (
                <View style={styles.headerClose}>
                  <AntDesign name="closecircleo" size={24} color="black" />
                </View>
              )}
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
                    toggleFriendToWorkout={toggleFriendToWorkout}
                    isInMembers={isInMembers}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddOthersToWorkout;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E1F4CB",
  },
  headerClose: {
    flexDirection: "row",
    margin: 15,
    padding: 10,
    justifyContent: "flex-end",
  },

  button: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
  body: {
    flex: 1,
  },
  headerAddClose: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
