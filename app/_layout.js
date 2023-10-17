import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
import { useEffect } from "react";
import { usePathname, useGlobalSearchParams, Slot } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CheckedExercisesProvider } from "../contexts/CheckedExercisesContext";
import { Text } from "react-native";

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
        <Tabs
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
          <Tabs.Screen
            name="index"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="(main)/workouts"
            options={{
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{ color: focused ? "green" : "grey", fontSize: 15 }}
                >
                  Workouts
                </Text>
              ),
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialIcons
                  name="fitness-center"
                  color={focused ? "green" : "grey"}
                  size={size}
                />
              ),
              tabBarLabelStyle: { color: "green", fontSize: 15 },
            }}
          />
          <Tabs.Screen
            name="(main)/exercises"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="(main)/profile"
            options={{
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{ color: focused ? "green" : "grey", fontSize: 15 }}
                >
                  Profile
                </Text>
              ),
              tabBarIcon: ({ focused, color, size }) => (
                <>
                  <MaterialCommunityIcons
                    name="account"
                    color={focused ? "green" : "grey"}
                    size={size}
                  />
                </>
              ),
              tabBarLabelStyle: ({ focused }) => ({
                color: focused ? "green" : "grey",
              }),
            }}
          />
        </Tabs>
      </CheckedExercisesProvider>
    </Provider>
  );
}
