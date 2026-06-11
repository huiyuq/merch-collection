import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../ThemeContext";

export default function CustomTabBar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();

  const textColor = (name) =>
    route.name === name ? "#A855F7" : theme.text;

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.tabBar }]}>
      <Pressable style={styles.item} onPress={() => navigation.navigate("首頁")}>
        <Image
          source={
            route.name === "首頁"
              ? require("../assets/homeIconActive.png")
              : require("../assets/homeIcon.png")
          }
          style={styles.icon}
        />
        <Text style={[styles.label, { color: textColor("首頁") }]}>首頁</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate("收藏庫")}>
        <Image
          source={
            route.name === "收藏庫"
              ? require("../assets/boxIconActive.png")
              : require("../assets/boxIcon.png")
          }
          style={styles.icon}
        />
        <Text style={[styles.label, { color: textColor("收藏庫") }]}>收藏庫</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate("新增收藏")}>
        <Image source={require("../assets/Group-28.png")} style={styles.plusicon} />
        <Text style={[styles.pluslabel, { color: textColor("新增收藏") }]}>
          新增收藏
        </Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate("統計")}>
        <Image
          source={
            route.name === "統計"
              ? require("../assets/lineIconActive.png")
              : require("../assets/lineIcon.png")
          }
          style={styles.icon}
        />
        <Text style={[styles.label, { color: textColor("統計") }]}>統計</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate("帳號")}>
        <Image
          source={
            route.name === "帳號"
              ? require("../assets/userIconActive.png")
              : require("../assets/userIcon.png")
          }
          style={styles.icon}
        />
        <Text style={[styles.label, { color: textColor("帳號") }]}>帳號</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 35,
    left: 20,
    right: 20,
    height: 74,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  plusicon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    marginBottom: -2,
  },
  pluslabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 0,
    marginBottom: 18,
  },
});