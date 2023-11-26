import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { trimTitle } from '../lib/helpers';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Rating from './Rating';

type Props = {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  loading: boolean;
  toggleWishlist: () => void;
  rating?: any;
};

const Wishlist = ({
  loading,
  id,
  image,
  price,
  title,
  toggleWishlist,
  rating,
}: Props) => {
  return (
    <View
      style={{ minHeight: 200, alignItems: 'center', justifyContent: 'center' }}
    >
      {loading ? (
        <ActivityIndicator animating />
      ) : (
        <Link href={`/product/${id}`} asChild>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', gap: 25 }}>
            <View style={{ flex: 0.4, alignItems: 'center', gap: 10 }}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                }}
                contentFit="contain"
              />
              <FontAwesome
                name="heart"
                size={25}
                color="crimson"
                onPress={toggleWishlist}
                style={{ position: 'absolute', top: 5, right: -5 }}
              />
            </View>
            <View style={{ flex: 0.6 }}>
              <Text variant="titleMedium">{trimTitle(title as string)}</Text>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                ₦{price}
              </Text>
              <Rating rating={rating} />
            </View>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
