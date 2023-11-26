import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import NavigationHeader from '../../components/NavigationHeader';
import Container from '../../components/Container';
import Wishlist from '../../components/Wishlist';
import { useProducts } from '../../lib/queries';

type Props = {};

const wishlist = (props: Props) => {
  const { data, isFetching, isLoading, isPending } = useProducts(5);
  console.log(data && data[0]);

  return (
    <Container>
      <NavigationHeader title="Wishlist" />
      <View style={{ marginTop: 30 }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Wishlist
              id={item?.id}
              title={item?.title}
              price={item?.price}
              image={item?.image}
              rating={item?.rating?.rate}
              loading={isFetching || isLoading || isPending}
              toggleWishlist={() => {}}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default wishlist;

const styles = StyleSheet.create({});
