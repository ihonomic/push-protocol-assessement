import { StyleSheet, View, SafeAreaView, FlatList, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../theme";
import { StatusBar } from "expo-status-bar";
import { BookMarkHeader, BookmarkCard } from "../../components";

const BookmarkScreen = ({
  bookmarkData,
  setBookmarkData,
  loadBookmarkData,
}: {
  bookmarkData: any;
  setBookmarkData: any;
  loadBookmarkData: any;
}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ color: COLORS.darkGray, textAlign: "center" }}>
          Swipe right to delete Saved NFTs
        </Text>

        <FlatList
          data={bookmarkData}
          ListHeaderComponent={() => <BookMarkHeader />}
          ListHeaderComponentStyle={{ backgroundColor: COLORS.white }}
          renderItem={({ item }) => (
            <BookmarkCard
              item={item}
              bookmarkData={bookmarkData}
              setBookmarkData={setBookmarkData}
              loadBookmarkData={loadBookmarkData}
            />
          )}
          keyExtractor={(item) => item.nft_data.token_id}
          alwaysBounceVertical={true}
          stickyHeaderIndices={[0]}
          ListFooterComponent={<View style={{ height: 10 }} />}
        />
      </SafeAreaView>
      <StatusBar style="dark" />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.md,
    paddingTop: SIZES.xl,
  },
});
