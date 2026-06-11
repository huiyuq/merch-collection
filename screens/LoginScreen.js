import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebaseConfig";

import FrameComponent from "../components/FrameComponent0";

import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Width
} from "../GlobalStyles0";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("請輸入電子郵件和密碼");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("MainTabs");
    } catch (error) {
      alert("登入失敗，請確認電子郵件或密碼");
    }
  };

  return (
    <ScrollView
      style={styles.iphone1725}
      contentContainerStyle={styles.iPhone1725Content}
    >
      <Text style={styles.text}>登入帳號</Text>

      <View style={styles.frameParent}>
        <FrameComponent
          prop="電子郵件"
          placeholder="請輸入電子郵件"
          value={email}
          onChangeText={setEmail}
        />

        <FrameComponent
          prop="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Text style={styles.text2}>忘記密碼？</Text>
      </View>

      <View style={styles.iphone1725Inner}>
        <View style={styles.frameGroup}>
          <Pressable
            style={styles.rectangleParent}
            onPress={handleLogin}
          >
            <Text style={[styles.text3, styles.textTypo]}>完成</Text>
          </Pressable>

          <Pressable
            style={styles.rectangleGroup}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.text4, styles.textTypo]}>取消</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iPhone1725Content: {
    flexDirection: "column",
    paddingHorizontal: 29,
    paddingTop: 120,
    paddingBottom: 46,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 20,
    flex: 1,
  },
  iphone1725: {
    backgroundColor: Color.colorLavender,
    width: "100%",
    flex: 1,
    maxWidth: "100%",
  },
  text: {
    height: 47,
    width: "100%",
    fontSize: 32,
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    paddingLeft: 10,
  },
  frameParent: {
    width: Width.width_344,
    gap: 13,
    alignItems: "flex-start",
  },
  text2: {
    width: 108,
    height: 15,
    fontSize: 13,
    textDecorationLine: "underline",
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlueviolet,
    textAlign: "left",
  },
  iphone1725Inner: {
    width: "100%",
    marginTop: 40,
    alignItems: "center",
  },
  frameGroup: {
    width: 334,
    gap: 32,
    flexDirection: "row",
    justifyContent: "center",
  },
  rectangleParent: {
    backgroundColor: Color.colorBlueviolet,
    borderRadius: Border.br_15,
    width: 151,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleGroup: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_15,
    width: 151,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    textAlign: "center",
    fontSize: FontSize.fs_20,
    width: Width.width_81,
    height: 23,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  text3: {
    color: Color.colorWhite,
  },
  text4: {
    color: Color.colorDimgray,
  },
});

export default LoginScreen;