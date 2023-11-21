import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";

const BookmarkCard = ({
  item,
  bookmarkData,
  setBookmarkData,
  loadBookmarkData,
}: {
  item: any;
  bookmarkData: any;
  setBookmarkData: any;
  loadBookmarkData: any;
}) => {
  const updateStorage = async (newData: any) => {
    try {
      // Save data to AsyncStorage
      await AsyncStorage.setItem("nfts", JSON.stringify(newData));
      setBookmarkData(newData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const removeItem = () => {
    const newData = bookmarkData.filter(
      (element: any) => element.nft_data.token_id !== item.nft_data.token_id
    );
    updateStorage(newData);
    loadBookmarkData();
  };

  return (
    <Swipeable
      onSwipeableRightOpen={removeItem}
      renderRightActions={() => {
        const remove = async () => {
          removeItem();
        };
        return (
          <TouchableOpacity style={{}} onPress={remove}>
            <View style={[styles.slideContent]}>
              <Ionicons name="trash-bin" size={26} color={COLORS.white} />
              <Text style={styles.removetext}>Remove</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: item.nft_data?.external_data?.asset_url,
            }}
            width={70}
            height={70}
            style={{ borderRadius: SIZES.xxs }}
          />
          <View style={{ marginLeft: SIZES.xs }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.nft_data.external_data?.name}
            </Text>
            <Text style={{ fontSize: 10, color: "gray" }}>
              {item.nft_data?.original_owner}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default BookmarkCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    height: 100,
    width: "100%",
    marginBottom: SIZES.xxs,
    borderRadius: SIZES.xs,
    padding: SIZES.xxs,
    paddingVertical: SIZES.md,
  },
  slideContent: {
    backgroundColor: COLORS.red,
    height: 100,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  removetext: {
    color: "white",
  },
});
