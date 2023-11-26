import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';

type Props = {};

export const SearchHeader = ({}: Props): JSX.Element => {
  const router = useRouter();
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10, paddingVertical: 20 }}>
      <Pressable
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
      >
        <Searchbar
          value=""
          icon={() => <FontAwesome name="arrow-left" size={20} />}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
