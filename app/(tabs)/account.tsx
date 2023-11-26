import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useStoreId } from '../../lib/zustand/auth';
import axios from 'axios';
import { LoggedUserType } from '../../lib/types';
import Container from '../../components/Container';
import { Entypo, Foundation } from '@expo/vector-icons';
type Props = {};

const pages = [
  {
    name: 'Orders',
    link: '/Orders',
    icon: <Entypo name="box" size={30} color="black" />,
  },
  {
    name: 'Dealers',
    link: '/dealers',
    icon: <Entypo name="shop" size={30} color="black" />,
  },
  {
    name: 'Update Profile',
    link: '/updateProfile',
    icon: <Entypo name="user" size={30} color="black" />,
  },
  {
    name: 'Update Password',
    link: '/updatePassword',
    icon: <Entypo name="lock" size={30} color="black" />,
  },
];
const Account = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { user } = useStoreId();
  const router = useRouter();
  console.log(user);

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} />
      <Container>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 20, marginTop: 20 }}
        >
          {pages.map((page, index) => (
            <Pressable
              onPress={() => router.push(page.link as any)}
              key={index}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: 20,
                  alignItems: 'center',
                }}
              >
                {page.icon}
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {page.name}
                </Text>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </Pressable>
          ))}
        </ScrollView>
      </Container>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
