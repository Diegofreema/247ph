import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/Colors';
import { usePathname } from 'expo-router';

type Props = {
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  addToWishlist?: () => void;
  onAddToCart?: () => void;
};

const CounterCartButton = ({
  onDecrease,
  onIncrease,
  qty,
  addToWishlist,
  onAddToCart,
}: Props) => {
  const pathname = usePathname();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: pathname === '/cart' ? 'column' : 'row',
            gap: 15,
            flex: 1,
            alignItems: pathname === '/cart' ? 'flex-start' : 'center',
          }}
        >
          <Text>Quantity:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: StyleSheet.hairlineWidth,
              justifyContent: 'center',
            }}
          >
            <Button onPress={onDecrease} disabled={qty === 1}>
              <FontAwesome name="minus" size={15} color="#000" />
            </Button>
            <Text>{qty}</Text>
            <Button onPress={onIncrease}>
              <FontAwesome name="plus" size={15} color="#000" />
            </Button>
          </View>
        </View>

        {pathname !== '/cart' && (
          <FontAwesome
            name="heart"
            size={25}
            color="crimson"
            onPress={addToWishlist}
          />
        )}
      </View>
      {pathname !== '/cart' && (
        <Button
          mode="contained"
          style={{ marginTop: 20 }}
          rippleColor={colors.ripple}
          buttonColor={colors.lightGreen}
          textColor="#fff"
          onPress={onAddToCart}
          labelStyle={{ fontSize: 20, fontWeight: 'bold' }}
        >
          Add to cart
        </Button>
      )}
    </View>
  );
};

export default CounterCartButton;

const styles = StyleSheet.create({});
