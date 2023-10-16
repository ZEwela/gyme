import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
import { useEffect } from "react";
import { usePathname, useGlobalSearchParams, Slot } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { CheckedExercisesProvider } from "../contexts/CheckedExercisesContext";

export default function MainLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  // Track the location in your analytics provider here.
  useEffect(() => {
    console.log("Pathname and params from MainLayout: ", pathname, params);
  }, [pathname, params]);

  return (
    <Provider store={store}>
      <CheckedExercisesProvider>
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
      </CheckedExercisesProvider>
    </Provider>
  );
}
