import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useProduct } from '../../lib/queries';
import Container from '../../components/Container';
import NavigationHeader from '../../components/NavigationHeader';
import { Button, Card, Text } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import CounterCartButton from '../../components/CounterCartButton';
type Props = {};

const ProductDetail = (props: Props) => {
  const { productId } = useLocalSearchParams();
  const [qty, setQty] = useState(1);
  const { data, isLoading, isFetching, isPending } = useProduct(productId);
  const handelIncrease = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const handleDecrease = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  const handleWishlist = () => {
    console.log('wishlist');
  };

  return (
    <Container>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <NavigationHeader title="Details" />
        {isLoading || isFetching || isPending ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <Card
            style={{ marginTop: 30, gap: 5 }}
            contentStyle={{
              padding: 10,
              backgroundColor: 'white',
              elevation: 0,
              shadowColor: 'transparent',
            }}
          >
            <Card.Title
              title={data?.title}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <Card.Cover source={{ uri: data?.image }} />
            <Card.Content style={{ marginVertical: 10, gap: 5 }}>
              <Text variant="titleLarge">{data?.category}</Text>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
                {data?.description}
              </Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginVertical: 20,
                }}
              />
              <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>
                ₦{data?.price}
              </Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginVertical: 20,
                }}
              />
            </Card.Content>
            <Card.Actions style={{ flex: 1 }}>
              <CounterCartButton
                onAddToCart={() => {}}
                qty={qty}
                onIncrease={handelIncrease}
                onDecrease={handleDecrease}
                addToWishlist={handleWishlist}
              />
            </Card.Actions>
          </Card>
        )}
      </ScrollView>
    </Container>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
