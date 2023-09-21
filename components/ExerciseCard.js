import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import SetItem from "./SetItem";
import AddSet from "./AddSet";

const ExerciseCard = ({ name, info }) => {
  const [sets, setSets] = useState([...info] || []);

  const removeSet = (setId) => {
    const updatedSets = sets.filter((set) => set.set !== setId);
    setSets([...updatedSets]);
  };
  const updateSet = (setId, newWeight, newReps, newHold) => {
    const updatedSets = sets.map((set) => {
      if (set.set === setId) {
        return {
          ...set,
          weight: newWeight,
          reps: newReps,
        };
      }
      return set;
    });
    setSets([...updatedSets]);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{name}</Text>

      <FlatList
        data={sets}
        keyExtractor={(item) => item.set}
        renderItem={({ item }) => (
          <SetItem
            previousReps={item.reps}
            previousWeight={item.weight}
            previousSet={item.set}
            previousHold={item.hold}
            removeSet={removeSet}
            updateSet={updateSet}
          />
        )}
        horizontal={true}
        ListFooterComponent={<AddSet sets={sets} setSets={setSets} />}
      />
    </View>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#BACBA9",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "#8EAB73",
    margin: 5,
    padding: 10,
    width: "300",
  },
});
