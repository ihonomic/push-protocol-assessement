import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationRoutes from "./navigation";

export default function App() {
  return (
    <NavigationContainer>
      <NavigationRoutes />
      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}
