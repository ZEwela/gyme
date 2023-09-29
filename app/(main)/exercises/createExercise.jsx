import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";

import { create } from "../../../actions/createExercise";

const createExercise = () => {
  const [name, setName] = useState("");
  const [technique, setTechnique] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateExercise = () => {
    create(name, technique, description);
    setName("");
    setTechnique("");
    setDescription("");

    router.replace("/(main)/exercises");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={handleCreateExercise}>
              <Text style={styles.doneBtn}>Done</Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Exercise name: </Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="exercise name"
          onChangeText={setName}
        />
        <Text style={styles.text}>Technique reference: </Text>
        <TextInput
          style={styles.input}
          value={technique}
          placeholder="https://"
          onChangeText={setTechnique}
        />

        <Text style={styles.text}>Description: </Text>
        <TextInput
          style={styles.input}
          value={description}
          placeholder="description"
          onChangeText={setDescription}
          multiline
          maxLength={250}
          numberOfLines={2}
        />
      </View>
    </>
  );
};

export default createExercise;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    margin: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    padding: 5,
    fontSize: 20,
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
