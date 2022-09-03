import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, FONTS, STYLES } from "../constants";
import { SIZES, IMAGES } from "../constants/theme";

export default function PaymentCardComponant({ onCardPress }) {
  return (
    <TouchableOpacity
      style={[
        STYLES.shadow,
        { backgroundColor: COLORS.normal.white, padding: SIZES.fifteen },
      ]}
      activeOpacity={0.7}
      onPress={onCardPress}
    >
      <Text style={[FONTS.mediumFont14]}>Cash/Card on delivery</Text>
      <View style={[STYLES.horLine, { marginTop: SIZES.twenty }]} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: SIZES.twenty,
        }}
      >
        <Image
          style={{ height: SIZES.twenty * 2, width: SIZES.twenty * 2 }}
          source={IMAGES.visalogo}
          resizeMode="contain"
        />
        <Text style={[FONTS.mediumFont14]}>**** **** **** 2187</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary.cherry,
            padding: SIZES.ten,
            borderRadius: SIZES.twenty,
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[FONTS.semiBoldFont10, { color: COLORS.primary.cherry }]}
          >
            Delete Card
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[STYLES.horLine, { marginTop: SIZES.twenty }]} />

      <Text style={[FONTS.mediumFont14, { marginTop: SIZES.twenty }]}>
        Other Methods
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
