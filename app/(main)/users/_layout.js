import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UsersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          headerBackVisible: true,
          backgroundColor: "green",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Users" }}
      ></Stack.Screen>

      {/* <Stack.Screen
        name="addOthersToWorkout"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="exercises"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen> */}

      <Stack.Screen name="[userName]"></Stack.Screen>
    </Stack>
  );
}
