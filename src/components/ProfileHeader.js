import { Icon } from "native-base";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  COLORS,
  IMAGES,
  width,
  height,
  FONTS,
  SIZES,
  FONTFAMILY,
  SCREENS,
  STYLES,
} from "../constants";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "./BackArrow";
import MyTouchableOpacity from "./MyTouchableOpacity";
import Row from "./Row";

export default ProfileHeader = ({ title, onEditeIconPressed, style }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={[
          FONTS.boldFont24,
          {
            color: COLORS.normal.black,
          },
        ]}
      >
        {title}
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MyTouchableOpacity
          style={[
            STYLES.shadow,
            {
              backgroundColor: COLORS.normal.white,
              borderRadius: SIZES.twentyFive,
              padding: SIZES.ten + 2,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={onEditeIconPressed}
        >
          <Icon
            name={"edit"}
            type={FONTFAMILY.Entypo}
            style={{
              fontSize: SIZES.twentyFive * 0.9,
              color: COLORS.primary.cherry,
            }}
          />
        </MyTouchableOpacity>
        <Text
          style={[
            FONTS.lightFont10,
            { color: COLORS.primary.cherry, marginTop: SIZES.five },
          ]}
        >
          Edit Profile
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.fifteen,
    // paddingVertical: SIZES.ten,
  },
});
