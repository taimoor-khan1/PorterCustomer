import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {Icon} from 'native-base';
import {FONTS, SIZES} from '../constants/theme';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {COLORS} from '../constants';

export default function EditText(props) {
  const [borderColor, setBorderColor] = useState(COLORS.normal.brownGrey);
  const [iconColor, setIconColor] = useState(COLORS.normal.brownGrey);
  const [show, setshow] = useState('eye');
  const [showText, setShowText] = useState(true);

  const passwordShow = () => {
    if (show === 'eye') {
      setshow('eye-slash');
      setShowText(false);
    } else {
      setShowText(true);
      setshow('eye');
    }
  };

  return (
    <View
      style={[
        {
          height: 60,
          width: '100%',
          borderWidth: 1,
          justifyContent: 'center',
          paddingHorizontal: SIZES.fifteen,
          borderRadius: SIZES.fifty,
          borderColor: borderColor,
        },
        props.style,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {props.hasIcon ? (
            <Icon
              type={props.type}
              name={props.name}
              style={{
                color: iconColor,
                marginRight: SIZES.ten,
                fontSize: SIZES.twenty,
              }}
            />
          ) : null}

          <TextInput
            {...props}
            secureTextEntry={props.password ? showText : false}
            selectionColor={COLORS.primary.cherrywithOpacity}
            placeholderTextColor={COLORS.normal.charcoalGrey}
            onFocus={() => {
              setBorderColor(COLORS.primary.cherry);
              setIconColor(COLORS.primary.cherry);
            }}
            onBlur={() => {
              setBorderColor(COLORS.normal.charcoalGrey);
              setIconColor(COLORS.normal.charcoalGrey);
            }}
            style={[
              FONTS.mediumFont14,
              {
                flex: 1,
                color: COLORS.normal.black,
              },
            ]}
          />
        </View>

        {props.password ? (
          <MyTouchableOpacity
            onPress={() => {
              passwordShow();
            }}>
            <Icon
              name={show}
              type={'FontAwesome'}
              style={{
                fontSize: 20,
                marginLeft: 5,
                color: COLORS.normal.brownGrey,
              }}
            />
          </MyTouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
