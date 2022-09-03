import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';
import {Icon} from 'native-base';
import {Switch} from 'react-native-paper';

export default function Settings(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [bg, setbg] = useState(COLORS.normal.white);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [itemName, setItemName] = useState('');
  // Category componant

  const SettingsCategory = ({iconName, name, iconType, isswitch, onPress}) => {
    return (
      <TouchableOpacity
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.twentyFive,
            borderRadius: SIZES.twenty * 2,
            padding: SIZES.twenty,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              itemName === name ? COLORS.primary.navy : COLORS.normal.white,
          },
        ]}
        activeOpacity={0.6}
        onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            type={iconType}
            name={iconName}
            style={{
              color:
                itemName === name
                  ? COLORS.normal.white
                  : COLORS.normal.brownGrey,
              fontSize: SIZES.twenty * 1.5,
            }}
          />
          <Text
            style={[
              FONTS.mediumFont16,
              {
                color:
                  itemName === name
                    ? COLORS.normal.white
                    : COLORS.normal.brownGrey,
                marginStart: SIZES.ten,
              },
            ]}>
            {name}
          </Text>
        </View>
        {isswitch ? (
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            thumbColor={
              isSwitchOn ? COLORS.primary.cherry : COLORS.normal.brownGrey
            }
            trackColor={{
              false: COLORS.normal.halfpwhite,
              true: COLORS.normal.brownGrey,
            }}
          />
        ) : (
          <Icon
            type={FONTFAMILY.Entypo}
            name={'chevron-small-right'}
            style={{
              color:
                itemName === name
                  ? COLORS.normal.white
                  : COLORS.normal.brownGrey,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        STYLES.container,
        {
          backgroundColor: COLORS.normal.white,
          paddingHorizontal: SIZES.fifteen,
        },
      ]}>
      <SettingsCategory
        iconType={FONTFAMILY.FontAwesome5}
        name={'Profile Settings'}
        iconName="user-cog"
        onPress={() => {
          setItemName('Profile Settings');
        }}
      />
      <SettingsCategory
        iconType={FONTFAMILY.FontAwesome5}
        name={'Payment Settings'}
        iconName="money-check"
        onPress={() => {
          setItemName('Payment Settings');
        }}
      />
      <SettingsCategory
        name={'Notifications'}
        isswitch
        iconType={FONTFAMILY.Ionicons}
        iconName={'notifications-sharp'}
        onPress={() => {
          setItemName('Notifications');
        }}
      />
      <SettingsCategory
        iconType={FONTFAMILY.MaterialIcons}
        name={'Updates'}
        iconName="system-update-alt"
        onPress={() => {
          setItemName('Updates');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});
