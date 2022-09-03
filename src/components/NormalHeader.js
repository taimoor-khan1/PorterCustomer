import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, IMAGES, width, height, FONTS, SIZES } from "../constants";
// import {useNavigation} from '@react-navigation/native';
import BackArrow from "./BackArrow";
import { SharedElement } from "react-navigation-shared-element";

const NormalHeader = (props) => {
  // const navigation = useNavigation();

  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            FONTS.boldFont22,
            {
              color: props.isBright ? COLORS.white : COLORS.BLACK,
            },
          ]}
        >
          {props.title}
        </Text>
      </View>
      <BackArrow isBright={props.isBright} style={{}} />
    </View>
  );
};

export default NormalHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.fifteen,
  },
});
