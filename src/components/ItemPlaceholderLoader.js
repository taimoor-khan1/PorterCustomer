import React from 'react';
import {Platform} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {height, SIZES, width} from '../constants';

const ItemPlaceholderLoader = props => {
  if (props.recentItems) {
    return (
      <SkeletonPlaceholder>
        {Array.from({length: 5}).map((_, index) => (
          <SkeletonPlaceholder.Item flexDirection="row" marginTop={SIZES.ten}>
            <SkeletonPlaceholder.Item
              width={SIZES.twenty * 5}
              height={SIZES.twenty * 5}
              borderRadius={SIZES.five}
              marginLeft={SIZES.fifteen}
            />

            <SkeletonPlaceholder.Item
              flex={1}
              justifyContent={'space-between'}
              marginLeft={12}>
              <SkeletonPlaceholder.Item
                width="50%"
                height={SIZES.twenty}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="30%"
                height={SIZES.twenty}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width="80%"
                height={SIZES.twenty}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder>
    );
  } else if (props.horizontal) {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" marginTop={SIZES.ten}>
          {Array.from({length: 5}).map((_, index) => (
            <>
              <SkeletonPlaceholder.Item
                width={SIZES.twenty * 9.5}
                height={SIZES.twenty * 5.5}
                borderRadius={SIZES.five}
                marginLeft={SIZES.fifteen}
              />
              <SkeletonPlaceholder.Item
                width="35%"
                height={SIZES.fifteen}
                borderRadius={4}
                marginLeft={SIZES.fifteen}
                marginTop={SIZES.five * 1.3}
              />
              <SkeletonPlaceholder.Item
                width="25%"
                height={SIZES.ten * 1.5}
                borderRadius={4}
                marginLeft={SIZES.fifteen}
                marginTop={SIZES.five * 1.3}
              />
            </>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  } else {
    return (
      <SkeletonPlaceholder>
        {typeof props.numberOfItems === 'number' &&
        props.numberOfItems !== 0 ? (
          Array.from({length: props.numberOfItems}).map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={width}
              height={Platform.OS === 'android' ? height * 0.3 : height * 0.23}
              marginTop={index === 0 ? 0 : SIZES.ten}
            />
          ))
        ) : (
          <SkeletonPlaceholder.Item
            width={width}
            height={Platform.OS === 'android' ? height * 0.25 : height * 0.35}
          />
        )}
      </SkeletonPlaceholder>
    );
  }
};

export default ItemPlaceholderLoader;
