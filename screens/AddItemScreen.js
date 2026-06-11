import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomTabBar from "../components/CustomTabBar";
import { useTheme } from "../ThemeContext";

const categories = [
  { label: "娃娃", value: "娃娃" },
  { label: "立牌", value: "立牌" },
  { label: "小卡", value: "小卡" },
  { label: "唱片", value: "唱片" },
  { label: "公仔", value: "公仔" },
  { label: "貼紙", value: "貼紙" },
  { label: "明信片", value: "明信片" },
  { label: "願望清單", value: "願望清單" },
];

const years = Array.from({ length: 10 }, (_, i) => ({
  label: `${2026 - i}`,
  value: `${2026 - i}`,
}));

const months = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));

const days = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}`,
}));

const AddItemScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveItem = async () => {
    if (!image || !name || !category || !price || !year || !month || !day) {
      Alert.alert("提醒", "請填寫照片、名稱、種類、金額和時間");
      return;
    }

    const newItem = {
      id: Date.now(),
      image,
      name,
      category,
      price: Number(price),
      year,
      month,
      day,
      note,
      createdAt: new Date().toISOString(),
    };

    const oldData = await AsyncStorage.getItem("collections");
    const oldItems = oldData ? JSON.parse(oldData) : [];

    await AsyncStorage.setItem(
      "collections",
      JSON.stringify([newItem, ...oldItems])
    );

    Alert.alert("成功", "已新增收藏");
    navigation.navigate("收藏庫");
  };

  return (
    <>
      <ScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.title, { color: theme.text }]}>新增收藏</Text>

        <Text style={[styles.label, { color: theme.text }]}>新增照片</Text>
        <Pressable style={styles.photoButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.plus}>＋</Text>
          )}
        </Pressable>

        <Text style={[styles.label, { color: theme.text }]}>名稱</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
          placeholder="請輸入名稱"
          placeholderTextColor={theme.subText}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.label, { color: theme.text }]}>種類</Text>
        <View style={{ zIndex: 4000 }}>
          <DropDownPicker
            open={categoryOpen}
            value={category}
            items={categories}
            setOpen={setCategoryOpen}
            setValue={setCategory}
            placeholder="請選擇種類"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <Text style={[styles.label, { color: theme.text }]}>金額</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
          placeholder="請輸入金額"
          placeholderTextColor={theme.subText}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={[styles.label, { color: theme.text }]}>時間</Text>
        <View style={styles.dateRow}>
          <View style={styles.dateBox}>
            <DropDownPicker
              open={yearOpen}
              value={year}
              items={years}
              setOpen={setYearOpen}
              setValue={setYear}
              placeholder="年"
              style={styles.dateDropdown}
              textStyle={styles.dateText}
              dropDownContainerStyle={styles.dateDropdownContainer}
              zIndex={3000}
            />
          </View>

          <View style={styles.dateBox}>
            <DropDownPicker
              open={monthOpen}
              value={month}
              items={months}
              setOpen={setMonthOpen}
              setValue={setMonth}
              placeholder="月"
              style={styles.dateDropdown}
              textStyle={styles.dateText}
              dropDownContainerStyle={styles.dateDropdownContainer}
              zIndex={2000}
            />
          </View>

          <View style={styles.dateBox}>
            <DropDownPicker
              open={dayOpen}
              value={day}
              items={days}
              setOpen={setDayOpen}
              setValue={setDay}
              placeholder="日"
              style={styles.dateDropdown}
              textStyle={styles.dateText}
              dropDownContainerStyle={styles.dateDropdownContainer}
              zIndex={1000}
            />
          </View>
        </View>

        <Text style={[styles.label, { color: theme.text }]}>備註</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
          placeholder="請輸入備註"
          placeholderTextColor={theme.subText}
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.buttonRow}>
          <Pressable style={styles.nextButton} onPress={saveItem}>
            <Text style={styles.nextText}>下一步</Text>
          </Pressable>

          <Pressable
            style={[styles.cancelButton, { backgroundColor: theme.card }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.cancelText, { color: theme.text }]}>取消</Text>
          </Pressable>
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
    gap: 14,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },

  photoButton: {
    height: 58,
    backgroundColor: "#A855F7",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    overflow: "hidden",
  },
  plus: {
    color: "#fff",
    fontSize: 54,
    lineHeight: 58,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  input: {
    height: 58,
    borderRadius: 15,
    paddingHorizontal: 18,
    fontSize: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  dropdown: {
    height: 58,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: "#A855F7",
    paddingHorizontal: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  dropdownContainer: {
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: "#A855F7",
  },

  dateRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 3000,
  },
  dateBox: {
    width: "31%",
    zIndex: 3000,
  },
  dateDropdown: {
    width: "100%",
    height: 58,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: "#A855F7",
    paddingHorizontal: 14,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  dateDropdownContainer: {
    width: "100%",
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: "#A855F7",
  },

  buttonRow: {
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextButton: {
    width: 150,
    height: 56,
    borderRadius: 15,
    backgroundColor: "#A855F7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  nextText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  cancelButton: {
    width: 150,
    height: 56,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cancelText: {
    fontSize: 22,
    fontWeight: "700",
  },
});

export default AddItemScreen;