import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomTabBar from "../components/CustomTabBar";
import { useTheme } from "../ThemeContext";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const StatisticsScreen = () => {
  const { theme } = useTheme();

  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = async () => {
    const data = await AsyncStorage.getItem("collections");
    setItems(data ? JSON.parse(data) : []);
  };

  const totalCount = items.length;

  const categoryCount = new Set(items.map((item) => item.category)).size;

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const monthCounts = months.map((month) => {
    return items.filter((item) => Number(item.month) === month).length;
  });

  return (
    <>
      <ScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.title, { color: theme.text }]}>統計資料</Text>

        <View style={styles.topRow}>
          <View style={[styles.smallCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardSmallTitle, { color: theme.text }]}>
              收藏總數
            </Text>
            <Text style={[styles.bigNumber, { color: theme.text }]}>
              {totalCount}
              <Text style={styles.unit}> 件</Text>
            </Text>
          </View>

          <View style={[styles.smallCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardSmallTitle, { color: theme.text }]}>
              收藏種類
            </Text>
            <Text style={[styles.bigNumber, { color: theme.text }]}>
              {categoryCount}
              <Text style={styles.unit}> 種</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: theme.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              本月新增
            </Text>
            <Text style={[styles.more, { color: theme.subText }]}>
              查看更多 ＞
            </Text>
          </View>

          <View style={styles.chartArea}>
            {months.map((month, index) => (
              <View key={month} style={styles.barItem}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: Math.max(monthCounts[index] * 35, 2),
                        backgroundColor: theme.primary,
                      },
                    ]}
                  />
                </View>

                <Text style={[styles.monthText, { color: theme.text }]}>
                  {month}
                </Text>
                <Text style={[styles.monthText, { color: theme.text }]}>
                  月
                </Text>

                <Text style={[styles.countText, { color: theme.primary }]}>
                  {monthCounts[index]}
                </Text>
                <Text style={[styles.countText, { color: theme.primary }]}>
                  件
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.moneyCard, { backgroundColor: theme.card }]}>
          <View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              總花費金額
            </Text>

            <Text style={[styles.moneyText, { color: theme.text }]}>
              {totalPrice}
              <Text style={styles.moneyUnit}> 元</Text>
            </Text>
          </View>

          <Text style={[styles.more, { color: theme.subText }]}>
            查看更多 ＞
          </Text>
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
    paddingTop: 70,
    paddingHorizontal: 29,
    paddingBottom: 150,
    gap: 26,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },
  smallCard: {
    flex: 1,
    height: 86,
    borderRadius: 15,
    padding: 13,
    elevation: 6,
  },
  cardSmallTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  bigNumber: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: "700",
  },
  unit: {
    fontSize: 15,
  },
  chartCard: {
    height: 370,
    borderRadius: 15,
    padding: 18,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  more: {
    fontSize: 13,
    fontWeight: "600",
  },
  chartArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 25,
  },
  barItem: {
    alignItems: "center",
    width: 22,
  },
  barTrack: {
    height: 180,
    justifyContent: "flex-end",
  },
  bar: {
    width: 14,
    borderRadius: 2,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  countText: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  moneyCard: {
    height: 100,
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 6,
  },
  moneyText: {
    marginTop: 12,
    fontSize: 36,
    fontWeight: "700",
  },
  moneyUnit: {
    fontSize: 18,
  },
});

export default StatisticsScreen;