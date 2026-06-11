import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import CustomTabBar from "../components/CustomTabBar";
import { useTheme } from "../ThemeContext";

const CategoryItemsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  const { category } = route.params;
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = async () => {
    const data = await AsyncStorage.getItem("collections");
    const allItems = data ? JSON.parse(data) : [];

    const filtered = allItems.filter(
      (item) => item.category === category
    );

    setItems(filtered);
  };

  return (
    <>
      <ScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: theme.primary }]}>＜ 返回</Text>
        </Pressable>

        <Text style={[styles.title, { color: theme.text }]}>
          {category}
        </Text>

        <Text style={[styles.count, { color: theme.subText }]}>
          共 {items.length} 件
        </Text>

        <View style={styles.grid}>
          {items.map((item) => (
            <View
              key={item.id}
              style={[styles.card, { backgroundColor: theme.card }]}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <Text style={[styles.name, { color: theme.text }]}>
                {item.name}
              </Text>

              <Text style={[styles.info, { color: theme.subText }]}>
                {item.year}/{item.month}/{item.day}
              </Text>

              <Text style={[styles.info, { color: theme.subText }]}>
                ${item.price}
              </Text>
            </View>
          ))}
        </View>

        {items.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.subText }]}>
            這個類別目前還沒有收藏
          </Text>
        )}
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 150,
  },
  back: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
  },
  count: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 22,
  },
  card: {
    width: "47%",
    borderRadius: 18,
    padding: 12,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 15,
    resizeMode: "cover",
  },
  name: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "700",
  },
  info: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },
  emptyText: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CategoryItemsScreen;