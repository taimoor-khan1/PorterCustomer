import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Linking,
} from "react-native";
import { COLORS, FONTFAMILY, SIZES, height, width } from "../../constants";
import { IMAGES } from "../../constants/theme";

import RNRestart from "react-native-restart";

export default function LocationNotFound() {
  const [reload, setreload] = useState("Allow access");

  const handleOpenSettings = () => {
    if (reload === "Allow access") {
      if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
      } else {
        Linking.openSettings();
      }
      setTimeout(() => {
        setreload("Reload");
      }, 500);
    } else {
      RNRestart.Restart();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.fifteen * 2,
        paddingVertical: SIZES.twentyFive * 7.5,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.normal.white,
          borderRadius: SIZES.ten,
          shadowColor: COLORS.brownGray,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 100,

          elevation: 50,
        }}
      >
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <View
            style={{
              width: "60%",
              borderBottomWidth: 3,
              borderBottomColor: COLORS.primary.cherry,
              marginTop: SIZES.twenty + 10,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: SIZES.h18,
                fontFamily: FONTFAMILY.Medium,
                color: COLORS.normal.black,
                alignSelf: "center",
              }}
            >
              OK! We need some access
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            source={IMAGES.LocationNotFound}
            style={{
              height: "100%",
              width: "100%",
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            paddingTop: SIZES.twenty,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.h18,
              fontFamily: FONTFAMILY.Medium,
              alignSelf: "center",
            }}
          >
            Allow Porter, access to Location
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleOpenSettings();
            }}
            activeOpacity={0.7}
            style={{
              backgroundColor: COLORS.primary.navy,
              marginHorizontal: SIZES.twentyFive,
              paddingVertical: SIZES.ten * 1.5,
              borderRadius: SIZES.fifteen,
              // position: 'absolute',
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: COLORS.normal.white,
                fontSize: SIZES.h16,
                fontFamily: FONTFAMILY.Bold,
              }}
            >
              {reload}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
