import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import FriendCard from "./FriendCard";

const SentFriendRequests = ({ requests }) => {
  const handleCancelInvite = () => {
    console.log("not yet");
  };

  return (
    <View>
      <Text style={styles.textTitle}>Sent invite requests: </Text>
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <FriendCard
            displayName={item.recipient_displayName}
            email={item.recipient_email}
            actions={[
              {
                handler: handleCancelInvite,
                text: "Cancel",
                style: "red",
              },
            ]}
          />
        )}
        keyExtractor={(item) => item.request_id}
      />
    </View>
  );
};

export default SentFriendRequests;

const styles = StyleSheet.create({
  textTitle: { fontSize: 22, fontWeight: "bold" },
});
