import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUser,
  selectUser,
  setUser,
} from "../../../store/slices/userSlice";
import { Avatar } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ProfileMain = () => {
  const user = useSelector(selectUser);
  console.log("user", user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const userData = doc.data();
      console.log(userData);
      dispatch(setUser(userData));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAvatarEdit = () => {
    console.log("not yet");
  };

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        dispatch(resetUser());
        router.replace("(main)/profile/login");
      })
      .catch((error) => {
        alert("Something went wrong please try again later");
      });
  };
  const items = [
    {
      itemStyle: styles.actionItem,
      onClick: () => {
        router.push("(main)/profile/editProfile");
      },
      textStyle: { fontSize: 20 },
      text: "Edit Profile",
    },
    {
      friendRequestsTextStyle: styles.friendRequestsText,
      friendRequestsStyle: styles.friendRequests,
      itemStyle: styles.actionItem,
      onClick: () => {
        router.push("(main)/profile/friends");
      },
      textStyle: { fontSize: 20 },
      text: "Friends",
      friendRequests: user?.pendingFriendRequests?.length || null,
    },
    {
      itemStyle: styles.actionItem,
      onClick: () => console.log("c"),
      textStyle: { fontSize: 20 },
      text: "Password & Security",
    },
  ];

  const ItemSeparator = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      <Avatar
        size={64}
        rounded
        title={
          user?.displayName[0]?.toUpperCase() || user?.fullName[0].toUpperCase()
        }
        containerStyle={{
          backgroundColor: "green",
          alignSelf: "center",
          marginBottom: 50,
        }}
      >
        <Avatar.Accessory size={24} onPress={handleAvatarEdit} />
      </Avatar>
      <Text style={styles.header}>
        Hello {user?.displayName || user?.fullName}!
      </Text>
      <View style={styles.actions}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Pressable style={item.itemStyle} onPress={() => item.onClick()}>
              <Text style={item.textStyle}>{item.text}</Text>
              {item.friendRequests && (
                <View style={item.friendRequestsStyle}>
                  <Text style={item.friendRequestsTextStyle}>
                    {item.friendRequests}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>

      <View style={styles.signout}>
        <Pressable style={styles.signoutItem} onPress={handleSignout}>
          <Text style={styles.signoutText}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    padding: 20,
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#8CAB73",
    alignSelf: "center",
  },
  actions: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  actionItem: {
    marginVertical: 10,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#E5E4E2",
    padding: 5,
    elevation: 2,
    flexDirection: "row",
  },

  text: {
    fontSize: 20,
  },
  signout: {
    alignSelf: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 5,
    marginBottom: 40,
  },
  signoutItem: {
    backgroundColor: "#989898",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  signoutText: {
    fontSize: 25,
    letterSpacing: 1.5,
    color: "white",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
  friendRequests: {
    backgroundColor: "green",
    borderRadius: 25,
    width: 20,
    height: 20,
  },
  friendRequestsText: { alignSelf: "center", color: "white" },
});
