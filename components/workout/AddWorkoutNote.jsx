import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWorkout,
  setUserWorkoutNote,
} from "../../store/slices/userWorkoutsSlice";

const AddWorkoutNote = ({ show, setShow, setShowDrawer }) => {
  const dispatch = useDispatch();
  const workout = useSelector(selectWorkout);
  const [note, setNote] = useState(workout.note || "");

  const onClose = () => {
    setShow(!show);
    setShowDrawer(false);
    dispatch(setUserWorkoutNote(note));
  };

  return (
    <View>
      <Modal animationType="fade" visible={show} onRequestClose={onClose}>
        <View style={styles.container}>
          <Pressable onPress={() => onClose()}>
            <View style={styles.headerClose}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </View>
          </Pressable>
          <View style={styles.body}>
            <Text style={styles.label}>Notes</Text>
          </View>
          <TextInput
            editable
            style={styles.note}
            value={note}
            onChangeText={setNote}
            placeholder="note"
            multiline
            numberOfLines={2}
            maxLength={220}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddWorkoutNote;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1F4CB",
    flex: 1,
  },
  headerClose: {
    flexDirection: "row",
    margin: 15,
    padding: 10,
    justifyContent: "flex-end",
  },

  text: {
    fontSize: 20,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  note: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "#F5FCEE",
    margin: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
});
