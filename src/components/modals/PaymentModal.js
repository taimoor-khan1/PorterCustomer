import React, {useCallback, useEffect, useRef, useState} from 'react';
import {WaveIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLORS, height, SIZES, width} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import MyTouchableOpacity from '../MyTouchableOpacity';
import {Icon} from 'native-base';

export default function PaymentModal(props) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  const documentHeightCallbackScript = `
  function onElementHeightChange(elm, callback) {
    var lastHeight;
    var newHeight;
    (function run() {
      newHeight = Math.max(elm.clientHeight, elm.scrollHeight);
      if (lastHeight != newHeight) {
        callback(newHeight);
      }
      lastHeight = newHeight;
      if (elm.onElementHeightChangeTimer) {
        clearTimeout(elm.onElementHeightChangeTimer);
      }
      elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
  }
  onElementHeightChange(document.body, function (height) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        event: 'documentHeight',
        documentHeight: height,
      }),
    );
  });
`;

  const handleNavigationStateChange = useCallback(
    ({url, canGoBack, canGoForward, loading, navigationType}) => {
      if (canGoBack) {
        setBackButtonEnabled(true);
      } else {
        setBackButtonEnabled(false);
      }
      if (
        url === 'http://porter.reignsol.net/api/v1/customer/payment-failure'
      ) {
        props.setVisibility(false);
        props.onResponse(false);
        return;
      }
      if (
        url === 'http://porter.reignsol.net/api/v1/customer/payment-success'
      ) {
        props.setVisibility(false);
        props.onResponse(true);
        return;
      }

      if (!loading && !navigationType) {
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(documentHeightCallbackScript);
        }
      }
    },
    [],
  );
  console.log(props.url);
  //************ rendorBottomSheet ************/
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        {backButtonEnabled && (
          <MyTouchableOpacity
            style={{
              position: 'absolute',
              start: width * 0.025,
              top: height * 0.025,
              zIndex: 100000,
            }}
            onPress={() => {
              webViewRef.current.goBack();
            }}>
            <Icon name={'ios-arrow-back-sharp'} type={'Ionicons'} />
          </MyTouchableOpacity>
        )}
        <WebView
          ref={webViewRef}
          source={{uri: props.url}}
          javaScriptEnabled
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
          onError={() => {
            props.setVisibility(false);
            props.onResponse(false);
          }}
          onNavigationStateChange={handleNavigationStateChange}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
        {loading && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                position: 'absolute',
                zIndex: 10000,
                backgroundColor: COLORS.white,
              },
            ]}>
            <WaveIndicator
              color={COLORS.primary}
              size={height * 0.13}
              waveFactor={0.84}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal
      isVisible={props.visibility}
      style={styles.modal}
      deviceHeight={height * height}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderTopStartRadius: SIZES.ten,
    borderTopEndRadius: SIZES.ten,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'white',
  },
  viewSelectImageType: {
    flex: 1,
    height: SIZES.fifty * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
  },
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
