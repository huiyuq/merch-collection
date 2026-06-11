import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useCallback, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomTabBar from "../components/CustomTabBar";
import { auth } from "../firebaseConfig";
import { useTheme } from "../ThemeContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { darkMode, setDarkMode, theme } = useTheme();

  const [userName, setUserName] = useState("使用者");
  const [editName, setEditName] = useState("");
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadUserName();
    }, [])
  );

  const loadUserName = async () => {
    const name = await AsyncStorage.getItem("userName");
    setUserName(name || "使用者");
  };

  const saveUserName = async () => {
    if (!editName.trim()) return;

    await AsyncStorage.setItem("userName", editName.trim());
    setUserName(editName.trim());
    setEditName("");
    setNameModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutVisible(false);
      navigation.replace("Start");
    } catch (error) {
      alert("登出失敗");
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Image source={require("../assets/Top.png")} style={styles.topIcon} />
            <Image source={require("../assets/User.png")} style={styles.userIcon} />
          </View>

          <Text style={[styles.name, { color: theme.primary }]}>
            {userName}
          </Text>
        </View>

        <SectionTitle title="基本資料" theme={theme} />

        <Pressable
          style={[styles.row, { backgroundColor: theme.cardSolid }]}
          onPress={() => {
            setEditName(userName);
            setNameModalVisible(true);
          }}
        >
          <Text style={[styles.rowText, { color: theme.subText }]}>
            使用者名稱
          </Text>
          <Text style={[styles.arrow, { color: theme.subText }]}>＞</Text>
        </Pressable>

        <Row title="頭像" theme={theme} />
        <Row title="生日" theme={theme} />
        <Row title="通知" theme={theme} />

        <View style={[styles.row, { backgroundColor: theme.cardSolid }]}>
          <Text style={[styles.rowText, { color: theme.subText }]}>
            深色模式
          </Text>

          <View style={styles.switchBox}>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>

        <SectionTitle title="其他" theme={theme} />
        <Row title="服務條款" theme={theme} />
        <Row title="問題回報" theme={theme} />
        <Row title="更多帳號設定" theme={theme} />

        <Pressable
          style={[styles.row, { backgroundColor: theme.cardSolid }]}
          onPress={() => setLogoutVisible(true)}
        >
          <Text style={[styles.rowText, { color: theme.subText }]}>登出</Text>
          <Text style={[styles.arrow, { color: theme.subText }]}>＞</Text>
        </Pressable>
      </ScrollView>

      <Modal transparent visible={nameModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              修改名稱
            </Text>

            <TextInput
              style={[
                styles.modalInput,
                { backgroundColor: theme.cardSolid, color: theme.text },
              ]}
              placeholder="請輸入名稱"
              placeholderTextColor={theme.subText}
              value={editName}
              onChangeText={setEditName}
            />

            <View style={styles.modalButtons}>
              <Pressable style={styles.confirmBtn} onPress={saveUserName}>
                <Text style={styles.confirmText}>確認</Text>
              </Pressable>

              <Pressable
                style={[styles.cancelBtn, { backgroundColor: theme.cardSolid }]}
                onPress={() => {
                  setEditName("");
                  setNameModalVisible(false);
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

      <Modal transparent visible={logoutVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              即將登出
            </Text>

            <View style={styles.modalButtons}>
              <Pressable style={styles.confirmBtn} onPress={handleLogout}>
                <Text style={styles.confirmText}>確認</Text>
              </Pressable>

              <Pressable
                style={[styles.cancelBtn, { backgroundColor: theme.cardSolid }]}
                onPress={() => setLogoutVisible(false)}
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

const SectionTitle = ({ title, theme }) => (
  <View style={[styles.sectionTitle, { backgroundColor: theme.background }]}>
    <Text style={[styles.sectionText, { color: theme.text }]}>{title}</Text>
  </View>
);

const Row = ({ title, theme }) => (
  <View style={[styles.row, { backgroundColor: theme.cardSolid }]}>
    <Text style={[styles.rowText, { color: theme.subText }]}>{title}</Text>
    <Text style={[styles.arrow, { color: theme.subText }]}>＞</Text>
  </View>
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingBottom: 150,
  },
  header: {
    height: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    width: 110,
    height: 110,
    position: "relative",
  },
  topIcon: {
    width: 110,
    height: 110,
    position: "absolute",
  },
  userIcon: {
    width: 76,
    height: 76,
    position: "absolute",
    top: 17,
    left: 17,
    resizeMode: "contain",
  },
  name: {
    marginTop: 20,
    fontSize: 38,
    fontWeight: "700",
  },
  sectionTitle: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  sectionText: {
    fontSize: 24,
    fontWeight: "700",
  },
  row: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingLeft: 18,
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: {
    fontSize: 21,
    fontWeight: "600",
  },
  arrow: {
    fontSize: 24,
  },
  switchBox: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    borderRadius: 18,
    padding: 22,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
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

export default ProfileScreen;