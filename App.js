import 'react-native-reanimated';
import React, {useEffect, useRef, useState} from 'react';
import {LogBox, View, StyleSheet, Image, Text} from 'react-native';

import {COLORS, FONTS, IMAGES, SIZES} from './src/constants';
import Firebase from './src/firebase/firebaseConfig';
import FlashMessage from 'react-native-flash-message';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider as PaperProvider} from 'react-native-paper';

// Redux Imports
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

const App = () => {
  const [networkState, setNetworkState] = useState(true);
  const FlashMessageRef = useRef();

  useEffect(() => {
    LogBox.ignoreAllLogs();
    Firebase();
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <InternetConnectionAlert
      onChange={connectionState => {
        // console.log('connectionState ====== >>>>>> ', connectionState);
        setNetworkState(connectionState.isInternetReachable);
      }}>
      <View style={{flex: 1}}>
        {networkState ? (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PaperProvider>
                <MainNavigation />
                <FlashMessage
                  ref={FlashMessageRef}
                  duration={5000}
                  backgroundColor={COLORS.primary.cherry}
                  floating
                  position="bottom"
                />
              </PaperProvider>
            </PersistGate>
          </Provider>
        ) : (
          <View style={styles.noInternetView}>
            <Image source={IMAGES.noWifi} style={styles.imgStyle} />
            <Text style={FONTS.boldFont20}>No Internet</Text>
            <Text style={FONTS.boldFont20}>Connection Available</Text>
            <Text style={[FONTS.mediumFont14, styles.textStyle]}>
              Your device is not connected to internet. please make sure your
              connection is working.
            </Text>
          </View>
        )}
      </View>
    </InternetConnectionAlert>
  );
};

const styles = StyleSheet.create({
  noInternetView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.twentyFive,
    backgroundColor: COLORS.normal.white,
  },
  imgStyle: {
    height: SIZES.fifty * 1.5,
    width: SIZES.fifty * 1.5,
    marginBottom: SIZES.twentyFive,
  },
  textStyle: {
    marginTop: SIZES.twenty,
    textAlign: 'center',
  },
});

// str = str.replace(/\d(?=\d{4})/g, "*");

export default App;
