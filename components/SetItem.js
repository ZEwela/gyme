import { Text, StyleSheet, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import SetItemDetails from "./SetItemDetails";

const SetItem = ({
  previousSet,
  previousReps,
  previousWeight,
  removeSet,
  updateSet,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [weight, setWeight] = useState(previousWeight || 0);
  const [reps, setReps] = useState(previousReps || 0);
  const [set, setSet] = useState(previousSet);

  const onClose = () => {
    updateSet(set, weight, reps);
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
        />
      </Modal>

      <Pressable style={styles.item} onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.text}>{weight} x</Text>
        <Text style={styles.text}>{reps}</Text>
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
});
