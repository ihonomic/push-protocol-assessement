import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme";
import RNAnimated from "react-native-animated-component";

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Push Protocol Assessment from Oseghale Ihon
      </Text>
      <View style={styles.btnContainer}>
        <RNAnimated appearFrom="right" animationDuration={700}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("dashboardScreen")}
          >
            <Text style={styles.btnText}>Proceed</Text>
          </TouchableOpacity>
        </RNAnimated>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SIZES.xl,
  },
  btnContainer: {
    position: "absolute",
    bottom: SIZES.xl + 20,
  },
  btn: {
    backgroundColor: COLORS.darkGray,
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xxs,
  },
  btnText: {
    color: COLORS.white,
    textAlign: "center",
  },
});
