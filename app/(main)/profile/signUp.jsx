import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserInput from "../../../components/UserInput";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const userDocRef = doc(db, "users", userCred.user.uid);

        const userData = {
          _id: userCred.user.uid,
          fullName: fullName,
          friends: [],
          providerData: userCred.user.providerData[0],
        };

        await setDoc(userDocRef, userData);

        router.replace("users/login");
      } catch (error) {
        // Handle errors here
        if (error.message.includes("email-already-in-use")) {
          alert("Email already in use");
        } else if (error.message.includes("weak-password")) {
          alert("Password should be at least 6 characters");
        }
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "start",
        }}
        style={styles.box}
      >
        <MaterialCommunityIcons
          name="folder-account-outline"
          size={70}
          color="green"
        />
        <Text style={styles.header}>Join With Us!</Text>

        <View style={styles.content}>
          <UserInput
            placeHolder={"Full Name"}
            isPass={false}
            setStateValue={setFullName}
            iconName={"account"}
          />
          <UserInput
            placeHolder={"Email"}
            isPass={false}
            setStateValue={setEmail}
            iconName={"email-outline"}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          <UserInput
            placeHolder={"Password"}
            isPass={true}
            setStateValue={setPassword}
            iconName={"lock-outline"}
          />
          <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
            <Text style={styles.textBtn}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.text}>Have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("users/login")}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: "green",
  },
  box: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E1F4CB",
    borderTopLeftRadius: 90,
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    fontSize: 20,
  },
  alertText: {
    fontSize: 15,
    color: "red",
  },
  btn: {
    backgroundColor: "green",
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 8,
    letterSpacing: 1,
  },
  footer: {
    flexDirection: "row",
    gap: 5,
  },
});
