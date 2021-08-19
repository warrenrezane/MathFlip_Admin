import React from "react";
import { View, StyleSheet } from "react-native";

export const Center = ({ children }) => {
  return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
