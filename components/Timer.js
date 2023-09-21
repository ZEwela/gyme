import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Timer from "react-native-stopwatch-timer/lib/timer";

const TimerClock = ({ setIsTimerVisible, isTimerVisible }) => {
  const onClose = () => {
    setIsTimerVisible(!isTimerVisible);
  };
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);

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

  const setTimeDuration = (sec) => {
    const msec = sec * 1000;
    setTimerDuration(msec);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isTimerVisible}
        onRequestClose={onClose}
      >
        <Pressable onPress={() => onClose()}>
          <View style={styles.headerClose}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </View>
        </Pressable>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.text}>Set: </Text>
            <Pressable onPress={() => setTimeDuration(20)}>
              <Text style={styles.text}>20</Text>
            </Pressable>
            <Pressable onPress={() => setTimeDuration(30)}>
              <Text style={styles.text}>30</Text>
            </Pressable>
            <Pressable onPress={() => setTimeDuration(40)}>
              <Text style={styles.text}>40</Text>
            </Pressable>
            <Pressable onPress={() => setTimeDuration(50)}>
              <Text style={styles.text}>50</Text>
            </Pressable>
            <Pressable onPress={() => setTimeDuration(60)}>
              <Text style={styles.text}>60</Text>
            </Pressable>
            <Pressable onPress={() => setTimeDuration(90)}>
              <Text style={styles.text}>90</Text>
            </Pressable>
          </View>

          <Timer
            totalDuration={timerDuration}
            start={isTimerStart}
            reset={resetTimer}
            handleFinish={() => {
              alert("Custom Completion Function");
            }}
            options={options}
          />
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                setIsTimerStart(!isTimerStart);
                setResetTimer(false);
              }}
            >
              <Text style={styles.text}>
                {!isTimerStart ? "START" : "STOP"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setIsTimerStart(false);
                setResetTimer(true);
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

export default TimerClock;

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
