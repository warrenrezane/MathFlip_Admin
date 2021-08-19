import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "./Profile";
import { Dashboard } from "./Dashboard";
import { Activity } from "./Activity";
import { Section } from "./Section";
import { MaterialIcons } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {
          return null;
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Section" component={Section} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => {
            return null;
          },
        }}
      />
    </Stack.Navigator>
  );
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let name;

    switch (route.name) {
      case "Dashboard":
        name = "dashboard";
        break;

      case "Profile":
        name = "account-circle";
        break;
    }

    return <MaterialIcons name={name} size={size} color={color} />;
  },
});

const tabBarOptions = {
  activeTintColor: "#6665FF",
  inactiveTintColor: "#A5ADB7",
};

export default AppTabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
    >
      <BottomTabs.Screen name="Dashboard" component={DashboardStack} />
      <BottomTabs.Screen name="Profile" component={ProfileStack} />
    </BottomTabs.Navigator>
  );
};
