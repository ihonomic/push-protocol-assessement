import { StyleSheet, View } from "react-native";
import { COLORS } from "../../theme";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TAB SCREENS
import NFTHomeScreen from "./NFTHomeScreen";
import BookmarkScreen from "./BookmarkScreen";
import { fetchNFTCollection } from "../../api";

const Tab = createBottomTabNavigator();

const DashBoardTabs = () => {
  // LOCAL STATE
  const [bgColor, setBgColor] = useState(COLORS.black);

  const [loading, setLoading] = useState(false);
  const [collectionItems, setCollectionItems] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  // BOOKMARK
  const [data, setData] = useState([]);

  const loadBookmarkData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("nfts");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const getIconColor = (focused: boolean) => {
    let color;
    if (focused && bgColor === COLORS.white) {
      color = COLORS.black;
    } else if (focused && bgColor === COLORS.black) {
      color = COLORS.white;
    } else {
      color = COLORS.darkGray;
    }
    return color;
  };
  //
  const loadNFTsData = async () => {
    setLoading(true);
    const response = await fetchNFTCollection(
      page.toString(),
      pageSize.toString()
    );
    setLoading(false);
    if (response.status === "success") {
      setCollectionItems(response.data.items);
    } else {
      alert("Error fetching NFTs, check your connection and try again");
    }
  };

  useEffect(() => {
    loadNFTsData();
    loadBookmarkData();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="NFTs"
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: bgColor }],
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: { color: getIconColor(true) },
      }}
    >
      <Tab.Screen
        name="NFTs"
        // component={NFTHomeScreen}
        children={() => (
          <NFTHomeScreen
            loading={loading}
            loadNFTsData={loadNFTsData}
            collectionItems={collectionItems}
            bookmarkData={data}
            setBookmarkData={setData}
            loadBookmarkData={loadBookmarkData}
          />
        )}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome5
                name="coins"
                size={24}
                color={getIconColor(focused)}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e: any) => {
            setBgColor(COLORS.black);
          },
        }}
      />

      <Tab.Screen
        name="Bookmark"
        children={() => (
          <BookmarkScreen
            bookmarkData={data}
            setBookmarkData={setData}
            loadBookmarkData={loadBookmarkData}
          />
        )}
        options={{
          tabBarBadge: data.length,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View style={styles.tabIconContainer}>
              <Entypo
                name="bookmarks"
                size={24}
                color={getIconColor(focused)}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e: any) => {
            setBgColor(COLORS.white);
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashBoardTabs;

const styles = StyleSheet.create({
  tabBar: {
    // position: 'absolute',
    // padding: 0,
    // left: 16,
    // right: 16,
    // bottom: 32,
    // height: 56,
    // borderRadius: 16,
    // backgroundColor: getBottomTabColor(),
    borderTopColor: "transparent",
    shadowColor: COLORS.black,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabIconContainer: {
    position: "absolute",
    top: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
});
