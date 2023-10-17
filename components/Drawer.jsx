import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { selectWorkout } from "../store/slices/userWorkoutsSlice";

const Drawer = ({
  setShowAddNote,
  setShow,
  handleDeleteingWorkout,
  setShowDrawer,
}) => {
  const workout = useSelector(selectWorkout);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Pressable onPress={() => setShowAddNote(true)}>
          {/* <SimpleLineIcons name="note" size={28} color="white" /> */}
          <Text style={styles.text}>Add note </Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Link href="/(main)/exercises/exercisesMain" asChild>
          <Pressable onPress={() => setShowDrawer(false)}>
            {/* <MaterialIcons name="fitness-center" size={30} color="white" /> */}
            <Text style={styles.text}>Add exercises </Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => setShow(true)}>
          {/* <Ionicons name="person-add-outline" size={30} color="white" /> */}
          <Text style={styles.text}>Add friends </Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        {workout.workout_id !== workout.workout_name && (
          <Pressable onPress={handleDeleteingWorkout}>
            <Text style={styles.textDelete}>Delete this workout</Text>
            {/* <Ionicons name="trash-outline" size={32} color="white" /> */}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E1F4CB",
    alignItems: "flex-end",
    padding: 10,
  },
  item: {
    margin: 10,
    padding: 10,
    elevation: 2,
    borderRadius: 2,
    backgroundColor: "#F8DDC9",
  },
  text: {
    fontSize: 20,
    color: "#36454F",
    letterSpacing: 2,
  },
  textDelete: {
    fontSize: 20,
    color: "red",
    letterSpacing: 2,
  },
});
