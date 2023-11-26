import { useRef, useState } from 'react';
import { categories } from '../../constants';

import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import { Text } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { TopHeader } from '../../components/TopHeader';

export default function Categories() {
  const [allCat, setAllCat] = useState<string[]>(categories);
  const [active, setActive] = useState(0);
  const itemRef = useRef<Array<TouchableOpacity | null>>([]);

  const scrollRef = useRef<ScrollView>(null);
  const handleClick = (index: number) => {
    const selectedItem = itemRef.current[index];
    setActive(index);

    if (selectedItem) {
      selectedItem.measureLayout(
        scrollRef.current! as any,
        (x, y) => {
          scrollRef.current?.scrollTo({
            x: x - 16,
            y: 0,
            animated: true,
          });
        },
        () => {}
      );
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  return (
    <View>
      <TopHeader />

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
        }}
      >
        {allCat.map((cat, index) => (
          <TouchableOpacity
            onPress={() => handleClick(index)}
            key={index}
            ref={(el) => (itemRef.current[index] = el)}
            style={active === index ? styles.active : styles.normal}
          >
            <Text style={active === index ? styles.activeText : styles.text}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    color: '#000',

    borderBottomColor: '#000',
    borderBottomWidth: 2,
    padding: 10,
  },
  normal: {
    color: '#000',

    padding: 10,
  },
  activeText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
  },
});
