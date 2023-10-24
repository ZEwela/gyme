import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Action from "./Action";

type Action = {
  handler: () => void;
  style: string;
  text: string;
};
type FriendCardProps = {
  displayName: string;
  email: string;
  actions: Action[];
};

const FriendCard: React.FC<FriendCardProps> = ({
  displayName,
  email,
  actions,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.biggerText]}>{displayName}</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.requestActions}>
        {actions.map((action, index) => (
          <Action
            handler={action.handler}
            textStyle={action.style}
            text={action.text}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#E5E4E2",
    padding: 10,
    marginTop: 20,
  },
  text: { fontSize: 18 },
  biggerText: {
    fontSize: 22,
    fontWeight: "500",
    marginVertical: 10,
  },
  requestActions: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
