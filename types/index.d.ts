import { StackNavigationProp } from "@react-navigation/stack";

/**
 * Types for Stack Navigator.
 */
export type StackParamList = {
  welcomeScreen: {};
  dashboardScreen: {};
};

/**
 * Types for the Stack Navigator.
 */
export type StackNavigation = StackNavigationProp<StackParamList>;

/**
 * Types for passing the navigation props to screens in the Bottom Tab Navigator.
 */
export type StackNavigationProps = {
  navigation: StackNavigation;
  jumpTo: StackNavigation;
};

// TO USE:
// const SomeScreenInTheStack = ({ navigation }: StackNavigationProps) => {
//     ...
//     }
