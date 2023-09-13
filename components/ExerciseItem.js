import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import BoxItem from "./BoxItem";
import AddMoreBoxFooter from "./AddMoreBoxFooter";

const ExerciseItem = ({ name, info }) => {
  const [sets, setSets] = useState([...info] || []);
  console.log(info);
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{name}</Text>

      <FlatList
        data={info}
        renderItem={({ item }) => (
          <BoxItem
            reps={item.reps}
            weight={item.weight}
            sets={sets}
            setSets={setSets}
          />
        )}
        horizontal={true}
        ListFooterComponent={<AddMoreBoxFooter sets={sets} setSets={setSets} />}
      />
    </View>
  );
};

export default ExerciseItem;

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
