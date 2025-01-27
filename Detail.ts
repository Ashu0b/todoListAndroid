import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../config";

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateTodo = () => {
    const trimmedHeading = textHeading.trim();
    if (trimmedHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({ heading: trimmedHeading })
        .then(() => {
          Alert.alert("Success", "Todo updated successfully!");
          navigation.goBack(); 
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    } else {
      Alert.alert("Validation Error", "Todo heading cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeHeadingText}
        value={textHeading}
        placeholder="Update Todo"
        placeholderTextColor="#aaaaaa"
        accessible={true}
        accessibilityLabel="Edit todo input field"
      />
      <Pressable style={styles.buttonUpdate} onPress={updateTodo}>
        <Text style={styles.buttonText}>UPDATE TODO</Text>
      </Pressable>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
  },
  textField: {
    marginBottom: 20,
    padding: 12,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonUpdate: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 5,
    backgroundColor: "#4CAF50", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
