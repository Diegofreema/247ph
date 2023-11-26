import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { trimTitle } from '../lib/helpers';
import CounterCartButton from './CounterCartButton';
import { colors } from '../constants/Colors';

type Props = {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  loading: boolean;
  toggleWishlist: () => void;
  rating?: any;
};

const CartItem = ({
  loading,
  toggleWishlist,
  id,
  image,
  price,
  rating,
  title,
}: Props) => {
  return (
    <View style={styles.containerStyle}>
      {loading ? (
        <ActivityIndicator animating />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', paddingBottom: 15 }}>
          <View
            style={{
              justifyContent: 'center',
              gap: 10,
              flexDirection: 'row',
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 200,
                height: 100,
              }}
              contentFit="contain"
            />

            <Text variant="titleMedium" style={{ width: '50%' }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: 20,
            }}
          >
            <CounterCartButton
              onDecrease={() => {}}
              onIncrease={() => {}}
              qty={1}
            />
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
              ₦{price}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
            <Button
              icon={'heart'}
              //   buttonColor={colors.lightGreen}
              textColor="black"
              rippleColor={colors.lightGreen}
              mode="outlined"
            >
              Save to wishlist
            </Button>
            <Button
              icon="delete"
              //   buttonColor={colors.lightGreen}
              textColor="black"
              mode="outlined"
              rippleColor={colors.lightGreen}
            >
              Remove from cart
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonStyle: {
    backgroundColor: colors.lightGreen,
  },
});
