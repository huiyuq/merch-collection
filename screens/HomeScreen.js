import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomTabBar from "../components/CustomTabBar";
import Header from "../components/Header";
import { auth } from "../firebaseConfig";
import { useTheme } from "../ThemeContext";

const HomeScreen = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState([]);
  const uid = auth.currentUser?.uid;

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [uid])
  );

  const loadItems = async () => {
  if (!uid) return;

  const data = await AsyncStorage.getItem(`collections_${uid}`);
  const allItems = data ? JSON.parse(data) : [];

  const recentItems = [...allItems]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  setItems(recentItems);
};

  return (
    <>
      <ScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        <Header />

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              最近新增
            </Text>
          </View>

          {items.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.subText }]}>
              目前還沒有新增收藏
            </Text>
          ) : (
            <View style={styles.recentRow}>
              {items.map((item) => (
                <View key={item.id} style={styles.product}>
                  <Image source={{ uri: item.image }} style={styles.productImg} />

                  <Text style={styles.tag}>{item.category}</Text>

                  <Text style={[styles.productName, { color: theme.text }]}>
                    {item.name}
                  </Text>

                  <Text style={[styles.date, { color: theme.subText }]}>
                    {item.year}/{item.month}/{item.day}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <CustomTabBar />
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingTop: 47,
    paddingHorizontal: 24,
    paddingBottom: 140,
    gap: 22,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    elevation: 6,
  },
  cardHeader: {
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  recentRow: {
    flexDirection: "row",
    gap: 28,
  },
  product: {
    width: 120,
  },
  productImg: {
    width: 105,
    height: 105,
    borderRadius: 18,
    resizeMode: "cover",
  },
  tag: {
    marginTop: 8,
    backgroundColor: "#A855F7",
    color: "#fff",
    width: 70,
    textAlign: "center",
    borderRadius: 20,
    fontWeight: "700",
    paddingVertical: 4,
  },
  productName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    marginTop: 4,
    fontSize: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 30,
  },
});

export default HomeScreen;