import React from "react";
import { View, Button } from "react-native";
import { Center } from "../../Components/Center";
import { useStoreActions } from "easy-peasy";

export const Profile = ({ route, navigation }) => {
  const logout = useStoreActions((actions) => actions.logout);

  return (
    <Center>
      <Button onPress={() => logout()} title="Logout" />
    </Center>
  );
};
