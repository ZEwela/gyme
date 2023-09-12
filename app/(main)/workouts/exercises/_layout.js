import { Stack } from "expo-router";

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
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      {/* <Stack.Screen
        name="index"
        options={{ headerTitle: "Choose workout" }}
      ></Stack.Screen> */}
      <Stack.Screen
        name="[exercise]"
        options={({ route }) => ({
          headerTitle: route.params.exercise.toUpperCase(),
        })}
      ></Stack.Screen>
    </Stack>
  );
}
