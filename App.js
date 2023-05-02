import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Pic from "./src/pic";
import First from "./src/first";
import Link from "./src/link";
import Menu from "./src/menu";


export default function App() {

  const Stack = createStackNavigator();



  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='First' screenOptions = {{ headerShown: false }}>
        <Stack.Screen name='Pic' component={Pic} />
        <Stack.Screen name='First' component={First} />
        <Stack.Screen name='Link' component={Link} />
        <Stack.Screen name='Menu' component={Menu} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
