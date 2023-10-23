import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserFriend,
  removePendingFriendRequest,
  removeUserFriend,
  selectUser,
} from "../../../store/slices/userSlice";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { getUserDetailsByEmail } from "../../../actions/users/getUserDetailsByEmail";
import FriendListItem from "../../../components/FriendListItem";
import {
  addFriend,
  sendFriendRequest,
} from "../../../actions/users/sendFriendRequest";
import { removeFriend } from "../../../actions/users/removeFriend";
import { acceptFriendRequest } from "../../../actions/users/acceptFriendRequest";

const friends = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //   state for user input: email of person you looking for
  const [friendsEmial, setFriendsEmail] = useState("");

  const [isSearch, setIsSearch] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const friends = user?.friends || null;
  const [searchResult, setSearchResult] = useState(null);
  const [pressed, setPressed] = useState(false);

  const handleShowSearch = () => {
    setNoResults(false);
    setIsSearch(!isSearch);
  };

  const handleSearch = async () => {
    if (friendsEmial.length <= 0) {
      setIsSearch(false);
      return;
    }
    const result = await getUserDetailsByEmail(friendsEmial.trim());
    if (result.length === 0) {
      setNoResults(true);

      setTimeout(() => {
        setNoResults(false);
      }, 5000);
    } else {
      setSearchResult(...result);
    }

    setFriendsEmail("");
    setIsSearch(false);
  };

  const handleToggleFriend = () => {
    setPressed(!pressed);
    if (!pressed) {
      sendFriendRequest(searchResult);
    }

    setSearchResult(null);
  };

  const handleAcceptInvite = async (requestInfo) => {
    await acceptFriendRequest(requestInfo);
    // const friend = {
    //   _id: requestInfo.sender_id,
    //   displayName: requestInfo.sender_displayName,
    //   email: requestInfo.sender_email,
    // };

    // dispatch(addUserFriend(friend));
    // dispatch(removePendingFriendRequest(requestInfo.request_id));
  };
  const handleRejectInvite = () => {
    console.log("reject");
  };

  return (
    <View style={styles.container}>
      <View style={styles.withSearchIcon}>
        <Text style={styles.textTitle}>Find by an email: </Text>
        {!isSearch && (
          <Pressable onPress={handleShowSearch}>
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </Pressable>
        )}
      </View>

      {isSearch && (
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            value={friendsEmial}
            placeholder="email"
            onChangeText={setFriendsEmail}
          />
          <Pressable onPress={handleSearch}>
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
      )}
      {noResults && (
        <Text style={styles.text}>
          There is no user under this email. Please check if an email is
          correct.
        </Text>
      )}

      {searchResult && (
        <View style={styles.friendContainer}>
          <View style={styles.friendItem}>
            <Text style={styles.text}>{searchResult.displayName}</Text>
            <Text style={styles.text}>{searchResult.email}</Text>
          </View>
          <Pressable onPress={handleToggleFriend}>
            {pressed ? (
              <AntDesign name="checkcircle" size={30} color="green" />
            ) : (
              //   <Ionicons name="md-add-circle-outline" size={30} color="black" />
              <View style={styles.invite}>
                <Text>Send</Text>
                <Text>request</Text>
              </View>
            )}
          </Pressable>
        </View>
      )}

      {user?.pendingFriendRequests?.length > 0 && (
        <View>
          <Text style={styles.textTitle}>Pending requests: </Text>
          <FlatList
            data={user.pendingFriendRequests}
            renderItem={({ item }) => (
              <View style={styles.friendContainer}>
                <View>
                  <Text>{item.sender_displayName}</Text>
                  <Text>{item.sender_email}</Text>
                </View>
                <View style={styles.pendingRequestsActions}>
                  <Pressable onPress={() => handleAcceptInvite(item)}>
                    <View style={styles.invite}>
                      <Text style={styles.acceptText}>Accept</Text>
                      <Text style={styles.acceptText}>invite</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={handleRejectInvite}>
                    <Ionicons name="trash-outline" size={32} color="red" />
                  </Pressable>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.request_id}
          />
        </View>
      )}

      {friends?.length > 0 && (
        <>
          <View>
            <Text style={styles.textTitle}>Friends: </Text>
          </View>
          <View>
            <FlatList
              data={friends}
              renderItem={({ item }) => (
                <FriendListItem friend={item} pressed={true} />
              )}
              keyExtractor={(item) => item?._id}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default friends;

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20, gap: 20 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textTitle: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 20 },
  item: { marginVertical: 10, backgroundColor: "#E5E4E2", padding: 20 },
  edit: {
    elevation: 2,
    backgroundColor: "#bab5b5",
    borderRadius: 25,
    padding: 2,
  },
  input: {
    padding: 5,
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    width: "90%",
  },
  withSearchIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchIcon: {
    elevation: 5,
    backgroundColor: "#bab5b5",
    padding: 8,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E5E4E2",
    padding: 10,
  },
  invite: {
    fontSize: 10,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  pendingRequestsActions: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  acceptText: {
    color: "green",
  },
});

// usertest@gmail.com
