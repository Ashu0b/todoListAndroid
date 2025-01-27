import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Screens/Home";
import Detail from "./Screens/Detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

       
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: true,
            title: "Detail Screen", 
            headerStyle: {
              backgroundColor: "#4CAF50", 
            },
            headerTintColor: "#fff", 
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
