import React from "react";
import { Text } from "react-native-elements";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const ActivityButton = ({ title, difficulty, activityId }) => {
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <View style={style.container}>
        <TouchableOpacity
          style={[
            style.button,
            Platform.OS === "ios"
              ? style.shadow
              : [style.shadow, { elevation: 3 }],
          ]}
          onPress={() =>
            navigation.navigate("Activity", {
              headerTitle: title,
              activityId,
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#6665FF",
                width: 45,
                height: 45,
                borderRadius: 100,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                marginHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <Text h4 style={{ fontWeight: "bold" }}>
                {title}
              </Text>
              <Text h5>{difficulty}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
