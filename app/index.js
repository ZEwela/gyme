import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Page() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.main}>
        <Text style={styles.title}>
          Pick
          <AntDesign name="caretright" size={44} color="green" /> workout
        </Text>
      </Pressable>
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
