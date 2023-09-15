import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SetItemDetails = ({
  weight,
  reps,
  set,
  setReps,
  setWeight,
  onClose,
  onDelete,
}) => {
  const incrementWeight = () => {
    setWeight(Number(weight) + 1);
  };

  const decrementWeight = () => {
    if (weight > 0) {
      setWeight(Number(weight) - 1);
    }
  };

  const incrementReps = () => {
    setReps(reps + 1);
  };

  const decrementReps = () => {
    if (reps > 0) {
      setReps(reps - 1);
    }
  };

  const handleWeightChange = (text) => {
    setWeight(text);
  };

  const handleRepsChange = (text) => {
    setReps(text);
  };

  const deleteSet = () => {
    onDelete();
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.label}>Weight</Text>

          <View style={styles.body}>
            <Pressable onPress={decrementWeight}>
              <Ionicons name="md-chevron-back-sharp" size={30} color="black" />
            </Pressable>
            <TextInput
              style={styles.input}
              value={weight.toString()}
              onChangeText={handleWeightChange}
              keyboardType="numeric"
            />
            <Pressable onPress={incrementWeight}>
              <Ionicons
                name="md-chevron-forward-sharp"
                size={30}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Reps</Text>

          <View style={styles.body}>
            <Pressable onPress={decrementReps}>
              <Ionicons name="md-chevron-back-sharp" size={30} color="black" />
            </Pressable>
            <TextInput
              style={styles.input}
              value={reps.toString()}
              onChangeText={handleRepsChange}
              keyboardType="numeric"
            />
            <Pressable onPress={incrementReps}>
              <Ionicons
                name="md-chevron-forward-sharp"
                size={30}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SetItemDetails;

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
    justifyContent: "space-between",
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

  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  body: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    fontSize: 30,
  },
});
