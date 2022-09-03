import React, {createRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'native-base';
import Collapsible from 'react-native-collapsible';
import {Calendar} from 'react-native-calendars';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SIZES,
  STYLES,
  width,
} from '../../../constants';
import Row from '../../../components/Row';
import CircularImage from '../../../components/CircularImage';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function Balance() {
  const [isCashOrdersVisible, setIsCashOrdersVisible] = useState(false);
  const [isCardOrdersVisible, setIsCardOrdersVisible] = useState(false);

  const InfoIcons = ({icon, type, title, description, image}) => {
    return (
      <Row style={{alignItems: 'center'}}>
        {image ? (
          <Image
            source={IMAGES.DeliveryFeeIcon}
            style={{height: SIZES.ten * 3.4, width: SIZES.ten * 3.4}}
            resizeMode="contain"
          />
        ) : (
          <Icon
            name={icon}
            type={type}
            style={{
              fontSize: SIZES.twentyFive * 1.12,
              color: COLORS.primary.cherry,
            }}
          />
        )}

        <View style={{marginLeft: SIZES.five}}>
          <Text style={[FONTS.mediumFont10, {}]}>{title}</Text>
          <Text style={[FONTS.lightFont08, {}]}>{description}</Text>
        </View>
      </Row>
    );
  };

  const TopContent = () => {
    return (
      <View
        style={{
          padding: SIZES.twenty * 0.6,
        }}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <CircularImage
            uri={
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'
            }
            imageStyle={{
              height: SIZES.twenty * 3.5,
              width: SIZES.twenty * 3.5,
              borderRadius: SIZES.twenty * 3.5,
            }}
          />
          <View style={{}}>
            <Text style={[FONTS.mediumFont16, {marginStart: SIZES.ten}]}>
              Robert Anderson
            </Text>
            <Row style={{alignItems: 'center', marginLeft: SIZES.five * 1.3}}>
              <Icon
                name={'ios-location-outline'}
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.fifteen * 1.3,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                style={[
                  FONTS.lightFont12,
                  {
                    color: COLORS.normal.brownGrey,
                    marginLeft: SIZES.five * 0.3,
                  },
                ]}>
                NJ Shelter , V432
              </Text>
            </Row>
          </View>
        </Row>

        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: SIZES.fifteen,
          }}>
          <InfoIcons image title={'Delivery Fee'} description={'$5'} />
          <InfoIcons
            icon={'clock'}
            type={FONTFAMILY.Feather}
            title={'Estimated Time'}
            description={'20-25 Mins'}
          />
          <InfoIcons
            icon={'star'}
            type={FONTFAMILY.AntDesign}
            title={'Rider Rating'}
            description={'5.0'}
          />
        </Row>
      </View>
    );
  };

  const OrderHistoryButton = ({label, icon, type, style, onPress, state}) => {
    return (
      <MyTouchableOpacity
        onPress={onPress}
        style={[
          style,
          {
            paddingHorizontal: SIZES.twenty,
            paddingVertical: SIZES.twenty * 0.75,
            width: width * 0.65,
            borderRadius: SIZES.five * 0.8,
            borderColor: COLORS.primary.navy,
            borderWidth: 0.8,
          },
        ]}>
        <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <Icon
            name={icon}
            type={type}
            style={{
              fontSize: SIZES.twentyFive * 1.12,
              color: COLORS.primary.navy,
            }}
          />
          <Text style={[FONTS.mediumFont14, {}]}>{label}</Text>
          <Icon
            name={state ? 'ios-chevron-down' : 'ios-chevron-forward-outline'}
            type={FONTFAMILY.Ionicons}
            style={{
              fontSize: SIZES.twentyFive * 1.12,
              color: COLORS.primary.navy,
            }}
          />
        </Row>
      </MyTouchableOpacity>
    );
  };

  const renderCashHistory = () => {
    return (
      <View>
        {/* <FlatList
          data={[0, 1, 2, 3, 4]}
          key={(_, index) => index.toString()}
          renderItem={() => {
            return (
              <View>
                <Text>hhhhhhhh</Text>
              </View>
            );
          }}
        /> */}
        <CalendarView />
        <FlatList
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          data={[0, 1]}
          keyExtractor={(_, index) => {
            index.toString();
          }}
          renderItem={renderOrderRow}
        />
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.fifteen,
          }}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.normal.black}]}>
            Cash order today
          </Text>

          <Text style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
            0
          </Text>
        </Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.fifteen * 2,
          }}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.normal.black}]}>
            Cash Order Commission
          </Text>

          <Text style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
            $0
          </Text>
        </Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.fifteen,
          }}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.normal.black}]}>
            Balance to be paid to porter
          </Text>

          <Text style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
            -($10)
          </Text>
        </Row>
        <View style={[STYLES.horLine, {marginVertical: SIZES.twenty}]} />

        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.fifteen,
          }}>
          <Text style={[FONTS.mediumFont14, {color: COLORS.normal.black}]}>
            Total
          </Text>

          <Text style={[FONTS.boldFont20, {color: COLORS.primary.cherry}]}>
            ($10)
          </Text>
        </Row>
      </View>
    );
  };

  const renderOrderRow = () => {
    return (
      <Row style={{marginVertical: SIZES.fifteen}}>
        <CircularImage
          uri={
            'https://media.istockphoto.com/photos/delicious-meal-picture-id1295387240?b=1&k=20&m=1295387240&s=170667a&w=0&h=KtWYFjSBgpNgVkE3P-WKZ2F6V-VxyUBBtJIP_k8IANM='
          }
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            marginLeft: SIZES.ten * 0.8,
          }}>
          <Text style={[FONTS.mediumFont14, {}]} numberOfLines={1}>
            Royal Spice
          </Text>

          <Row style={{}}>
            <Text style={[FONTS.lightFont08, {}]}>Order Id</Text>
            <Text
              style={[
                FONTS.lightFont08,
                {color: COLORS.primary.cherry, marginLeft: SIZES.five * 0.5},
              ]}>
              #123123
            </Text>
          </Row>

          <Row style={{alignItems: 'center'}}>
            <Icon
              name={'clock'}
              type={FONTFAMILY.Feather}
              style={{
                fontSize: SIZES.fifteen * 0.85,
                color: COLORS.primary.cherry,
              }}
            />
            <Text
              style={[
                FONTS.lightFont08,
                {
                  color: COLORS.normal.brownGrey,
                  marginLeft: SIZES.five * 0.5,
                },
              ]}>
              Delivered 15 July 2021, 22:42
            </Text>
          </Row>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            marginLeft: SIZES.ten * 0.8,
            alignItems: 'flex-end',
          }}>
          <Text style={[FONTS.mediumFont14, {color: COLORS.normal.white}]}>
            Royal Spice
          </Text>

          <Row style={{alignItems: 'center'}}>
            <Text style={[FONTS.lightFont08, {marginRight: SIZES.five * 0.5}]}>
              Rating
            </Text>
            {[0, 1, 2, 3, 4].map(item => (
              <Icon
                key={item}
                name={'star'}
                type={FONTFAMILY.FontAwesome}
                style={{
                  fontSize: SIZES.fifteen * 0.8,
                  color: COLORS.normal.golden,
                  marginLeft: SIZES.five * 0.25,
                }}
              />
            ))}
          </Row>

          <Row style={{alignItems: 'center'}}>
            <Icon
              name={'ios-location-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.primary.cherry,
              }}
            />
            <Text
              style={[
                FONTS.lightFont08,
                {
                  color: COLORS.normal.brownGrey,
                  marginLeft: SIZES.five * 0.3,
                },
              ]}>
              No 03, 4th Lane, Newyork
            </Text>
          </Row>
        </View>
      </Row>
    );
  };
  return (
    <View
      style={[
        STYLES.container,
        {
          paddingHorizontal: SIZES.fifteen,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.8
              : getStatusBarHeight(true),
        },
      ]}>
      <View style={{marginHorizontal: SIZES.five}}>
        <TopContent />

        <View style={STYLES.horLine} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        contentContainerStyle={{paddingBottom: height * 0.2}}
        style={{marginVertical: SIZES.fifteen}}>
        <OrderHistoryButton
          label={'Cash Order History'}
          icon={'cash-multiple'}
          type={FONTFAMILY.MaterialCommunityIcons}
          state={isCashOrdersVisible}
          onPress={() => {
            setIsCashOrdersVisible(!isCashOrdersVisible);
          }}
        />
        <Collapsible collapsed={!isCashOrdersVisible}>
          <View style={{}}>{renderCashHistory()}</View>
        </Collapsible>

        <OrderHistoryButton
          label={'Card Order History'}
          icon={'ios-card-outline'}
          type={FONTFAMILY.Ionicons}
          style={{marginTop: SIZES.fifteen}}
          state={isCardOrdersVisible}
          onPress={() => {
            setIsCardOrdersVisible(!isCardOrdersVisible);
          }}
        />
        <Collapsible collapsed={!isCardOrdersVisible}>
          <View style={{}}>{renderCashHistory()}</View>
        </Collapsible>
        <MyTouchableOpacity
          style={{
            marginVertical: SIZES.twenty,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={[
              FONTS.mediumFont16,
              {color: COLORS.primary.cherry},
            ]}>{`Withdraw Cash`}</Text>
          <Text
            style={[
              FONTS.boldFont24,
              {color: COLORS.primary.cherry, marginLeft: SIZES.fifteen},
            ]}>
            +
          </Text>
        </MyTouchableOpacity>
      </ScrollView>
    </View>
  );
}

const CalendarView = props => {
  const renderCustomHeader = date => {
    const header = date.toString('MMMM yyyy');
    const [month, year] = header.split(' ');

    return (
      <Row>
        <Text style={[FONTS.mediumFont16, {color: COLORS.white}]}>{month}</Text>
        <Text
          style={[FONTS.mediumFont16, {color: COLORS.white, marginLeft: 3}]}>
          {year}
        </Text>
      </Row>
    );
  };

  const CalendarArrow = props => {
    return (
      <View
        style={{
          height: SIZES.ten * 6,
          width: SIZES.ten * 6,
          borderRadius: SIZES.ten * 6,
          borderColor: COLORS.white,
          borderWidth: 0.5,
          backgroundColor: COLORS.secondary,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={props.name}
          type={FONTFAMILY.Ionicons}
          style={{
            color: COLORS.primary.cherry,
            fontSize: SIZES.twenty,
          }}
        />
      </View>
    );
  };

  return (
    <Calendar
      style={{
        borderBottomColor: COLORS.normal.brownGrey,
        borderBottomWidth: 1.5,
      }}
      // Initially visible month. Default = Date()
      // current={Date()}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={Date()}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      // maxDate={'2012-05-30'}
      // Handler which gets executed on day press. Default = undefined
      // onDayPress={this.onDayPress}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => {}}
      markingType="custom"
      markedDates={{
        '2021-12-03': {
          selected: true,
          marked: true,
          selectedColor: COLORS.primary.navy,
        },
        '2021-12-08': {
          selected: true,
          marked: true,
          selectedColor: COLORS.primary.navy,
        },
        '2021-12-17': {
          selected: true,
          marked: true,
          selectedColor: COLORS.primary.navy,
        },
        '2021-12-21': {
          selected: true,
          marked: true,
          selectedColor: COLORS.primary.navy,
        },
      }}
      // Hide month navigation arrows. Default = false
      hideArrows={false}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={direction =>
        direction === 'left' ? (
          <CalendarArrow name="ios-chevron-back-sharp" />
        ) : (
          <CalendarArrow name="ios-chevron-forward-sharp" />
        )
      }
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays
      // Replace default month and year title with custom one. the function receive a date as parameter
      renderHeader={renderCustomHeader}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths
      // Specify theme properties to override specific styles for calendar parts. Default = {}
      theme={{
        calendarBackground: COLORS.normal.veryLightPink,
        textSectionTitleColor: COLORS.brownGrey,
        todayTextColor: COLORS.red,
        weekTextColor: COLORS.normal.white,
        dayTextColor: COLORS.normal.brownGrey,
        textDisabledColor: COLORS.normal.veryLightPink,
        textDayFontSize: SIZES.body14,
        textMonthFontSize: SIZES.body14,
        textDayFontFamily: FONTFAMILY.Light,
        textMonthFontFamily: FONTFAMILY.Light,
        'stylesheet.day.basic': {
          padding: 1,
        },
        'stylesheet.calendar.header': {
          week: {
            paddingVertical: SIZES.ten,
            marginTop: SIZES.five * 1.3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.primary.cherry,
            color: COLORS.normal.white,
          },
        },
        dayTextAtIndex0: {
          color: 'red',
        },
        dayTextAtIndex6: {
          color: 'blue',
        },
        // dayTextAtIndex0: {
        //   color: COLORS.normal.white,
        // },
        // dayTextAtIndex1: {
        //   color: COLORS.normal.white,
        // },
        // dayTextAtIndex2: {
        //   color: COLORS.normal.white,
        // },
        // dayTextAtIndex3: {
        //   color: COLORS.normal.white,
        // },
        // dayTextAtIndex4: {
        //   color: COLORS.normal.white,
        // },
        // dayTextAtIndex5: {
        //   color: COLORS.normal.white,
        // },
        // dayTextAtIndex6: {
        //   color: COLORS.normal.white,
        // },
      }}
    />
  );
};

const styles = StyleSheet.create({});
