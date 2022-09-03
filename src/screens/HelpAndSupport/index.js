import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import CartHeader from '../../components/CartHeader';
import {SIZES, STYLES} from '../../constants';

export default function Support() {
  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <CartHeader tittle={'Help And Support'} isBackArrow noCart />

      <WebView source={{uri: 'http://porter.reignsol.net/tawkto'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
