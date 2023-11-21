import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme";

const NFTHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>DeGod NFT collections</Text>
      <Image
        source={{ uri: "https://source.unsplash.com/random/?nft,man" }}
        style={{ width: 30, height: 30, borderRadius: 100 }}
      />
    </View>
  );
};

export default NFTHeader;

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
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
