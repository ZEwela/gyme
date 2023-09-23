import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Clock from "./Clock";
import TimerClock from "./Timer";

const SetItemDetails = ({
  hold,
  setHold,
  weight,
  reps,
  set,
  setReps,
  setWeight,
  note,
  setNote,
  onClose,
  onDelete,
}) => {
  const increment = (item, callback) => {
    callback(Number(item) + 1);
  };

  const decrement = (item, callback) => {
    if (item > 0) {
      callback(Number(item) - 1);
    }
  };

  const handleItemChange = (text, callback) => {
    callback(text);
  };

  const deleteSet = () => {
    onDelete();
  };
  const [isClockVisible, setIsClockVisible] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  return (
    <>
      {isClockVisible && (
        <Clock
          setIsClockVisible={setIsClockVisible}
          isClockVisible={isClockVisible}
        />
      )}
      {isTimerVisible && (
        <TimerClock
          setIsTimerVisible={setIsTimerVisible}
          isTimerVisible={isTimerVisible}
        />
      )}
      <ScrollView style={styles.container}>
        <View style={styles.headerClose}>
          <Pressable onPress={deleteSet}>
            <Text style={styles.text}>DELETE</Text>
          </Pressable>
          <Pressable onPress={onClose}>
            <Text style={styles.text}>OK</Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.item}>
            <View style={styles.toolkit}>
              <Text style={styles.label}>Tools</Text>
              <View style={styles.body}>
                <Pressable onPress={() => setIsClockVisible(true)}>
                  <Feather name="clock" size={25} color="black" />
                </Pressable>

                <Pressable onPress={() => setIsTimerVisible(true)}>
                  <MaterialIcons name="timer" size={30} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Reps</Text>
            <View style={styles.body}>
              <Pressable onPress={() => decrement(reps, setReps)}>
                <Ionicons
                  name="md-chevron-back-sharp"
                  size={30}
                  color="black"
                />
              </Pressable>
              <TextInput
                style={styles.input}
                value={reps.toString()}
                onChangeText={(text) => handleItemChange(text, setReps)}
                keyboardType="numeric"
              />
              <Pressable onPress={() => increment(reps, setReps)}>
                <Ionicons
                  name="md-chevron-forward-sharp"
                  size={30}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.label}>Weight -</Text>
              <Text style={styles.label}>kg</Text>
            </View>

            <View style={styles.body}>
              <Pressable onPress={() => decrement(weight, setWeight)}>
                <Ionicons
                  name="md-chevron-back-sharp"
                  size={30}
                  color="black"
                />
              </Pressable>
              <TextInput
                style={styles.input}
                value={weight.toString()}
                onChangeText={(text) => handleItemChange(text, setWeight)}
                keyboardType="numeric"
              />
              <Pressable onPress={() => increment(weight, setWeight)}>
                <Ionicons
                  name="md-chevron-forward-sharp"
                  size={30}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.label}>Hold -</Text>
              <Text style={styles.label}>s</Text>
            </View>

            <View style={styles.body}>
              <Pressable onPress={() => decrement(hold, setHold)}>
                <Ionicons
                  name="md-chevron-back-sharp"
                  size={30}
                  color="black"
                />
              </Pressable>
              <TextInput
                style={styles.input}
                value={hold.toString()}
                onChangeText={(text) => handleItemChange(text, setHold)}
                keyboardType="numeric"
              />
              <Pressable onPress={() => increment(hold, setHold)}>
                <Ionicons
                  name="md-chevron-forward-sharp"
                  size={30}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Notes</Text>

            <TextInput
              editable
              style={styles.note}
              value={note}
              onChangeText={setNote}
              placeholder="note"
              multiline
              numberOfLines={2}
              maxLength={120}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SetItemDetails;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E1F4CB",
    paddingBottom: 200,
  },
  headerClose: {
    flexDirection: "row",
    margin: 15,
    padding: 10,
    justifyContent: "space-between",
  },
  item: {
    padding: 20,
    backgroundColor: "#EBF8DD",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  note: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "#F5FCEE",
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  body: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  input: {
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  toolkit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
