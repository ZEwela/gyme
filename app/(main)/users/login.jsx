import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../../../firebase";
import UserInput from "../../../components/UserInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      try {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userCred) {
          // Use Firebase Realtime Database to fetch user data
          const userRef = ref(db, "users/" + userCred.user.uid);

          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            // userData now contains user data from Realtime Database
            console.log(userData);
          }
        }
      } catch (err) {
        console.log(err);
        if (err.message.includes("wrong-password")) {
          setAlert(true);
          setAlertMsg("Invalid Password");
        } else if (err.message.includes("user-not-found")) {
          setAlert(true);
          setAlertMsg("User not found");
        } else {
          setAlert(true);
          setAlertMsg("Something went wrong, try again later");
        }
        setInterval(() => {
          setAlert(false);
        }, 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "start",
          gap: 20,
        }}
        style={styles.box}
      >
        <AntDesign name="login" size={70} color="green" />
        <Text style={styles.header}>Welcome Back!</Text>

        <View style={styles.content}>
          {alert && <Text style={styles.alertText}>{alertMsg}</Text>}

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

          <TouchableOpacity onPress={handleLogin} style={styles.btn}>
            <Text style={styles.textBtn}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.text}>Don't have account?</Text>

            <TouchableOpacity onPress={() => console.log("not yet")}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Create Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
