import { Icon } from "native-base";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SIZES,
  STYLES,
  width,
} from "../../constants";
import CustomButton from "../CustomButton";

const ThankyouModal = ({ visible, onClose, onBackToHome, onTrackMyOrder }) => {
  return (
    <View style={{}}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalView}>
          <View
            style={[
              STYLES.shadow,
              {
                flex: 0.8,
                backgroundColor: "#fff",
                padding: SIZES.fifteen,
                borderTopLeftRadius: SIZES.twenty,
                borderTopRightRadius: SIZES.twenty,
              },
            ]}
          >
            <TouchableOpacity
              style={[{ alignSelf: "flex-end" }]}
              onPress={onClose}
            >
              <Icon name="close" type={FONTFAMILY.AntDesign} />
            </TouchableOpacity>
            <Image
              style={{
                height: height * 0.3,
                width: width * 0.5,
                alignSelf: "center",
              }}
              source={IMAGES.ThankyouModalimage}
              resizeMode="contain"
            />
            <View
              style={{
                alignItems: "center",
                // backgroundColor: "red",
                flex: 1,
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={[FONTS.boldFont24]}>Thank You!</Text>
                <Text
                  style={[FONTS.semiBoldFont16, { marginVertical: SIZES.ten }]}
                >
                  for your order
                </Text>
                <Text
                  style={[
                    FONTS.mediumFont12,
                    {
                      textAlign: "center",
                      color: COLORS.normal.charcoalGrey,
                      lineHeight: SIZES.twenty,
                    },
                  ]}
                >
                  Your Order is now being processed. We will let you know once
                  the order is picked from the outlet. Check the status of your
                  Order
                </Text>
              </View>
              <CustomButton label={"Track My Order"} onPress={onTrackMyOrder} />
              <TouchableOpacity activeOpacity={0.7} onPress={onBackToHome}>
                <Text style={[FONTS.semiBoldFont20]}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: `${COLORS.normal.black}80`,
    justifyContent: "flex-end",
  },
});

export default ThankyouModal;
