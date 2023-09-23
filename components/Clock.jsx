import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Stopwatch } from "react-native-stopwatch-timer";

const Clock = ({ setIsClockVisible, isClockVisible }) => {
  const onClose = () => {
    setIsClockVisible(!isClockVisible);
  };
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const options = {
    container: {
      padding: 5,
      width: 200,
      marginLeft: 70,
    },
    text: {
      fontSize: 30,
      color: "black",
      marginLeft: 7,
    },
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isClockVisible}
        onRequestClose={onClose}
      >
        <Pressable onPress={() => onClose()}>
          <View style={styles.headerClose}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </View>
        </Pressable>
        <View style={styles.body}>
          <Stopwatch
            laps
            start={stopwatchStart}
            reset={resetStopwatch}
            options={options}
          />
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                setStopwatchStart(!stopwatchStart);

                setResetStopwatch(false);
              }}
            >
              <Text style={styles.text}>
                {!stopwatchStart ? "START" : "STOP"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setStopwatchStart(false);
                setResetStopwatch(true);
              }}
            >
              <Text style={styles.text}>RESET</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Clock;

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
    backgroundColor: "#E1F4CB",
  },

  text: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: -120,
  },

  row: {
    flexDirection: "row",
    gap: 30,
  },
});
