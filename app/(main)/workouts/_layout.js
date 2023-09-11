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
        name="workouts"
        options={{ headerTitle: "Choose workout" }}
      ></Stack.Screen>
      <Stack.Screen
        name="[workout]"
        options={({ route }) => ({
          headerTitle: route.params.workout.toUpperCase(),
        })}
      ></Stack.Screen>
    </Stack>
  );
}
