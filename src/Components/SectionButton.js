import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../Firebase/config";

export const SectionButton = ({ section, uri, id }) => {
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
          onPress={async () => {
            const snapshot = await firestore
              .collection("sections")
              .doc(id)
              .get();

            navigation.navigate("Section", {
              headerTitle: section,
              studentUids: snapshot.data().students,
            });
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
            }}
            // source={{ uri }}
          />
        </TouchableOpacity>
        <Text>{section}</Text>
      </View>
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 70,
    width: 70,
    marginBottom: 15,
    backgroundColor: "#fff",
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
  title: {},
  section: {},
});
