import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { FontAwesome } from "@expo/vector-icons";

import {
  FriendListItem,
  PendingFriendRequests,
  SentFriendRequests,
  FriendCard,
} from "../../../components/friends/index";
import { getUserDetailsByEmail } from "../../../actions/users/getUserDetailsByEmail";
import { sendFriendRequest } from "../../../actions/users/sendFriendRequest";

const friends = () => {
  const user = useSelector(selectUser);
  const friends = user?.friends || {};
  const friendsArray = Object.values(friends);
  const sentFriendRequests = Object.values(user.sentFriendRequests || {});
  const pendingFriendRequests = Object.values(user.pendingFriendRequests || {});

  const [searchedEmail, setSearchedEmail] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNoResultsMessageVisible, setIsNoResultsMessageVisible] =
    useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleShowSearch = () => {
    setIsNoResultsMessageVisible(false);
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = async () => {
    console.log(searchedEmail.length);
    if (
      searchedEmail.length === 0 ||
      searchedEmail.trim() === user.providerData.email
    ) {
      setIsSearchVisible(false);
      setSearchedEmail("");
      return;
    } else {
      const results = await getUserDetailsByEmail(searchedEmail.trim());

      if (results.length === 0) {
        setIsNoResultsMessageVisible(true);

        setTimeout(() => {
          setIsNoResultsMessageVisible(false);
        }, 5000);
      } else {
        setSearchResults(...results);
      }
    }

    setSearchedEmail("");
    setIsSearchVisible(false);
  };

  const handleSendRequest = () => {
    sendFriendRequest(searchResults);
    setSearchResults(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.withSearchIcon}>
        <Text style={styles.textTitle}>Find by an email: </Text>

        {!isSearchVisible && (
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

      {isSearchVisible && (
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            value={searchedEmail}
            placeholder="email"
            onChangeText={setSearchedEmail}
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

      {isNoResultsMessageVisible && <Text style={styles.text}>No results</Text>}

      {searchResults && (
        <FriendCard
          displayName={searchResults.displayName}
          email={searchResults.email}
          actions={[
            {
              handler: handleSendRequest,
              text: "Send request",
              style: "green",
            },
          ]}
        />
      )}

      {sentFriendRequests?.length > 0 && (
        <SentFriendRequests requests={sentFriendRequests} />
      )}

      {pendingFriendRequests?.length > 0 && (
        <PendingFriendRequests requests={pendingFriendRequests} />
      )}

      {friendsArray?.length > 0 && (
        <>
          <View>
            <Text style={styles.textTitle}>Friends: </Text>
          </View>
          <View>
            <FlatList
              data={friendsArray}
              renderItem={({ item }) => <FriendListItem friend={item} />}
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
  withSearchIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: { fontSize: 22, fontWeight: "bold" },
  searchIcon: {
    elevation: 5,
    backgroundColor: "#bab5b5",
    padding: 8,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    padding: 5,
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    width: "90%",
  },
  text: { fontSize: 18 },
});
