import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const UserInput = ({
  placeHolder,
  isPass,
  setStateValue,
  iconName,
  setGetEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChange = (text) => {
    if (placeHolder === "Email") {
      // https://emailregex.com/index.html
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setGetEmailValidationStatus(true);
    }
    setValue(text);
    setStateValue(text);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          !isEmailValid && placeHolder === "Email" && value.length > 0
            ? styles.errorBorder
            : styles.normalBorder,
        ]}
      >
        <MaterialCommunityIcons name={iconName} size={24} color="grey" />
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          value={value}
          onChangeText={handleTextChange}
          autoCapitalize="none"
          secureTextEntry={isPass && showPass}
        />
        {isPass && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Entypo
              name={`${showPass ? "eye" : "eye-with-line"}`}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    marginVertical: 2,
  },
  errorBorder: {
    borderColor: "#FF0000",
  },
  normalBorder: {
    borderColor: "black",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
