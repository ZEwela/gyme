import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import Action from "./Action";
import { acceptFriendRequest } from "../../actions/users/acceptFriendRequest";

const PendingFriendRequests = ({ requests }) => {
  const handleAcceptInvite = async (requestInfo) => {
    try {
      await acceptFriendRequest(requestInfo);
    } catch (error) {
      error.log("Error while proccessing invite accepting", error);
    }
  };

  const handleRejectInvite = () => {
    console.log("reject");
  };

  return (
    <View>
      <Text style={styles.textTitle}>Pending invite requests: </Text>
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <View>
              <Text style={[styles.text, styles.biggerText]}>
                {item.sender_displayName}
              </Text>
              <Text style={styles.text}>{item.sender_email}</Text>
            </View>
            <View style={styles.requestsActions}>
              <Action
                handler={() => handleAcceptInvite(item)}
                textStyle={"green"}
                text={"Accept"}
              />
              <Action
                handler={() => handleRejectInvite}
                textStyle={"red"}
                text={"Reject"}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.request_id}
      />
    </View>
  );
};

export default PendingFriendRequests;

const styles = StyleSheet.create({
  textTitle: { fontSize: 22, fontWeight: "bold" },
  searchIcon: {
    elevation: 5,
    backgroundColor: "#bab5b5",
    padding: 8,
  },
  text: { fontSize: 18 },
  biggerText: {
    fontSize: 22,
    fontWeight: "500",
    marginVertical: 10,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E5E4E2",
    padding: 10,
    marginTop: 20,
  },
  requestsActions: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
