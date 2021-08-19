import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button } from "react-native";
import { Center } from "../Components/Center";
import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./App/AppTabs";
import { useStoreState, useStoreActions } from "easy-peasy";
import { auth } from "../Firebase/config";

export default Routes = () => {
  const user = useStoreState((state) => state.user);
  const login = useStoreActions((actions) => actions.login);
  const refresh = useStoreActions((actions) => actions.refresh);
  const setUser = useStoreActions((actions) => actions.setUser);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    refresh(); // Re-fetch section and student data to get new updates.
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <Center>
        <ActivityIndicator size="large" color="gray" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center>
        <Button onPress={() => login()} title="Login" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};
