import { Stack } from "expo-router";

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
      {/* <Stack.Screen
        name="users"
        options={{ headerTitle: "Users" }}
      ></Stack.Screen> */}
      {/* <Stack.Screen name="[userName]"></Stack.Screen> */}
      <Stack.Screen name="profileMain"></Stack.Screen>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="signUp"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
