import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { getUserDetailsById } from "../../../actions/users/getUserDetailsById";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { Avatar } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";

const ProfileMain = ({ name }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const id = auth.currentUser.uid;
  const userStore = useSelector(selectUser);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        const data = await getUserDetailsById(id);
        setUser(data);
      };
      fetchUserData();
    }
  }, []);

  const handleAvatarEdit = () => {
    console.log("not yet");
  };

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        router.replace("(main)/profile/login");
      })
      .catch((error) => {
        alert("Something went wrong please try gain later");
      });
  };
  const items = [
    {
      itemStyle: styles.actionItem,
      onClick: () => {
        console.log("a");
      },
      textStyle: { fontSize: 20 },
      text: "Edit Profile",
    },
    {
      itemStyle: styles.actionItem,
      onClick: () => {
        console.log("b");
      },
      textStyle: { fontSize: 20 },
      text: "Friends",
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
        title={user?.name[0].toUpperCase()}
        containerStyle={{
          backgroundColor: "green",
          alignSelf: "center",
          marginBottom: 50,
        }}
      >
        <Avatar.Accessory size={24} onPress={handleAvatarEdit} />
      </Avatar>
      <Text style={styles.header}>Hello {user?.name}!</Text>
      <View style={styles.actions}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Pressable style={item.itemStyle} onPress={() => item.onClick()}>
              <Text style={item.textStyle}>{item.text}</Text>
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
});
