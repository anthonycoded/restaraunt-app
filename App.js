import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "./src/screens/SearchScreen";
import ResultDetailScreen from "./src/screens/ResultDetailScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer screenOptions={{}}>
      <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
          headerTitle: "Food Spot Search",
        }}
      >
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={ResultDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
