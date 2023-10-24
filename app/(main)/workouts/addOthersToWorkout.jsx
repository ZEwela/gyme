import { View, StyleSheet, Pressable, FlatList, Modal } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import FriendItem from "../../../components/FriendItem";
import { toggleState } from "../../../utils/toggleState";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import {
  addMemberToWorkout,
  removeMemberFromWorkout,
  selectWorkout,
} from "../../../store/slices/userWorkoutsSlice";

const AddOthersToWorkout = ({ show, setShow, setShowDrawer }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const workout = useSelector(selectWorkout);

  const [friends, setFriends] = useState(user?.friends || []);
  const [members, setMembers] = useState(workout?.workout_members || []);

  const toggleMember = (memberId) => {
    if (members.includes(memberId)) {
      dispatch(removeMemberFromWorkout(memberId));
    } else {
      dispatch(addMemberToWorkout(memberId));
    }
    const _members = toggleState(members, memberId);
    setMembers(_members);
  };

  const handleClosing = () => {
    setShow(false);
    setShowDrawer(false);
  };

  const isInMembers = (id) => {
    return members?.includes(id);
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
            {friends.length ? (
              <FlatList
                data={friends}
                renderItem={({ item }) => (
                  <FriendItem
                    testID={`member-${item?._id}`}
                    item={item}
                    title={item?.displayName}
                    userId={item?._id}
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
