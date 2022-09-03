import React, { useEffect, useState, useContext } from "react";
import { COLORS, FONTFAMILY, FONTS } from "../constants";
import { View, Text, Dimensions, Platform } from "react-native";
import { TabBar, TabBarItem } from "react-native-tab-view";

const { width, height } = Dimensions.get("window");

export function ScrollTabBar(props) {
  return (
    <TabBar
      {...props}
      scrollEnabled={false}
      indicatorStyle={{ backgroundColor: COLORS.primary.cherry }}
      style={{ backgroundColor: COLORS.normal.white }}
      pressColor={COLORS.primary.cherry}
      renderTabBarItem={(tabProps) => {
        return <TabBarItem {...tabProps} />;
      }}
      activeColor={COLORS.primary.cherry}
      inactiveColor={COLORS.normal.brownGrey}
      labelStyle={FONTS.mediumFont14}
      renderLabel={({ route, focused, color }) => (
        <Text style={[FONTS.mediumFont16, { color }]}>{route.title}</Text>
      )}
    />
  );
}
