import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";

export default function MainLayout() {
  return (
    <Provider store={store}>
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
        <Stack.Screen name="index" />
        <Stack.Screen name="(main)/workouts" />
        <Stack.Screen name="(main)/exercises" />
        <Stack.Screen name="(main)/users" />
      </Stack>
    </Provider>
  );
}
