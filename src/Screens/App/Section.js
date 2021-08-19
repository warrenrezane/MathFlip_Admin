import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, FlatList } from "react-native";
import { Header, Text, SearchBar, ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { firestore, firebase } from "../../Firebase/config";

export const Section = ({ route, navigation }) => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const { studentUids } = route.params;

  useEffect(() => {
    const unsubscribe = firestore
      .collection("students")
      .where(firebase.firestore.FieldPath.documentId(), "in", studentUids)
      .onSnapshot((snapshot) => {
        const fetchedStudents = [];
        snapshot.forEach((doc) => {
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
          data={students}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    <Text style={styles.listTitle}>{"● "}</Text>
                    <Text
                      style={{ fontSize: 20 }}
                    >{`${item.firstname} ${item.lastname}`}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubtitle}>
                    <Text style={styles.listSubtitleText}>
                      &nbsp;&nbsp;&nbsp;&nbsp;Current Activity:&nbsp;
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {!item.current_activity ? "None" : item.current_activity}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
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
  listTitle: {
    fontSize: 15,
    color: "green",
  },
  listSubtitle: {
    marginVertical: 2.5,
  },
  listSubtitleText: {
    fontSize: 18,
  },
});
