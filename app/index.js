import { ActivityIndicator, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { auth, db } from "../firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Page() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users/" + user.uid);

        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser(userData));
            setTimeout(() => {
              router.replace("(main)/workouts");
            }, 2000);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setTimeout(() => {
          router.replace("(main)/profile/login");
        }, 2000);
      }
    });
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="door-open" size={90} color="green" />
      {/* <ActivityIndicator size={"large"} color="green" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
