import React from "react";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";

export const Heading = ({ name }) => {
  return (
    <Text h3 style={style.heading}>
      {name}
    </Text>
  );
};

const style = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
});
