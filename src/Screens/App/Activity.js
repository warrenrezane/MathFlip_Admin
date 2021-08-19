import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, FlatList } from "react-native";
import { Header, Text, SearchBar, ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { firestore, firebase } from "../../Firebase/config";
import { useStoreState } from "easy-peasy";

export const Activity = ({ route, navigation }) => {
  const sections = useStoreState((state) => state.sections);
  const studentUids = useStoreState((state) => state.studentUids);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("students")
      .where(firebase.firestore.FieldPath.documentId(), "in", studentUids)
      .onSnapshot((snapshot) => {
        const fetchedStudents = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          fetchedStudents.push(doc.data());
        });
        setStudents(fetchedStudents);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Header
        containerStyle={styles.headerContainer}
        centerContainerStyle={styles.headerCenter}
        leftContainerStyle={styles.headerLeft}
      >
        <Left />
        <Center />
      </Header>
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Student..."
          onChangeText={(value) => setSearch(value)}
          value={search}
          lightTheme
          style={styles.searchBar}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInput}
        />
        <FlatList
          data={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              {!item.students.length ? (
                <View style={styles.noStudentContainer}>
                  <View style={styles.noStudentLine} />
                  <Text style={styles.noStudentMessage}>
                    There are no students in this section.
                  </Text>
                  <View style={styles.noStudentLine} />
                </View>
              ) : (
                students.map((student, index) => {
                  return (
                    <ListItem key={index} bottomDivider>
                      <ListItem.Content key={index} style={styles.listContent}>
                        <>
                          <ListItem.Title>
                            <Text style={styles.listTitle}>{"● "}</Text>
                            <Text style={{ fontSize: 20 }}>
                              {student.firstname}
                            </Text>
                          </ListItem.Title>
                        </>
                        {student.activities.map((activity, index) => {
                          if (activity.id === route.params.activityId) {
                            return (
                              <ListItem.Subtitle
                                key={index}
                                style={styles.listSubtitleText}
                              >{`${activity.score}/${activity.items}`}</ListItem.Subtitle>
                            );
                          }
                        })}
                      </ListItem.Content>
                    </ListItem>
                  );
                })
              )}
            </View>
          )}
        />
      </View>
      <StatusBar backgroundColor="transparent" />
    </>
  );
};

const Left = () => {
  const navigation = useNavigation();

  return (
    <MaterialIcons
      name="arrow-back"
      size={25}
      onPress={() => navigation.goBack()}
    />
  );
};

const Center = () => {
  const route = useRoute();

  return (
    <Text h4 h4Style={{ fontSize: 18, fontWeight: "bold" }}>
      {route.params.headerTitle}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "transparent",
  },
  headerLeft: {
    justifyContent: "center",
  },
  headerCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    color: "#303030",
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    height: 45,
    backgroundColor: "#e3e3e3",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  noStudentContainer: {
    flexDirection: "row",
  },
  noStudentLine: {
    backgroundColor: "gray",
    height: 0.5,
    flex: 1,
    alignSelf: "center",
  },
  noStudentMessage: {
    textAlign: "center",
    padding: 25,
    color: "gray",
  },
  listContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: 15,
    color: "green",
  },
  listSubtitleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
