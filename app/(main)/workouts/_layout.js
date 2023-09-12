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
        })}
      ></Stack.Screen>
      <Stack.Screen
        name="modal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
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
