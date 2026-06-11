import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Border,
  BoxShadow,
  Color,
  FontFamily
} from "../GlobalStyles";

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.iphone1713}
      contentContainerStyle={styles.iPhone1713Content}
    >
      <View style={[styles.wrapper, styles.wrapperFlexBox]}>
        <Text style={[styles.text, styles.textTypo]}>
          <Text style={styles.text2}>歡迎使用{"\n"}</Text>
          <Text style={styles.text3}>周邊收藏圖鑑</Text>
        </Text>
      </View>

      <View style={styles.logoContainer}>
  <View style={styles.topParent}>
    <Image
      source={require("../assets/Top.png")}
      style={styles.topIcon}
    />

    <Image
      source={require("../assets/User.png")}
      style={styles.userIcon}
      resizeMode="contain"
    />
  </View>
</View>
      <View style={styles.iphone1713Child}>
        <View style={styles.frameParent}>
          <Pressable
            style={[styles.rectangleParent, styles.frameChildLayout]}
            onPress={() => navigation.navigate('Login')}
          >
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Text style={[styles.text4, styles.textTypo]}>登入</Text>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent, styles.frameChildLayout]}
            onPress={() => navigation.navigate('Signup')}
          >
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Text style={[styles.text4, styles.textTypo]}>註冊</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iPhone1713Content: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 174,
    paddingBottom: 315,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 42,
    height: 874,
    flex: 1,
  },
  wrapperFlexBox: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  topLayout: {
    width: 95,
    height: 95,
  },
  frameChildLayout: {
    backgroundColor: Color.colorBlueviolet,
    borderRadius: Border.br_15,
    elevation: 6,
    boxShadow: BoxShadow.shadow_drop,
    height: 55,
    width: 160,
  },
  iphone1713: {
    backgroundColor: Color.colorLavender,
    width: "100%",
    flex: 1,
    maxWidth: "100%",
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    height: 77,
    fontSize: 32,
    textAlign: "center",
  },
  text2: {
    color: Color.colorDimgray,
  },
  text3: {
    color: Color.colorBlueviolet,
  },
  iphone1713Inner: {
    width: 260,
    paddingLeft: 137,
    height: 95,
    alignItems: "center",
    flexDirection: "row",
    zIndex: null,
  },
  topParent: {
    zIndex: 1,
  },
  topIcon: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  userIcon: {
  width: 60,
  height: 60,
  position: "absolute",
  top: 17,
  left: 17,
  resizeMode: "contain",
},
  iphone1713Child: {
  width: "100%",
  height: 107,
  alignItems: "center",
},
  frameParent: {
  gap: 15,
  width: 160,
  alignItems: "center",
},
  rectangleParent: {
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: Color.colorBlueviolet,
  borderRadius: Border.br_15,

  width: 160,
  height: 55,
},
  frameChild: {
    display: "none",
  },
  text4: {
  fontSize: 20,
  color: Color.colorWhite,
  textAlign: "center",
},
  logoContainer: {
  width: "100%",
  alignItems: "center",
},

topParent: {
  width: 95,
  height: 95,
  position: "relative",
},

topIcon: {
  width: 95,
  height: 95,
  position: "absolute",
  top: 0,
  left: 0,
},

userIcon: {
  width: 69,
  height: 69,
  position: "absolute",
  top: 13,
  left: 17,
  width: 60,
  height: 60,
},
});

export default StartScreen;
