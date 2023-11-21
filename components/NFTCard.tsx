import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../theme";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import RNAnimated from "react-native-animated-component";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NFTCard = ({
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
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{
            uri: item.nft_data.external_data?.asset_url,
          }}
          width={24}
          height={24}
          style={{ borderRadius: 100 }}
        />

        <Text style={{ marginLeft: SIZES.xs, fontWeight: "bold" }}>
          {item.nft_data.external_data?.name}
        </Text>
      </View>

      <View style={styles.middle}>
        <View style={{ flex: 0.8 }}>
          <Text style={[styles.middleText, { color: COLORS.black }]}>
            {item.nft_data.external_data?.description}
          </Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Image
            source={{
              uri: item.nft_data.external_data?.asset_url,
            }}
            width={70}
            height={70}
            style={{ borderRadius: SIZES.xxs }}
          />
        </View>
      </View>

      <View style={styles.bottom}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="web-sync"
              size={20}
              color={COLORS.darkGray}
            />
            <Text style={[styles.middleText, { marginLeft: 2 }]}>
              https://degods.com
            </Text>
          </View>
          <Text style={{ fontSize: 10, color: "gray" }}>
            {item.nft_data?.original_owner}
          </Text>
        </View>
        <View style={{ marginRight: SIZES.xl }}>
          <BookMarkIcon
            item={item}
            setIsSnackBarVisible={setIsSnackBarVisible}
            bookmarkData={bookmarkData}
            setBookmarkData={setBookmarkData}
            loadBookmarkData={loadBookmarkData}
            setSnackBarMessage={setSnackBarMessage}
          />
        </View>
      </View>

      {/* SNACKBAR  */}
      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => setIsSnackBarVisible(false)}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {snackBarMessage}
      </Snackbar>
    </View>
  );
};

export default NFTCard;

const BookMarkIcon = ({
  item,
  setIsSnackBarVisible,
  bookmarkData,
  setBookmarkData,
  loadBookmarkData,
  setSnackBarMessage,
}: {
  item: any;
  setIsSnackBarVisible: any;
  bookmarkData: any;
  setBookmarkData: any;
  loadBookmarkData: any;
  setSnackBarMessage: any;
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

  const appendItem = () => {
    const newItem = item;
    const newData = [...bookmarkData, newItem];
    updateStorage(newData);
    setSnackBarMessage("Saved to bookmark");
    setIsSnackBarVisible(true);
    loadBookmarkData();
  };

  const removeItem = () => {
    const newData = bookmarkData.filter(
      (element: any) => element.nft_data.token_id !== item.nft_data.token_id
    );
    updateStorage(newData);
    setSnackBarMessage("Removed from bookmark");
    setIsSnackBarVisible(true);
    loadBookmarkData();
  };

  return (
    <RNAnimated appearFrom="top" animationDuration={700}>
      {bookmarkData.some(
        (element: any) => element.nft_data.token_id === item.nft_data.token_id
      ) ? (
        <TouchableOpacity onPress={removeItem}>
          <FontAwesome name="bookmark" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={appendItem}>
          <FontAwesome name="bookmark-o" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </RNAnimated>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    height: 170,
    width: "100%",
    marginBottom: SIZES.xxs,
    borderRadius: SIZES.xs,
    padding: SIZES.xxs,
    paddingVertical: SIZES.md,
  },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  middleText: {
    color: COLORS.darkGray,
    fontStyle: "italic",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.lg,
  },
});
