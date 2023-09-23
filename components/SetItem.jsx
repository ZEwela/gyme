import { Text, StyleSheet, Pressable, Modal, View } from "react-native";
import React, { useState } from "react";
import SetItemDetails from "./SetItemDetails";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

const SetItem = ({
  previousSet,
  previousReps,
  previousWeight,
  previousHold,
  previousNote,
  removeSet,
  updateSet,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [weight, setWeight] = useState(previousWeight || 0);
  const [reps, setReps] = useState(previousReps || 0);
  const [set, setSet] = useState(previousSet);
  const [hold, setHold] = useState(previousHold || 0);
  const [note, setNote] = useState(previousNote || "");

  const onClose = () => {
    updateSet(set, weight, reps, hold, note);
    setIsVisible(!isVisible);
  };

  const onDelete = () => {
    removeSet(set);
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onRequestClose={onClose}
      >
        <SetItemDetails
          onClose={onClose}
          weight={weight}
          setWeight={setWeight}
          reps={reps}
          setReps={setReps}
          set={set}
          onDelete={onDelete}
          setIsVisible={setIsVisible}
          hold={hold}
          setHold={setHold}
          note={note}
          setNote={setNote}
        />
      </Modal>

      <Pressable style={styles.item} onPress={() => setIsVisible(!isVisible)}>
        <View style={styles.row}>
          <FontAwesome name="repeat" size={15} color="gray" />
          <Text style={styles.text}>{reps}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="weight" size={15} color="gray" />
          <Text style={styles.text}>{weight}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="ios-time-sharp" size={15} color="gray" />
          <Text style={styles.text}>{hold}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default SetItem;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E1F4CB",
  },
  item: {
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#EBF8DD",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
});
