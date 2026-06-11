import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth } from "../firebaseConfig";
import {
  Border,
  BoxShadow,
  Color,
  FontFamily,
  FontSize,
  Padding
} from "../GlobalStyles";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
const [nickname, setNickname] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const [yearOpen, setYearOpen] = useState(false);
  const [yearValue, setYearValue] = useState(null);

  const [monthOpen, setMonthOpen] = useState(false);
  const [monthValue, setMonthValue] = useState(null);

  const [dayOpen, setDayOpen] = useState(false);
  const [dayValue, setDayValue] = useState(null);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);

  const years = Array.from({ length:100 }, (_, i) => ({
    label: `${2026 - i} 年`,
    value: `${2026 - i}`,
  }));

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1} 月`,
    value: `${i + 1}`,
  }));

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1} 日`,
    value: `${i + 1}`,
  }));

  const genders = [
    { label: "女", value: "female" },
    { label: "男", value: "male" },
    { label: "不透露", value: "none" },
  ];

  return (
    <KeyboardAwareScrollView
      style={styles.iphone1724}
      contentContainerStyle={styles.iPhone1724Content}
      nestedScrollEnabled={true}
    >
      <View style={[styles.parent, styles.parentLayout]}>
        <Text style={styles.text}>註冊帳號</Text>
        
        <View style={[styles.group, styles.groupSpaceBlock]}>
          <Text style={styles.text2}>電子郵件</Text>
          <TextInput
  style={[styles.frameChild, styles.frameFlexBox]}
  placeholder="請輸入電子郵件"
  value={email}
  onChangeText={setEmail}
  autoCapitalize="none"
  keyboardType="email-address"
  multiline={false}
  placeholderTextColor="#848484"
/>
        </View>

        <View style={[styles.group, styles.groupSpaceBlock]}>
          <Text style={styles.text2}>暱稱</Text>
          <TextInput
  style={[styles.frameChild, styles.frameFlexBox]}
  placeholder="請輸入暱稱"
  value={nickname}
  onChangeText={setNickname}
  multiline={false}
  placeholderTextColor="#848484"
/>
        </View>

        {/* 生日區塊：使用更高的 zIndex 確保下拉單不被遮擋 */}
        <View style={[styles.frameView, { zIndex: 5000 }]}>
          <Text style={styles.text2}>生日</Text>
          <View style={styles.birthdayRow}>
            <View style={styles.birthdayDropWrapper}>
              <DropDownPicker
                open={yearOpen}
                value={yearValue}
                items={years}
                setOpen={setYearOpen}
                setValue={setYearValue}
                placeholder="年"
                style={styles.dropdownpicker}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={4000}
              />
            </View>

            <View style={styles.birthdayDropWrapper}>
              <DropDownPicker
                open={monthOpen}
                value={monthValue}
                items={months}
                setOpen={setMonthOpen}
                setValue={setMonthValue}
                placeholder="月"
                style={styles.dropdownpicker}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={3000}
              />
            </View>

            <View style={styles.birthdayDropWrapper}>
              <DropDownPicker
                open={dayOpen}
                value={dayValue}
                items={days}
                setOpen={setDayOpen}
                setValue={setDayValue}
                placeholder="日"
                style={styles.dropdownpicker}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={2000}
              />
            </View>
          </View>
        </View>
            
        {/* 性別區塊：同理給予中等 zIndex */}
        <View style={[styles.parent2, { zIndex: 1000 }]}>
          <Text style={styles.text2}>性別</Text>
          <DropDownPicker
            open={genderOpen}
            value={genderValue}
            items={genders}
            setOpen={setGenderOpen}
            setValue={setGenderValue}
            placeholder="請選擇"
            style={styles.genderDropdown}
            dropDownContainerStyle={styles.genderDropdownContainer}
            zIndex={1000}
          />
        </View>

        <View style={[styles.group, styles.groupSpaceBlock]}>
          <Text style={styles.text2}>密碼</Text>
          <TextInput
  style={[styles.frameChild, styles.frameFlexBox]}
  placeholder="請輸入密碼"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={true}
  multiline={false}
  placeholderTextColor="#848484"
/>
        </View>

        <View style={[styles.group, styles.groupSpaceBlock]}>
          <Text style={styles.text2}>密碼確認</Text>
          <TextInput
  style={[styles.frameChild, styles.frameFlexBox]}
  placeholder="請再次輸入密碼"
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  secureTextEntry={true}
  multiline={false}
  placeholderTextColor="#848484"
/>
        </View>
      </View>

      <View style={[styles.iphone1724Inner, styles.frameFlexBox]}>
        <View style={[styles.frameGroup, styles.frameFlexBox]}>
          <Pressable
  style={styles.rectangleParent}
  onPress={async () => {
    if (!email || !password || !confirmPassword) {
      alert("請填寫電子郵件與密碼");
      return;
    }

    if (password !== confirmPassword) {
      alert("兩次輸入的密碼不一致");
      return;
    }

    try {
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  alert("註冊成功");

  navigation.replace("Login");
} catch (error) {
  alert(error.message);
}
  }}
>
  <Text style={[styles.text8, styles.textTypo]}>完成</Text>
</Pressable>
          <Pressable
            style={styles.rectangleGroup}
            onPress={() => navigation.navigate("Start")}
          >
            <Text style={[styles.text9, styles.textTypo]}>取消</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  iPhone1724Content: {
    flexDirection: "column",
    paddingHorizontal: 29,
    paddingTop: 80, 
    paddingBottom: 46,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  parentLayout: {
    width: "100%",
    alignItems: "flex-start",
  },
  // 統一外層容器的行高與間距
  groupSpaceBlock: {
    width: "100%",
    height: 85,          // 縮減外層高度，搭配 50 高度的欄位比例最好看
    justifyContent: "center",
  },
  frameFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  iphone1724: {
    backgroundColor: Color.colorLavender,
    width: "100%",
    flex: 1,
  },
  parent: {
    gap: 12,             // 讓每個大區塊之間維持舒適的間距
    alignItems: "flex-start",
    width: "100%",
  },
  text: {
    fontSize: 32,
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    marginBottom: 10,
  },
  text2: {
    fontSize: FontSize.fs_16,
    textAlign: "left",
    color: Color.colorDimgray,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    marginBottom: 8,
  },

  // 1️⃣ 【帳號、暱稱、密碼輸入框】樣式
  frameChild: {
    width: "100%",
    height: 50,          // 👈 統一高度 50
    backgroundColor: Color.colorGray,
    paddingHorizontal: Padding.padding_15,
    borderRadius: Border.br_15,
    elevation: 6,
    boxShadow: BoxShadow.shadow_drop,
    fontSize: 16,
    textAlign: "left",
  },

  // 2️⃣ 【生日區塊】外層
  frameView: {
    width: "100%",
    height: 85,
  },
  birthdayRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  birthdayDropWrapper: {
    width: "31%", 
    height: 50,          // 👈 統一高度 50
  },

  // 3️⃣ 【生日下拉選單本體】樣式
  dropdownpicker: {
    height: 50,          // 👈 統一高度 50
    minHeight: 50,       // 👈 強制設定 minHeight 覆蓋套件預設值
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: Color.colorGray,
    elevation: 6,
    boxShadow: BoxShadow.shadow_drop,
    paddingVertical: 0,  // 移除預設內邊距確保文字置中
  },
  dropdownContainer: {
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: Color.colorWhite,
  },

  // 4️⃣ 【性別區塊】外層與下拉選單
  parent2: {
    width: "100%",
    height: 85,
  },
  genderDropdown: {
    width: "100%",
    height: 50,          // 👈 統一高度 50
    minHeight: 50,       // 👈 強制設定 minHeight 覆蓋套件預設值
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: Color.colorGray,
    elevation: 6,
    boxShadow: BoxShadow.shadow_drop,
    paddingVertical: 0,
  },
  genderDropdownContainer: {
  width: "100%",                  
  borderWidth: 0,
  borderRadius: 15,               
  backgroundColor: Color.colorWhite,
  elevation: 6,
  boxShadow: BoxShadow.shadow_drop,
  paddingVertical: 5, 
},
  iphone1724Inner: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  frameGroup: {
    width: "100%",
    gap: 20,
    justifyContent: "space-between",
  },
  rectangleParent: {
    backgroundColor: Color.colorBlueviolet,
    flex: 1,
    height: 50,         
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Border.br_15,
    elevation: 6,
    boxShadow: BoxShadow.shadow_drop,
  },
  text8: {
    fontSize: 20,
    color: Color.colorWhite,
  },
  rectangleGroup: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 50,          
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Border.br_15,
    elevation: 6,
    boxShadow: BoxShadow.shadow_drop,
  },
  text9: {
    fontSize: 30,
    color: Color.colorDimgray,
  },
});

export default SignupScreen;