import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../theme";
import { StatusBar } from "expo-status-bar";
import { NFTHeader, NFTCard } from "../../components";

import RNAnimated from "react-native-animated-component";
import { ActivityIndicator } from "react-native-paper";

const NFTHomeScreen = ({
  loading,
  loadNFTsData,
  collectionItems,
  bookmarkData,
  setBookmarkData,
  loadBookmarkData,
}: {
  loading: any;
  loadNFTsData: any;
  collectionItems: any;
  bookmarkData: any;
  setBookmarkData: any;
  loadBookmarkData: any;
}) => {
  const handleRefresh = () => {
    loadNFTsData();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <RNAnimated appearFrom="top" animationDuration={700}>
          {loading ? (
            <ActivityIndicator
              size={"small"}
              animating={true}
              color={COLORS.white}
            />
          ) : (
            <FlatList
              data={collectionItems}
              ListHeaderComponent={() => <NFTHeader />}
              ListHeaderComponentStyle={{ backgroundColor: COLORS.black }}
              renderItem={({ item }) => (
                <NFTCard
                  item={item}
                  bookmarkData={bookmarkData}
                  setBookmarkData={setBookmarkData}
                  loadBookmarkData={loadBookmarkData}
                />
              )}
              keyExtractor={(item) => item.nft_data.token_id}
              alwaysBounceVertical={true}
              // StickyHeaderComponent={() => <NFTHeader />}
              stickyHeaderIndices={[0]}
              ListFooterComponent={<View style={{ height: 10 }} />}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={handleRefresh}
                />
              }
            />
          )}
        </RNAnimated>
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
};

export default NFTHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: SIZES.md,
    paddingTop: SIZES.xl,
  },
  textColor: {
    color: COLORS.white,
  },
});
