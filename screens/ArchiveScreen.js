import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeInUp } from "react-native-reanimated";
import CustomTabBar from "../components/CustomTabBar";
import { useTheme } from "../ThemeContext";

const defaultCategories = [
  { name: "娃娃", colors: ["#fff0c9", "#ffda7b"] },
  { name: "立牌", colors: ["#e0c2ff", "#a855f7"] },
  { name: "唱片", colors: ["#cadeff", "#5694ff"] },
  { name: "小卡", colors: ["#d4ffc9", "#85dd6e"] },
  { name: "公仔", colors: ["#ffcbcb", "#dd6e6e"] },
  { name: "貼紙", colors: ["#ffe4d0", "#e8985f"] },
  { name: "明信片", colors: ["#ffd8fa", "#ee8ae2"] },
  { name: "願望清單", colors: ["#a4aefd", "#162dd5"] },
];

const colorSets = [
  ["#fff0c9", "#ffda7b"],
  ["#e0c2ff", "#a855f7"],
  ["#cadeff", "#5694ff"],
  ["#d4ffc9", "#85dd6e"],
  ["#ffcbcb", "#dd6e6e"],
  ["#ffe4d0", "#e8985f"],
  ["#ffd8fa", "#ee8ae2"],
  ["#a4aefd", "#162dd5"],
];

  const ArchiveScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [categories, setCategories] = useState(defaultCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  const loadCategories = async () => {
    const data = await AsyncStorage.getItem("customCategories");

    if (data) {
      const custom = JSON.parse(data);
      setCategories([...defaultCategories, ...custom]);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) {
      Alert.alert("提醒", "請輸入類別名稱");
      return;
    }

    const exists = categories.some((item) => item.name === newCategory.trim());

    if (exists) {
      Alert.alert("提醒", "這個類別已經存在");
      return;
    }

    const oldData = await AsyncStorage.getItem("customCategories");
    const oldCategories = oldData ? JSON.parse(oldData) : [];

    const newItem = {
      name: newCategory.trim(),
      colors: colorSets[(defaultCategories.length + oldCategories.length) % colorSets.length],
    };

    const updated = [...oldCategories, newItem];

    await AsyncStorage.setItem("customCategories", JSON.stringify(updated));

    setCategories([...defaultCategories, ...updated]);
    setNewCategory("");
    setModalVisible(false);
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.searchBox, { backgroundColor: theme.card }]}>
          <Image
            source={require("../assets/SearchIcon.png")}
            style={styles.searchIcon}
          />

          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="請輸入周邊名稱"
            placeholderTextColor={theme.subText}
          />
        </View>

        <View style={styles.grid}>
          {categories.map((item, index) => (
  <Animated.View
    key={item.name}
    entering={FadeInUp.delay(index * 80).duration(500)}
  >
    <Pressable
      onPress={() =>
        navigation.navigate("CategoryItems", {
          category: item.name,
        })
      }
    >
      <LinearGradient
        colors={item.colors}
        locations={[0, 1]}
        style={styles.categoryBox}
      >
        <Text style={styles.categoryText}>
          {item.name}
        </Text>
      </LinearGradient>
    </Pressable>
  </Animated.View>
))}
          <Animated.View
  entering={FadeInUp.delay(categories.length * 80).duration(500)}
>
  <Pressable onPress={() => setModalVisible(true)}>
            <View style={[styles.addBox, { backgroundColor: theme.card }]}>
              <Text style={styles.addPlus}>＋</Text>
              <Text style={[styles.addText, { color: theme.text }]}>新增類別</Text>
            </View>
          </Pressable>
    
</Animated.View>
        </View>
      </KeyboardAwareScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              新增類別
            </Text>

            <TextInput
              style={[
                styles.modalInput,
                { backgroundColor: theme.cardSolid, color: theme.text },
              ]}
              placeholder="請輸入類別名稱"
              placeholderTextColor={theme.subText}
              value={newCategory}
              onChangeText={setNewCategory}
            />

            <View style={styles.modalButtons}>
              <Pressable style={styles.confirmBtn} onPress={addCategory}>
                <Text style={styles.confirmText}>確認</Text>
              </Pressable>

              <Pressable
                style={[styles.cancelBtn, { backgroundColor: theme.cardSolid }]}
                onPress={() => {
                  setModalVisible(false);
                  setNewCategory("");
                }}
              >
                <Text style={[styles.cancelText, { color: theme.text }]}>
                  取消
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <CustomTabBar />
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingTop: 46,
    paddingHorizontal: 29,
    paddingBottom: 150,
    alignItems: "center",
  },
  searchBox: {
    width: "100%",
    height: 58,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    elevation: 6,
    marginBottom: 34,
  },
  searchIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 26,
  },
  categoryBox: {
    width: 160,
    height: 130,
    borderRadius: 15,
    paddingLeft: 16,
    paddingBottom: 18,
    justifyContent: "flex-end",
    elevation: 5,
  },
  categoryText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  addBox: {
    width: 160,
    height: 130,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderWidth: 2,
    borderColor: "#A855F7",
    borderStyle: "dashed",
  },
  addPlus: {
    fontSize: 42,
    color: "#A855F7",
    fontWeight: "700",
  },
  addText: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    width: 300,
    borderRadius: 18,
    padding: 22,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  modalInput: {
    height: 52,
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 18,
    elevation: 5,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmBtn: {
    width: 120,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#A855F7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  cancelBtn: {
    width: 120,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  confirmText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  cancelText: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ArchiveScreen;