import { StyleSheet, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { DashBoardTabs, WelcomeScreen } from "../screens";

import { COLORS } from "../theme";
import { GoBackIcon } from "../assets/svgs";
import { StackParamList } from "../types";

const Stack = createStackNavigator<StackParamList>();

const NavigationRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="welcomeScreen"
      screenOptions={customScreenOptions}
    >
      <Stack.Screen
        name="welcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="dashboardScreen"
        component={DashBoardTabs}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationRoutes;

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: 15,
    width: 55,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

const customScreenOptions = {
  headerBackTitle: " ",
  headerTintColor: COLORS.primary,
  headerStyle: {
    backgroundColor: COLORS.white,
  },
  headerLeft: (props: any) => (
    <>
      <TouchableOpacity style={styles.backIcon} {...props}>
        <GoBackIcon />
      </TouchableOpacity>
    </>
  ),
};
