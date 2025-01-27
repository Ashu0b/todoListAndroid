import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import firebase from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = todoRef.orderBy("createdAt", "desc").onSnapshot(
      (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
          const { heading } = doc.data();
          todos.push({
            id: doc.id,
            heading,
          });
        });
        setTodos(todos);
      },
      (error) => {
        console.error("Error fetching todos: ", error);
      }
    );
    return unsubscribe; 
  }, []);

  const deleteTodo = (todo) => {
    Alert.alert(
      "Delete Confirmation",
      `Are you sure you want to delete "${todo.heading}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            todoRef
              .doc(todo.id)
              .delete()
              .then(() => {
                alert("Deleted successfully");
              })
              .catch((error) => {
                alert("Error deleting todo: " + error.message);
              });
          },
        },
      ]
    );
  };

  const addTodo = () => {
    if (addData.trim().length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData.trim(),
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert("Error adding todo: " + error.message);
        });
    } else {
      alert("Please enter a valid to-do item.");
    }
  };

  const renderTodo = ({ item }) => (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => navigation.navigate("Detail", { item })}
        accessible={true}
        accessibilityLabel={`View details for ${item.heading}`}
      >
        <FontAwesome
          name="trash-o"
          color="red"
          onPress={() => deleteTodo(item)}
          style={styles.todoIcon}
          accessible={true}
          accessibilityLabel={`Delete ${item.heading}`}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.itemHeading}>
            {item.heading[0].toUpperCase() + item.heading.slice(1)}
          </Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a New Todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAddData(text)}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          accessible={true}
          accessibilityLabel="Input field for new to-do"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#78aec6",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
});
