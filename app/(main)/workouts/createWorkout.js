import React, { useEffect, useState } from "react";
import Item from "../../../components/Item";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

const createWorkout = () => {
  const { exerciseId } = useLocalSearchParams();
  const [workoutName, setWorkoutName] = useState("");
  const [note, setNote] = useState("");
  const [exercies, setExercises] = useState([]);

  useEffect(() => {
    if (exerciseId) {
      setExercises([...exercies, exerciseId]);
    }
  }, [exerciseId]);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() =>
                // router.push({
                //   pathname: "workouts/[workout]",
                //   params: { workout: workoutName },
                // })
                console.log("NOT YET")
              }
            >
              <Text style={styles.doneBtn}>Done</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Workout name: </Text>
        <TextInput
          style={styles.input}
          value={workoutName}
          placeholder="workout name"
          onChangeText={setWorkoutName}
        />
      </View>
      {/* <View style={styles.container}>
        <Text style={styles.text}>Note: </Text>
        <TextInput
          style={styles.input}
          value={note}
          placeholder="description"
          onChangeText={setNote}
        />
      </View> */}

      <Item
        pathname={"(main)/exercises"}
        title={"Add Exercise"}
        params={{ workoutId: workoutName }}
      />
      {exercies && (
        <FlatList
          data={exercies}
          renderItem={({ item }) => (
            <Item title={item} pathname={`exercises/${item}`} />
          )}
          keyExtractor={(item) => item}
        />
      )}
    </>
  );
};

export default createWorkout;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    margin: 10,
  },
  text: {
    fontSize: 15,
  },
  input: {
    padding: 5,
    fontSize: 25,
    fontWeight: "bold",
    borderWidth: StyleSheet.hairlineWidth,
  },
  doneBtn: {
    color: "white",
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    padding: 5,
  },
});
