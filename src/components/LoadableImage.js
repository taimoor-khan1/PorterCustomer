import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import {COLORS} from '../constants';
import FastImage from 'react-native-fast-image';
import MyTouchableOpacity from './MyTouchableOpacity';

export default class LoadableImage extends Component {
  state = {
    loading: true,
  };

  render() {
    const {url, style, imageStyle, smallIndicator} = this.props;

    return (
      <View style={[styles.container, style]}>
        {/* <FastImage
          // style={styles.image}
          source={{
            uri: url,
          }}
          onLoadEnd={this._onLoadEnd}
          style={style}
          {...this.props}
        /> */}

        <FastImage
          style={imageStyle}
          source={{
            uri: url || 'https://unsplash.it/400/400?image=25',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={
            this.props.resizeMode
              ? this.props.resizeMode
              : FastImage.resizeMode.contain || this.props.resizeMode
          }
          onLoadEnd={this._onLoadEnd}
        />
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={this.state.loading}
          size={'large'}
        />
      </View>
    );
  }

  _onLoadEnd = () => {
    this.setState({
      loading: false,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: `${COLORS.normal.halfpwhite}`,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  image: {
    // height:
  },
});
