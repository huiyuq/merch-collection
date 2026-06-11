import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Group501 from "../assets/Group-50.svg";
import { Color, FontFamily, Padding, Width } from "../GlobalStyles";

const Header = () => {
  const [userName, setUserName] = useState("使用者");

  useFocusEffect(
    useCallback(() => {
      const loadName = async () => {
        const name = await AsyncStorage.getItem("userName");
        setUserName(name || "使用者");
      };

      loadName();
    }, [])
  );

  return (
    <View style={styles.frameParent}>
      <View style={styles.avatarBox}>
        <Image source={require("../assets/Top.png")} style={styles.topIcon} />
        <Image source={require("../assets/User.png")} style={styles.userIcon} />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.text}>歡迎回來，{userName}</Text>
      </View>

      <View style={styles.frameWrapper}>
        <Pressable style={styles.container} onPress={() => {}}>
          <Group501 style={styles.icon} width={41} height={41} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameParent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 51,
  },
  avatarBox: {
    width: 51,
    height: 51,
    position: "relative",
  },
  topIcon: {
    width: 51,
    height: 51,
    position: "absolute",
  },
  userIcon: {
    width: 32,
    height: 32,
    position: "absolute",
    top: 9.5,
    left: 9.5,
    resizeMode: "contain",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlueviolet,
    textAlign: "left",
    lineHeight: 24,
    marginTop: 2,
  },
  frameWrapper: {
    height: 46,
    paddingTop: Padding.padding_5,
    width: Width.width_41,
  },
  container: {
    height: 41,
    width: Width.width_41,
  },
  icon: {
    nodeWidth: 41,
    nodeHeight: 41,
  },
});

export default Header;