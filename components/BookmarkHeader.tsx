import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme";

const BookMarkHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Your saved collections</Text>
      <Image
        source={{ uri: "https://source.unsplash.com/random/?nft,man" }}
        style={{ width: 30, height: 30, borderRadius: 100 }}
      />
    </View>
  );
};

export default BookMarkHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "transparent",
    paddingHorizontal: SIZES.md,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textColor: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
  },
});
