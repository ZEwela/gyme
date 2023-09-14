import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MainLayout() {
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
        options={{ headerTitle: "Choose workout" }}
      ></Stack.Screen>
      <Stack.Screen
        name="[workout]"
        options={({ route }) => ({
          headerTitle: route.params.workout.toUpperCase(),
          headerRight: () => (
            <Pressable>
              <Ionicons name="person-add-outline" size={30} color="black" />
            </Pressable>
          ),
        })}
      ></Stack.Screen>
      <Stack.Screen
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
      ></Stack.Screen>
    </Stack>
  );
}
