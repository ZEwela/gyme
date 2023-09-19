import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen name="index"></Stack.Screen>

      {/* <Stack.Screen name="(main)/workouts" /> */}
      <Stack.Screen name="(main)/exercises" />
      <Stack.Screen name="(main)/users" />
    </Stack>
  );
}
