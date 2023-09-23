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
import { toggleState } from "../../../utils/toggleState";

const AddOthersToWorkout = ({
  show,
  setShow,
  membersIds,
  workout,
  setWorkoutMembers,
  workoutMembers,
}) => {
  const [membersData, setMembersData] = useState([]);

  const [members, setMembers] = useState([...workoutMembers]);

  useEffect(() => {
    if (membersIds.length) {
      const _membersData = [];
      membersIds.forEach((memberId) => {
        const memberData = users.find(({ id }) => id === memberId);
        if (memberData) {
          _membersData.push(memberData);
        }
      });
      setMembersData(_membersData);
    }
  }, [membersIds]);

  const toggleMember = (memberId) => {
    const _members = toggleState(members, memberId);

    setMembers(_members);

    // TO DO: how to create workout for you, and other users and what to do with adding and removing members during workout
  };

  const handleClosing = () => {
    setWorkoutMembers([...members]);
    setShow(false);
  };

  const isInMembers = (id) => {
    return members.includes(id);
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={show}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable testID={"close-button"} onPress={handleClosing}>
              <View style={styles.headerClose}>
                <AntDesign name="closecircleo" size={24} color="black" />
              </View>
            </Pressable>
          </View>
          <View styles={styles.body}>
            {membersData.length ? (
              <FlatList
                data={membersData}
                renderItem={({ item }) => (
                  <FriendItem
                    testID={`member-${item?.id}`}
                    item={item}
                    title={item?.name}
                    userId={item?.id}
                    pathname={`/users/${item?.name}`}
                    params={{ user: item?.id }}
                    toggleFriendToWorkout={toggleMember}
                    isInMembers={isInMembers}
                  />
                )}
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
});
