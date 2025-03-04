import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { NewsDataType } from "../types";
import SliderItem from "./SliderItem";
import { Colors } from '@/constants/Colors';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';


type Props = {
  newsList: Array<NewsDataType>,
};

const BreakingNews = ({newsList}: Props) => {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  
  const renderItem = (item: NewsDataType, index: number) => {
    return (
      <SliderItem slideItem={item} index={index} scrollX={scrollX}/>
    );
  };

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>

      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({item, index}) => renderItem(item, index)}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    justifyContent: "center",
  },

});

export default BreakingNews