import { View, Text, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const EditProfileItem = ({
  title,
  handleEdit,
  saveChanges,
  placeholder,
  displayValue,
  setDisplayValue,
  editMode,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.textTitle}>{title}</Text>
        {!editMode ? (
          <Pressable onPress={handleEdit}>
            <MaterialIcons
              name="mode-edit"
              size={20}
              color="white"
              style={styles.edit}
            />
          </Pressable>
        ) : (
          <Pressable onPress={saveChanges}>
            <AntDesign
              name="checkcircleo"
              size={24}
              color="white"
              style={styles.edit}
            />
          </Pressable>
        )}
      </View>

      {editMode ? (
        <TextInput
          style={styles.input}
          value={displayValue}
          onChangeText={setDisplayValue}
          placeholder={placeholder}
          maxLength={35}
        />
      ) : (
        <Text style={styles.text}>{displayValue}</Text>
      )}
    </View>
  );
};

export default EditProfileItem;

const styles = StyleSheet.create({
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textTitle: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 20, alignSelf: "center" },
  item: { marginVertical: 10, backgroundColor: "#E5E4E2", padding: 20 },
  edit: {
    elevation: 2,
    backgroundColor: "#bab5b5",
    borderRadius: 25,
    padding: 2,
  },
  input: {
    padding: 5,
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
