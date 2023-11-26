import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import React from 'react';
import { Text } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  title: string;
};

const NavigationHeader = ({ title }: Props) => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
      }}
    >
      <Pressable
        onPress={({}) => router.back()}
        style={({ pressed }) => [
          pressed && { opacity: 0.5 },
          { backgroundColor: '#fff' },
        ]}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
};

export default NavigationHeader;
