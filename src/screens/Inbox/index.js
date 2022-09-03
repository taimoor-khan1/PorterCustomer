import { Icon } from "native-base";
import React from "react";
import { FlatList, StyleSheet, Text, View, Platform } from "react-native";
import CartHeader from "../../components/CartHeader";
import { COLORS, FONTFAMILY, FONTS, SIZES, STYLES } from "../../constants";

export default function Inbox() {
  const rendorInbox = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.twenty,
          justifyContent: "space-between",
          paddingVertical: SIZES.ten,
        }}
      >
        <View
          style={{
            height: SIZES.ten,
            width: SIZES.ten,
            borderRadius: SIZES.ten,
            backgroundColor: COLORS.primary.cherry,
            top: Platform.OS === "android" ? SIZES.ten : SIZES.five - 2,
          }}
        />

        <View style={{ flex: 1, marginStart: SIZES.five }}>
          <Text style={[FONTS.semiBoldFont18]}>MealMonkey Promotions</Text>
          <Text
            numberOfLines={2}
            style={[
              FONTS.mediumFont10,
              {
                color: COLORS.normal.charcoalGrey,
                marginTop: SIZES.five,
                lineHeight: SIZES.twenty,
              },
            ]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
          </Text>
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text
            style={[FONTS.mediumFont10, { color: COLORS.normal.charcoalGrey }]}
          >
            6th July
          </Text>
          <Icon
            name={"star-o"}
            type={FONTFAMILY.FontAwesome}
            style={{
              fontSize: SIZES.fifteen,
              color: COLORS.primary.cherry,
              alignSelf: "flex-end",
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={[STYLES.container, { paddingHorizontal: SIZES.fifteen }]}>
      <CartHeader tittle={"Inbox"} isBackArrow />

      <FlatList
        data={Data}
        renderItem={rendorInbox}
        key={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
const Data = [
  {
    id: "1",
    Item: "Beef Burger x1",
    price: "$16",
  },
  {
    id: "2",
    Item: "Classic Burger x1",
    price: "$14",
  },
  {
    id: "3",
    Item: "Cheese Chicken Burger x1",
    price: "",
  },
  {
    id: "4",
    Item: "Chicken Legs Basket x1",
    price: "$17",
  },
  {
    id: "5",
    Item: "French Fries Large x1",
    price: "$15",
  },
];
