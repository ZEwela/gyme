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
        options={{ headerTitle: "Exercises" }}
      ></Stack.Screen>

      <Stack.Screen
        name="createExercise"
        options={{ headerTitle: "Create exercise" }}
      ></Stack.Screen>

      <Stack.Screen
        name="[exerciseName]"
        options={({ route }) => ({
          headerTitle: route.params.exerciseName.toUpperCase(),
        })}
      ></Stack.Screen>
    </Stack>
  );
}
