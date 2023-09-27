import { Stack } from "expo-router";

export default function WorkoutsLayout() {
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
      <Stack.Screen name="index" options={{ headerTitle: "Choose workout" }} />

      <Stack.Screen
        name="addOthersToWorkout"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="createWorkout"
        options={{ headerTitle: "Create workout" }}
      />

      <Stack.Screen
        name="[workout]"
        options={({ route }) => ({
          headerTitle: route.params.workoutName.toUpperCase(),
        })}
      />

      <Stack.Screen
        name="exercises/[exercise]"
        options={({ route }) => ({
          headerTitle: route.params.exercise.toUpperCase(),
        })}
      />
    </Stack>
  );
}
