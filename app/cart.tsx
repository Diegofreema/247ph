import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import Container from '../components/Container';
import NavigationHeader from '../components/NavigationHeader';
import CartItem from '../components/CartItem';
import { useProducts } from '../lib/queries';
import { Button } from 'react-native-paper';
import { colors } from '../constants/Colors';

type Props = {};

const cart = (props: Props) => {
  const { data, isFetching, isLoading, isPending } = useProducts(5);
  console.log(data && data[0]);

  return (
    <Container>
      <NavigationHeader title="Cart" />
      <View style={{ marginTop: 30 }}>
        <FlatList
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Subtotal (1 item)
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₦{67778}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem
              id={item?.id}
              title={item?.title}
              price={item?.price}
              image={item?.image}
              rating={item?.rating?.rate}
              loading={isFetching || isLoading || isPending}
              toggleWishlist={() => {}}
            />
          )}
          ListFooterComponent={() => {
            return (
              <Button buttonColor={colors.lightGreen} textColor="#fff">
                Checkout
              </Button>
            );
          }}
          ListFooterComponentStyle={{ marginBottom: 50 }}
        />
      </View>
    </Container>
  );
};

export default cart;

const styles = StyleSheet.create({});
