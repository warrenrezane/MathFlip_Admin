import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Center } from "../../Components/Center";
import { Heading } from "../../Components/Heading";
import { SectionButton } from "../../Components/SectionButton";
import { ActivityButton } from "../../Components/ActivityButton";
import { useStoreState } from "easy-peasy";

const activityData = [
  {
    id: 1,
    title: "Activity 1",
    description: "",
  },
];

export const Dashboard = ({ route, navigation }) => {
  const sections = useStoreState((state) => state.sections);
  const studentUids = useStoreState((state) => state.studentUids);

  console.log(sections);

  if (!sections && !studentUids) {
    return (
      <Center>
        <ActivityIndicator size="large" color="gray" />
      </Center>
    );
  }

  return (
    <React.Fragment>
      <View style={style.extraSpace}>
        <Heading name="Sections" />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sections.map((item, index) => (
              <SectionButton
                key={index}
                id={item.id}
                section={item.name}
                // uri={item.uri}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Heading name="Activities" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={activityData}
        renderItem={({ item }) => (
          <ActivityButton
            title={item.title}
            difficulty={item.description}
            activityId={item.id}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  extraSpace: {
    marginTop: 20,
  },
});
