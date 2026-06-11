import { StyleSheet, Text, TextInput, View } from "react-native";
import {
    Border,
    BoxShadow,
    Color,
    FontFamily,
    FontSize,
    Height,
    Padding,
    Width
} from "../GlobalStyles";

const FrameComponent0 = ({
  prop,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.parent, styles.parentFlexBox]}>
      <Text style={styles.text}>{prop}</Text>
      <TextInput
        style={[styles.frameChild, styles.parentFlexBox]}
        placeholder={placeholder}
        multiline={false}
        placeholderTextColor="#848484"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentFlexBox: {
    alignItems: "flex-start",
    width: Width.width_344,
  },
  parent: {
  height: 92,
  zIndex: null,
  gap: 10,
},
  text: {
    width: Width.width_81,
    height: Height.height_18,
    fontSize: FontSize.fs_16,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorDimgray,
    textAlign: "left",
  },
  frameChild: {
  height: 60,
  boxShadow: BoxShadow.shadow_drop,
  elevation: 6,
  borderRadius: Border.br_15,
  backgroundColor: Color.colorGray200,
  paddingHorizontal: Padding.padding_15,
  fontSize: 16,
  textAlign: "left",
},
});

export default FrameComponent0;
