import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type ActionProps = {
  handler: () => void;
  textStyle: string;
  text: string;
};

const Action: React.FC<ActionProps> = ({ handler, text, textStyle }) => {
  const textSplit = text.split(" ");

  return (
    <Pressable onPress={handler}>
      <View style={styles.action}>
        {textSplit.map((word, index) => (
          <Text
            key={index}
            style={
              textStyle === "green" ? styles.acceptText : styles.cancelText
            }
          >
            {word}
          </Text>
        ))}
      </View>
    </Pressable>
  );
};

export default Action;
const styles = StyleSheet.create({
  action: {
    fontSize: 10,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  acceptText: {
    color: "green",
    fontSize: 15,
  },
  cancelText: {
    color: "red",
    fontSize: 15,
  },
});
